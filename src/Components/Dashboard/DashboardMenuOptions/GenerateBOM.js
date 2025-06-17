import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { GENERATE_BOM, GENERATEBOM } from '../../../Helpers/ConstantProperties';

const GenerateBOM = ({ item }) => {

    const navigate = useNavigate();

    const handleGenerateQuotation = () => {
        navigate(GENERATE_BOM, {
            state: { item: { ...item, source: GENERATEBOM } }
        })

    }

    return (
        <MenuItem onClick={handleGenerateQuotation} >View BOM</MenuItem>
    );
};

export default GenerateBOM;