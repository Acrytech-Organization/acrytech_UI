import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FirmContext } from "../../Contexts/FirmContext";
import { CommonAlert } from "./CommonAlert";
import { FormButton } from "./FormButton";
import GenericSpinner from "./GenericSpinner";
import { checkValidity } from "../../../Helpers/helpers";

export const HandleFormButton = (
    {
        handleCancel = () => { },
        navigateTo,
        enableVerify = false,
        querryFunction,
        queryKeyValue,
        addButtonText,
        ErrorComponent,
        SuccessComponent,
        navigateOnSuccess,
        buttonClasses = " mt-2 ms-auto btn btn-primary align-self-end float-end",
        VerifyAlertContentComponent,
        CutomButtonComponent = undefined,
        showAlertDialog,
        enableClear,
        handleClear,
        clearButtonText,
        id,
        state
    }
) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const [verify, setVerify] = useState(false)
    const { khID } = useContext(FirmContext);

    const { data, error, mutate, isPending } = useMutation(
        {
            mutationFn: () => querryFunction(khID),

            onSuccess: () => {
                queryClient.invalidateQueries({
                    predicate: (query) => query.queryKey.includes(queryKeyValue),
                })
            }
        }

    );


    const handleRedirect = () => {
        if (navigateTo) navigate(navigateTo)
        handleCancel()
    }
    // here we are getting the non-group  requiredElements from the container where id is not groupId
    const handleSubmit = () => {
        const form = document.getElementById(id);
        let isValid = checkValidity(form, 'input:not(#groupId input), textarea:not(#groupId textarea), select:not(#groupId select)')
        if (isValid) {
            if (!enableVerify) {
                mutate()
            } else {
                setVerify(true);
            }
        }
    }


    if (isPending) {
        return (
            <Dialog
                open={true}
                className="w-100"
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <GenericSpinner />
                </DialogContent>
            </Dialog>
        )
    }

    if (data) {
        if (navigateOnSuccess) {
            return <Navigate to={navigateOnSuccess} state={data} />;
        }

        return (
            <CommonAlert handleRedirect={handleRedirect} showAlertDialog={showAlertDialog} severity="success">
                <SuccessComponent data={data} />
            </CommonAlert>
        )
    }

    if (verify) {
        return (
            <Dialog
                open={true}
                aria-labelledby="responsive-dialog-title"
            >
                <VerifyAlertContentComponent data={state} />
                <DialogActions>
                    <Button onClick={() => {
                        mutate()
                        setVerify(false)
                    }} autoFocus>
                        Yes
                    </Button>
                    <Button onClick={() => setVerify(false)}>No</Button>
                </DialogActions>
            </Dialog>
            //that function take the two parameter
            //1 onVerify which is call when we click on the yes option
            //2 onCancel which is call when we click on the no option
        )
    }

    return (
        <div className="d-flex justify-content-center gap-3 w-100 mt-1 mb-1">
            <FormButton
                CustomeButton={CutomButtonComponent}
                handleSubmit={handleSubmit}
                buttonClasses={buttonClasses}
                isPending={isPending}
                addButtonText={addButtonText}
                ErrorComponent={ErrorComponent}
                error={error}
                showAlertDialog={showAlertDialog}
            />
            {enableClear && <Button variant="contained" color="error" onClick={handleClear} className="capitalized">{clearButtonText}</Button>}
        </div>
    )
}