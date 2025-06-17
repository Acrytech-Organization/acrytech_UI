import { useContext } from "react";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { UPDATE_BANK_ACCOUNT } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import GenericDropDown from "../GenericComponents/DropDown/GenericDropDown";

function BankDropDown({ getSelected, attributes, currentValue, props }) {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_BANK_ACCOUNT
    ];

    const queryFunction = async (pageParam) => await serviceHelpers.getBankAccount(khID, null, null, pageParam);

    const DisplayComponent = ({ props, option }) => <li {...props} key={option.id}>
        {option.name}
    </li>

    const filterFunction = (current) => current.name + " " + current.bankbranch + " " + current.bankaccount + " " + current.ifsc + " " + current.upiID

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
    }

    return (
        <GenericDropDown
            {...propertyList}
        />
    );
}

export default BankDropDown;