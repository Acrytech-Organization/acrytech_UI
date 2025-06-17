import React from 'react';
import { CREATE_OUT_SF_CHALLAN } from '../../../Helpers/ConstantProperties';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const GenerateOutChallan = ({ item, balanceDetails }) => {
    const navigate = useNavigate();

    const handleOutwordChallan = () => {
        navigate(CREATE_OUT_SF_CHALLAN, {
            state: {
                inquiry: item,
                balanceDetails: balanceDetails
            }
        })
    }

    const totalReady = balanceDetails.reduce(
        (total, product) => total + product.remainingProduction, 0);

    const someHasRM = balanceDetails.some(
        (product) => product.remainingProduction > 0 && product.hasRM);

    return (
        <Button
            disabled={totalReady === 0 || !someHasRM}
            variant="outlined"
            fullWidth
            onClick={() => handleOutwordChallan()}>
            Send To Vendor
        </Button>
    )
};

export default GenerateOutChallan;