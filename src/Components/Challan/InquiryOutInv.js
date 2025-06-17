import React, { useContext, useState } from 'react';
import GenericFormHeader from '../GenericComponents/FormComponent/GenericFormHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { FirmContext } from '../Contexts/FirmContext';
import { useSnackbar } from '../Contexts/SnackbarProvider';
import { GenericErrorComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import Grid2 from '@mui/material/Unstable_Grid2';
import QuotationInfo from '../Quotation/QuotationInfo';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { addDaysToToday, checkAdmin, checkValue, getLocalDateString, parshallyInquiryVoucher } from '../../Helpers/helpers';
import InquiryOutQtySelect from './InquiryOutQtySelect';
import GenericSpinner from '../GenericComponents/FormComponent/GenericSpinner';
import { ACCOUNT_USER_LEVEL_ID, AUTO_GENERATE, COMMON_BATCH, commonFontSize, DELETE_FIELD, GENERATE_INVOICE, INQUIRY_STORE_ACCOUNT_ID, STORE_MANAGER_USER_LEVEL_ID, TAX_INVOICE, TRANSPORT_RESOURCE, TRANSPORT_RESOURCE_ID } from '../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getMutateObject } from '../Dashboard/InquiryCalculations';
import { getRateDetails } from '../Quotation/RateCalculator';
import { CLOSED_INQUIRY_TAG } from '../../Helpers/ExtraProperties';
import { DocumentFormatContext } from '../Contexts/DocumentFormatContext';
import { getSaleMarkersFromCData } from '../../Helpers/MarkerHelper';
import InquiryRateChangeText from './InquiryRateChangeText';

const InquiryOutInv = () => {
    const { khID, currentFirm } = useContext(FirmContext);
    const { selectedFormat } = useContext(DocumentFormatContext);

    const { showSnackbar } = useSnackbar();

    const [disabled, setDisabled] = useState(false);

    const [vehical, setVehical] = useState("");
    const [driver, setDriver] = useState("");
    const [eway, setEway] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const inquiry = location.state?.inquiry
    const balanceDetails = location.state?.balanceDetails;

    const oldRefID = currentFirm.reuseInvoiceID && inquiry.deletedInvoice
        ? inquiry.deletedInvoice.id
        : null;

    const oldRefDate = currentFirm.reuseInvoiceID && inquiry.deletedInvoice
        ? inquiry.deletedInvoice.date
        : new Date();

    const getPlannedQty = (product) => (product.dirty ? product.planned : product.inStore);

    const transportCharges = { ...TRANSPORT_RESOURCE };

    const queryFunction = async () => {
        const voucher = {
            vehicalNo: checkValue(vehical),
            driverName: checkValue(driver),
            eway: checkValue(eway),
            customerName: inquiry.customerName,
            city: inquiry.city,
            inquiryId: inquiry.id,
            customerId: inquiry.customerId,
            type: TAX_INVOICE,
            date: oldRefDate,
            verified: true,
            transactions: [],
            effectAccess: [ACCOUNT_USER_LEVEL_ID, STORE_MANAGER_USER_LEVEL_ID],
            id: oldRefID
                ? oldRefID
                : {
                    autoIncrement: true,
                    prefix: currentFirm.prefixes.invoice
                }
        }

        const fromAccount = INQUIRY_STORE_ACCOUNT_ID;
        const toAccount = inquiry.customerId;

        const voucherProducts = []
        const batchesToUpdate = {};

        balanceDetails.forEach((product) => {

            if (getPlannedQty(product) > 0) {
                const update = {
                    dispatched: (product.dispatched || 0) + getPlannedQty(product)
                }

                batchesToUpdate[product.batchID] = update;

                const txnObject = {
                    customerName: inquiry.customerName,
                    inquiryID: inquiry.id,
                    resourceID: product.id,
                }

                if (product.invoiceRate) txnObject.invoiceRate = product.invoiceRate;

                // From
                voucher.transactions.push({
                    ...txnObject,
                    accountID: fromAccount,
                    units: -1 * getPlannedQty(product),
                    batches: [{ id: inquiry.id, units: -1 * getPlannedQty(product) }]
                })

                // To
                voucher.transactions.push({
                    ...txnObject,
                    accountID: toAccount,
                    units: getPlannedQty(product),
                    batches: [{ id: COMMON_BATCH, units: getPlannedQty(product) }]
                })

                voucherProducts.push({
                    workingID: product.workingID,
                    invoiceRate: product.invoiceRate,
                    units: getPlannedQty(product)
                });
            }
        })

        const updatedInq = parshallyInquiryVoucher({
            inquiry: inquiry,
            voucher: { products: voucherProducts }
        });

        if (transportCharges.invoiceRate > 0) {
            updatedInq.products.push({
                product: transportCharges,
                units: 1,
                saleRate: transportCharges.invoiceRate,
                workingID: TRANSPORT_RESOURCE_ID
            })
        }

        const cData = getRateDetails({
            inquiry: updatedInq,
            currentFirm: currentFirm,
            docFormat: selectedFormat
        });

        voucher.cData = cData;

        voucher.markers = getSaleMarkersFromCData(
            cData,
            voucher.date,
            { id: inquiry.customerId, name: inquiry.customerName });

        const result = await serviceHelpers.creteProductVoucher(khID, voucher);

        Object.entries(batchesToUpdate).forEach(async ([batchID, update]) => {
            await serviceHelpers.patchBatches(khID, batchID, update);
        })

        const update = {
            followUpDate: addDaysToToday(2),
        }

        if (oldRefID) {
            update.deletedInvoice = DELETE_FIELD
        }

        const notes = "Invoice: " + result.id + " generated."

        const shouldRemove = balanceDetails.every(
            element => element.remainingDispatch === getPlannedQty(element))

        if (shouldRemove && currentFirm?.autoCloseOrders) update.tag = CLOSED_INQUIRY_TAG

        await serviceHelpers.updateLeadStatus(khID, update, inquiry.id, notes);

        setDisabled(true);
        return result;
    }

    const navigateOut = (result) => navigate(GENERATE_INVOICE, {
        state: { voucherID: result.id, inquiryObject: inquiry },
        replace: true
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation(
        getMutateObject(
            queryClient,
            queryFunction,
            showSnackbar,
            "Challan generated succesfully",
            inquiry.id,
            navigateOut)
    )

    const onPlannedChange = () => {
        const totalPlanned = balanceDetails.reduce(
            (total, product) => total + getPlannedQty(product), 0);

        setDisabled(totalPlanned <= 0);
    }

    if (!(balanceDetails && inquiry)) {
        return <GenericErrorComponent error={"Data Not Present"} />
    }

    return (
        <>
            <GenericFormHeader title={"Generate Invoice"} enableBack={true} />
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Grid2 container rowGap={2}>
                    <Grid2 xs={12} md={4}>
                        <QuotationInfo
                            title={"To:"}
                            name={inquiry.customerName}
                            city={inquiry.city}
                            gstin={inquiry.gstin}
                            pan={inquiry.panNumber}
                            phoneNumber={inquiry.contactPhone}
                            email={inquiry.contactEmail}
                        />

                    </Grid2>

                    <Grid2 xs={12} md={3}>
                        <Typography component={"span"} fontSize={commonFontSize}>
                            <Grid2 container rowGap={1}>
                                <Grid2 xs={4}>
                                    PO:
                                </Grid2>
                                <Grid2 xs={8}>
                                    {checkValue(inquiry.poNumber)}
                                </Grid2>

                                <Grid2 xs={4}>
                                    Invoice ID:
                                </Grid2>
                                <Grid2 xs={8}>
                                    {oldRefID || AUTO_GENERATE}
                                </Grid2>

                                <Grid2 xs={4}>
                                    Date:
                                </Grid2>
                                <Grid2 xs={8}>
                                    {getLocalDateString(oldRefDate)}
                                </Grid2>

                            </Grid2>
                        </Typography>
                    </Grid2>


                    <Grid2 xs={12} md={5} container alignContent={"end"} rowGap={2}>
                        <Grid2 xs={4}>
                            Vehical:
                        </Grid2>
                        <Grid2 xs={8}>
                            <TextField
                                className="bg-light"
                                size="small"
                                fullWidth
                                value={vehical}
                                onChange={(event) => setVehical(event.target.value)}
                            />
                        </Grid2>
                        <Grid2 xs={4}>
                            Driver:
                        </Grid2>
                        <Grid2 xs={8}>
                            <TextField
                                className="bg-light"
                                size="small"
                                fullWidth
                                value={driver}
                                onChange={(event) => setDriver(event.target.value)}
                            />
                        </Grid2>
                        <Grid2 xs={4}>
                            Eway:
                        </Grid2>
                        <Grid2 xs={8}>
                            <TextField
                                className="bg-light"
                                size="small"
                                fullWidth
                                value={eway}
                                onChange={(event) => setEway(event.target.value)}
                            />
                        </Grid2>

                    </Grid2>

                    <Grid2 xs={12}>
                        <InquiryOutQtySelect
                            balanceDetails={balanceDetails}
                            onPlannedChange={onPlannedChange}
                            disableRate={!checkAdmin(currentFirm.currentAccess)} />
                    </Grid2>

                    <Grid2 xs={12}>
                        <Typography component={"span"} fontSize={commonFontSize}>
                            <Grid2
                                textAlign={"center"}
                                alignItems={"center"}
                                container
                                className="p-2">

                                <Grid2 xs={12} md={3}>Transport Charges</Grid2>
                                <Grid2 xs={12} md>
                                </Grid2>

                                <Grid2 xs={12} md>
                                </Grid2>

                                <Grid2 xs={12} md>
                                </Grid2>

                                <Grid2 xs={12} md>
                                    <Box width={"80%"} className="mx-auto">
                                        <InquiryRateChangeText
                                            ProductBalance={transportCharges}
                                            onPlannChange={onPlannedChange} />
                                    </Box>
                                </Grid2>

                            </Grid2>
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} textAlign={"center"}>
                        {
                            isPending
                                ? <GenericSpinner />
                                : <Button onClick={mutate} disabled={disabled}>
                                    Generate
                                </Button>
                        }
                    </Grid2>

                </Grid2>
            </Paper>
        </>
    )
};

export default InquiryOutInv;