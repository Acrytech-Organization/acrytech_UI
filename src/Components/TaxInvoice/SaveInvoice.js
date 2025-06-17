import React from 'react';
import InvoiceFormat from './InvoiceFormat';

const SaveInvoice = ({ item }) => {
    if (!item.cData) return <></>;

    item.cData.invoiceId = item.refranceId || item.id;
    item.cData.invoiceDate = item.date;

    return <InvoiceFormat item={{}} cData={item.cData} showSave={true} />;
};

export default SaveInvoice;