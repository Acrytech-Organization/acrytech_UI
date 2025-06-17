import React from 'react';
import { Box, Grid } from '@mui/material';
import OrderDashboardCardHeadings from './OrderDashboardCardHeadings';
import OrderProductDetails from './OrderProductDetails';
import ResponsiveOrderProductDetails from './ResponsiveOrderProductDetails';
import { useScreenSize, SMALL_SCREEN, MEDIUM_SCREEN } from '../../Helpers/helpers';

const OrderDashboardContent = ({ data = [] }) => {
    const screenSize = useScreenSize();
    const DisplayComponent = screenSize === SMALL_SCREEN || screenSize === MEDIUM_SCREEN
        ? ResponsiveOrderProductDetails
        : OrderProductDetails;

    return (
        <Box width="100%">
            <Grid container rowGap={1}>
                <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
                    <OrderDashboardCardHeadings />
                </Grid>
                <Grid item xs={12}>
                    {data.map((item, index) => (
                        <DisplayComponent
                            key={index}
                            data={item}
                        />
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderDashboardContent;