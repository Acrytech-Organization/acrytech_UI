import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { MuiTelInput } from 'mui-tel-input';
import { useRef, useState } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";

export const PhoneNumberInput = ({ props, controlProps }) => {
    const required = controlProps.required;
    const [error, setError] = useState(undefined)
    const inputRef = useRef()

    const handleChange = (newValue, info) => {
        props.onChange({ name: props.data.item.name, value: newValue });

        if (required) {
            let value = isValidPhoneNumber(newValue, info.countryCode) ? "" : props.data.item.helperText;
            setError(value);
            const requiredElement = inputRef.current.querySelector('input');
            if (value === "") {
                requiredElement.classList.remove("is-invalid");
            } else {
                requiredElement.classList.add("is-invalid");
            }
        }
    }

    return (
        <Grid2 container spacing={1} direction={'column'} {...props.data.attributes} p={1} width={'100%'}>
            <Grid2>
                <Typography className="fw-semibold">
                    {props.data.item.displayName} {required ? "*" : ''}
                </Typography>
            </Grid2>
            <Grid2 >
                <MuiTelInput
                    size="small"
                    ref={inputRef}
                    fullWidth
                    value={props.currentValue}
                    onChange={handleChange}
                    defaultCountry="IN"
                    inputProps={{
                        inputMode: props.data.inputMode,
                        className: "form-control " + props.data.inputFieldClass,
                        id: "floatingInput" + props.data.item.name,
                        name: props.data.item.name,
                        required: controlProps.required,
                    }}
                    helperText={error}
                    error={!!error && error !== ''}
                />
            </Grid2>
        </Grid2>
    );
};