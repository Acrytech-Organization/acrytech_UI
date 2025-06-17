import React, { useContext } from 'react';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EDITORDER } from '../../../Helpers/ConstantProperties';
import { RouteContext } from '../../Dashboard/InquiryDashboard';

const EditOrder = ({ item }) => {
    const { routeDetails } = useContext(RouteContext);
    const navigate = useNavigate();

    const onMenuClick = () => {
        navigate(EDITORDER, { state: { inquiry: item, returnTo: routeDetails.path } });
    };

    return (
        <MenuItem onClick={onMenuClick}>
            Edit Order
        </MenuItem>
    );
};

export default EditOrder;
