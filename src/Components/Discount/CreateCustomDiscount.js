import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { DELETE_FIELD, FIXED_AMOUNT_ID, QUOTATION, QUOTATION_PENDING, UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { useNavigate } from 'react-router-dom';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { discountProps } from '../../Helpers/ExtraProperties';
import { discountPostDispatch, getDiscountCurrentData } from '../../Helpers/helpers';

const CreateCustomDiscount = ({ item, handleClose }) => {

    const discountFunction = async (state, khID) => {
        if (state.DiscountSlabDropdown.id !== FIXED_AMOUNT_ID) state.discountPrice = DELETE_FIELD;
        if (state.DiscountSlabDropdown.id === FIXED_AMOUNT_ID) state.discount = DELETE_FIELD;

        const note = state.discount
            ? `${state.discount}% Discount Applied`
            : state.discountPrice && `₹${state.discountPrice} Discount Applied`;

        delete state.DiscountSlabDropdown

        state.quotationId = DELETE_FIELD;
        state.quotationDate = DELETE_FIELD;
        state.status = QUOTATION_PENDING;

        return await serviceHelpers.updateLeadStatus(khID, state, state.id, note);
    }

    const navigate = useNavigate();

    const handleReditect = () => {
        navigate(QUOTATION)
        handleClose();
    }

    const successMessage = 'Discount Added Successfuly!';

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Save",
        navigateTo: QUOTATION,
        queryKeyValue: UPDATE_ON_INQUIRY,
        enableVerify: true,
        propertyList: discountProps,
        VerifyAlertComponent: GenericVerifyComponent,
        queryFunction: discountFunction,
        buttonClasses: "",
        currentData: item ? getDiscountCurrentData(item) : {},
        handleCancel: handleReditect,
        afterDispatch: discountPostDispatch,
        enableClear: true
    };

    return (
        <GenericForm
            {...FormProperties}
        />
    )
}
export default CreateCustomDiscount;
