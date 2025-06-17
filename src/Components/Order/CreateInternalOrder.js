import { useContext } from "react";
import { INTERNAL_ORDER, NEW_ORDER, UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { InquiryForm, propertyGroups } from "../../Helpers/ExtraProperties";
import { getInquiryObject, getUpdatedProp, InquiryPostDispatch, inwordIdWithDate } from "../../Helpers/helpers";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import GenericForm from "../GenericComponents/FormComponent/GenericForm";
import { GenericVerifyComponent } from "../GenericComponents/VerifyComponent/FirmVerifyComponent";
import InquiryProductDetails from "../Inquiry/InquiryProductDetails";
import { DateContext } from "../Contexts/DateContext";
import { useLocation } from "react-router-dom";

export const CreateInternalOrder = () => {
    const { currentData } = useContext(DateContext)
    const handleReditect = () => { }
    const location = useLocation();
    const returnPath = location.state?.returnTo || NEW_ORDER

    const queryFunction = async (state, khID) => {
        state = getInquiryObject(state);
        delete state.isGroupEdited;

        state.id = inwordIdWithDate(0)
        state.internalOrder = true;
        state.customerName = INTERNAL_ORDER;

        return await serviceHelpers.createOrder(khID, state, currentData)
    }

    const successMessage = "Internal Order Is Created"

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Create Internal Order",
        navigateTo: returnPath,
        queryKeyValue: UPDATE_ON_INQUIRY,
        enableVerify: true,
        propertyList: [{
            ...propertyGroups.product_grp,
            group: [
                getUpdatedProp(InquiryForm.ProductDropDown, { enableNewAdd: false }),
                InquiryForm.quantity,
                // InquiryForm.Rate,
                InquiryForm.ProductDescription,
            ]
        }],
        VerifyAlertComponent: GenericVerifyComponent,
        queryFunction: queryFunction,
        buttonClasses: "",
        currentData: {},
        handleCancel: handleReditect,
        enableClear: true,
        afterDispatch: InquiryPostDispatch,
        formTitle: "Add Internal Order",
        GroupDetailsComponent: InquiryProductDetails,
    };

    return (
        <GenericForm
            {...FormProperties}
        />
    )
}