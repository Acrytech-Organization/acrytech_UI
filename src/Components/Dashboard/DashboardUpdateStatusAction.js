import { Button, Typography } from "@mui/material";
import {
    addDaysToToday,
    CATEGORIES,
    checkValue,
    DecodeServerError,
    getCommentForCustomer,
} from "../../Helpers/helpers";
import { CONVERTED, FIVE_DAYS, QUOTED, UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { useContext, useState } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { DateContext } from "../Contexts/DateContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserActionContext } from "./SummaryPage";
import { useSnackbar } from "../Contexts/SnackbarProvider";
import CreatePoDialogForm from "../Order/CreatePoDialogForm";
import GenericDialog from "../GenericComponents/Dialog/GenericDialog";
import { getRateDetails } from "../Quotation/RateCalculator";

function DashboardUpdateStatusAction({ item }) {
    const { currentFirm } = useContext(FirmContext);
    const { currentDate } = useContext(DateContext);
    const { showAssigned } = useContext(UserActionContext);
    const { showSnackbar } = useSnackbar();

    const [openDialog, setOpenDialog] = useState(false);
    const queryClient = useQueryClient();

    const statusCategory = CATEGORIES[item.status]

    const onUpdate = async (state) => {
        setOpenDialog(false);
        const update = {
            followUpDate: addDaysToToday(2, currentDate),
            status: statusCategory.nextStatus,
        };

        if (item.status === QUOTED) {
            update.poNumber = state.poNumber;
            update.poDate = state.poDate;
        }

        if (state?.poTotalAmount) {
            const cData = getRateDetails({
                inquiry: item,
                currentFirm: currentFirm
            })

            if (cData.roundedTotal !== parseFloat(state.poTotalAmount)) {
                return Promise.reject(
                    `Message: PO Amount should be ${cData.roundedTotal} but got ${state.poTotalAmount}`
                );
            }
        }

        if (update.status === CONVERTED && item.customerId) {
            await serviceHelpers.updateCustomer(
                currentFirm.khID,
                { followUpDate: addDaysToToday(FIVE_DAYS, currentDate) },
                item.customerId,
                getCommentForCustomer(item.customerId, FIVE_DAYS),
                currentDate
            );
        }

        const comment = `Status updated to ${CATEGORIES[statusCategory.nextStatus].name}`;

        const data = await serviceHelpers.updateLeadStatus(
            currentFirm.khID,
            update,
            item.id,
            comment,
            currentDate,
            item,
            currentFirm
        );
        return { id: data.id, comment };
    }

    const queryFunction = async () => {
        if (item.status === QUOTED) {
            setOpenDialog(true)
        } else {
            await onUpdate()
        }
    }

    const { mutate } = useMutation({
        mutationFn: queryFunction,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes(UPDATE_ON_INQUIRY),
            });
            if (data) showSnackbar(`${data?.comment}`, 'success');
        },

        onError: (error) => {
            const message = DecodeServerError(error);
            showSnackbar(message, 'error');
        },
    });

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    if (showAssigned) {
        const owner = item.assignee ? item.assignee.displayName : "Not Assigned yet";
        return (
            <Typography sx={{ textAlign: { xs: 'left', sm: 'center' }, whiteSpace: 'nowrap' }}>
                {owner}
            </Typography>
        )
    }

    const disabled = CATEGORIES[item.status]?.disableBtn
        ? CATEGORIES[item.status]?.disableBtn(item)
        : false;

    const dialogContent = (
        <CreatePoDialogForm
            data={item}
            callback={onUpdate}
            onClose={handleDialogClose}
        />
    );

    return (
        <>
            <Button
                variant="outlined"
                disabled={disabled}
                sx={{ width: '100%', whiteSpace: 'nowrap' }}
                onClick={() => mutate()}>
                {checkValue(statusCategory?.btnText)}
            </Button>

            <GenericDialog
                open={openDialog}
                setOpen={setOpenDialog}
                title="Enter PO Number"
                content={dialogContent}
            />
        </>
    )
}

export default DashboardUpdateStatusAction;
