import React from 'react';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";
import { commonFontSize } from "../../../Helpers/ConstantProperties";
import { quotationTableValues } from '../../../Helpers/helpers';
import { useScreenSize, SMALL_SCREEN, MEDIUM_SCREEN } from '../../../Helpers/helpers';

const ResponsiveProductContent = ({ productData, tableValues = quotationTableValues }) => {
  const screenSize = useScreenSize();
  const isResponsive = screenSize === SMALL_SCREEN || screenSize === MEDIUM_SCREEN;

  return (
    <Grid2 container direction={isResponsive ? "column" : "row"} spacing={1}>
      {tableValues.map(({ key, sizes, color, textAlign, content, format }, index) => {
        if (isResponsive && key === 'productItemcode') {
          return null;
        }

        return (
          <Grid2
            key={index}
            {...sizes}
            sx={{ color: color || 'inherit', width: isResponsive ? '100%' : 'auto' }}
          >
            <Typography
              fontSize={commonFontSize}
              className='text-truncate'
              textAlign={isResponsive ? 'left' : textAlign || 'center'}
              px={2}
            >
              {isResponsive && key !== 'productName' && <strong>{content}: </strong>}
              {format ? format(productData[key]) : productData[key]}
            </Typography>
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export default ResponsiveProductContent;