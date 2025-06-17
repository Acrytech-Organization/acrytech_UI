import React, { useRef, useContext, createContext } from 'react';
import { Alert, Divider, Paper, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import QuotationFirmInfo from './QuotationFirmInfo';
import QuotationClientInfo from './QuotationClientInfo';
import QuotationIdAndDate from './QuotationIdAndDate';
import { FirmContext } from '../Contexts/FirmContext';
import GenericLogo from '../GenericComponents/Logo/GenericLogo';
import QuotationProductWrapper from './QuotationProducts/QuotationProductWrapper';
import QuotationActionButtons from './QuotationActions/QuotationActionButtons';
import { useLocation } from 'react-router-dom';
import { updateProductsWithRates } from '../../Helpers/helpers';
import { isIGST } from '../../Helpers/helpers';
import { DOC_TYPE_INVOICE, PERFORMA_INVOICE, VIEW_QUOTATION } from '../../Helpers/ConstantProperties';
import { QuotationFormatProvider } from '../Contexts/QuotationFormatContext';

export const GSTContext = createContext({ igst: false });


const QuotationPage = ({
    documentTitle = "Quotation",
    clientTitle = "Quotation To",
    firmTitle = "Quotation From",
    detailsTitle = "Quotation Details",
    dateTitle = "Quotation Date",
    idTitle = "Quotation Id",
    data,
    showWarning,
    type
    // that is avaialble for you if you want to use that component withot router
}) => {

    const { currentFirm } = useContext(FirmContext);
    const location = useLocation();
    var { item } = location.state || {};
    const navigateTo = location.state.navigateTo;
    if (data) item = data;

    let id = item.quotationId
    let date = item.quotationDate

    if (type === DOC_TYPE_INVOICE) {
        id = item.invoiceId ? item.invoiceId : PERFORMA_INVOICE;
        date = item.invoiceDate;
    }

    // that is for using that component without router
    const products = item?.products || [];
    const rawMaterials = products.flatMap(product => [
        ...(product?.rmlist || []),
        ...(product?.processes || [])
    ]);
    const source = item?.source
    const updatedProducts = updateProductsWithRates(products, rawMaterials);

    const isIgst = isIGST(currentFirm, item);

    const componentRef = useRef();

    if (!item?.quotationId && showWarning) {
        return (
            <Alert severity="warning" className="m-3">
                Quotation for this inquiry is not yet generated.
            </Alert>
        );
    }

    return (
        <QuotationFormatProvider>
            <GSTContext.Provider value={{ igst: isIgst }}>
                <Grid2 container spacing={2} sx={{ m: 2 }}>
                    <div ref={componentRef}>
                        <Paper elevation={2} sx={{ p: 2, width: '100%', overflow: 'auto' }}>
                            <Grid2 container display="flex" justifyContent="center" alignItems="center" flexDirection={{ xs: 'column', md: 'row' }}>
                                <Grid2 xs={12} sm={6} md={5} container justifyContent="start">
                                    <GenericLogo src={currentFirm.logoUrl} />
                                </Grid2>
                                <Grid2 xs={12} sm={6} md={6} container justifyContent="start">
                                    <Typography sx={{ mx: 1, color: 'primary.main' }} variant='h6'>
                                        {documentTitle}
                                    </Typography>
                                </Grid2>
                            </Grid2>
                            <Divider className='rounded' sx={{ borderBottomWidth: 2, bgcolor: 'black', mt: 1 }} />
                            <Grid2 container spacing={2} flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" sx={{ mt: 2 }}>
                                <Grid2 xs={12} sm={4}>
                                    <QuotationFirmInfo currentFirm={currentFirm} firmTitle={firmTitle} />
                                </Grid2>
                                <Grid2 xs={12} sm={4}>
                                    <QuotationClientInfo item={item} clientTitle={clientTitle} />
                                </Grid2>
                                <Grid2 xs={12} sm={4}>
                                    <QuotationIdAndDate detailsTitle={detailsTitle} dateTitle={dateTitle} idTitle={idTitle} id={id} date={date} hideValidityDate={type === DOC_TYPE_INVOICE} />
                                </Grid2>
                            </Grid2>

                            <Grid2 container spacing={0} sx={{ mt: 1 }}>
                                <Grid2 xs={12}>
                                    <QuotationProductWrapper source={source} data={item} updatedProducts={updatedProducts} rawMaterials={rawMaterials} navigateTo={navigateTo} />
                                </Grid2>
                            </Grid2>

                            <Grid2 container spacing={0} sx={{ mt: 0, display: source !== VIEW_QUOTATION ? 'block' : 'none' }}>
                                <Grid2 xs={12}>
                                    <QuotationActionButtons
                                        id={id}
                                        date={date}
                                        item={item}
                                        componentRef={componentRef}
                                        updatedProducts={updatedProducts}
                                        rawMaterials={rawMaterials}
                                        source={source}
                                        currentFirm={currentFirm}
                                        firmTitle={firmTitle}
                                        clientTitle={clientTitle}
                                        documentTitle={documentTitle}
                                        dateTitle={dateTitle}
                                        idTitle={idTitle}
                                        navigateTo={navigateTo}
                                    />
                                </Grid2>
                            </Grid2>
                        </Paper>
                    </div>
                </Grid2>
            </GSTContext.Provider>
        </QuotationFormatProvider>
    );
};

export default QuotationPage;