import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { getVendorPartyList } from '../../Helpers/ExtraProperties';
import { MANAGE_VENDORS, UPDATE_ON_VENDOR, VENDOR } from '../../Helpers/ConstantProperties';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';

const CreateVendorForm = () => {
    const successMessage = "Vendor Created Successfully";

    const queryFunction = async (state, khID) => {
        state.type = VENDOR;
        const response = await serviceHelpers.createParty(khID, state);
        return response
    }

    const invalidateQueryKey = UPDATE_ON_VENDOR;

    const newFormProps = {
        formTitle: "Add Vendor",
        propertyList: getVendorPartyList(),
        queryFunction: queryFunction,
        queryKeyValue: invalidateQueryKey,
        navigateTo: MANAGE_VENDORS,
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
export default CreateVendorForm