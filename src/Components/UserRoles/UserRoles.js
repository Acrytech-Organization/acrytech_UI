import { useContext } from "react";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { CREATEUSERROLE, UPDATE_ON_USERROLE } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import DataView from "../GenericComponents/DataView/DataView";
import { UserRoleCard } from "./UserRoleCard";

export const UserRoles = () => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_USERROLE];

    const queryFunction = async (pageParam) => await serviceHelpers.getUserRoles(khID, null, null, pageParam);

    const getValueToSearch = (current) => {
        return (
            current.name
        )
    }


    return (
        <DataView
            routeDetails={{ heading: "UserRoles", subText: "Roles" }}
            limitSupported={true}
            queryKeyParameter={queryKey}
            queryFunctionParameter={queryFunction}
            getSearchableValue={getValueToSearch}
            ShowElement={{ Component: UserRoleCard }}
            buttonDetails={{ text: "New UserRole", navigateTo: CREATEUSERROLE }}
            searchingPlaceholder={" Search By Name "}
        />
    )
}