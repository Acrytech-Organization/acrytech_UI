import React, { useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { EDIT_INQUIRY } from '../../../Helpers/ConstantProperties';
import { RouteContext } from '../InquiryDashboard';

const EditInquiryAction = ({ handleClose, item }) => {
    const { routeDetails } = useContext(RouteContext)
    const navigate = useNavigate();

    const handleEditInquiry = () => {
        // Add your edit inquiry logic here
        handleClose();
        navigate(EDIT_INQUIRY, { state: { inquiry: item, return: routeDetails.path } })
    };

    return (
        <MenuItem onClick={handleEditInquiry}>Edit Inquiry</MenuItem>
    );
};

export default EditInquiryAction;