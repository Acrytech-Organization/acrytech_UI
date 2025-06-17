import React from 'react';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { getLocalDateString } from '../../Helpers/helpers';
import { addExpectedDate } from '../../Helpers/ExtraProperties';
import { UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import FormButtons from '../GenericComponents/FormComponent/FormButtons';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { MenuItem } from '@mui/material';

const AddExpectedCloseDate = ({ item, handleClose, handleMenuItemClick }) => {
    const successMessage = "Added Successfuly!";

    const queryFunction = async (state, khID) => {
        const note = "Dispatch Date saved as: " + getLocalDateString(state.expectedCloseDate);
        const returnVal = await serviceHelpers.updateLeadStatus(khID, state, item.id, note);
        handleClose();
        return returnVal;
    }

    const currentData = item.expectedCloseDate ? { expectedCloseDate: item.expectedCloseDate } : {}
    const newFormProps = {
        propertyList: addExpectedDate,
        queryFunction: queryFunction,
        queryKeyValue: UPDATE_ON_INQUIRY,
        successMessage: successMessage,
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        CutomButtonComponent: ({ onClick }) => (<FormButtons onSaveClick={() => { onClick(); handleClose(); }} handleCancel={handleClose} />),
        addButtonText: "Save",
        buttonClasses: '',
        showAlertDialog: false,
        enableClear: true,
        currentData: currentData
    }

    const content = (
        <GenericForm
            {...newFormProps}
        />
    )

    const onClick = () => handleMenuItemClick(content, "Set Expected Close Date");

    return (
        <MenuItem onClick={onClick}>Set Close Date</MenuItem>
    )
};

export default AddExpectedCloseDate;