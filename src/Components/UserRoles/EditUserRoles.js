import { userRolesProp } from "../../Helpers/ExtraProperties";
import { useLocation } from "react-router-dom";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { UPDATE_ON_USERROLE } from "../../Helpers/ConstantProperties";
import { GenericEditForm } from "../GenericComponents/FormComponent/GenericEditForm";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";

export const EditUserRole = () => {
    const location = useLocation();
    const successMessage = "User Role SuccessFully Edited "

    const editUserRoleQueryFunction = async (state, khid) => {
        return await serviceHelpers.updateUserRole(khid, state, location.state.id)
    }

    const EditProps = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: "/UserRoles",
        queryKeyValue: UPDATE_ON_USERROLE,
        formTitle: "Edit UserRole",
        propertyList: userRolesProp,
        currentData: { name: location.state.name },
        queryFunction: editUserRoleQueryFunction,
    }

    return <GenericEditForm
        {...EditProps}
    />
}