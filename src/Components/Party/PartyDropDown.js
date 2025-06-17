import { useContext } from "react";
import CustomerDropDownDisplayComponent from "../Customer/CustomerDropDownDisplayComponent";
import GenericDropDown from "../GenericComponents/DropDown/GenericDropDown";
import { FirmContext } from "../Contexts/FirmContext";
import { AuthContext } from "../Auth/Auth";

export default function PartyDropDown({
    getSelected,
    attributes,
    currentValue,
    props,
    updateKey,
    getFn,
    freeSolo,
    setInputValue }) {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        updateKey,
    ];

    const queryFunction = async (pageParam) => getFn(khID, null, null, pageParam);

    const DisplayComponent = ({ props, option }) => <li {...props} key={option.id}>
        <CustomerDropDownDisplayComponent option={option} />
    </li>

    return (
        <GenericDropDown
            currentValue={currentValue}
            attributes={attributes}
            queryKey={queryKey}
            queryFunction={queryFunction}
            inputLabel={props.data.item.displayName || "Company Name"}
            getSelected={getSelected}
            searchFilter={(option) => option.name + " " +
                option.contactPerson + " " +
                option.phoneNumber + " " +
                option.email + " " +
                option.city
            }
            getOptionLabel={(option) => option.name}
            DisplayComponent={DisplayComponent}
            props={props}
            setInputValue={setInputValue}
            freeSolo={freeSolo}
        />
    );
}