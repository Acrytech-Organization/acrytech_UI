import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState, useEffect } from "react";
import { useSnackbar } from "../../Contexts/SnackbarProvider";

export const CommonAlert = ({ handleRedirect, children, showAlertDialog = true, showSnackbarAlert = true, severity }) => {
    const [open, setOpen] = useState(true);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (showSnackbarAlert) {
            showSnackbar(children, severity);
            if (handleRedirect) {
                handleRedirect();
            }
            setOpen(false);
        }
    }, [showSnackbarAlert, children, handleRedirect, showSnackbar, severity]);

    if (!showAlertDialog) return <>{children}</>;

    if (showAlertDialog) {
        return (
            <Dialog
                open={open}
                className="w-100"
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    {children}
                    <DialogActions>
                        <Button onClick={() => {
                            setOpen(false);
                            if (handleRedirect) {
                                handleRedirect();
                            }
                        }} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        );
    }
    return null;
};