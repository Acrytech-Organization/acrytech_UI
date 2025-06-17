import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useLocation } from 'react-router-dom';
import { commonFontWeight, largeFontSize, PRIMARY_COLOR } from '../../Helpers/ConstantProperties';
import { Paper, Typography } from '@mui/material';
import ProductionDetailsContent from './ProductionDetailsContent';
import ProductionProductTable from './ProductionProducts/ProductionProductTable';

const ProductionDetails = () => {
    const location = useLocation();
    const { item, processes } = location.state || {};
    const products = item?.products || [];

    return (
        <Grid2 container direction={"column"} spacing={1}>
            <Paper elevation={1} className='m-3 p-2 w-90'>
                <Grid2 xs={12}>
                    <Typography py={2} color={PRIMARY_COLOR} fontWeight={commonFontWeight} fontSize={largeFontSize}>
                        {item.customerName}
                    </Typography>
                </Grid2>
                <Grid2 xs={12}>
                    <ProductionDetailsContent item={item} />
                </Grid2>
                <Grid2 xs={12}>
                    <ProductionProductTable item={item} products={products} processes={processes} />
                </Grid2>
            </Paper>
        </Grid2>
    )
}

export default ProductionDetails