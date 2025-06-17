import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UPDATE_ON_INQUIRY, UPDATE_ON_VOUCHER } from '../../Helpers/ConstantProperties'
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { CircularProgress } from '@mui/material';
import { DecodeServerError, parshallyInquiryVoucher } from '../../Helpers/helpers';
import { GenericAlert } from '../GenericComponents/Alerts/GenericAlert';
import InvoiceFormat from './InvoiceFormat';

const InvoicePage = () => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const location = useLocation();
    // voucherObject MUST be with all the transactions
    // otherwise the calculations will fail.
    const { voucherID, voucherObject, inquiryObject } = location.state;

    const qKey = [
        uid,
        khID,
        UPDATE_ON_VOUCHER,
        UPDATE_ON_INQUIRY,
        voucherID,
    ]

    if (voucherObject) qKey.push(voucherObject.id);

    if (inquiryObject) qKey.push(inquiryObject.id);

    const { data, isLoading, error } = useQuery(
        {
            queryKey: qKey,

            queryFn: async () => {
                const voucher = voucherObject
                    ? voucherObject
                    : await serviceHelpers.getVoucher(khID, voucherID);

                let inquiry = {};

                if (!voucher.cData) {
                    const invoiceID = voucher.inquiryId;

                    inquiry = inquiryObject
                        ? inquiryObject
                        : await serviceHelpers.getOneLead(khID, invoiceID);
                }

                return { voucher, inquiry }
            }
        }
    );

    if (isLoading) return <CircularProgress />

    if (error) return <GenericAlert error={DecodeServerError(error)} />

    if (data) {
        // As this is a voucher (Invoice OR Challan) so we need to
        // update the units and rates if any from voucher to Inquiry
        // This is only for FINISH GOODS.
        const { voucher } = data;
        let inquiryToUpdate = data.inquiry;

        if (voucher.cData) {
            voucher.cData.invoiceId = voucher.id;
            voucher.cData.invoiceDate = voucher.date;
        }
        else {
            inquiryToUpdate = parshallyInquiryVoucher(data)
        }

        return <InvoiceFormat item={inquiryToUpdate} cData={voucher.cData} />
    }

    return <></>
}
export default InvoicePage