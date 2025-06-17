import React, { useContext } from 'react';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import { PROFORMA_INVOICE_ID, TAX_INVOICE, UPDATE_ON_INQUIRY, UPDATE_ON_VOUCHER } from '../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import DataView from '../GenericComponents/DataView/DataView';
import InvoiceCard from './invoiceCard';
import DataviewList from '../GenericComponents/DataView/DataviewList';

const Invoices = ({ inquiry = null }) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_VOUCHER,
        UPDATE_ON_INQUIRY,
        TAX_INVOICE
    ];

    if (inquiry) queryKey.push(inquiry.id)

    const queryFunction = async (pageParam) => {
        const results = await serviceHelpers.getInvoices(khID, pageParam, inquiry?.id);

        // This will make sure to skip get Inquiry object while
        // showing the card.
        if (inquiry) {
            results.forEach((voucher) => voucher.inquiry = inquiry);

            results.push({
                id: PROFORMA_INVOICE_ID,
                inquiry: inquiry
            })
        }

        return results;
    }

    const getSearchableValue = (current) => {
        return (
            current.id + " "
            + current.customerName + " "
            + current.cData?.poNumber
        )
    }

    return (
        <DataView
            routeDetails={{ heading: `Tax Invoices` }}
            getSearchableValue={getSearchableValue}
            queryKeyParameter={queryKey}
            queryFunctionParameter={queryFunction}
            ShowElement={{ Component: InvoiceCard }}
            DisplayComponent={DataviewList}
            searchingPlaceholder={"Search By Id and Customer Name, PO Number"}
        />
    )
};

export default Invoices;