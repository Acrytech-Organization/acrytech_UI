import { useContext } from "react";
import CreateFirmForm from "./CreateFirmForm";
import { FirmContext } from "../Contexts/FirmContext";
import { DELETE_FIELD } from "../../Helpers/ConstantProperties";

function EditFirm({ showDefault }) {
    const { currentFirm } = useContext(FirmContext);


    const updateState = (state) => {
        const gstDropdownList = state.gstDropdownList ? [...state.gstDropdownList] : [];
        const gstList = state.gstList;

        if (gstList) {
            gstList.forEach(element => {
                gstDropdownList.push(element.gstin)
            });
            state.gstDropdownList = gstDropdownList;
        }

        if (!state.bankId) {
            state.bankName = DELETE_FIELD;
            state.accountNo = DELETE_FIELD;
            state.ifscCode = DELETE_FIELD;
            state.branch = DELETE_FIELD;
            state.bankId = DELETE_FIELD;
            state.upiID = DELETE_FIELD
        }

        if (gstDropdownList?.length === 0) state.gstDropdownList = DELETE_FIELD;

        delete state.gstList;
        delete state.isGroupEdited;
        return state;
    }

    return (
        <CreateFirmForm showDefault={showDefault} currentFirm={currentFirm} updateState={updateState} />
    )
}

export default EditFirm;