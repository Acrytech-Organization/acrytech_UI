import React from 'react';
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { commonFontSize } from "../../../Helpers/ConstantProperties";

const ProductTaxHeading = ({ taxFields }) => {
  return (
    <>
      {taxFields.map(({ label, md }, index) => (
        <Grid2 key={index} xs={12} md={md} display="flex" alignItems="center" justifyContent="center">
          <Typography fontSize={commonFontSize} noWrap>
            <strong>{label}</strong>
          </Typography>
        </Grid2>
      ))}
    </>
  );
};

export default ProductTaxHeading;