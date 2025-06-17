import React from 'react';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EDITPRODUCTION } from '../../../Helpers/ConstantProperties';

const EditProduction = ({ item }) => {
    const navigate = useNavigate();

    const onMenuClick = () => {
        navigate(EDITPRODUCTION, { state: item });
    };

    return (
        <MenuItem disabled onClick={onMenuClick}>
            Edit Production
        </MenuItem>
    );
};

export default EditProduction;
