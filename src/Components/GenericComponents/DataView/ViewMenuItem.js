import React from 'react';
import { MenuItem } from '@mui/material';

const ViewMenuItem = ({ onView }) => {
    return (
        <MenuItem disabled={onView === null} onClick={onView}>View</MenuItem>
    );
};

export default ViewMenuItem;