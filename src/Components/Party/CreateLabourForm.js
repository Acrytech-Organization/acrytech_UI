import React from 'react';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { getLabourList } from '../../Helpers/ExtraProperties';
import { LABOURS, MANAGE_LABOURS, UPDATE_ON_LABOUR } from '../../Helpers/ConstantProperties';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';

const CreateLabourForm = () => {
    const successMessage = "Labour Created Successfully";

    const queryFunction = async (state, khID) => {
        state.type = LABOURS;
        const response = await serviceHelpers.createParty(khID, state);
        return response
    }

    const invalidateQueryKey = UPDATE_ON_LABOUR;

    const newFormProps = {
        formTitle: "Add Labour",
        propertyList: getLabourList(),
        queryFunction: queryFunction,
        queryKeyValue: invalidateQueryKey,
        navigateTo: MANAGE_LABOURS,
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Add",
        enableVerify: true,
        VerifyAlertComponent: GenericVerifyComponent,
        buttonClasses: "",
        currentData: {},
        enableClear: true
    }

    return (
        <GenericForm
            {...newFormProps}
        />
    )
};

export default CreateLabourForm;