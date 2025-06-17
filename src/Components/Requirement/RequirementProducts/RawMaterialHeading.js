import React, { useContext } from 'react';
import InquiryProductHeading from '../../Inquiry/InquiryProductHeading';
import { DetailPaneContext } from '../../Inquiry/InquiryInformation';
import { CHECK_ACTIONS, PRICE, PROCESS, PRODUCT_CODE, PRODUCT_NAME, QTY, RAW_MATERIAL_TITLE } from '../../../Helpers/ConstantProperties';

const RawMaterialHeading = ({ addButtonExtraProps }) => {
    const enableAction = useContext(DetailPaneContext);

    let col = 1.5;

    if (enableAction?.disableAction) col = 2.25

    var heading = [
        { label: PRODUCT_NAME, lg: 1, xs: 12 },
        { label: PRODUCT_CODE, lg: 1, xs: 12 },
        { label: QTY, lg: 1, xs: 12 },
        { label: RAW_MATERIAL_TITLE, lg: col, xs: 12 },
        { label: QTY, lg: 1.5, xs: 12 },
        { label: PRICE, lg: 1, xs: 12 },
        { label: PROCESS, lg: col, xs: 12 },
        { label: QTY, lg: 1, xs: 12 },
        { label: PRICE, lg: 1, xs: 12 }
    ]

    if (!enableAction?.disableAction) {
        heading.push(
            { label: CHECK_ACTIONS, lg: 1.5, xs: 12 })
    }

    return (
        <InquiryProductHeading
            addButtonExtraProps={addButtonExtraProps}
            heading={heading}
        />
    );
};

export default RawMaterialHeading;
