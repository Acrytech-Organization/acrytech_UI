import React from 'react';
import { Box, Grid } from '@mui/material';
import DashboardCard from './DashboardCard';

const DashboardContent = ({ data = [], tagColor, CustomBody }) => {

    return (
        <Box width="100%">
            <Grid container rowGap={1}>
                <Grid item xs={12}>
                    {data.map((item, index) => (
                        <DashboardCard
                            key={index}
                            item={item}
                            tagColor={tagColor}
                            BodyComponent={CustomBody}
                        />
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardContent;