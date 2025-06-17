import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { joinFirm } from '../../Helpers/ExtraProperties';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { HOME, UPDATE_ON_USER } from '../../Helpers/ConstantProperties';
import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';
import { useNavigate } from 'react-router-dom';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';

const Joinfirm = () => {

    const queryFunction = async (state) => {
        return await serviceHelpers.createUser(state.khID)
    }

    const successMessage = 'join Request Send Successfully.'
    const navigate = useNavigate();

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Join",
        navigateTo: HOME,
        queryKeyValue: UPDATE_ON_USER,
        queryFunction: queryFunction,
        enableVerify: true,
        VerifyAlertComponent: GenericVerifyComponent,
        formTitle: "Join Firm",
        propertyList: joinFirm,
        currentData: {},
        handleCancel: () => navigate(HOME)
    };

    return (
        <GenericForm
            {...FormProperties}
        />
    )
}
export default Joinfirm
