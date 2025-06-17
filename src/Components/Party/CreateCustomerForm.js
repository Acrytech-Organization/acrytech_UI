import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { getPartyList } from '../../Helpers/ExtraProperties';
import { CUSTOMER, FIFTEEN_DAYS, FIVE_DAYS, MANAGE_CUSTOMERS, SALES_MANAGER_USER_LEVEL_ID, UPDATE_ON_CUSTOMER, UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';
import { useLocation } from 'react-router-dom';
import { addDaysToToday, canEditSaleRate, handlePartyPostDispatch } from '../../Helpers/helpers';
import { DateContext } from '../Contexts/DateContext';
import { useContext } from 'react';
import { FirmContext } from '../Contexts/FirmContext';

const CreateCustomerForm = () => {
    const location = useLocation();
    const { currentDate } = useContext(DateContext);
    const { currentFirm } = useContext(FirmContext);
    const currentData = location.state ? {
        ...location.state.customerData, CustomerDropDown: {
            name: location.state.customerData.name || ''
        }
    } : {};

    currentData.checkSameAddress = true;


    const navigateTo = location.state ? location.state.return : MANAGE_CUSTOMERS;

    const inquiryId = location.state?.inquiryId;
    let days = FIFTEEN_DAYS;
    let followUpDate = addDaysToToday(FIFTEEN_DAYS, currentDate);

    if (inquiryId) {
        followUpDate = addDaysToToday(FIVE_DAYS, currentDate);
        days = FIVE_DAYS;
    }

    const successMessage = "Customer Created Successfully";


    const queryFunction = async (state, khID) => {
        delete state.DiscountSlabDropdown;
        state.type = CUSTOMER;
        state.lastUpdated = new Date();
        state.followUpDate = followUpDate;
        state.entityAccess = [SALES_MANAGER_USER_LEVEL_ID]
        if (currentData.wa_id) state.wa_id = currentData.wa_id;

        const response = await serviceHelpers.createParty(khID, state);

        if (response.id && inquiryId) {
            const customerDetails = {
                customerName: state.name,
                customerId: response.id
            }
            const note = `Customer attached With followUp of ${days} days  to the inquiry`;
            await serviceHelpers.updateLeadStatus(khID, customerDetails, inquiryId, note);

            // await serviceHelpers.inquiryRefranceVoucher(khID, inquiryId, null, response.id)
        }
        return response
    }
    // Invalidate for create Customer at Inquiry
    const invalidateQueryKey = location.state ? UPDATE_ON_INQUIRY : UPDATE_ON_CUSTOMER;

    const newFormProps = {
        formTitle: "Add Customer",
        propertyList: getPartyList(!canEditSaleRate(currentFirm)),
        queryFunction: queryFunction,
        queryKeyValue: invalidateQueryKey,
        navigateTo: navigateTo,
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Add",
        enableVerify: true,
        VerifyAlertComponent: GenericVerifyComponent,
        buttonClasses: "",
        currentData: currentData,
        enableClear: true,
        afterDispatch: handlePartyPostDispatch
    }

    return (
        <GenericForm
            {...newFormProps}
        />
    )
}
export default CreateCustomerForm