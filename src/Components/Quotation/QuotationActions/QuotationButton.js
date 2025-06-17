import React from 'react';
import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

const QuotationButton = ({ color, text, onClick, icon, iconSize = 'small' }) => {
    return (
        <Grid2>
            <Button
                color={color}
                size='small'
                variant="contained"
                onClick={onClick}
                sx={{
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                {icon && <span style={{ fontSize: iconSize }}>{icon}</span>}
                <Typography fontSize={iconSize} variant='subtitle2'>{text}</Typography>
            </Button>
        </Grid2>
    );
};

export default QuotationButton;