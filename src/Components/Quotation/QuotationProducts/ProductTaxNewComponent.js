import { Paper } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import React from 'react'
import NewProductTaxContent from './NewProductTaxContent'

const ProductTaxNewComponent = ({ source, rawMaterials, products }) => {
    return (
        <Grid2 container direction="column" spacing={0}>
            <Grid2 xs={12}>
                <Paper
                    className={'mb-0 px-0 px-sm-2 rounded-0'}
                    sx={{
                        border: { xs: 'none', sm: 'none', md: '1px solid lightgray', lg: '1px solid lightgray' },
                        borderColor: 'divider',
                        boxShadow: { xs: 2, sm: 2, md: 0, lg: 0 },
                    }}
                >
                    <Grid2 container className="p-2">
                        <NewProductTaxContent products={products} rawMaterials={rawMaterials} source={source} />
                    </Grid2>
                </Paper>
            </Grid2>
        </Grid2>
    )
}

export default ProductTaxNewComponent