import { GenericHandleSubmitButton } from "../FormComponent/GenericHandleSubmitButton"
import { GenericErrorComponent, GenericSuccessComponent } from "../FormComponent/GenericAlertComponent"
import { GenericVerifyComponent } from "../VerifyComponent/FirmVerifyComponent"
import { Button } from "@mui/material"
import { COLOR_RED } from "../../../Helpers/ConstantProperties"
import { DetailPaneContext } from "../../Inquiry/InquiryInformation"
import { useContext } from "react"

export const GenericActionControl = ({ buttonText, navigateOnCancel, inValidateQueryKey, onCancel, successMessage, queryFunction, disabled = false }) => {
    const enableContext = useContext(DetailPaneContext);
    if (enableContext?.disableAction) { return <></> }
    return (
        <div className="d-flex flex-row justify-content-center">
            <div>
                <GenericHandleSubmitButton
                    ErrorComponent={({ error }) => <GenericErrorComponent error={error} />}
                    SuccessComponent={({ data }) => <GenericSuccessComponent data={data} message={successMessage} />}
                    ButtonText={buttonText}
                    navigateTo={navigateOnCancel}
                    queryKeyValue={inValidateQueryKey}
                    enableVerify={true}
                    VerifyAlertContentComponent={GenericVerifyComponent}
                    queryFunction={queryFunction}
                    CutomButtonComponent={
                        ({ onClick }) => <Button
                            className="mt-1"
                            onClick={onClick}
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={disabled}>
                            {buttonText}
                        </Button>
                    }
                />
            </div>
            <div className="h-100">
                <Button sx={{ backgroundColor: COLOR_RED }} className='m-2'
                    variant="contained"
                    color="primary" onClick={() => onCancel()}  >
                    Cancel
                </Button>
            </div>
        </div>
    )
}