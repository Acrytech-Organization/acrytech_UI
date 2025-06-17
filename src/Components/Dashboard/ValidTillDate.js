import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { getLocalDateString } from '../../Helpers/helpers';

const ValidTillDate = ({ validTillDate }) => {
    const today = dayjs();
    const validity = dayjs(validTillDate);

    const diff = today.diff(validity, 'day');

    let color = "success";

    if (diff === 0) color = "warning";
    if (diff > 0) color = "error";

    return (
        <Typography
            variant="body2"
            textAlign={"center"}
        >
            <FactCheckIcon color={color} sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            {getLocalDateString(validTillDate)}
        </Typography>
    )
};

export default ValidTillDate;