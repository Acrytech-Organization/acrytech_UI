import React, { useContext } from 'react';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CREATEPARTY, NO_DISCOUNT } from '../../../Helpers/ConstantProperties';
import { PARTY_CUSTOMER_TYPE } from '../../../Helpers/ExtraProperties';
import { RouteContext } from '../InquiryDashboard';

const CreateCustomer = ({ item }) => {
    const { routeDetails } = useContext(RouteContext);
    const navigate = useNavigate();
    const isCustomerConnected = !!item.customerId;

    const onMenuClick = () => {
        const customerData = {
            name: item.customerName,
            email: item.contactEmail,
            phoneNumber: item.contactPhone,
            contactPerson: item.contactPerson,
            city: item.city,
            type: PARTY_CUSTOMER_TYPE,
            pincode: item.pincode,
            shippingAddress: item.address,
            billingAddress: item.address,

            discountRate: NO_DISCOUNT.discountRate,
            discountPlan: NO_DISCOUNT.name,
            discountPlanID: NO_DISCOUNT.id,
            DiscountSlabDropdown: NO_DISCOUNT,
        };

        if (item.wa_id) customerData.wa_id = item.wa_id;

        navigate(CREATEPARTY, {
            state: { customerData: customerData, inquiryId: item.id, return: routeDetails.path }
        });
    };

    return (
        <MenuItem onClick={onMenuClick} disabled={isCustomerConnected}>
            Create Customer
        </MenuItem>
    );
};

export default CreateCustomer;