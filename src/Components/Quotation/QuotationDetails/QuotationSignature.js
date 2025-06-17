import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Paper from '@mui/material/Paper';
import HeadingCard from './HeadingCard';
import ContentCard from './ContentCard';

const QuotationSignature = ({ currentFirm }) => {
  return (
    <Paper elevation={0} sx={{ height: '100%', border: '1px solid lightgrey' }}>
      <Grid2 container direction="column" spacing={{ xs: 0, sm: 1, md: 1, lg: 1 }} sx={{ height: '100%' }}>
        <Grid2 xs={12}>
          <HeadingCard title="Signature" />
        </Grid2>
        <Grid2 container direction="column" spacing={0} gap={{ xs: 6, sm: 3, md: 3, lg: 3 }} justifyContent="space-between" sx={{ flexGrow: 1, textAlign: 'center' }}>
          <ContentCard label="From" text={currentFirm.name} />
          <ContentCard text="Authorized Signatory" />
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default QuotationSignature;