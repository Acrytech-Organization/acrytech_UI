import { UPDATE_ON_LABOUR } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import PartyDropDown from "./PartyDropDown";

const LabourDropDown = ({ getSelected, attributes, currentValue, props }) => {
    return <PartyDropDown
        getSelected={getSelected}
        attributes={attributes}
        currentValue={currentValue}
        props={props}
        updateKey={UPDATE_ON_LABOUR}
        getFn={serviceHelpers.getLabours}
        freeSolo={false} />
};

export default LabourDropDown;