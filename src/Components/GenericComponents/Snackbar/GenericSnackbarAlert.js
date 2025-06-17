import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const GenericSnackbarAlert = ({ openAlert, handleAlertClose, alertMessage, alertSeverity }) => {
    return (
        <Snackbar
            open={openAlert}
            autoHideDuration={3000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                onClose={handleAlertClose}
                variant='filled'
                severity={alertSeverity}
                sx={{
                    width: '100%',
                    height: '3.125rem',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.625rem',
                    margin: '0.625rem',
                }}
            >
                {alertMessage}
            </Alert>
        </Snackbar>
    );
};

export default GenericSnackbarAlert;
