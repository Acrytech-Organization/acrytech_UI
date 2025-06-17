import { TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { inValidatePattern } from "../../../Helpers/helpers";
import { useState } from "react";

export const TextInput = ({ props, controlProps }) => {
    const required = controlProps.required;
    const [error, setError] = useState(undefined)

    const handleChange = (event) => {
        var newValue = ""
        if (event.target.value.trim() !== "") {
            newValue = event.target.value
        }
        //trim() method will remove the extra space in the case of only white space 
        //it return the empty string for that we return the "" if the user time something instead of the 
        //whitespace we are returning the the character as it is 
        props.onChange({ name: props.data.item.name, value: newValue });

        setError(inValidatePattern(controlProps.pattern, props.data.item.helperText, newValue));

    };

    return (
        <Grid2 container spacing={1} direction={'column'} {...props.data.attributes} p={1} width={'100%'}>
            <Grid2>
                <Typography className="fw-semibold">
                    {props.data.item.displayName} {required ? "*" : ''}
                </Typography>
            </Grid2>
            <Grid2>
                <TextField
                    className="bg-light"
                    size="small"
                    fullWidth
                    {...props.data.extraProps}
                    disabled={props.data.item.disabled}
                    inputProps={{
                        inputMode: props.data.inputMode,
                        maxLength: 1000,
                        type: props.data.item.type,
                        className: "form-control " + props.data.inputFieldClass,
                        id: "floatingInput" + props.data.item.name,
                        pattern: controlProps.pattern,
                        ...controlProps,
                    }}
                    onChange={handleChange}
                    helperText={error}
                    //!! to convert undefined to valid boolean 
                    error={!!error && error !== ''}
                />
            </Grid2>
        </Grid2>
    );
};
