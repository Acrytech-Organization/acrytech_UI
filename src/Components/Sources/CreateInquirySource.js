import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { inquirySource } from '../../Helpers/ExtraProperties';
import { NEW_INQUIRY_SOURCE, UPDATE_ON_INQUIRY_SOURCE } from '../../Helpers/ConstantProperties';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';

const CreateInquirySource = () => {
    const successMessage = "Inquiry Source Added SuccessFully "
    const queryFunction = async (state, khID) => {
        return await serviceHelpers.createInquirySources(khID, state)
    }

    const invalidateQueryKey = UPDATE_ON_INQUIRY_SOURCE;

    const newFormProps = {
        formTitle: "Add New InquirySource",
        propertyList: inquirySource,
        queryFunction: queryFunction,
        queryKeyValue: invalidateQueryKey,
        navigateTo: NEW_INQUIRY_SOURCE,
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Add",
        enableVerify: true,
        VerifyAlertComponent: GenericVerifyComponent,
        buttonClasses: "",
        currentData: {},
        enableClear: true
    }

    return (
        <GenericForm
            {...newFormProps}
        />
    )
}
export default CreateInquirySource
