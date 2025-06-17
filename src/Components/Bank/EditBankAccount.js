import { useLocation } from "react-router-dom"
import AddBankAccount from "./AddBankAccount"
import { serviceHelpers } from "../../Helpers/ServiceHelpers"

export const EditBankAccount = () => {
    const location = useLocation()

    const editBank = async (state, khID) => {
        return await serviceHelpers.updateAccount(khID, state, state.id)
    }

    return <AddBankAccount
        currentData={location.state}
        queryFunction={editBank}
        buttonText="Save"
        successMessage=" Bank Updated SuccessFully "
        formTitle="Edit Bank Detail"
    />
}