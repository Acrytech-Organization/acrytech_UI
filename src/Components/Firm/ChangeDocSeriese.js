import { useContext, useState } from "react";
import GenericFormHeader from "../GenericComponents/FormComponent/GenericFormHeader";
import Grid2 from "@mui/material/Unstable_Grid2";
import AddProperty from "../AddProperties/AddProperty";
import { SchemaTypes } from "../../Helpers/ExtraProperties";
import GenericMutateButton from "../GenericComponents/Buttons/GenericMutateButton";
import { FirmContext } from "../Contexts/FirmContext";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { signMeOut } from "../Nav/LogoutButton";

const QUOTATION_SERIES_PREFIX = "Q";
const INVOICE_SERIES_PREFIX = "INV"
const RECEIPT_SERIES_PREFIX = "R"
const PAYMENT_SERIES_PREFIX = "P"
const CHALLAN_SERIES_PREFIX = "C";
const ORDER_SERIES_PREFIX = "PO";

export const defaultPrefixes = {
    invoice: INVOICE_SERIES_PREFIX,
    challan: CHALLAN_SERIES_PREFIX,
    quotation: QUOTATION_SERIES_PREFIX,
    receipt: RECEIPT_SERIES_PREFIX,
    payment: PAYMENT_SERIES_PREFIX,
    po: ORDER_SERIES_PREFIX
}

const ChangeDocSeries = () => {
    const { resetFirmList, khID, currentFirm } = useContext(FirmContext);

    const [invoicePrefix, setInvoicePrefix] = useState(
        currentFirm.prefixes?.invoice || INVOICE_SERIES_PREFIX);

    const [quotationPrefix, setQuotationPrefix] = useState(
        currentFirm.prefixes?.quotation || QUOTATION_SERIES_PREFIX);

    const [receiptPrefix, setReceiptPrefix] = useState(
        currentFirm.prefixes?.receipt || RECEIPT_SERIES_PREFIX);

    const [paymentPrefix, setPaymentPrefix] = useState(
        currentFirm.prefixes?.payment || PAYMENT_SERIES_PREFIX);

    const [challanPrefix, setChallanPrefix] = useState(
        currentFirm.prefixes?.challan || CHALLAN_SERIES_PREFIX);

    const [orderPrefix, setOrderPrefix] = useState(
        currentFirm.prefixes?.po || ORDER_SERIES_PREFIX);

    const queryFn = async () => {
        currentFirm.prefixes = {
            invoice: invoicePrefix,
            challan: challanPrefix,
            quotation: quotationPrefix,
            receipt: receiptPrefix,
            payment: paymentPrefix,
            po: orderPrefix
        }

        const result = await serviceHelpers.editFirm(currentFirm, khID);
        resetFirmList()
        return result;
    }

    const onSuccess = async () => {
        signMeOut()
    }

    return (
        <>
            <GenericFormHeader title={"Change Document Series"} enableBack={true} />
            <Grid2 container width={{ xs: "100%", sm: "50%" }} justifySelf={"center"}>

                <Grid2 xs={6}>
                    <AddProperty
                        data={{
                            item: {
                                displayName: "Tax Invoice Prefix",
                                name: "invoicePrefix",
                                type: SchemaTypes.String,
                                helperText: 'Please Enter the Prefix',
                            },
                        }}
                        deleteField={(element) => { setInvoicePrefix(INVOICE_SERIES_PREFIX) }}
                        currentValue={invoicePrefix}
                        onChange={(e) => setInvoicePrefix(e.value)}
                    />
                </Grid2>

                <Grid2 xs={6}>
                    <AddProperty
                        data={{
                            item: {
                                displayName: "Quotation Prefix",
                                name: "quotationPrefix",
                                type: SchemaTypes.String,
                                helperText: 'Please Enter the Prefix',
                            },
                        }}
                        deleteField={(element) => { setQuotationPrefix(QUOTATION_SERIES_PREFIX) }}
                        currentValue={quotationPrefix}
                        onChange={(e) => setQuotationPrefix(e.value)}
                    />
                </Grid2>

                <Grid2 xs={6}>
                    <AddProperty
                        data={{
                            item: {
                                displayName: "Receipt Prefix",
                                name: "receiptPrefix",
                                type: SchemaTypes.String,
                                helperText: 'Please Enter the Prefix',
                            },
                        }}
                        deleteField={(element) => { setReceiptPrefix(RECEIPT_SERIES_PREFIX) }}
                        currentValue={receiptPrefix}
                        onChange={(e) => setReceiptPrefix(e.value)}
                    />
                </Grid2>

                <Grid2 xs={6}>
                    <AddProperty
                        data={{
                            item: {
                                displayName: "Payment Prefix",
                                name: "paymentPrefix",
                                type: SchemaTypes.String,
                                helperText: 'Please Enter the Prefix',
                            },
                        }}
                        deleteField={(element) => { setPaymentPrefix(PAYMENT_SERIES_PREFIX) }}
                        currentValue={paymentPrefix}
                        onChange={(e) => setPaymentPrefix(e.value)}
                    />
                </Grid2>

                <Grid2 xs={6}>
                    <AddProperty
                        data={{
                            item: {
                                displayName: "Challan Prefix",
                                name: "challanPrefix",
                                type: SchemaTypes.String,
                                helperText: 'Please Enter the Prefix',
                            },
                        }}
                        deleteField={(element) => { setChallanPrefix(CHALLAN_SERIES_PREFIX) }}
                        currentValue={challanPrefix}
                        onChange={(e) => setChallanPrefix(e.value)}
                    />

                </Grid2>

                <Grid2 xs={6}>
                    <AddProperty
                        data={{
                            item: {
                                displayName: "Purchase Order Prefix",
                                name: "orderPrefix",
                                type: SchemaTypes.String,
                                helperText: 'Please Enter the Prefix',
                            },
                        }}
                        deleteField={(element) => { setOrderPrefix(ORDER_SERIES_PREFIX) }}
                        currentValue={orderPrefix}
                        onChange={(e) => setOrderPrefix(e.value)}
                    />
                </Grid2>

                <Grid2 xs={12} textAlign={"center"} paddingY={2}>
                    <GenericMutateButton
                        queryFn={queryFn}
                        onSuccess={onSuccess}
                        successMessage="settings saved" />
                </Grid2>

            </Grid2>
        </>
    )

};

export default ChangeDocSeries;