import { useNavigate } from "react-router-dom";
import { ADD_BANK, BANK_DETAIL, UPDATE_BANK_ACCOUNT } from "../../Helpers/ConstantProperties";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { bankAccountProp } from "../../Helpers/ExtraProperties";
import { GenericVerifyComponent } from "../GenericComponents/VerifyComponent/FirmVerifyComponent";
import GenericForm from "../GenericComponents/FormComponent/GenericForm";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";

const addBank = async (state, khID) => {
    return await serviceHelpers.createBankAccount(khID, state)
}

const AddBankAccount = ({ queryFunction = addBank, currentData = {}, successMessage = 'Bank Account Added Successfuly!', buttonText = "Add", formTitle = "Add Bank Account" }) => {

    const navigate = useNavigate();

    const handleReditect = () => navigate(BANK_DETAIL);

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: buttonText,
        navigateTo: ADD_BANK,
        queryKeyValue: UPDATE_BANK_ACCOUNT,
        enableVerify: true,
        propertyList: bankAccountProp,
        VerifyAlertComponent: GenericVerifyComponent,
        queryFunction: queryFunction,
        buttonClasses: "",
        currentData: currentData,
        handleCancel: handleReditect,
        enableClear: true,
        formTitle: formTitle
    };

    return (
        <GenericForm
            {...FormProperties}
        />
    )
}
export default AddBankAccount;
