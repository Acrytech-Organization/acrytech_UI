import { Alert } from "@mui/material";

function FailedAlert({ message }) {
    return (
        <Alert severity="error">{message}</Alert>
    )
}

export default FailedAlert;