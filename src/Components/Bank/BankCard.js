import { CardContent, Typography } from "@mui/material"
import { serviceHelpers } from "../../Helpers/ServiceHelpers"
import { BANK_DETAIL, EDIT_BANK_ACCOUNT, UPDATE_BANK_ACCOUNT } from "../../Helpers/ConstantProperties"
import GenericCard from "../GenericComponents/DataView/GenericCard"
import { useNavigate } from "react-router-dom"
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent"

export const BankCard = ({ item }) => {
    const navigate = useNavigate();
    const successMessage = "Bank Account SuccessFully Deleted "

    const deleteBankAccount = async (khid) => {
        return await serviceHelpers.deleteAccount(khid, item.id)
    }

    const ContentComponent = ({ item }) => {
        return (
            <CardContent>
                <Typography noWrap gutterBottom variant="h5" component="div">
                    {item.name}
                </Typography>
            </CardContent>
        )
    }

    const onDelete = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: BANK_DETAIL,
        queryFunction: deleteBankAccount,
        queryKeyValue: UPDATE_BANK_ACCOUNT,
    }

    const onEdit = () => {
        navigate(EDIT_BANK_ACCOUNT, { state: item })
    }

    return <GenericCard
        key={item.id}
        contentComponent={ContentComponent}
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
    />
}