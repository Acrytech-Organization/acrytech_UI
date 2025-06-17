import { useLocation } from "react-router-dom";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { UPDATE_ON_INQUIRY_SOURCE } from "../../Helpers/ConstantProperties";
import { inquirySource } from "../../Helpers/ExtraProperties";
import { GenericEditForm } from "../GenericComponents/FormComponent/GenericEditForm";

export const EditInquirySource = () => {
    const location = useLocation();
    const successMessage = "Inquiry Source SuccessFully Edited "

    const editInquirySourceQueryFunction = async (state, khid) => {
        return await serviceHelpers.updateInquirySource(khid, state, location.state.id)
    }

    const EditProps = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: "/InquirySource",
        queryKeyValue: UPDATE_ON_INQUIRY_SOURCE,
        formTitle: "Edit InquirySource",
        propertyList: inquirySource,
        currentData: location.state,
        queryFunction: editInquirySourceQueryFunction,
    }


    return <GenericEditForm
        {...EditProps}
    />
}