import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DecodeServerError } from "../../Helpers/helpers";
import { CUSTOMER_STATUS, UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DashBoardInquiryDetail } from "../Dashboard/DashboardMenuOptions/DashBoardInquiryDetail";
import { FirmContext } from "../Contexts/FirmContext";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { DateContext } from "../Contexts/DateContext";
import { InquiryUpdateBody } from "./InquiryUpdateBody";
import { useSnackbar } from "../Contexts/SnackbarProvider";

function InquiryUpdate({
    OptionalLabel,
    successMessage,
    item,
    formName = undefined,
    dropDownList,
    mutationFunction,
    currentDropDownValue = undefined,
    selectedDate = undefined,
    setSelectedDate = undefined,
    handleClose,
    DashBoardInquiryHeader = DashBoardInquiryDetail
}) {
    const { khID } = useContext(FirmContext);
    const [reqStatus, setReqStatus] = useState(undefined)
    const [state, setReason] = useState(currentDropDownValue ? currentDropDownValue : null);
    const { currentDate } = useContext(DateContext);
    const { showSnackbar } = useSnackbar()


    const queryFunction = async () => {
        let update = mutationFunction(state)
        return await serviceHelpers.updateLeadStatus(
            khID,
            update,
            item.id,
            state.message,
            currentDate,
            item
        );
    }

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: queryFunction,

        onSuccess: (data) => {
            setReqStatus({
                severity: "success",
                message: successMessage(data)
            })
            showSnackbar(successMessage(data), "success");
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes(UPDATE_ON_INQUIRY) || query.queryHash.includes(CUSTOMER_STATUS),
            });
            handleClose()
        },

        onError: (error) => {
            setReqStatus({
                severity: "error",
                message: DecodeServerError(error),
            })
            showSnackbar(DecodeServerError(error), "error");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            mutate();
        } else {
            form.classList.add("was-validated");
        }
    }


    const defaultDashBoardParameter = {
        setComment: setReason,
        comment: state,
        dropDownList: dropDownList,
        getOptionLabel: OptionalLabel,
        currentValue: state
    }


    if (formName) {
        defaultDashBoardParameter.formName = formName
    }

    if (setSelectedDate) {
        defaultDashBoardParameter.setSelectedDate = setSelectedDate;
        defaultDashBoardParameter.selectedDate = selectedDate;
    }

    return (
        <Grid2 container spacing={1} padding={1}>
            <DashBoardInquiryHeader item={item} />
            <InquiryUpdateBody
                defaultDashBoardParameter={defaultDashBoardParameter}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                reqStatus={reqStatus}
            />
        </Grid2>
    );
}

export default InquiryUpdate;