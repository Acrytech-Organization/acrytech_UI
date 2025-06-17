import { Alert } from "@mui/material";
import WAMessageWindow from "./WAMessageWindow";

export default function WhatsAppMessageTab({ wa_id }) {
    if (!wa_id) return (
        <Alert severity="warning" className="m-3">
            This inquiry is not WhatsApp enabled or WhatsApp intigration is not available for this business. Please contact admin for more details.
        </Alert>
    );

    return <WAMessageWindow wa_id={wa_id} />
}