import { useContext, useState } from "react";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { useQuery } from "@tanstack/react-query";
import { INQ_OVERDUE, PRODUCT_TYPE_RAW, UPDATE_ON_INQUIRY, UPDATE_ON_PARTY } from "../../Helpers/ConstantProperties";
import Dashboard from "./Dashboard";
import { INQUIRY_TAG } from "../../Helpers/ExtraProperties";
import { defaultFilter } from "../../Helpers/helpers";
import ReportInquiryCard from "../Reports/DetailedReport/ReportInquiryCard";

export const DashBoardController = ({
    filterObject = {},
    RenderedComponent = Dashboard,
    tag = INQUIRY_TAG,
    filterFunction,
    customQueryKey = [],
    routeDetails,
    CustomBodies,
    withBalance = false,
    productType = PRODUCT_TYPE_RAW,
    disableCard
}) => {
    const { uid } = useContext(AuthContext);
    const { khID, currentFirm } = useContext(FirmContext);
    const [searchString, setSearchString] = useState('');

    filterObject.tag = tag;

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_INQUIRY,
        UPDATE_ON_PARTY,
        tag
    ]

    // As of now we only use status as filter.
    // When we extend the status, we'll need to make room for other
    // filters.

    if (customQueryKey) {
        queryKey.push(...customQueryKey)
    }

    var { data, error, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            let res =
                await serviceHelpers.getAllLeads(
                    khID,
                    null,
                    filterObject,
                    withBalance,
                    productType
                );

            res = defaultFilter(res, uid, currentFirm.currentAccess);

            if (filterFunction) {
                res = filterFunction(res)
            }
            return res;
        }
    });

    if (error) {
        return <GenericErrorComponent error={error} />;
    }

    if (isLoading) {
        return <GenericSpinner />;
    }

    const getSearchableValue = (current) => {
        return (
            current.customerName + " "
            + current.sourceOfLead + " "
            + current.contactPerson + " "
            + current.contactPhone + " "
            + current.city + " "
        )
    }

    if (data && searchString !== "") {
        data = data.filter((current) => {
            var valueToSearchIn = getSearchableValue(current).toLowerCase();
            var valueToSearch = searchString.toLowerCase();

            return valueToSearchIn.includes(valueToSearch);
        })
    }

    if (currentFirm.lockInquiry) CustomBodies = { [INQ_OVERDUE]: ReportInquiryCard };

    return (<RenderedComponent
        searchString={searchString}
        setSearchString={setSearchString}
        leads={data}
        CustomBodies={CustomBodies}
        routeDetails={routeDetails}
        disableCard={disableCard}
    />
    )
}