import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import GenericDatePicker from '../Date/GenericDatePicker';
import dayjs from 'dayjs';

const CustomDatePicker = ({ props, controlProps }) => {
    const onChange = (value) => props.onChange({
        name: props.data.item.name, value: value
    });

    return (
        <Grid2 container display={"block"} p={1}>
            <Grid2 xs={12}>
                <Typography className="fw-semibold">
                    {props.data.item.displayName} {controlProps?.required ? "*" : ''}
                </Typography>
            </Grid2>
            <Grid2 xs={12}>
                <GenericDatePicker
                    extraProp={{ ...props.data.extraProps }}
                    value={dayjs(props.currentValue)}
                    setValue={onChange}
                />
            </Grid2>
        </Grid2>
    )
};

export default CustomDatePicker;