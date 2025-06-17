import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { COLOR_TEAL, commonFontSize } from '../../Helpers/ConstantProperties';

const DependencyTable = ({ product, units }) => {
    return (
        <Typography component={"span"} fontSize={commonFontSize} color={COLOR_TEAL}>
            {
                product.rmlist?.map((rm, index) => (
                    <Grid2
                        key={index}
                        textAlign={"center"}
                        container>
                        <Grid2 md>{rm.product.name}</Grid2>
                        <Grid2 md>{rm.fgRate} x {units || 0}</Grid2>
                    </Grid2>
                ))
            }

            {
                product.processes?.map((rm, index) => (
                    <Grid2
                        key={index}
                        textAlign={"center"}
                        container>
                        <Grid2 md>{rm.product.name}</Grid2>
                        <Grid2 md>{rm.fgRate} x {units || 0}</Grid2>
                    </Grid2>
                ))
            }
        </Typography>
    )
};

export default DependencyTable;