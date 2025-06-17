import React from 'react';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { VIEWPRODUCTION } from '../../../Helpers/ConstantProperties';

const ViewProduction = ({ item, processes }) => {

    const navigate = useNavigate();

    const onMenuClick = () => {
        navigate(VIEWPRODUCTION, { state: { item, processes } });
    };

    return (
        <MenuItem onClick={onMenuClick}>
            View Production
        </MenuItem>
    );
};

export default ViewProduction;
