import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { commonFontSize, GENERATEQUOTATION } from '../../../Helpers/ConstantProperties';
import { ShowNumber } from '../../../Helpers/helpers';

const NewProductTaxContent = ({ products, rawMaterials, source }) => {
  const productsList = source === GENERATEQUOTATION ? products : rawMaterials;

  const groupedProducts = productsList.reduce((acc, product) => {
    const hsnCode = product.product.productHSNcode || "N/A";
    if (!acc[hsnCode]) acc[hsnCode] = [];
    acc[hsnCode].push(product);
    return acc;
  }, {});

  const calculateAmounts = (productsGroup) => {
    let totalTaxableAmount = 0;
    let totalSGSTAmount = 0;
    let totalCGSTAmount = 0;

    productsGroup.forEach(product => {
      const units = parseFloat(product.units) || 0;
      const saleRate = parseFloat(product.product.saleRate) || 0;
      const GSTRate = parseFloat(product.product.GSTRate) || 0;
      const taxableAmount = units * saleRate;

      const halfTaxRate = GSTRate / 2;
      const sgstAmount = (taxableAmount * halfTaxRate) / 100;
      const cgstAmount = sgstAmount;

      totalTaxableAmount += taxableAmount;
      totalSGSTAmount += sgstAmount;
      totalCGSTAmount += cgstAmount;
    });

    return {
      totalTaxableAmount,
      sgstAmount: totalSGSTAmount,
      cgstAmount: totalCGSTAmount,
      GSTRate: totalSGSTAmount ? (totalSGSTAmount + totalCGSTAmount) * 100 / totalTaxableAmount : 0,
    };
  };

  return (
    <>
      {Object.entries(groupedProducts).map(([hsnCode, productsGroup], idx) => {
        const { totalTaxableAmount, sgstAmount, cgstAmount, GSTRate } = calculateAmounts(productsGroup);
        const totalTax = sgstAmount + cgstAmount;

        const renderCell = (value, tooltip = value) => (
          <Tooltip title={tooltip} arrow>
            <Typography fontSize={commonFontSize} noWrap>
              {value}
            </Typography>
          </Tooltip>
        );

        return (
          <Grid2 container key={idx} spacing={0} sx={{ textAlign: 'center', py: 1, width: '100%', border: '1px solid lightgray', borderTop: 'none'}}>
            <Grid2 xs={2}>{renderCell(hsnCode || "N/A")}</Grid2>
            <Grid2 xs={2}>{renderCell(`${GSTRate.toFixed(2)}%`)}</Grid2>
            <Grid2 xs={2}>{renderCell(ShowNumber(totalTaxableAmount, 2, true))}</Grid2>
            <Grid2 xs={2}>{renderCell(ShowNumber(sgstAmount, 2, true))}</Grid2>
            <Grid2 xs={2}>{renderCell(ShowNumber(cgstAmount, 2, true))}</Grid2>
            <Grid2 xs={2}>{renderCell(ShowNumber(totalTax, 2, true))}</Grid2>
          </Grid2>
        );
      })}
    </>
  );
};

export default NewProductTaxContent;
