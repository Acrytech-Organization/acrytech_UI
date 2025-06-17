import { useLocation } from "react-router-dom";
import { DELETE_FIELD, HOME, QUOTATION_PENDING, UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { getPropsWithProductList, InquiryProps } from "../../Helpers/ExtraProperties";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { GenericEditForm } from "../GenericComponents/FormComponent/GenericEditForm";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { canEditSaleRate, getInquiryCurrentData, getInquiryObject, InquiryPostDispatch } from "../../Helpers/helpers";
import InquiryProductDetails from "./InquiryProductDetails";
import { FirmContext } from "../Contexts/FirmContext";
import { useContext } from "react";

export const EditInquiry = () => {
    const location = useLocation();
    const { currentFirm } = useContext(FirmContext);
    const successMessage = "Inquiry Edited SuccessFully "
    const returnPath = location.state?.return ? location.state.return : HOME;

    const editInquiryFunction = async (state, khID) => {
        const updatedState = getInquiryObject(state);
        if (state.quotationId) {
            state.lastUpdated = new Date();
            state.quotationId = DELETE_FIELD
            state.quotationDate = DELETE_FIELD
            state.status = QUOTATION_PENDING
            // status change to Quotation Needed and we are deleting the quotation id because the inquiry has been
            // update and the quotation id is valid for previous inquiry
        }

        state.products = await serviceHelpers.createCustomProducts(khID, state.products);

        return await serviceHelpers.updateInquiry(khID, updatedState, updatedState.id);
    }

    const EditProps = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: returnPath,
        queryKeyValue: UPDATE_ON_INQUIRY,
        formTitle: "Edit Inquiry",
        propertyList: getPropsWithProductList(InquiryProps, canEditSaleRate(currentFirm)),
        currentData: getInquiryCurrentData(location.state.inquiry),
        queryFunction: editInquiryFunction,
        afterDispatch: InquiryPostDispatch,
        GroupDetailsComponent: InquiryProductDetails,
    }

    return <GenericEditForm
        {...EditProps}
    />
}