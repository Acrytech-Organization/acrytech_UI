import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_OUT_INVOICE, INW_STK_PREFIX } from '../../../Helpers/ConstantProperties';
import { Button } from '@mui/material';

const GenerateOutInvoice = ({ item, balanceDetails }) => {
    const navigate = useNavigate();

    const handleOutwordChallan = () => {
        navigate(CREATE_OUT_INVOICE, {
            state: {
                inquiry: item,
                balanceDetails: balanceDetails
            }
        })
    }

    const totalReady = balanceDetails.reduce((total, product) => total + product.inStore, 0);
    const isInternal = item.id.startsWith(INW_STK_PREFIX);

    return (
        <Button
            disabled={isInternal || (totalReady === 0)}
            variant="outlined"
            fullWidth
            onClick={() => handleOutwordChallan()}>
            Generate Invoice
        </Button>
    )
};

export default GenerateOutInvoice;