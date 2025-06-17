import { Button } from '@mui/material';
import React from 'react';
import { extraSmallFontSize, MAKE_PAYMENT } from '../../Helpers/ConstantProperties';
import { useNavigate } from 'react-router-dom';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const RechargeButton = () => {
    const navigater = useNavigate()

    const onClick = () => {
        navigater(MAKE_PAYMENT)
    };

    return (
        <Button
            startIcon={<AutorenewIcon />}
            variant="Text"
            className="text-center w-100"
            onClick={onClick}
            sx={{ fontSize: extraSmallFontSize }}
        >
            Recharge
        </Button>
    );
};

export default RechargeButton;