import React from 'react';
import { MenuItem } from '@mui/material';
import { GenericHandleSubmitButton } from '../FormComponent/GenericHandleSubmitButton';
import { GenericVerifyComponent } from '../VerifyComponent/FirmVerifyComponent';

const DeleteMenuItem = ({ known, onDelete }) => {

    const onDeleteProps = {
        CutomButtonComponent: ({ onClick }) => (
            <MenuItem
                sx={{ width: "100%" }}
                disabled={known || onDelete === null}
                onClick={() => onClick()}>
                Delete
            </MenuItem>
        ),
        enableVerify: true,
        VerifyAlertContentComponent: GenericVerifyComponent,
        ...onDelete
    }

    return (
        <GenericHandleSubmitButton key={"delete"} {...onDeleteProps} />
    );
};

export default DeleteMenuItem;