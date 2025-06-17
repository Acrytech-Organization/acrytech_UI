import { useContext } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import QuotationBankDetails from './QuotationBankDetails';
import QuotationSignature from './QuotationSignature';
import QuotationTermsAndCondition from './QuotationTermsAndConditions';
import { FirmContext } from '../../Contexts/FirmContext';

const QuotationDetailsWrapper = ({ item }) => {
  const { currentFirm } = useContext(FirmContext);
  return (
    <Grid2 container spacing={0} justifyContent="center">
      <Grid2 xs={12} sm={4} md = {5}>
        <QuotationBankDetails currentFirm={currentFirm} />
      </Grid2>
      <Grid2 xs={12} sm={4} md = {4} >
        <QuotationTermsAndCondition item={item} />
      </Grid2>
      <Grid2 xs={12} sm={4} md = {3}>
        <QuotationSignature currentFirm={currentFirm} />
      </Grid2>
    </Grid2>
  );
};

export default QuotationDetailsWrapper;
