import { useContext } from 'react';
import { UPDATE_ON_DISCOUNT, DISCOUNT, CREATE_DISCOUNT } from '../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import DataView from '../GenericComponents/DataView/DataView';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import DataviewList from '../GenericComponents/DataView/DataviewList';
import DiscountCard from './DiscountCard';

function Discount() {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_DISCOUNT,
        DISCOUNT
    ];

    const queryFunction = async (pageParam) => {
        return await serviceHelpers.getDiscountSlab(khID);
    }

    const getSearchableValue = (current) => {
        return (
            current.name + " "
            + current.discountRate
        )
    }

    return (
        <DataView
            routeDetails={{ heading: "Discount Slab", subText: "slab" }}
            limitSupported={true}
            getSearchableValue={getSearchableValue}
            queryKeyParameter={queryKey}
            queryFunctionParameter={queryFunction}
            ShowElement={{ Component: DiscountCard }}
            buttonDetails={{ text: "New Discount", navigateTo: CREATE_DISCOUNT }}
            searchingPlaceholder={"Search By Name, discount"}
            DisplayComponent={DataviewList}
        />
    )
}

export default Discount