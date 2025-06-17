import { useContext, useState } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { Box, Button, CircularProgress, Paper, TextField } from "@mui/material";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../Contexts/SnackbarProvider";
import { green } from "@mui/material/colors";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function WAMessageInput({ wa_id }) {
    const { khID } = useContext(FirmContext);
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();

    const [text, setText] = useState("");

    const sendMessage = async () => {
        if (text !== "")
            return await serviceHelpers.sendMessage(khID, wa_id, text);
    }

    const { mutate, isPending } = useMutation({
        mutationFn: sendMessage,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes(wa_id),
            })
            showSnackbar("Message Sent", 'success');
            setText("");
        },
        onError: (error) => {
            console.error(error);
            showSnackbar("Message Faied.", 'error');
        },
    })

    return (
        <Box sx={{
            p: 1,
        }}>
            <Paper sx={{
                p: { xs: 0, sm: 1 },
                height: "100%",
                overflowY: 'auto'
            }}>
                <Grid2 container spacing={1} sx={{ mt: 2 }}>
                    <Grid2 xs={9}>
                        <TextField
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            autoFocus={true}
                            fullWidth
                            placeholder="Type a message..." />
                    </Grid2>
                    <Grid2 xs={3} alignContent={"end"}>
                        <Button
                            disabled={isPending}
                            onClick={() => mutate()}
                            fullWidth
                            variant="contained">
                            {isPending
                                ? <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                /> : <></>} Send
                        </Button>
                    </Grid2>
                </Grid2>
            </Paper>
        </Box>
    )
}