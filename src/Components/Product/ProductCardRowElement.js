import React from 'react';
import { Grid } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { commonFontWeight } from '../../Helpers/ConstantProperties';

const ProductCardRowElement = ({ name, value }) => {
    return (
        <Grid container>
            <Grid item lg={6} fontWeight={commonFontWeight} sx={{ color: 'gray', px: 0 }}>
                <Typography noWrap >
                    {name}
                </Typography>
            </Grid>
            <Grid item lg={6} fontWeight={commonFontWeight} sx={{ px: 0, textAlign: 'left' }}>
                <Tooltip
                    title={value}
                    placement='top-start'
                    arrow
                >
                    <Typography noWrap>
                        {value}
                    </Typography>
                </Tooltip>
            </Grid>
        </Grid>
    );
}

export default ProductCardRowElement;