import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { GENERATE_QUOTATION, GENERATEQUOTATION } from '../../../Helpers/ConstantProperties';

const GenerateQuotation = ({ item }) => {
    const navigate = useNavigate();

    const handleGenerateQuotation = () => {
        navigate(GENERATE_QUOTATION, {
            state: { item: { ...item, source: GENERATEQUOTATION } }
        })

    }

    return (
        <MenuItem onClick={handleGenerateQuotation}>View Quotation</MenuItem>
    );
};

export default GenerateQuotation;