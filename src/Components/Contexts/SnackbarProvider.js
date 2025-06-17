import React, { createContext, useState, useContext, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { saveHistory } from '../../Helpers/helpers';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [alertHistory, setAlertHistory] = useState([]);

    const showSnackbar = useCallback((message, severity = 'success') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setOpenAlert(true);
        setAlertHistory(prevHistory => saveHistory(prevHistory, message, severity));
    }, []);

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar, alertHistory }}>
            {children}
            <Snackbar
                open={openAlert}
                autoHideDuration={5000}
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
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => useContext(SnackbarContext);
