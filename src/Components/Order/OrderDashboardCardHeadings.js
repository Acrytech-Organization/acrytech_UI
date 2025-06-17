import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { orderDetails } from '../../Helpers/helpers';
import { commonFontSize, commonFontWeight } from '../../Helpers/ConstantProperties';

const OrderDashboardCardHeadings = ({ headings = orderDetails }) => {
    return (
        <Paper elevation={1} className="py-2 mx-2 bg-primary-subtle rounded">
            <Grid2 container spacing={2} sx={{ textAlign: 'center' }}>
                {headings?.map((heading, index) => (
                    <Grid2
                        key={index}
                        lg={heading.lg}
                        md={heading.md}
                        sm={heading.sm}
                        xs={heading.xs}
                    >
                        <Typography fontSize={commonFontSize} fontWeight={commonFontWeight} noWrap>
                            {heading.label}
                        </Typography>
                    </Grid2>
                ))}
            </Grid2>
        </Paper>
    );
};

export default OrderDashboardCardHeadings;
