import React from 'react';
import { CREATE_IN_SF_CHALLAN } from '../../../Helpers/ConstantProperties';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const GenerateInwordChallan = ({ item, balanceDetails }) => {
    const navigate = useNavigate();

    const handleOutwordChallan = () => {
        navigate(CREATE_IN_SF_CHALLAN, {
            state: {
                inquiry: item,
                balanceDetails: balanceDetails
            }
        })
    }

    const totalReady = balanceDetails.reduce((total, product) => total + product.atVendor, 0);

    return (
        <Button
            disabled={totalReady === 0}
            variant="outlined"
            fullWidth
            onClick={() => handleOutwordChallan()}>
            In From Vendor
        </Button>
    )
};

export default GenerateInwordChallan;