import React, { useContext, useRef } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import InquiryProductDetails from '../Inquiry/InquiryProductDetails';
import { FirmContext } from '../Contexts/FirmContext';
import GenericLogo from '../GenericComponents/Logo/GenericLogo';
import { Divider, Paper, Typography } from '@mui/material';
import QuotationFirmInfo from '../Quotation/QuotationFirmInfo';
import QuotationClientInfo from '../Quotation/QuotationClientInfo';
import { useLocation } from 'react-router-dom';
import ChalanIdAndDate from './ChalanIdAndDate';
import BorderdBox from '../GenericComponents/Layout/BorderdBox';
import InquiryProductHeading from '../Inquiry/InquiryProductHeading';
import { canEditSaleRate, getProductHeadingWithoutAction } from '../../Helpers/helpers';
import { OUTWORD_CHALLAN } from '../../Helpers/ConstantProperties';
import OutChallanFormat from './OutChallanFormat';

const DisplayChallan = () => {
    const { currentFirm } = useContext(FirmContext);
    const location = useLocation();
    const item = location.state;
    const componentRef = useRef();

    if (item.type === OUTWORD_CHALLAN) {
        return <OutChallanFormat item={item} />
    }

    var ToComponent = <QuotationFirmInfo currentFirm={currentFirm} firmTitle={'To'} />
    var FromComponent = <QuotationClientInfo item={item} clientTitle={'From'} />

    return (
        <Grid2 container spacing={2} sx={{ m: 2 }}>
            <div ref={componentRef}>
                <Paper elevation={2} sx={{ p: 2, width: '100%', overflow: 'auto' }}>
                    <Grid2 container display="flex" justifyContent="center" alignItems="center" flexDirection={{ xs: 'column', md: 'row' }}>
                        <Grid2 xs={12} sm={6} md={5} container justifyContent="start">
                            <GenericLogo src={currentFirm.logoUrl} />
                        </Grid2>
                        <Grid2 xs={12} sm={6} md={6} container justifyContent="start">
                            <Typography sx={{ mx: 1, color: 'primary.main' }} variant='h6'>
                                {item.type}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Divider className='rounded' sx={{ borderBottomWidth: 2, bgcolor: 'black', mt: 1 }} />
                    <Grid2 container spacing={2} flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" sx={{ mt: 2 }}>
                        <Grid2 xs={12} sm={4}>
                            {ToComponent}
                        </Grid2>
                        <Grid2 xs={12} sm={4}>
                            {FromComponent}
                        </Grid2>
                        <Grid2 xs={12} sm={4}>
                            <ChalanIdAndDate item={item} />
                        </Grid2>
                    </Grid2>

                    <Grid2 container>
                        <Grid2 xs={12}>
                            <InquiryProductDetails
                                allowActions={false}
                                data={item}
                                HeadingComponent={
                                    (props) => <InquiryProductHeading {...props} heading={getProductHeadingWithoutAction(canEditSaleRate(currentFirm))} />}
                            />
                        </Grid2>
                    </Grid2>

                    <Grid2 display={'flex'} container direction="row" my={1}>
                        <BorderdBox bodyText={'Receiver\'s Signature'} xs={12} sm={4} />
                        <BorderdBox bodyText={`for ${currentFirm.name} Signature`} xs={12} sm={4} />
                        <BorderdBox bodyText={`Organization Stamp`} xs={12} sm={4} />
                    </Grid2>

                </Paper>
            </div>
        </Grid2>
    )
}

export default DisplayChallan