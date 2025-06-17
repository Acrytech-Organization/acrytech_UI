import React, { useContext } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2'
import { Paper } from '@mui/material'
import ProductTaxContent from './ProductTaxContent'
import { GSTContext } from '../QuotationPage'
import QuotationCalculations from './QuotationCalculations'
import { GENERATEBOM } from '../../../Helpers/ConstantProperties';

const ProductTaxDefaultComponent = ({ source, rawMaterials, products }) => {

    const materialsOrProducts = source === GENERATEBOM ? rawMaterials : products;
    const { igst } = useContext(GSTContext);
    const { taxData } = QuotationCalculations({ products: materialsOrProducts });
    const taxArray = igst ? ["IGST"] : ["CGST", "SGST"];

    return (
        <Grid2 container direction="column" spacing={0}>
            {taxArray.map((taxType, index) => (
                <Grid2 xs={12} key={index}>
                    <Paper
                        className={'mb-0 px-0 px-sm-2 rounded-0'}
                        sx={{
                            border: { xs: 'none', sm: 'none', md: '1px solid lightgray', lg: '1px solid lightgray' },
                            borderColor: 'divider',
                            boxShadow: { xs: 2, sm: 2, md: 0, lg: 0 },
                        }}
                    >
                        <Grid2 container className="p-2">
                            <ProductTaxContent taxData={taxData} taxType={taxType} />
                        </Grid2>
                    </Paper>
                </Grid2>
            ))}
        </Grid2>
    )
}

export default ProductTaxDefaultComponent