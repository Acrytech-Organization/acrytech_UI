import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { userRolesProp } from '../../Helpers/ExtraProperties';
import { NEW_USERROLES, UPDATE_ON_USERROLE } from '../../Helpers/ConstantProperties';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';

const CreateUserRole = () => {
    const successMessage = "User Role Successfully Added";
    const queryFunction = async (state, khID) => {
        return await serviceHelpers.createUserRole(khID, state)
    }

    const invalidateQueryKey = UPDATE_ON_USERROLE;

    const newFormProps = {
        formTitle: "Add User Role",
        propertyList: userRolesProp,
        queryFunction: queryFunction,
        queryKeyValue: invalidateQueryKey,
        successMessage: successMessage,
        navigateTo: NEW_USERROLES,
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
export default CreateUserRole
