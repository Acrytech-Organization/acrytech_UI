import { CircularProgress } from "@mui/material";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { AuthContext } from "../Auth/Auth";
import React, { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { useQuery } from "@tanstack/react-query";
import { IN_STOCK_INQUIRIES, UPDATE_ON_INQUIRY, UPDATE_ON_VOUCHER } from "../../Helpers/ConstantProperties";
import { checkIfPresent, DecodeServerError, getGroupedLeads } from "../../Helpers/helpers";
import { GenericAlert } from "../GenericComponents/Alerts/GenericAlert";
import { INQUIRY_REJECT_TAG } from "../../Helpers/ExtraProperties";
import { DateContext } from "../Contexts/DateContext";
import DashboardContent from "../Dashboard/DashboardContent";

function DisplayLeadsInStore({ leadID, searchString, getSearchableValue, leadDetails }) {

    const { uid} = useContext(AuthContext);
    const { currentDate } = useContext(DateContext);
    const { khID } = useContext(FirmContext);

    var { data, isLoading, error } = useQuery({
        queryKey: [
            uid,
            khID,
            UPDATE_ON_VOUCHER,
            IN_STOCK_INQUIRIES,
            UPDATE_ON_INQUIRY,
            leadID
        ],
        queryFn: async () => await serviceHelpers.getOneLead(khID, leadID)
    });

    if (error) return <GenericAlert error={DecodeServerError(error)} />

    if (isLoading) return <CircularProgress />

    if (data?.tag === INQUIRY_REJECT_TAG) return <></>

    if (!checkIfPresent(data, searchString, getSearchableValue)) return <></>

    const getUpdatedProductsFromBalance = (balanceProducts, inquiryProducts) => {
        return balanceProducts.map(element => {
            const inquiryProduct = inquiryProducts.find(product => product.product.id === element.resourceId)
            return {
                ...inquiryProduct,
                units: element.quantity,
            }
        });
    }

    const updatedData = { ...data, products: getUpdatedProductsFromBalance(leadDetails, data.products) } ;

    const statusCard = getGroupedLeads([updatedData], currentDate);

    return (<>
                {
                    statusCard.map((element, index) => {
                        return (
                            <DashboardContent
                                key={index}
                                data={element.data}
                                tagColor={element.tagColor}
                            />
                        )
                    })
                }
    </>)
}

export default DisplayLeadsInStore;
