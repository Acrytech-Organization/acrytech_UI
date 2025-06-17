import React from "react";
import { useContext } from "react";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { useQueries } from "@tanstack/react-query";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { useLocation } from "react-router-dom";
import InquiryDashboard from "../Dashboard/InquiryDashboard";
import { INQUIRY_TAG } from "../../Helpers/ExtraProperties";
import { StoreBalanceContext } from "./StoreBalanceStock";

function LeadInStore({ Dashboardtitle }) {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const { balanceData } = useContext(StoreBalanceContext);

    const location = useLocation();

    const routeDetails = { path: location.pathname, headerTitle: Dashboardtitle, };

    const queries = Object.keys(balanceData).map((inquiryId) => {
        return {
            queryKey: [
                uid,
                khID,
                UPDATE_ON_INQUIRY,
                inquiryId
            ],
            queryFn: async () => {
                return await serviceHelpers.getOneLead(khID, inquiryId);
            }
        }
    });

    const results = useQueries({ queries: queries });

    if (results.some((result) => result.isPending)) return <GenericSpinner />

    // TODO: Need Better Error Handeling
    if (results.some((result) => result.isError)) return <GenericErrorComponent />

    if (results.every((result) => result.isSuccess)) {
        return <InquiryDashboard
            leads={
                results.filter((result) => result.data.tag === INQUIRY_TAG)
                    .map((inq) => inq.data)
            }
            routeDetails={routeDetails} />
    }

    return <></>
}

export default LeadInStore;
