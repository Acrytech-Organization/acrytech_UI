import { useContext, useState } from "react";
import { CUSTOMER_STATUS, INQ_ONTRACK, INQ_OVERDUE, PARTIES, UPDATE_ON_CUSTOMER, UPDATE_ON_PARTY } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import Dashboard from "../Dashboard/Dashboard";
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import { useQuery } from "@tanstack/react-query";
import { CustomerCard } from "./CustomerCard";

export const CustomerDashboard = () => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const [searchString, setSearchString] = useState('');

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_CUSTOMER,
        UPDATE_ON_PARTY,
        PARTIES,
        CUSTOMER_STATUS
    ]

    var { data, error, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => await serviceHelpers.getAllCustomers(khID)
    });

    if (error) {
        return <GenericErrorComponent error={error} />;
    }

    if (isLoading) {
        return <GenericSpinner />;
    }

    const getSearchableValue = (current) => {
        return (
            current.name + " "
            + current.city + " "
            + current.phoneNumber + " "
            + current.email + " "
            + current.contactPerson
        )
    }

    if (data && searchString !== "") {
        data = data.filter((current) => {
            var valueToSearchIn = getSearchableValue(current).toLowerCase();
            var valueToSearch = searchString.toLowerCase();

            return valueToSearchIn.includes(valueToSearch);
        })
    }
    return (<Dashboard
        searchString={searchString}
        setSearchString={setSearchString}
        leads={data}
        CustomBodies={{ [INQ_OVERDUE]: CustomerCard }}
        CustomBody={CustomerCard}
        disableCard={{
            [INQ_ONTRACK]: true,
        }}
    />
    )
}