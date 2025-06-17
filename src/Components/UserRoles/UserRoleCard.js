import { CardContent, Typography } from "@mui/material"
import { serviceHelpers } from "../../Helpers/ServiceHelpers"
import { UPDATE_ON_USERROLE } from "../../Helpers/ConstantProperties"
import GenericCard from "../GenericComponents/DataView/GenericCard"
import { useNavigate } from "react-router-dom"
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent"

export const UserRoleCard = ({ item }) => {
    const navigate = useNavigate();
    const successMessage = "User Role SuccessFully Deleted "

    const deleteUserRoleQueryFunction = async (khid) => {
        return await serviceHelpers.deleteUserRole(khid, item.id)
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
        navigateTo: "/UserRoles",
        queryFunction: deleteUserRoleQueryFunction,
        queryKeyValue: UPDATE_ON_USERROLE,
    }

    const onEdit = () => {
        navigate("/EditUserRole", { state: item })
    }

    return <GenericCard
        key={item.id}
        contentComponent={ContentComponent}
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
    />
}