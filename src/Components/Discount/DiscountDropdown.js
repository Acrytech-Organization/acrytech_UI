import { useContext } from 'react';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import {  DISCOUNT_SLAB_DROPDOWN, NO_DISCOUNT, FIXED_DISCOUNT, UPDATE_ON_DISCOUNT } from '../../Helpers/ConstantProperties';
import GenericDropDown from '../GenericComponents/DropDown/GenericDropDown';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';

function DiscountDropdown({ getSelected, attributes, currentValue, props }) {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_DISCOUNT,
        DISCOUNT_SLAB_DROPDOWN,
    ];

    const queryFunction = async (pageParam) => {
        const data = await serviceHelpers.getDiscountSlab(khID)
        data.push(NO_DISCOUNT)
        data.push(FIXED_DISCOUNT);
        return data
    }

    const DisplayComponent = ({ props, option }) => <li {...props} key={option.id}>
        {option.name}
    </li>

    return (
        <GenericDropDown
            currentValue={currentValue}
            attributes={attributes}
            queryKey={queryKey}
            queryFunction={queryFunction}
            inputLabel="Discount Plan"
            getSelected={getSelected}
            searchFilter={(option) => option.name + " " +
                option.discountRate
            }
            getOptionLabel={(option) => option.name}
            DisplayComponent={DisplayComponent}
            props={props}
        />
    );
}

export default DiscountDropdown;
