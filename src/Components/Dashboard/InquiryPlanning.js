import React from 'react';
import { PLAN_DETAILS } from '../../Helpers/ConstantProperties';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const InquiryPlanning = ({ inquiry }) => {
    const navigate = useNavigate();

    const handleOutwordChallan = () => {
        navigate(PLAN_DETAILS, { state: { inquiry: inquiry, } })
    }

    return (
        <Button
            variant="outlined"
            fullWidth
            onClick={() => handleOutwordChallan()}>
            {"Plan Details"}
        </Button>
    )
};

export default InquiryPlanning;