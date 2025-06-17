import React from 'react';
import { Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ProductTaxHeading from './ProductTaxHeading';
import { useQuotationFormat } from '../../Contexts/QuotationFormatContext';

const QuotationProductTax = ({ source, rawMaterials, products }) => {
  const { formatDetails } = useQuotationFormat();

  return (
    <Grid2 container direction="column" spacing={0}>
      <Grid2
        xs={12}
        sx={{
          display: { xs: 'none', sm: 'block', md: 'block', lg: 'block' },
        }}
      >
        <Paper elevation={0} className='px-1'>
          <Grid2 container spacing={1} className='bg-primary-subtle rounded' sx={{ textAlign: 'center', p: 1 }}>
            <ProductTaxHeading taxFields={formatDetails.TaxHeadingList}/>
          </Grid2>
        </Paper>
      </Grid2>
      <formatDetails.TaxDisplayComponent products={products} rawMaterials={rawMaterials} source={source} />
    </Grid2>
  );
};

export default QuotationProductTax;