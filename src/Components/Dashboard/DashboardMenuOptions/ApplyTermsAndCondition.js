import React, { useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { SET_QUOTE_TERMS } from '../../../Helpers/ConstantProperties';
import { RouteContext } from '../InquiryDashboard';

const ApplyTermsAndCondition = ({ item }) => {
    const { routeDetails } = useContext(RouteContext)

    const navigate = useNavigate();
    const currentPath = routeDetails.path;

    const handleApplyTermsAndCondition = () => {
        navigate(SET_QUOTE_TERMS, {
            state: { inquiry: { ...item }, navigateTo: currentPath }
        })

    }

    return (
        <MenuItem onClick={handleApplyTermsAndCondition}>Quotation Terms</MenuItem>
    );
};

export default ApplyTermsAndCondition;