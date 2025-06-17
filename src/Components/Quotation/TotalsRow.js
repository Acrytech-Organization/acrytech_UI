import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useScreenSize, SMALL_SCREEN, MEDIUM_SCREEN, smallScreenTotalsArray } from '../../Helpers/helpers';
import { commonFontWeight } from '../../Helpers/ConstantProperties';
import { useQuotationFormat } from '../Contexts/QuotationFormatContext';

const TotalsRow = ({
  commonFontSize,
  totalQuantity,
  totalTaxableAmount,
  totalTax,
  totalAmountAfterTax,
  showRmList = false
}) => {
  const screenSize = useScreenSize();
  const isResponsive = screenSize === SMALL_SCREEN || screenSize === MEDIUM_SCREEN;
  const { formatDetails } = useQuotationFormat();

  const tableValues = showRmList
  ? formatDetails.RmTotalRowList({ totalQuantity, totalTaxableAmount, totalAmountAfterTax, commonFontWeight })
  : formatDetails.MainTotalsRowList({ totalQuantity, totalTaxableAmount, totalTax, totalAmountAfterTax, commonFontWeight });

  return (
    <Paper elevation={0} className={'px-0 py-2 rounded-0 bg-light'} m={0} p={0}>
      <Grid2 container direction={isResponsive ? 'column' : 'row'} spacing={1}>
        {isResponsive ? (
          smallScreenTotalsArray(totalQuantity, totalTaxableAmount, totalTax, totalAmountAfterTax).map((item, index) => (
            <Grid2 key={index} xs={12} sx={{ mb: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" px={2}>
                <Typography fontSize={commonFontSize} sx={{ fontWeight: commonFontWeight }}>
                  {item.label}:
                </Typography>
                <Typography fontSize={commonFontSize}>
                  {item.value}
                </Typography>
              </Box>
            </Grid2>
          ))
        ) : (
          tableValues.map((item, index) => (
            <Grid2 key={index} xs={item.xs} md={item.md}>
              <Typography fontSize={commonFontSize} sx={{ fontWeight: item.fontWeight }} textAlign={item.textAlign || 'center'}>
                {item.content}
              </Typography>
            </Grid2>
          ))
        )}
      </Grid2>
    </Paper>
  );
};

export default TotalsRow;
