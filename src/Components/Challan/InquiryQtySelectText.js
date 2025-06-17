import React, { useState } from 'react';
import { INPUT_TYPE_NUM, SchemaTypes } from '../../Helpers/ExtraProperties';
import { TextField } from '@mui/material';

const InquiryQtySelectText = ({ ProductBalance, maxPossible, onPlannChange }) => {
    const [error, setError] = useState("");


    const handleChange = (event) => {
        const value = parseFloat(event.target.value || 0);
        ProductBalance.planned = value;
        ProductBalance.dirty = true;

        if (ProductBalance.planned > maxPossible) {
            setError("Value is more than possible")
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
            inputProps={{
                inputMode: INPUT_TYPE_NUM,
                maxLength: 1000,
                type: SchemaTypes.Number,
            }}

            defaultValue={ProductBalance.inStore}
            onChange={handleChange}
            helperText={error}
            error={error !== ''}
        />
    )
};

export default InquiryQtySelectText;