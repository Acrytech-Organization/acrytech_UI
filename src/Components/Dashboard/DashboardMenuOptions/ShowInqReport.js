import React, { useContext } from 'react';
import { checkAdmin } from '../../../Helpers/helpers';
import { FirmContext } from '../../Contexts/FirmContext';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { INQUIRY_REPORT } from '../../../Helpers/ConstantProperties';

const ShowInqReport = ({ inquiry }) => {
    const { currentFirm } = useContext(FirmContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(INQUIRY_REPORT, { state: { inquiry } });
    };

    return (
        <MenuItem
            onClick={handleClick}
            disabled={!checkAdmin(currentFirm.currentAccess)}>
            Show Report
        </MenuItem>
    );
};

export default ShowInqReport;