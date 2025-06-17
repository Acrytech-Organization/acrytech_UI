import { getLabourList, getPartyList, getVendorPartyList } from "../../Helpers/ExtraProperties";
import { useLocation } from "react-router-dom";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { LABOURS, MANAGE_CUSTOMERS, MANAGE_LABOURS, MANAGE_VENDORS, UPDATE_ON_CUSTOMER, UPDATE_ON_LABOUR, UPDATE_ON_VENDOR, VENDOR } from "../../Helpers/ConstantProperties";
import { GenericEditForm } from "../GenericComponents/FormComponent/GenericEditForm";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { canEditSaleRate, handlePartyPostDispatch } from "../../Helpers/helpers";
import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";

export const EditParty = () => {
    const location = useLocation();
    const successMessage = "Party Edited SuccessFully "
    const { currentFirm } = useContext(FirmContext)

    const editPartyQueryFunction = async (state, khID) => {
        delete state.DiscountSlabDropdown;
        return await serviceHelpers.updateParty(khID, state, location.state.id)
    }

    const getCurrentData = (currentData) => {

        if (currentData.discountPlanID && currentData.discountPlan) {
            currentData.DiscountSlabDropdown = {
                name: currentData.discountPlan,
                discountRate: currentData.discount,
                id: currentData.discountPlanID
            }
        }

        if (!currentData.CustomerDropDown) {
            currentData.CustomerDropDown = {
                id: currentData.id,
                name: currentData.name
            };
        }

        return currentData
    }

    const currentData = getCurrentData(location.state);

    // These props are for type CUSTOMER .. which is assumbed to be the case by default.
    var EditProps = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: MANAGE_CUSTOMERS,
        queryKeyValue: UPDATE_ON_CUSTOMER,
        formTitle: "Edit Customer",
        propertyList: getPartyList(!canEditSaleRate(currentFirm)),
        currentData: currentData,
        queryFunction: editPartyQueryFunction,
        afterDispatch: handlePartyPostDispatch
    }

    if (currentData.type === VENDOR) {
        EditProps.navigateTo = MANAGE_VENDORS;
        EditProps.queryKeyValue = UPDATE_ON_VENDOR;
        EditProps.formTitle = "Edit Vendor";
        EditProps.propertyList = getVendorPartyList()
    }

    if (currentData.type === LABOURS) {
        EditProps.navigateTo = MANAGE_LABOURS;
        EditProps.queryKeyValue = UPDATE_ON_LABOUR;
        EditProps.formTitle = "Edit Labour";
        EditProps.propertyList = getLabourList()
    }

    return <GenericEditForm
        {...EditProps}
    />
}