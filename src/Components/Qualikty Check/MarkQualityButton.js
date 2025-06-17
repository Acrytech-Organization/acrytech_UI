import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MARK_QUALITY } from '../../Helpers/ConstantProperties';

const MarkQualityButton = ({ item }) => {
    const navigate = useNavigate();

    const onMenuClick = () => {
        navigate(MARK_QUALITY, {
            state: item
        });
    };

    return (
        <Button onClick={onMenuClick} variant='outlined'>
            Mark Quality
        </Button>
    );
};

export default MarkQualityButton;