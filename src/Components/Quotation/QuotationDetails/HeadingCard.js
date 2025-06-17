import React from 'react';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { commonFontSize } from '../../../Helpers/ConstantProperties';

const HeadingCard = ({ title }) => {
  return (
    <Grid2
      xs={12}
      className="bg-primary-subtle rounded">
      <Typography
        padding={1}
        textAlign={"center"}
        component="h2"
        fontSize={commonFontSize}>
        <strong>{title}</strong>
      </Typography>
    </Grid2>
  );
};

export default HeadingCard;