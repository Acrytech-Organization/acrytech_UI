import React from 'react';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MARK_QUALITY } from '../../Helpers/ConstantProperties';

const MarkQualityMenu = ({ item }) => {
    const navigate = useNavigate();

    const onMenuClick = () => {
        navigate(MARK_QUALITY, {
            state: item
        });
    };

    return (
        <MenuItem onClick={onMenuClick}>
            Mark Quality
        </MenuItem>
    );
};

export default MarkQualityMenu;