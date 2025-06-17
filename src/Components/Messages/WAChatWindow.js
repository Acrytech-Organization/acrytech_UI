import { Box, Paper } from "@mui/material";
import { DELIVERED, FAILED, READ, SENT } from "../../Helpers/ConstantProperties";
import WhatsAppMessage from "./WhatsAppMessage";

export default function WAChatWindow({ data }) {
    const isIncoming = (message) => message.from !== undefined;

    const getStatus = (message) => {
        if (isIncoming(message)) return READ;

        if (message.failed) return FAILED;
        if (message.read) return READ;
        if (message.delivered) return DELIVERED;
        if (message.sent) return SENT;
    }

    return (
        <Box sx={{
            p: { xs: 0, sm: 1 },
            height: "100%",
            maxWidth: { sm: "90%", md: "500px" },
        }}>
            <Paper sx={{
                p: { xs: 0, sm: 2 },
                height: "100%",
                overflowY: 'auto'
            }}>
                {
                    data.map((message, index) => (
                        <Box key={index} sx={{
                            display: "flex",
                            p: 1,
                            justifyContent: isIncoming(message) ? "flex-start" : "flex-end"
                        }}>
                            <Paper elevation={3} sx={{
                                width: "70%",
                                p: 1
                            }}>
                                <WhatsAppMessage
                                    message={message}
                                    status={getStatus(message)} />
                            </Paper>
                        </Box>
                    ))
                }
            </Paper>
        </Box>
    )
}