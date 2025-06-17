import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { createUser, updateUserList } from '../../Helpers/ExtraProperties';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { NEW_USERS, UPDATE_ON_USER } from '../../Helpers/ConstantProperties';
import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { deepCopyObject, getDateInputValue } from '../../Helpers/helpers';
import UserLevelTable from './UserLevel/UserLevelTable';
import { useContext } from 'react';
import { FirmContext } from '../Contexts/FirmContext';
import { AuthContext } from '../Auth/Auth';

const CreateUser = () => {
    const { khID } = useContext(FirmContext);
    const { currentUserObject } = useContext(AuthContext);
    const location = useLocation()
    const current = location.state;
    const propertyList = deepCopyObject(createUser);
    var propertyListWithGrids = null;

    const checkUserLevel = async (firmID, state) => {
        const { levels, approved, id } = state;

        delete state.levels
        delete state.isGroupEdited;

        if (levels && current) {
            state.levelID = [];
            const updatePromises = levels.map(async (currentLevel) => {

                state.levelID.push(currentLevel.id);

                if (!approved) state.approved = true;

                return await serviceHelpers.updateUser(firmID, state, id);
            });

            await Promise.all(updatePromises);

            return { id: current.id };
        }

        delete state.khID;
        return await serviceHelpers.createUser(firmID, state);
    };


    const queryFunction = async (state) => {

        const firmID = state.khID
        return await checkUserLevel(firmID, state)
    }

    if (current) {
        current.khID = khID;
        current.joiningDate = current.joiningDate ? current.joiningDate : getDateInputValue()
        current.levels = current.level.map((level, i) => ({ id: current.levelID[i], name: level }))
        propertyListWithGrids = updateUserList

    }

    const navigate = useNavigate();

    const successMessage = "User Created Successfuly!";

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Add User",
        navigateTo: NEW_USERS,
        queryKeyValue: UPDATE_ON_USER,
        queryFunction: queryFunction,
        enableVerify: true,
        VerifyAlertComponent: GenericVerifyComponent,
        formTitle: "Create User",
        propertyList: propertyList,
        propertyListWithGrids: propertyListWithGrids,
        currentData: current || currentUserObject,
        handleCancel: () => navigate(NEW_USERS),
        enableClear: true,
        buttonClasses: "",
        GroupDetailsComponent: UserLevelTable,
        afterDispatch: (currentState) => currentState.userLevel,
        displayGroupWithProp: true
    };

    return (
        <GenericForm
            {...FormProperties}
        />
    )
}
export default CreateUser
