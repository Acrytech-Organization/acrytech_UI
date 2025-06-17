import { UPDATE_ON_PARTY } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import PartyDropDown from "../Party/PartyDropDown";

export default function AllPartyDropDown({ getSelected, attributes, currentValue, props }) {
    return <PartyDropDown
        getSelected={getSelected}
        attributes={attributes}
        currentValue={currentValue}
        props={props}
        updateKey={UPDATE_ON_PARTY}
        getFn={serviceHelpers.getParties}
        freeSolo={false} />
}