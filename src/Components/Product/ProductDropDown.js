import { useContext } from 'react';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { PRODUCTS_DROPDOWN, UPDATE_ON_PRODUCT } from '../../Helpers/ConstantProperties';
import GenericDropDown from '../GenericComponents/DropDown/GenericDropDown';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import { v4 as uuidv4 } from 'uuid';
import { OriginContext } from '../Contexts/OriginContext';

function ProductDropDown({ getSelected, attributes, currentValue, props, additionalItems }) {
    const { uid } = useContext(AuthContext);
    const { limitFunctionality } = useContext(OriginContext);

    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_PRODUCT,
        PRODUCTS_DROPDOWN,
        props.data.item.Producttype
    ];

    const queryFunction = async (pageParam) => {
        const data = await serviceHelpers.getProducts(
            khID,
            null,
            { type: props.data.item.Producttype },
            pageParam
        );

        return data;
    }

    const DisplayComponent = ({ props, option }) => <li {...props} key={option.id}>
        {option.name}
    </li>

    const filterFunction = (option) => option.name + " " + option.productItemcode;

    const propertyList = {
        currentValue: currentValue,
        attributes: attributes,
        queryKey: queryKey,
        queryFunction: queryFunction,
        inputLabel: props.data.item.displayName,
        getSelected: getSelected,
        searchFilter: filterFunction,
        getOptionLabel: (option) => `${option.name}`,
        DisplayComponent: DisplayComponent,
        props: props,
        additionalItems: additionalItems
    }

    if (!limitFunctionality && props.data.enableNewAdd) {
        propertyList.setInputValue = (customProductName) => getSelected(
            { name: customProductName, id: uuidv4() }
        )
        propertyList.freeSolo = true
    }

    return (
        <GenericDropDown
            {...propertyList}
        />
    );
}

export default ProductDropDown;