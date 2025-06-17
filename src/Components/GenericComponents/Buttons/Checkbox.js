import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function CheckboxComponent({ props, onChange, currentValue, attributes }) {

    return (
        <Grid2 spacing={1} container direction={'column'} p={1} {...attributes} width={'100%'} justifyContent={'center'}>
        <Grid2 xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!!currentValue}
                            onChange={onChange}
                            required={props.data.item.required}
                        />
                    }
                    label={props.data.item.displayName}
                />
        </Grid2>
      </Grid2>
    )}
