import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import DialogHeader from "../../GenericComponents/Layout/DialogHeader"

const GenericDialog = ({ content, open, setOpen, title, maxWidth="md" }) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth>
            <DialogHeader title={title} handleCancel={handleClose} />
            <DialogContent sx={{ padding: { xs: 1, md: 2 } }} dividers>
                {content}
            </DialogContent>
        </Dialog>
    );
};

export default GenericDialog;