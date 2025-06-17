import { useContext } from 'react';
import { AuthContext } from '../../Auth/Auth';
import GenericDropDown from '../../GenericComponents/DropDown/GenericDropDown';
import { FirmContext } from '../../Contexts/FirmContext';
import { UPDATE_ON_USERROLE, USER_ROLES_DROPDOWN } from '../../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../../Helpers/ServiceHelpers';

function UserLevelDropDown({ getSelected, attributes, currentValue, props }) {
  const { uid } = useContext(AuthContext);
  const { khID } = useContext(FirmContext);

  const queryKey = [
    uid,
    khID,
    UPDATE_ON_USERROLE,
    USER_ROLES_DROPDOWN,
  ];

  const queryFunction = async (pageParam) => serviceHelpers.getUserRoles(khID, null, null, pageParam);

  const DisplayComponent = ({ props, option }) => <li {...props} key={option.id}>
    {option.name}
  </li>

  return (
    <GenericDropDown
      currentValue={currentValue}
      attributes={attributes}
      queryKey={queryKey}
      queryFunction={queryFunction}
      inputLabel="Select Level"
      getSelected={getSelected}
      searchFilter={(option) => option.name}
      getOptionLabel={(option) => option.name}
      DisplayComponent={DisplayComponent}
      props={props}
    />
  );
}

export default UserLevelDropDown;
