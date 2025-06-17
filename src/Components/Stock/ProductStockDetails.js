import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { checkValueNumber } from '../../Helpers/helpers';
import { Collapse, IconButton } from '@mui/material';
import ProductReqStatus from './ProductRreqStatus';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ProductStockDetails = ({ product }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Grid2
            key={product.id}
            textAlign={"center"}
            container
            className="p-2">

            <Grid2 xs={12} md={3} textAlign={"left"}>

                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {" " + product.name}

            </Grid2>
            <Grid2 xs={12} md>
                {checkValueNumber(product.required)}
            </Grid2>
            <Grid2 xs={12} md>
                {checkValueNumber(product.inProduction)}
            </Grid2>
            <Grid2 xs={12} md>
                {checkValueNumber(product.productionDone)}
            </Grid2>
            <Grid2 xs={12} md>
                {checkValueNumber(product.rejected)}
            </Grid2>
            <Grid2 xs={12} md>
                {checkValueNumber(product.remaining)}
            </Grid2>
            <Grid2 xs={12} md>
                {checkValueNumber(product.storeBalance)}
            </Grid2>
            <Grid2 xs={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ProductReqStatus product={product} />
                </Collapse>
            </Grid2>
        </Grid2>
    );
};

export default ProductStockDetails;