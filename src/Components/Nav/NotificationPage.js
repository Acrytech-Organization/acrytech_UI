import React, { useContext } from 'react';
import { AuthContext } from '../Auth/Auth';
import { Typography, Paper } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { addDaysToToday } from '../../Helpers/helpers';
import { commonFontWeight, largeFontSize, commonFontSize } from '../../Helpers/ConstantProperties';
import { useSnackbar } from '../Contexts/SnackbarProvider';

const NotificationPage = () => {
    const { currentUserObject } = useContext(AuthContext);
    const { alertHistory } = useSnackbar();
    const currentDate = addDaysToToday(0).toISOString().split('T')[0];

    return (
        <Grid2 container spacing={2} sx={{ padding: 3 }}>
            <Grid2 xs={12}>
                <Typography fontSize={largeFontSize} fontWeight={commonFontWeight}>
                    History
                </Typography>
            </Grid2>
            <Grid2 xs={12}>
                {alertHistory.length === 0 ? (
                    <Paper elevation={1} sx={{ padding: 2 }}>
                        <Typography fontSize={commonFontSize}>No History yet.</Typography>
                    </Paper>
                ) : (
                    alertHistory.map((alert, index) => (
                        <Grid2 xs={12} sm={6} md={4} lg={3} key={alert.id} sx={{ marginBottom: 1 }}>
                            <Paper
                                elevation={1}
                                sx={{
                                    padding: 2,
                                    borderLeft: `13px solid ${alert.severity === 'error' ? 'red' :
                                        alert.severity === 'warning' ? 'orange' : 'green'
                                    }`,
                                }}
                            >
                                <Typography fontSize={commonFontSize}>
                                    <strong>{currentUserObject.displayName}</strong> - {currentDate}
                                </Typography>
                                <Typography fontSize={commonFontSize}>
                                    {alert.message}
                                </Typography>
                            </Paper>
                        </Grid2>
                    )).reverse()
                )}
            </Grid2>
        </Grid2>
    );
};

export default NotificationPage;
