import React from 'react';
import QuotationInfo from './QuotationInfo';

const QuotationClientInfo = ({ item, clientTitle }) => (
    <QuotationInfo
        title={clientTitle}
        name={item.vendorName || item.customerName}
        city={item.city}
        gstin={item.gstin}
        pan={item.panNumber}
        phoneNumber={item.contactPhone}
        email={item.contactEmail}
    />
);

export default QuotationClientInfo;