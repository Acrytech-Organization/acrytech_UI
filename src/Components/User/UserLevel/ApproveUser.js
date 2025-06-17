import { serviceHelpers } from "../../../Helpers/ServiceHelpers";
import { UPDATE_ON_USER } from "../../../Helpers/ConstantProperties";
import { ApproveUserSuccessComponent, ApproveUserErrorComponent } from "./ApproveUserDialogComponent";
import { VerifySubmitComponent } from "../../GenericComponents/FormComponent/VerifySubmitComponent";
import GenericForm from "../../GenericComponents/FormComponent/GenericForm";
import { updateUserLevel } from "../../../Helpers/ExtraProperties";

function ApproveUser({ item }) {

    const updateQueryFunction = async (state, khID) => {
        item.levelID.push(state.userLevel.id)
        const userProp = { levelID: item.levelID, approved: true }
        return await serviceHelpers.updateUser(khID, userProp, item.id)
    }

    const formProperties = {
        propertyList: updateUserLevel,
        queryFunction: updateQueryFunction,
        enableVerify: true,
        VerifyAlertComponent: VerifySubmitComponent,
        ErrorComponent: ApproveUserErrorComponent,
        SuccessComponent: ApproveUserSuccessComponent,
        navigateTo: "/Users",
        addButtonText: "Approve",
        queryKeyValue: UPDATE_ON_USER,
        currentData: {},
    };



    return (
        <GenericForm
            {...formProperties}
        />
    )
}

export default ApproveUser;