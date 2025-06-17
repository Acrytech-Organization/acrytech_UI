import React from 'react';
import { Tooltip, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { commonFontSize } from "../../../Helpers/ConstantProperties";
import { PRIMARY_COLOR } from "../../../Helpers/ConstantProperties";
import { ShowNumber } from '../../../Helpers/helpers';

const ProductTaxContent = ({ taxData, taxType }) => {
  const taxFields = [
    { key: "taxableAmount", format: (value) => ShowNumber(value, 2, true) },
    { key: "taxAmount", format: (value) => ShowNumber(value, 2, true) },
  ];

  const taxValues = taxData ? taxData[taxType.toLowerCase()] : {};

  const getFormattedValue = (key, format) => {
    const value = taxValues[key];
    return value !== undefined ? format(value) : 'N/A';
  };

  return (
    <>
      <Grid2 xs={12} lg={4} md={4} display="flex" alignItems="center" justifyContent="center">
        <Typography fontSize={commonFontSize} sx={{ color: PRIMARY_COLOR }}>
          {taxType}
        </Typography>
      </Grid2>
      {taxFields.map(({ key, format }, idx) => (
        <Grid2 key={idx} xs={12} lg={4} md={4} display="flex" alignItems="center" justifyContent="center">
          <Tooltip
            title={getFormattedValue(key, format)}
            placement="top"
            arrow
          >
            <Typography noWrap fontSize={commonFontSize}>
              {getFormattedValue(key, format)}
            </Typography>
          </Tooltip>
        </Grid2>
      ))}
    </>
  );
};

export default ProductTaxContent;