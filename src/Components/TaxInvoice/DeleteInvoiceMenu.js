import React, { useContext } from 'react';
import DeleteInvoice from './DeleteInvoice';
import { MenuItem } from '@mui/material';
import { checkAdmin } from '../../Helpers/helpers';
import { FirmContext } from '../Contexts/FirmContext';

const DeleteInvoiceMenu = ({ item, showDialog }) => {
    const { currentFirm } = useContext(FirmContext);

    const onMenuClick = () => {
        showDialog({
            contents: <DeleteInvoice item={item} />,
            title: "Delete Invoice " + item.id
        });
    }

    if (checkAdmin(currentFirm.currentAccess)) {
        return (
            <MenuItem onClick={() => onMenuClick()}>
                {"Delete Invoice"}
            </MenuItem>
        );
    }

    return <></>
};

export default DeleteInvoiceMenu;