import React from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { BALANCE, INQUIRY_STORE_ACCOUNT_ID, STOCK_STMT } from '../../Helpers/ConstantProperties';
import { inwordRMPostDispatch } from '../../Helpers/helpers';
import InquiryProductDetails from '../Inquiry/InquiryProductDetails';
import RequirementRawMaterialContent from '../Requirement/RequirementRawMaterialContent';
import { requirementRawMaterialHeading } from '../../Helpers/ExtraProperties';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';

const InwordStock = ({ propName, propList }) => {
    const navigate = useNavigate();
    const handleReditect = () => {
        navigate(STOCK_STMT)
    }

    const successMessage = "Stock Inword done"

    const inwordStockFn = async (state, khID) => {
        return await serviceHelpers.inwordProductToStore(khID, state, state[propName])
    };

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Add",
        navigateTo: STOCK_STMT,
        queryKeyValue: BALANCE + INQUIRY_STORE_ACCOUNT_ID,
        formTitle: "Inword Stock",
        propertyList: propList,
        queryFunction: inwordStockFn,
        buttonClasses: "",
        currentData: {},
        handleCancel: handleReditect,
        afterDispatch: inwordRMPostDispatch,
        GroupDetailsComponent: (props) => <InquiryProductDetails
            ResponsiveContentComponent={RequirementRawMaterialContent}
            {...props}
            headingList={requirementRawMaterialHeading}
            groupFieldName={propName} />,
        enableClear: true
    }

    return (
        <GenericForm {...FormProperties} />
    )
};

export default InwordStock;