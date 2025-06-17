import { createContext, useContext, useState } from "react";
import { DateContext } from "../Contexts/DateContext";
import { useNavigate } from "react-router-dom";
import { getGroupedLeads } from "../../Helpers/helpers";
import GenericHeader from "../GenericComponents/Header/GenericHeader";
import Grid2 from "@mui/material/Unstable_Grid2";
import InquiryListContent from "./InquiryListContent";

export const RouteContext = createContext({});

export default function InquiryDashboard({
    leads,
    routeDetails,
}) {
    const { currentDate } = useContext(DateContext);
    const [searchString, setSearchString] = useState("");

    const navigate = useNavigate();

    const newInqNavigate = () => {
        navigate(routeDetails?.navigateTo);
    };

    const getSearchableValue = (current) => {
        return (
            current.customerName + " "
            + current.sourceOfLead + " "
            + current.contactPerson + " "
            + current.contactPhone + " "
            + current.city + " "
            + current.poNumber
        )
    }

    if (leads && searchString !== "") {
        leads = leads.filter((current) => {
            var valueToSearchIn = getSearchableValue(current).toLowerCase();
            var valueToSearch = searchString.toLowerCase();

            return valueToSearchIn.includes(valueToSearch);
        })
    }

    const statusCard = getGroupedLeads(leads, currentDate);

    return (
        <>
            <GenericHeader
                title={routeDetails?.headerTitle}
                textFieldLabel="Search by Company Name, Contact Person, Phone Number or Source of Lead and PO Number"
                buttonText={routeDetails?.buttonText}
                setSearchString={setSearchString}
                searchString={searchString}
                onButtonClick={newInqNavigate}
            />

            <Grid2>
                {
                    statusCard.map((element, index) => {
                        return (
                            <Grid2 key={index} xs={12}>
                                <RouteContext.Provider value={{
                                    routeDetails: routeDetails,
                                    statusGroup: element
                                }}>
                                    <InquiryListContent />
                                </RouteContext.Provider>
                            </Grid2>
                        )
                    })
                }
            </Grid2>
        </>
    );
}