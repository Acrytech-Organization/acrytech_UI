import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { NEW_ORDER } from '../../Helpers/ConstantProperties';
import CreateInquiry from '../Inquiry/CreateInquiry';
import { CreateOrderProps } from '../../Helpers/ExtraProperties';
import { createServerErrorMsg } from '../../Helpers/helpers';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { DateContext } from '../Contexts/DateContext';

const CreateOrder = () => {
    const { currentDate } = useContext(DateContext);

    const queryFunction = async (khID, state, currentDate) => {

        if (!state.poNumber && !state.contactPerson) {
            return Promise.reject(createServerErrorMsg("Please Add Customer Name Or PO Number"));
        }
        return await serviceHelpers.createOrder(khID, state, currentDate);
    }

    const currentData = {
        poDate: dayjs(currentDate)
    }

    return (
        <CreateInquiry
            propertyList={CreateOrderProps}
            queryFunction={queryFunction}
            successMessage="Order created successfully"
            formTitle="Add New Order"
            navigateTo={NEW_ORDER}
            currentData={currentData}
        />
    )
}
export default CreateOrder
