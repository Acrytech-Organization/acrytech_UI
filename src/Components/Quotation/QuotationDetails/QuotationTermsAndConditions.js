import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Paper from '@mui/material/Paper';
import HeadingCard from './HeadingCard';
import ContentCard from './ContentCard';
import { getTermsAndConditions } from '../../../Helpers/helpers'

const QuotationTermsAndConditions = ({ item }) => {
  const termsAndConditions = getTermsAndConditions(item);
  return (
    <Paper elevation={0} sx={{ height: '100%', border: '1px solid lightgrey' }}>
      <Grid2 container direction="column" spacing={1}>
        <Grid2 xs={12}>
          <HeadingCard title="Terms and Conditions" />
        </Grid2>
        <Grid2 container direction="column" spacing={0}>
          {termsAndConditions.map(({ label, text }, index) => (
            <ContentCard key={index} label={label} text={text}/>
          ))}
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default QuotationTermsAndConditions;