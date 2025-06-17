import React from 'react';
import QuotationInfo from './QuotationInfo';

const QuotationFirmInfo = ({ currentFirm, firmTitle }) => (
    <QuotationInfo
        title={firmTitle}
        name={currentFirm.name}
        address={currentFirm.address}
        city={currentFirm.city}
        pincode={currentFirm.pincode}
        gstin={currentFirm.gstin}
        pan={currentFirm.khID}
        phoneNumber={currentFirm.phoneNumber}
        email={currentFirm.email}
    />
);

export default QuotationFirmInfo;