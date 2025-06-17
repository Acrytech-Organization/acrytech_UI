import React from 'react';
import { MenuItem } from '@mui/material';

const EditMenuItem = ({ known, onEdit }) => {
    return (
        <MenuItem key={"edit"} disabled={known || onEdit === null} onClick={onEdit}>Edit</MenuItem>
    );
};

export default EditMenuItem;