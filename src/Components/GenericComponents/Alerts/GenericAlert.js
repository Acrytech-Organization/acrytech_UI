import { Alert } from "@mui/material"

export const GenericAlert = ({ errMessage, severity = "error" }) => {
    return (
        <Alert severity={severity}>{errMessage}</Alert>
    )
}

