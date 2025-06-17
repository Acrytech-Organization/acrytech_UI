import React from 'react';
import { Box, Grid } from '@mui/material';
import ProductionHeading from './ProductionHeading';
import ProductionDashboardCard from './ProductionDashboardCard';

const ProductionDashboardContent = ({ data = [], DisplayCompoent = ProductionDashboardCard, heading }) => {

    return (
        <Box width="100%">
            <Grid container rowGap={1}>
                <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
                    <ProductionHeading heading={heading} />
                </Grid>
                <Grid item xs={12}>
                    {data.map((item, index) => (
                        <DisplayCompoent
                            key={index}
                            data={item}
                        />
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductionDashboardContent;