import React from 'react';
import ActionButtons from '../GenericComponents/Buttons/ActionButtons';
import { NO_DATA } from '../../Helpers/ExtraProperties';
import Typography from '@mui/material/Typography'

const InquiryProductActionButtons = ({
    isEditing,
    startEditing,
    cancelEditing,
    clearField,
    index,
    allowActions,
    addButtonExtraProps,
    item,
    groupFieldName = 'products',
    onSave
}) => {

    const handleEdit = () => {
        startEditing(index);
    };

    const handleCancel = () => {
        cancelEditing();
    };

    const handleDelete = () => {
        clearField(groupFieldName, index);
    };

    return (
        <>
            {allowActions && !addButtonExtraProps.enableAdd && (
                <ActionButtons
                    isEditing={isEditing}
                    onEdit={isEditing ? handleCancel : handleEdit}
                    onDelete={handleDelete}
                    onCancel={isEditing ? handleCancel : undefined}
                    onSave={onSave}
                />
            )}
            {addButtonExtraProps.enableAdd && !allowActions && (
                <ActionButtons enableAdd={addButtonExtraProps.enableAdd} onAdd={() => addButtonExtraProps.getSelectedItem(item)} />
            )}
            {
                !allowActions && <Typography className='text-center w-100 align-item-center' variant="body1" color="initial">
                    {NO_DATA}
                </Typography>
            }
        </>
    );
};

export default InquiryProductActionButtons;
