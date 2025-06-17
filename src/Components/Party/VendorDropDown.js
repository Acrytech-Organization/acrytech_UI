import { UPDATE_ON_VENDOR } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import PartyDropDown from "../Party/PartyDropDown";

export default function VendorDropDown({ getSelected, attributes, currentValue, props }) {
    return <PartyDropDown
        getSelected={getSelected}
        attributes={attributes}
        currentValue={currentValue}
        props={props}
        updateKey={UPDATE_ON_VENDOR}
        getFn={serviceHelpers.getVendors}
        freeSolo={false} />
}