import { Button, Dialog, DialogActions } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { DecodeServerError } from '../../../Helpers/helpers';
import { useSnackbar } from '../../Contexts/SnackbarProvider';
import { GenericVerifyComponent } from '../VerifyComponent/FirmVerifyComponent';

const GenericMutateButton = ({
    disable,
    queryFn,
    onSuccess,
    successMessage,
    buttonText = "Save"
}) => {

    const { showSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const { mutate, isPending } = useMutation({
        mutationFn: queryFn,

        onSuccess: async (data) => {
            await onSuccess(data);
            showSnackbar(successMessage, 'success');
            setOpen(false);
        },

        onError: (error) => {
            const message = DecodeServerError(error);
            showSnackbar(message, 'error');
            setOpen(false);
        },
    })

    const disabled = disable || isPending;

    return (
        <>
            <Button
                disabled={disabled}
                variant="outlined"
                onClick={() => setOpen(true)}>
                {buttonText}
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title">

                <GenericVerifyComponent />
                <DialogActions>
                    <Button onClick={() => {
                        mutate()
                    }} autoFocus>
                        Yes
                    </Button>
                    <Button onClick={() => { }}>No</Button>
                </DialogActions>
            </Dialog>
        </>

    )
};

export default GenericMutateButton;