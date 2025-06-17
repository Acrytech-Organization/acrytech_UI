import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import { extraSmallFontSize, NOTIFICATION_PAGE } from '../../Helpers/ConstantProperties';

const AppNotification = ({ onClose }) => {
    const navigate = useNavigate();

    const handleNotificationClick = () => {
        onClose();
        navigate(NOTIFICATION_PAGE);
    };

    return (
        <Button
            onClick={handleNotificationClick}
            variant="text"
            fullWidth
            disableElevation
            startIcon={<HistoryRoundedIcon />}
            sx={{ fontSize: extraSmallFontSize }}
        >
            History
        </Button>
    );
};

export default AppNotification;
