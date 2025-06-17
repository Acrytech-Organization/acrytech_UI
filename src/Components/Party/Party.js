import { useContext } from 'react';
import { UPDATE_ON_PARTY, PARTIES } from '../../Helpers/ConstantProperties';
import DataView from '../GenericComponents/DataView/DataView';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import PartyCardComponent from './PartyCardComponent';
import DataviewList from '../GenericComponents/DataView/DataviewList';

const Party = ({ qKey, queryFn, heading, btnText, navigateTo }) => {
  const { uid } = useContext(AuthContext);
  const { khID } = useContext(FirmContext);

  const queryKey = [
    uid,
    khID,
    qKey,
    UPDATE_ON_PARTY,
    PARTIES,
  ];

  const queryFunction = async (pageParam) => {
    return await queryFn(khID, null, null, pageParam);
  }

  const getSearchableValue = (current) => {
    return (
      current.name + " "
      + current.city + " "
      + current.phoneNumber + " "
      + current.email + " "
      + current.contactPerson
    )
  }

  return (
    <DataView
      routeDetails={{ heading: heading, subText: heading }}
      limitSupported={true}
      getSearchableValue={getSearchableValue}
      queryKeyParameter={queryKey}
      queryFunctionParameter={queryFunction}
      ShowElement={{ Component: PartyCardComponent }}
      DisplayComponent={DataviewList}
      buttonDetails={{ text: btnText, navigateTo: navigateTo }}
      searchingPlaceholder={" Search By Name , city , phoneNumber , email , contactperson"}
    />
  )
}

export default Party