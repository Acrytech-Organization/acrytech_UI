import { UPDATE_ON_CUSTOMER } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import PartyDropDown from "../Party/PartyDropDown";

function CustomerDropDown({ getSelected, attributes, currentValue, props }) {
    const PartyProps = {
        freeSolo: false
    }

    if (!props.data.item.disableFreeSolo) {
        PartyProps.freeSolo = true;
        PartyProps.setInputValue = getSelected;
    }

    return <PartyDropDown
        getSelected={getSelected}
        attributes={attributes}
        currentValue={currentValue}
        props={props}
        updateKey={UPDATE_ON_CUSTOMER}
        getFn={serviceHelpers.getCustomers}
        {...PartyProps} />
}

export default CustomerDropDown;
