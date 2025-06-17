import { Button, Typography } from "@mui/material";
import { DISPATCH, INQUIRY_STORE_ACCOUNT_ID, NEW_QUALITY_CHECK, PASS, QC_STORE_ACCOUNT_ID, STORE_VOUCHER, UPDATE_ON_INQUIRY, UPDATE_ON_VOUCHER } from "../../Helpers/ConstantProperties";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FirmContext } from "../Contexts/FirmContext";
import { useContext } from "react";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { GenericSuccessComponent, GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { useSnackbar } from "../Contexts/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import { createServerErrorMsg } from "../../Helpers/helpers";

export const QualityCheckActions = ({ item, text = 'save', variant = "text", qualityCheck, saveCheckboxValues, mark, index, cancelText, onCancel, passDisabled, handleOnSuccess = () => { }, inquiry }) => {
    const queryClient = useQueryClient();
    const { khID } = useContext(FirmContext);
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const invalidateQueries = (key) => {
        queryClient.invalidateQueries({
            predicate: (query) => query.queryKey.includes(key),
        });
    };


    const queryFunction = async () => {
        const updatedInquiry = saveCheckboxValues(inquiry);
        var note = `${item.products[index].product.name} is Marked As ${qualityCheck}`;
        var message = mark ? (note = note + " for reason " + mark) : note;
        item.products[index].qualityCheck = qualityCheck;
        let passedProduct = [];
        const updatedprop = {}
        if (qualityCheck !== PASS) {
            updatedInquiry.products[index].qualityCheck = qualityCheck;
            updatedprop.products = updatedInquiry.products
            message = createServerErrorMsg(`Product Get failed At Quality Check Due To ${qualityCheck}`)
        }
        if (item.products[index].qualityCheck === PASS) {
            message = `${message} State updated to ${DISPATCH}`
            await serviceHelpers.createChallan(
                khID, undefined, STORE_VOUCHER, [item.products[index]],
                QC_STORE_ACCOUNT_ID,
                INQUIRY_STORE_ACCOUNT_ID,
                undefined,
                { inquiryId: item.id }
            );
            invalidateQueries(UPDATE_ON_VOUCHER);
            showSnackbar(<GenericSuccessComponent data={{ id: item.id }} message={note} />, 'success');
            item.products.forEach(product => {
                if (product.qualityCheck === PASS) passedProduct.push(product);
            });
            if (passedProduct.length === item.products.length) navigate(NEW_QUALITY_CHECK);
        }
        else if (mark) {
            showSnackbar(<GenericErrorComponent error={message} />, "error");
        }


        return await serviceHelpers.updateLeadStatus(khID, updatedprop, item.id, message);
    };

    const { mutate, isPending, isSuccess, message } = useMutation({
        mutationFn: queryFunction,
        onSuccess: () => {
            invalidateQueries(UPDATE_ON_INQUIRY);
            handleOnSuccess();
        },
        onError: () => {
                        showSnackbar(<GenericErrorComponent error={message} />, "error");
        }
    })


    if (item.products[index].qualityCheck === PASS) {
        return <Typography color="success" variant="p">{item.products[index].qualityCheck}</Typography>
    }

    return (
        <>
            <Grid2 container spacing={1} justifyContent={'center'}>
                <Grid2>
                    <Button variant={variant} disabled={isPending || passDisabled || isSuccess} onClick={() => mutate()} color="success">
                        {text}
                    </Button>
                </Grid2>
                {onCancel && (
                    <Grid2>
                        <Button variant={variant} onClick={onCancel} color="error">
                            {cancelText}
                        </Button>
                    </Grid2>
                )}
            </Grid2>
        </>
    );
};