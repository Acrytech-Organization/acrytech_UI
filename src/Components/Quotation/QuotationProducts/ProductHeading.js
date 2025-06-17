import React from 'react';
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { commonFontSize } from "../../../Helpers/ConstantProperties";
import { useQuotationFormat } from '../../Contexts/QuotationFormatContext';

const ProductHeading = ({ showRmHeading = false }) => {
  const { formatDetails } = useQuotationFormat();

  const resolvedTableValues = showRmHeading ? formatDetails.RmHeadingList : formatDetails.MainHeadingList;

  return (
    <>
      {resolvedTableValues.map(({ content, sizes, noWrap }, index) => (
        <Grid2 key={index} {...sizes}>
          <Typography fontSize={commonFontSize} noWrap={noWrap}>
            <strong>{content}</strong>
          </Typography>
        </Grid2>
      ))}
    </>
  );
};

export default ProductHeading;