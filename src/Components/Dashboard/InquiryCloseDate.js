import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { getLocalDateString } from '../../Helpers/helpers';
import { NOT_AVAILABLE } from '../../Helpers/ConstantProperties';

const InquiryCloseDate = ({ closeDate }) => {
    const today = dayjs();
    const validity = dayjs(closeDate);

    const diff = today.diff(validity, 'day');

    let color = "success";

    if (diff === 0) color = "warning";
    if (!closeDate || diff > 0) color = "error";

    return (
        <Typography
            variant="body2"
            textAlign={"center"}
        >
            <FactCheckIcon color={color} sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            {closeDate ? getLocalDateString(closeDate) : NOT_AVAILABLE}
        </Typography>
    )
};

export default InquiryCloseDate;