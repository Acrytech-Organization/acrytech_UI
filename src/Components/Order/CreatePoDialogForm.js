import { useContext } from 'react';
import { DateContext } from '../Contexts/DateContext';
import dayjs from 'dayjs';
import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { addPoNumber } from '../../Helpers/ExtraProperties';
import { getUpdatedProp } from '../../Helpers/helpers';

const CreatePoDialogForm = ({ data, callback, onClose }) => {
    const { currentDate } = useContext(DateContext);

    const successMessage = 'PO Added Successfully!';

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Save",
        queryKeyValue: UPDATE_ON_INQUIRY,
        enableVerify: true,
        propertyList: !data.contactPerson
            ? [{ item: getUpdatedProp(addPoNumber[0].item, { ...addPoNumber[0].item, required: true }) }]
            : addPoNumber,
        VerifyAlertComponent: GenericVerifyComponent,
        queryFunction: callback,
        buttonClasses: "",
        currentData: {
            ...data,
            poDate: dayjs(currentDate),
        },
        handleCancel: onClose,
        enableClear: true,
    };

    return <GenericForm {...FormProperties} />;
};

export default CreatePoDialogForm;
