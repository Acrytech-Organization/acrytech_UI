import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ProductionProductsTableContent from './ProductionProductsTableContent'
import GenericTableHeading from "../../GenericComponents/DataTable/GenericTableHeading"
import { productionTableDetails } from '../../../Helpers/helpers'

const ProductionProductTable = ({ item, products, processes }) => {
    return (
        <Grid2 container spacing={1}>
            <Grid2 xs={12}>
                <GenericTableHeading processData={productionTableDetails}/>
            </Grid2>
            <Grid2 xs={12}>
                <ProductionProductsTableContent item={item} products={products} processes={processes} />
            </Grid2>
        </Grid2>
    )
}

export default ProductionProductTable