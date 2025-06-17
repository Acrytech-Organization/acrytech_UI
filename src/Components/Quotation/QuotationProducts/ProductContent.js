import React from 'react';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";
import { commonFontSize, extraSmallFontSize, PRIMARY_COLOR } from "../../../Helpers/ConstantProperties";
import { quotationTableValues } from '../../../Helpers/helpers';

const ProductContent = ({ productData, tableValues = quotationTableValues, item }) => {
  return (
    <>
      {tableValues.map(({ key, sizes, format, color, textAlign }, index) => (
        <Grid2
          key={index}
          {...sizes}
          sx={{ color }}
        >
          <Typography fontSize={commonFontSize} className='text-truncate' textAlign={textAlign || 'center'}>
            {format ? format(productData[key]) : productData[key]}
          </Typography>
          {key === 'productName' && productData.productdescription && (
            <Typography fontSize={extraSmallFontSize} className='text-truncate' textAlign={textAlign || 'center'} color={PRIMARY_COLOR}> 
              ({productData.productdescription})
            </Typography>
          )}
        </Grid2>
      ))}
    </>
  );
};

export default ProductContent;