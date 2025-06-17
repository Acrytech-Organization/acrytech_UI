import React from 'react';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { commonFontSize } from '../../../Helpers/ConstantProperties';

const ContentCard = ({ text, label, xs = 12 }) => {
  return (
    <Grid2 xs={xs}>
      <Typography sx={{ padding: 0.10, fontSize: commonFontSize }} className='d-flex gap-2' >
        <span>{label && <strong>{label}: </strong>}</span>
        <span>{text}</span>
      </Typography>
    </Grid2>
  );
};

export default ContentCard;