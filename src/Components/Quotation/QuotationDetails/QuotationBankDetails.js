import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Paper from '@mui/material/Paper';
import HeadingCard from './HeadingCard';
import ContentCard from './ContentCard';
import { createUPILink, getBankDetails } from '../../../Helpers/helpers'
import { QRCodeSVG } from 'qrcode.react';

const QuotationBankDetails = ({ currentFirm }) => {
  const bankDetails = getBankDetails(currentFirm);
  const formatedUpiLink = createUPILink(currentFirm.upiID);

  return (
    <Paper elevation={0} sx={{ height: '100%', border: '1px solid lightgrey' }}>
      <Grid2 container direction="column" spacing={1}>
        <Grid2 xs={12}>
          <HeadingCard title="Bank Details" />
        </Grid2>
        <Grid2 width={"100%"} container display={"flex"} className="m-1" flexWrap={"wrap"} >
          {currentFirm.upiID && <Grid2 md={3} xs={12}>
            <QRCodeSVG value={formatedUpiLink} className='w-100 h-auto' />
          </Grid2>}
          <Grid2 md={currentFirm.upiID ? 9 : 12}>
            {bankDetails.map(({ label, text }, index) => (
              <ContentCard key={index} label={label} text={text} />
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default QuotationBankDetails;