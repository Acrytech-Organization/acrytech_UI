import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FirmContext } from '../Contexts/FirmContext';
import { PURCHASE_ORDER, UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import { canEditSaleRate, getInquiryCurrentData, getInquiryObject, InquiryPostDispatch } from '../../Helpers/helpers';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { CreatePurchseOrderProps, getPropsWithProductList, propertyGroups } from '../../Helpers/ExtraProperties';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import InquiryProductDetails from '../Inquiry/InquiryProductDetails';
import { GenericEditForm } from '../GenericComponents/FormComponent/GenericEditForm';

const EditPO = () => {
    const location = useLocation();
    const { currentFirm } = useContext(FirmContext);
    const successMessage = "Order Edited SuccessFully "
    const returnPath = PURCHASE_ORDER

    const editPartyQueryFunction = async (state, khID) => {
        const updatedState = getInquiryObject(state);
        return await serviceHelpers.updateOrder(khID, updatedState, updatedState.id)
    }
    const propertyList = getPropsWithProductList
        (CreatePurchseOrderProps, canEditSaleRate(currentFirm), propertyGroups.rm_grp);

    const EditProps = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: returnPath,
        queryKeyValue: UPDATE_ON_INQUIRY,
        formTitle: "Edit Order",
        propertyList: propertyList,
        currentData: getInquiryCurrentData(location.state.inquiry),
        queryFunction: editPartyQueryFunction,
        afterDispatch: InquiryPostDispatch,
        GroupDetailsComponent: InquiryProductDetails,
    }

    return <GenericEditForm
        {...EditProps}
    />
};

export default EditPO;