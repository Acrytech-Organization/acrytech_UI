import { Typography } from "@mui/material";
import { DecodeServerError } from "../../Helpers/helpers";
import { commonFontSize } from "../../Helpers/ConstantProperties";

export const FirmFormErrorComponent = ({ error }) => {
    let errMessage = DecodeServerError(error);
    return (
        <Typography fontSize={commonFontSize}>{errMessage}</Typography>
    )
}