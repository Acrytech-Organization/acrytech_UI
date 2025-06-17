import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { AuthContext } from "../Auth/Auth";
import { ALLINQUIRIES, UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { useQuery } from "@tanstack/react-query";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { defaultFilter } from "../../Helpers/helpers";
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import InquiryDashboard from "./InquiryDashboard";
import { INQUIRY_TAG } from "../../Helpers/ExtraProperties";
import { useLocation } from "react-router-dom";

export default function InquiryList({
    filterObject = {},
    filterFunction,
    customQueryKey = [],
    routeDetails = {},
}) {
    const { currentUserObject } = useContext(AuthContext);
    const { khID, currentFirm } = useContext(FirmContext);
    const location = useLocation();

    routeDetails.path = location.pathname;

    const tag = filterObject.tag ? filterObject.tag : INQUIRY_TAG;

    const queryKey = [
        currentUserObject.uid,
        khID,
        UPDATE_ON_INQUIRY,
        ALLINQUIRIES,
        tag
    ]

    filterObject.tag = tag;


    var { data, error, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            let res =
                await serviceHelpers.getAllLeads(
                    khID,
                    null,
                    { tag: tag }
                );

            res = defaultFilter(res, currentUserObject.uid, currentFirm.currentAccess);

            return res;
        }
    });

    if (error) {
        return <GenericErrorComponent error={error} />;
    }

    if (isLoading) {
        return <GenericSpinner />;
    }

    if (filterObject) {
        data = data?.filter(element => {
            return Object.keys(filterObject).every(key =>
                key in element && filterObject[key] && filterObject[key] === element[key]
            )
        })
    }

    if (filterFunction) {
        data = filterFunction(data)
    }


    if (data)
        return <InquiryDashboard leads={data} routeDetails={routeDetails} />

    return <></>
}