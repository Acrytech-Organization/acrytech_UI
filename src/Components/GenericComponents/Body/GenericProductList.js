import React from 'react';
import { Chip, Typography } from '@mui/material';
import { commonFontSize } from '../../../Helpers/ConstantProperties';
import Grid2 from '@mui/material/Unstable_Grid2';
import GenericDialogWithButton from '../Dialog/GenericDialogWithButton';

const GenericProductList = ({ products }) => {

  if (products.length === 0) {
    return <Typography fontSize={commonFontSize}>No Product Available</Typography>;
  }

  return (
    <GenericDialogWithButton
      maxWidth="md"
      buttonProps={{ variant: "outlined", fullWidth: true }}
      buttonText={
        <>
          {"Products"}
          <Chip
            label={products.length}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ marginLeft: 1 }}
          />
        </>
      }
      dialogTitle={"Products"}
      dialogContents={
        <Grid2 container>
          {products.map((productObj, index) => (
            <React.Fragment key={index}>
              <Grid2 xs={8}>
                <Typography fontSize={commonFontSize} py={0.5} textAlign={'left'}>
                  {productObj.product.name}
                </Typography>
              </Grid2>
              <Grid2 xs={4}>
                <Typography fontSize={commonFontSize} py={0.5} textAlign={'left'}>
                  {productObj.units}
                </Typography>
              </Grid2>
            </React.Fragment>
          ))}
        </Grid2>
      }
    />
  );
};

export default GenericProductList;
