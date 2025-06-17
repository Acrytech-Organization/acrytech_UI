import { Typography } from "@mui/material";
import { commonFontSize } from "../../Helpers/ConstantProperties";

export const FirmFormSuccessComponent = ({ data }) => {
    let alertMessage = `Firm is Created With FirmId ${data.id}`;
    return (
        <Typography fontSize={commonFontSize}>{alertMessage}</Typography>
    )
}