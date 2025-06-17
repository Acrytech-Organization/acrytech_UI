import { useContext } from "react";
import { UPDATE_ON_INQUIRY_SOURCE, INQUIRY_SOURCE_DROPDOWN } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import GenericDropDown from "../GenericComponents/DropDown/GenericDropDown";

function InquirySourcesDropdown({ getSelected, attributes, currentValue, props }) {
  const currentAuthContext = useContext(AuthContext);
  const { currentFirm } = useContext(FirmContext);
  const uid = currentAuthContext.currentUserObject.uid;

  const queryKey = [
    uid,
    currentAuthContext.currentUserObject.uid,
    currentFirm.khID,
    UPDATE_ON_INQUIRY_SOURCE,
    INQUIRY_SOURCE_DROPDOWN,
  ];

  const queryFunction = async (pageParam) => {
    return await serviceHelpers.getInquirySources(currentFirm.khID, null, null, pageParam);
  };

  const DisplayComponent = ({ props, option }) => (
    <li {...props} key={option.id}>
      {option.name}
    </li>
  );

  return (
    <GenericDropDown
      queryKey={queryKey}
      queryFunction={queryFunction}
      inputLabel="Source of Inquiry"
      getSelected={getSelected}
      searchFilter={(option) => option.name}
      getOptionLabel={(option) => `${option.name}`}
      DisplayComponent={DisplayComponent}
      attributes={attributes}
      currentValue={currentValue}
      props={props}
    />
  );
}

export default InquirySourcesDropdown;