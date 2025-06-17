import React from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function StaticDropDown({ props, attributes, currentValue, getOptionLabel = (option) => option, isOptionEqualToValue = () => { } }) {

    const handleChange = (event, newValue) => {
        props.onChange({ name: props.data.item.name, value: newValue });
    };

    const extraProps = {}

    if (typeof currentValue === 'object') extraProps.isOptionEqualToValue = isOptionEqualToValue;

    return (
        <Grid2 spacing={1} container direction={'column'} p={1} {...attributes} width={'100%'}>
            <Grid2>
                <Typography className="fw-semibold">
                    {props.data.item.displayName} {props.data.item.required ? "*" : ''}
                </Typography>
            </Grid2>
            <Grid2 >
                <Autocomplete
                    size="small"
                    disabled={attributes?.disabled}
                    id={props.data.item.name}
                    onChange={handleChange}
                    options={props.data.item.dropDownList}
                    value={currentValue}
                    getOptionLabel={getOptionLabel}
                    {...extraProps}
                    renderInput={(params) => {
                        if (props.data.inputMode) {
                            params.inputProps.inputMode = props.data.inputMode
                        }//that is for disabling the keyboard
                        if (props.data.item.required) {
                            params.inputProps.required = true
                            params.inputProps.className += params.inputProps.className + " form-control"
                        }

                        const inputValue = typeof params.inputProps.value === 'string'
                            ? params.inputProps.value.trim()
                            : params.inputProps.value;

                        params.inputProps.value = inputValue !== "" ? inputValue : "";
                        return (<TextField  {...params} placeholder={props.data.item.displayName} />)
                    }}
                />
            </Grid2>
        </Grid2>
    );
}
