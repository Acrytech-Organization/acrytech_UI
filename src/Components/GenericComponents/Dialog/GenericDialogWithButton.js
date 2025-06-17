import { Button } from "@mui/material";
import { createContext, useState } from "react";
import GenericDialog from "./GenericDialog";

export const DialogContext = createContext({});

export default function GenericDialogWithButton({
    maxWidth = "lg",
    buttonProps = {},
    buttonText,
    dialogTitle,
    dialogContents }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <DialogContext.Provider value={{ closeDialog: () => setDialogOpen(false) }}>
            <Button
                {...buttonProps}
                onClick={() => setDialogOpen(true)}>
                {buttonText}
            </Button>
            <GenericDialog
                maxWidth={maxWidth}
                open={dialogOpen}
                setOpen={setDialogOpen}
                title={dialogTitle}
                content={dialogContents} />
        </DialogContext.Provider>
    )
}