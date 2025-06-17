import React from 'react';
import { ADDLABOURHR } from '../../../Helpers/ConstantProperties';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';

const AddLabourCost = ({ item }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(ADDLABOURHR, { state: { item } });
    };

    return (
        <MenuItem onClick={handleClick} >Add Labour</MenuItem>
    );
};

export default AddLabourCost;