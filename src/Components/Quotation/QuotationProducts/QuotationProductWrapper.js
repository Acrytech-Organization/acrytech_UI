import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import QuotationProductList from './QuotationProductList';
import { Paper } from '@mui/material';
import QuotationSummary from './QuotationSummary';
import QuotationDetailWrapper from '../QuotationDetails/QuotationDetailWrapper';
import QuotationRmProductList from './QuotationRmProductList';
import { GENERATEBOM, VIEW_QUOTATION } from '../../../Helpers/ConstantProperties';
import CreateTermsAndCondition from '../QuotationDetails/CreateTermsAndCondition';

const QuotationProductWrapper = ({ data, source, updatedProducts, rawMaterials, navigateTo }) => {
  if (source === VIEW_QUOTATION) {
    return <CreateTermsAndCondition item={data} navigateTo={navigateTo} />;
  }

  return (
    <Paper
      sx={{
        px: 2,
        pb: 1,
        border: '1px solid',
        borderColor: 'grey.400',
        borderRadius: 1,
        mb: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          {source === GENERATEBOM ? (
            <QuotationRmProductList products={updatedProducts} />
          ) : (
            <QuotationProductList item={data} products={updatedProducts} />
          )}
        </Grid2>
        <Grid2 xs={12}>
          <QuotationSummary rawMaterials={rawMaterials} item={data} products={updatedProducts} />
        </Grid2>
        <Grid2 xs={12}>
          <QuotationDetailWrapper item={data} />
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default QuotationProductWrapper;