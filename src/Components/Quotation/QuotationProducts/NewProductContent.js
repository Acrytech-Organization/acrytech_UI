import React from 'react';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";
import { commonFontSize, extraSmallFontSize, PRIMARY_COLOR } from "../../../Helpers/ConstantProperties";
import { ShowNumber } from '../../../Helpers/helpers';

const NewProductContent = ({ productData }) => {
  const {
    productItemcode,
    productName,
    productHSNcode,
    gstRate,
    units,
    unit,
    saleRate,
    taxableAmount,
  } = productData;

  const gstRateValue = (gstRate?.rate + gstRate?.rate) || productData.product.GSTRate;
  const cgstValue = (gstRateValue) * (taxableAmount / 100);
  const sgstValue = cgstValue;
  const inclusiveRate = saleRate + gstRateValue;

  const renderTypography = (value, fontSize = commonFontSize, color = 'initial') => (
    <Typography fontSize={fontSize} color={color}>
      {value}
    </Typography>
  );

  return (
    <Grid2 container spacing={1} sx={{ textAlign: 'center', width: "100%" }}>
      <Grid2 xs={4}>
        {renderTypography(`(${productItemcode}) - ${productName || productData.name}`, commonFontSize, 'initial')}
        {renderTypography(`HSN: ${productHSNcode || "N/A"}, GST: ${(gstRateValue) || productData.product.GSTRate}%`, extraSmallFontSize, PRIMARY_COLOR)}
      </Grid2>

      <Grid2 xs={2}>
        {renderTypography(`${units}`, commonFontSize)}
        {renderTypography(`${unit || productData.product.unit}`, commonFontSize, PRIMARY_COLOR)}
      </Grid2>

      <Grid2 xs={3}>
        {renderTypography(ShowNumber(saleRate, 2, true), commonFontSize)}
        {renderTypography(`Inclusive Rate :${ShowNumber(inclusiveRate, 2, true)}`, extraSmallFontSize, PRIMARY_COLOR)}
      </Grid2>

      <Grid2 xs={3}>
        {renderTypography(ShowNumber(taxableAmount, 2, true), commonFontSize)}
        {renderTypography(`CGST: ${ShowNumber(cgstValue, 2, true) || (productData.product.GSTRate / 2)} | SGST: ${ShowNumber(sgstValue, 2, true) || (productData.product.GSTRate / 2)}`, extraSmallFontSize, PRIMARY_COLOR)}
      </Grid2>
    </Grid2>
  );
};

export default NewProductContent;
