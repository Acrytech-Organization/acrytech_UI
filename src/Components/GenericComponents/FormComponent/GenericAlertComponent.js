import { Alert, Typography } from "@mui/material"
import { DecodeServerError } from "../../../Helpers/helpers"
import { commonFontSize } from "../../../Helpers/ConstantProperties"
import { useSnackbar } from "../../Contexts/SnackbarProvider";

export const GenericErrorComponent = ({ error }) => {
    const { showSnackbar } = useSnackbar();
    let errMessage = DecodeServerError(error)
    return (!showSnackbar
        ? <Typography className="p-1 m-2 rounded" fontSize={commonFontSize}>{errMessage}</Typography>
        : <Alert severity="error" className="p-1 m-2 rounded" fontSize={commonFontSize}>{errMessage}</Alert>
    )
}

export const GenericSuccessComponent = ({ data, message }) => {
    const { showSnackbar } = useSnackbar();
    let SuccessMsg = ` ${message}  with id ${data.id}`
    return (showSnackbar
        ? <Typography fontSize={commonFontSize}>{SuccessMsg}</Typography>
        : <Alert severity="success" fontSize={commonFontSize}>{SuccessMsg}</Alert>
)
}