import React from 'react';
import { Typography } from '@mui/material';

const TextEllipsis = ({ text, variant = 'body2', color, component = 'div', sx, noWrap = true }) => (
    <Typography
        className='text-break'
        variant={variant}
        component={component}
        noWrap={noWrap}
        color={color}
        sx={sx}
    >
        {text}
    </Typography>
);

export default TextEllipsis;