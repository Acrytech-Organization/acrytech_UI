import { Button } from "@mui/material"
import { CommonAlert } from "./CommonAlert"

export const FormButton = ({
    CustomeButton,
    handleSubmit,
    buttonClasses,
    isPending,
    addButtonText,
    ErrorComponent,
    error,
    handleRedirect,
    showAlertDialog
}) => {
    const btn = CustomeButton ? <CustomeButton onClick={handleSubmit} /> : (
        <Button
            onClick={handleSubmit}
            type="submit"
            className={buttonClasses}
            variant="contained"
            color="primary"
            disabled={isPending}>
            {addButtonText}
        </Button>)

return <>
{btn}
{
    error && error !== ""
    &&
    <>
            <CommonAlert handleRedirect={handleRedirect} showAlertDialog={showAlertDialog} severity="error">
                <ErrorComponent error={error} />
            </CommonAlert>
    </>
}
</>
}
