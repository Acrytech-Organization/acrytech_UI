import { Box } from "@mui/material";
import WhatsAppMessageTab from "./WhatsAppMessageTab";

export default function InquiryMessageTab({ item }) {
    return (
        <Box height={"70vh"}>
            <WhatsAppMessageTab wa_id={item.wa_id} />
        </Box>
    )
}