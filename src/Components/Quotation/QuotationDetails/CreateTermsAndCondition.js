import { GenericVerifyComponent } from '../../GenericComponents/VerifyComponent/FirmVerifyComponent';
import GenericForm from '../../GenericComponents/FormComponent/GenericForm';
import { DELETE_FIELD, GENERATEQUOTATION, QUOTATION_PENDING, UPDATE_ON_INQUIRY } from '../../../Helpers/ConstantProperties';
import { GenericErrorComponent, GenericSuccessComponent } from '../../GenericComponents/FormComponent/GenericAlertComponent';
import { useNavigate } from 'react-router-dom';
import { serviceHelpers } from '../../../Helpers/ServiceHelpers';
import { TermsArray } from '../../../Helpers/ExtraProperties';

const CreateTermsAndCondition = ({ item, navigateTo }) => {
    const currentData = item;

    const TermsAndConditionFunction = async (state, khID) => {
        const note = `Terms and Conditions are updated`
        const Terms = {
            quotationId: DELETE_FIELD,
            quotationDate: DELETE_FIELD,
            status: QUOTATION_PENDING,
            paymentTerms: state.paymentTerms,
            transportTerms: state.transportTerms,
            otherTnC: state.otherTnC,
        }
        await serviceHelpers.updateLeadStatus(
            khID,
            Terms,
            currentData.id,
            note
        );
        return { item: { ...currentData, ...Terms, source: GENERATEQUOTATION }, navigateTo: navigateTo }
    };

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(navigateTo)
    }

    const successMessage = "Terms and Conditions added Successfully."

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Save",
        navigateOnSuccess: navigateTo,
        queryKeyValue: UPDATE_ON_INQUIRY,
        enableVerify: true,
        formTitle: 'Terms And Conditions',
        propertyList: TermsArray,
        VerifyAlertComponent: GenericVerifyComponent,
        queryFunction: TermsAndConditionFunction,
        buttonClasses: "",
        currentData: currentData ? currentData : {},
        handleCancel: handleRedirect,
        enableClear: true
    };

    return (
        <GenericForm
            {...FormProperties}
        />
    )
}
export default CreateTermsAndCondition;
