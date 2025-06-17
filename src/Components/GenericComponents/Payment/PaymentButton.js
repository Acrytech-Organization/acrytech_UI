import { useContext } from "react";
import { serviceHelpers } from "../../../Helpers/ServiceHelpers";
import { FirmContext } from "../../Contexts/FirmContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currencyMultiple, INDIAN_CURRENCY, UPDATE_ON_PAYMENT } from "../../../Helpers/ConstantProperties";
import { DecodeServerError } from "../../../Helpers/helpers";
import { useSnackbar } from "../../Contexts/SnackbarProvider";
import { Button } from "@mui/material";

// currencyMultiple that is for as per documention of the razorpay we have to convert our inr to paisa form
// for that we have to multiply our 1 ruppes => 100 paise

export const PaymentButton = (
    {
        amount,
        name,
        description = "",
        ProfileImage,
        prefill,
        notes,
    }) => {
    const { khID } = useContext(FirmContext)
    const { showSnackbar } = useSnackbar();

    const initiatePayment = async () => {
        const amountInBaseForm = amount * currencyMultiple;
        const order = await serviceHelpers.createPaymentOrder(khID, {
            amount: amountInBaseForm,
            currency: INDIAN_CURRENCY,
        });

        return new Promise((resolve, reject) => {
            const options = {
                key: process.env.API_KEY_ID,
                amount: amountInBaseForm,
                currency: INDIAN_CURRENCY,
                name: name,
                description: description,
                image: ProfileImage,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verificationResult = await serviceHelpers.checkVerification(
                            khID,
                            { ...response, amount: amountInBaseForm, INDIAN_CURRENCY },
                            order.id
                        );
                        resolve(verificationResult);
                    } catch (error) {
                        reject(error);
                    }
                },
                prefill: prefill,
                notes: notes,
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        });
    };


    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: initiatePayment,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes(UPDATE_ON_PAYMENT),
            });
            showSnackbar(`${amount}/${INDIAN_CURRENCY} Has Been Paid SuccessFully With Payment ID ${data.id}`, 'success');
        },
        onError: (error) => {
            const message = DecodeServerError(error);
            showSnackbar(message, 'error');
        },
    });

    return (
        <>
            <Button
                variant="outlined"
                disabled={isPending}
                sx={{ width: '100%', whiteSpace: 'nowrap' }}
                onClick={() => mutate()}
            >
                Pay {amount}
            </Button>
        </>
    );

}