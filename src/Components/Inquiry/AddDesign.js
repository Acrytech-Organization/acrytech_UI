import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { addDesignProp } from '../../Helpers/ExtraProperties';
import { ADD_DESIGN_FILE, DELETE_FIELD, UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { MenuItem } from '@mui/material';
import FormButtons from '../GenericComponents/FormComponent/FormButtons';
import { addDaysToToday } from '../../Helpers/helpers';

const AddDesign = ({ handleMenuItemClick, item, handleClose }) => {
    const successMessage = "Added Successfuly!";

    const queryFunction = async (state, khID) => {
        state.followUpDate = addDaysToToday(2);
        state.designNeeded = DELETE_FIELD;
        state.storeNeeded = true

        const note = "Design Files saved and status changed to Design Ready";

        return await serviceHelpers.updateLeadStatus(khID, state, item.id, note)
    }

    const currentData = item.designUrl ? { designUrl: item.designUrl } : {}
    const newFormProps = {
        propertyList: addDesignProp,
        queryFunction: queryFunction,
        queryKeyValue: UPDATE_ON_INQUIRY,
        successMessage: successMessage,
        navigateTo: ADD_DESIGN_FILE,
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

    const onClick = () => handleMenuItemClick(content, "Add Design Files")

    return (
        <MenuItem onClick={onClick}>Add Design Files</MenuItem>
    )
}
export default AddDesign
