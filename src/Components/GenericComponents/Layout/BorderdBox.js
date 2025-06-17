import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';

const BorderdBox = ({ bodyText, xs, sm }) => {
    return (
        <Grid2
            xs={xs}
            sm={sm}
            sx={{
                height: '100px',
                border: '1px solid lightgrey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                textAlign: 'center',
            }}
        >
            <Typography>{bodyText}</Typography>
        </Grid2>
    );
};

export default BorderdBox;