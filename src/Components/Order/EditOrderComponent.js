import { useLocation } from "react-router-dom";
import { NEW_ORDER, UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { CreateOrderProps, getPropsWithProductList } from "../../Helpers/ExtraProperties";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { GenericEditForm } from "../GenericComponents/FormComponent/GenericEditForm";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { canEditSaleRate, getInquiryCurrentData, getInquiryObject, InquiryPostDispatch } from "../../Helpers/helpers";
import InquiryProductDetails from "../Inquiry/InquiryProductDetails";
import { FirmContext } from "../Contexts/FirmContext";
import { useContext } from "react";

export const EditOrderComponent = () => {
    const location = useLocation();
    const { currentFirm } = useContext(FirmContext);
    const successMessage = "Order Edited SuccessFully "
    const returnPath = location.state.returnTo || NEW_ORDER

    const editPartyQueryFunction = async (state, khID) => {
        const updatedState = getInquiryObject(state);
        updatedState.storeNeeded = true;
        return await serviceHelpers.updateOrder(khID, updatedState, updatedState.id)
    }
    const propertyList = getPropsWithProductList(CreateOrderProps, canEditSaleRate(currentFirm));

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
}