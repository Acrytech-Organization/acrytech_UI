import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PLAN_DETAILS } from '../../Helpers/ConstantProperties';
import { Button } from '@mui/material';

const InquiryDispatchCard = ({ balanceDetails, inquiry }) => {
    const navigate = useNavigate();

    const handleOutwordChallan = () => {
        navigate(PLAN_DETAILS, { state: { inquiry: inquiry, dispatch: true } })
    }

    return (
        <Button
            variant="outlined"
            fullWidth
            onClick={() => handleOutwordChallan()}>
            {"Dispatch Details"}
        </Button>
    )
};

export default InquiryDispatchCard;