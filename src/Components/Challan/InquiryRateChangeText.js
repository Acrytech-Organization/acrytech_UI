import React, { useState } from 'react';
import { INPUT_TYPE_NUM, SchemaTypes } from '../../Helpers/ExtraProperties';
import { TextField } from '@mui/material';

const InquiryRateChangeText = ({ ProductBalance, onPlannChange, disableRate }) => {
    const [error, setError] = useState("");


    const handleChange = (event) => {
        const value = parseFloat(event.target.value || 0);
        ProductBalance.invoiceRate = value;

        if (ProductBalance.invoiceRate === 0) {
            setError("Value is not valid")
        }
        else {
            setError("");
            onPlannChange();
        }
    }

    return (
        <TextField
            className="bg-light"
            size="small"
            fullWidth
            disabled={disableRate}
            inputProps={{
                inputMode: INPUT_TYPE_NUM,
                maxLength: 1000,
                type: SchemaTypes.Number,
            }}

            defaultValue={ProductBalance.saleRate}
            onChange={handleChange}
            helperText={error}
            error={error !== ''}
        />
    )
};

export default InquiryRateChangeText;