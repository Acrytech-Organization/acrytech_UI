import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import WAIDList from "./WAIDList";
import WhatsAppMessageTab from "./WhatsAppMessageTab";

export default function AllWAChat() {
    const [selectedWAID, setWAID] = useState(null);

    return (
        <Box className="border border-danger p-2" height={"90vh"}>
            <Grid2 container className="h-100">
                <Grid2 xs={3} className="overflow-auto h-100">
                    <WAIDList onWAIDSelect={setWAID} selectedWAID={selectedWAID} />
                </Grid2>
                <Grid2 xs={9} className="h-100">
                    <WhatsAppMessageTab wa_id={selectedWAID} />
                </Grid2>
            </Grid2>
        </Box>
    )
}