import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { NEW_DISCOUNT, UPDATE_ON_DISCOUNT } from '../../Helpers/ConstantProperties';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { discountSlabPropList } from '../../Helpers/ExtraProperties';

const CreateDiscount = () => {
    const location = useLocation();
    const currentData = location.state;

    const discountFunction = async (state, khID) => {
        return await serviceHelpers.createDiscountSlab(khID, state);
    }

    const navigate = useNavigate();

    const handleReditect = () => {
        navigate(NEW_DISCOUNT)
    }

    const successMessage = currentData ? 'Edited Successfuly!' : 'Created Successfuly!';

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Add",
        navigateTo: NEW_DISCOUNT,
        queryKeyValue: UPDATE_ON_DISCOUNT,
        enableVerify: true,
        formTitle: 'Discount Slab',
        propertyList: discountSlabPropList,
        VerifyAlertComponent: GenericVerifyComponent,
        queryFunction: discountFunction,
        buttonClasses: "",
        currentData: currentData ? currentData : {},
        handleCancel: handleReditect,
        enableClear: true
    };

    return (
        <GenericForm
            {...FormProperties}
        />
    )
}
export default CreateDiscount;
