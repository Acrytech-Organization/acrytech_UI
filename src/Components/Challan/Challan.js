import { useContext } from 'react';
import { UPDATE_ON_VOUCHER, VOUCHER } from '../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import DataView from '../GenericComponents/DataView/DataView';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import DataviewList from '../GenericComponents/DataView/DataviewList';
import ChallanCard from './ChallanCard';

function Challan({ type, natigateTo }) {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_VOUCHER,
        VOUCHER,
        type
    ];

    const queryFunction = async (pageParam) => {
        return await serviceHelpers.getChallans(khID, null, { type: type });
    }

    const getSearchableValue = (current) => {
        return (
            current.refranceId + " "
            + current.customerName + " "
            + current.vendorName
        )
    }

    return (
        <DataView
            routeDetails={{ heading: ` ${type}` }}
            getSearchableValue={getSearchableValue}
            queryKeyParameter={queryKey}
            queryFunctionParameter={queryFunction}
            ShowElement={{ Component: ChallanCard }}
            buttonDetails={{ text: `Create ${type}`, navigateTo: natigateTo }}
            searchingPlaceholder={"Search By Refrance Id"}
            DisplayComponent={DataviewList}
            limitSupported={false}
        />
    )
}

export default Challan;