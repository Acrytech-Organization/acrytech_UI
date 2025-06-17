import { CreatePurchseOrderProps, PO_TAG, propertyGroups } from "../../Helpers/ExtraProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { ACCOUNT_USER_LEVEL_ID, CONVERTED, PURCHASE_ORDER, REFERANCE, REFERANCE_ID, STORE_MANAGER_USER_LEVEL_ID } from "../../Helpers/ConstantProperties";
import { addDaysToToday } from "../../Helpers/helpers";
import CreateInquiry from "../Inquiry/CreateInquiry";
import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";

const CreatePurchaseOrder = () => {
    const { currentFirm } = useContext(FirmContext);

    const queryFunction = async (khID, state, currentDate) => {
        state.tag = PO_TAG;
        state.name = "Purchase Order";

        state.lastUpdated = currentDate;
        state.followUpDate = addDaysToToday(2, currentDate);

        state.orderDate = currentDate;
        state.validTill = addDaysToToday(15, state.orderDate)

        state.sourceOfLead = REFERANCE;
        state.sourceOfLeadId = REFERANCE_ID;

        state.status = CONVERTED;

        state.effectAccess = [
            ACCOUNT_USER_LEVEL_ID,
            STORE_MANAGER_USER_LEVEL_ID
        ];

        const refId = await serviceHelpers.getSeriesNumber(
            khID,
            { prefix: currentFirm.prefixes.po });

        state.refranceId = refId.id;

        return await serviceHelpers.MakePurchaseOrder(khID, state, currentDate);
    }

    return (
        <CreateInquiry
            propertyList={CreatePurchseOrderProps}
            queryFunction={queryFunction}
            successMessage="Order created successfully"
            formTitle="New Purchase Order"
            productGroup={propertyGroups.rm_grp}
            navigateTo={PURCHASE_ORDER}
            editSaleRate={true}
        />
    )
};

export default CreatePurchaseOrder;
