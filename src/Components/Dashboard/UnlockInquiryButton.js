import { Button } from "@mui/material";
import { DecodeServerError, checkAdmin } from "../../Helpers/helpers";
import { UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { DateContext } from "../Contexts/DateContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../Contexts/SnackbarProvider";

function UnlockInquiryButton({ item }) {
    const { currentFirm } = useContext(FirmContext);
    const { currentDate } = useContext(DateContext);
    const { showSnackbar } = useSnackbar();

    const queryFunction = async () => {
        const update = {
            followUpDate: currentDate,
        };

        const comment = `Follow-up date updated for inquiry ${item.id}`;

        const data = await serviceHelpers.updateLeadStatus(
            currentFirm.khID,
            update,
            item.id,
            comment,
            currentDate
        );
        return { id: data.id, comment };
    };

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: queryFunction,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes(UPDATE_ON_INQUIRY),
            });
            showSnackbar(`${data.comment}`, 'success');
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
                disabled={!checkAdmin}
                sx={{ width: '100%', whiteSpace: 'nowrap' }}
                onClick={() => mutate()}
            >
                Unlock Inquiry
            </Button>
        </>
    );
}

export default UnlockInquiryButton;
