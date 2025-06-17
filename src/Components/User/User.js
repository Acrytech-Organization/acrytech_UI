import { useContext } from 'react';
import { CREATE_USER, UPDATE_ON_USER, USERS } from '../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import DataView from '../GenericComponents/DataView/DataView';
import UserCard from './UserCard';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import DataviewList from '../GenericComponents/DataView/DataviewList';

function Users() {

    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const queryKey = [
        uid,
        khID,
        UPDATE_ON_USER,
        USERS
    ];


    const queryFunction = async () => await serviceHelpers.getUsers(khID);

    const getSearchableValue = (current) => {
        return (
            current.displayName +
            " " + current.level +
            " " + current.email
        )
    }

    return (
        <DataView
            routeDetails={{ heading: "Users", subText: "Users" }}
            limitSupported={false}
            getSearchableValue={getSearchableValue}
            queryKeyParameter={queryKey}
            queryFunctionParameter={queryFunction}
            ShowElement={{ Component: UserCard }}
            DisplayComponent={DataviewList}
            buttonDetails={{ text: "Add User", navigateTo: CREATE_USER }}
            searchingPlaceholder={" Search By DisplayName , Level , Email "}
        />
    );
}

export default Users;
