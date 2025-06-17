import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { ADVANCE_PAYMENT_TERM, OPEN_INQUIRIES, TRANSPORT_TERM, UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { getPropsWithProductList, InquiryProps, propertyGroups } from '../../Helpers/ExtraProperties';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DateContext } from '../Contexts/DateContext';
import InquiryProductDetails from './InquiryProductDetails';
import { canEditSaleRate, checkAdmin, getInquiryObject, InquiryPostDispatch } from '../../Helpers/helpers';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';

const CreateInquiry = ({
    propertyList = InquiryProps,
    queryFunction,
    successMessage,
    navigateTo = OPEN_INQUIRIES,
    currentData = {},
    productGroup = propertyGroups.product_grp,
    editSaleRate = false,
    formTitle }) => {
    const { currentDate } = useContext(DateContext);
    const { currentFirm } = useContext(FirmContext);
    const { currentUserObject } = useContext(AuthContext);

    propertyList = getPropsWithProductList
        (propertyList, (editSaleRate || canEditSaleRate(currentFirm)), productGroup);

    const createInquiryFunction = async (state, khID) => {
        state = getInquiryObject(state);
        if (!checkAdmin(currentFirm.currentAccess)) {
            state.assignee = {
                id: currentUserObject.uid,
                displayName: currentUserObject.displayName
            }
        }

        state.paymentTerms = state.paymentTerms || ADVANCE_PAYMENT_TERM;
        state.transportTerms = state.transportTerms || TRANSPORT_TERM;

        state.products = await serviceHelpers.createCustomProducts(khID, state.products);

        const response = await queryFunction(khID, state, currentDate);

        return response;
    }

    const navigate = useNavigate();

    const handleReditect = () => {
        navigate(navigateTo)
    }

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Add",
        navigateTo: navigateTo,
        queryKeyValue: UPDATE_ON_INQUIRY,
        enableVerify: true,
        formTitle: formTitle,
        propertyList: propertyList,
        VerifyAlertComponent: GenericVerifyComponent,
        queryFunction: createInquiryFunction,
        buttonClasses: "",
        currentData: currentData,
        handleCancel: handleReditect,
        afterDispatch: InquiryPostDispatch,
        GroupDetailsComponent: InquiryProductDetails,
        enableClear: true
    };

    return (
        <GenericForm
            {...FormProperties}
        />
    )
}
export default CreateInquiry
