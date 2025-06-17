import { Button, Typography } from "@mui/material"
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useContext } from "react";
import { DocumentContext } from "../Layout/DocumentFormat";
import { openGmail } from "../../../Helpers/helpers";
import { smallFontSize } from "../../../Helpers/ConstantProperties";

const GenericEmailButton = () => {
    const { context } = useContext(DocumentContext);

    const handleSendMail = () => {
        const email = context.inquiry?.contactEmail;
        openGmail(email, "", "")
    };

    return (
        <Button
            color="warning"
            variant="contained"
            size="small"
            onClick={handleSendMail}
            startIcon={<SendRoundedIcon fontSize="small" />}
            aria-label="Send email"
        >
            <Typography fontSize={smallFontSize} variant='subtitle2'>
                Send Mail
            </Typography>
        </Button>
    )
}

export default GenericEmailButton;