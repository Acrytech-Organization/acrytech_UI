import { useContext } from "react";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { TAX_INVOICE, UPDATE_ON_INQUIRY, UPDATE_ON_VOUCHER } from "../../Helpers/ConstantProperties";
import InvoiceCard from "../TaxInvoice/invoiceCard";
import DataView from "../GenericComponents/DataView/DataView";
import DataviewList from "../GenericComponents/DataView/DataviewList";
import Grid2 from "@mui/material/Unstable_Grid2";

export const CustomerInvoices = ({ customerId }) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_VOUCHER,
        UPDATE_ON_INQUIRY,
        TAX_INVOICE,
        "CustomerRespectiveInvoices",
        customerId
    ];

    const queryFunction = async (pageParam) => {
        return await serviceHelpers.getInvoices(khID, pageParam, null, customerId);
    }

    const getSearchableValue = (current) => current.id

    return (
        <Grid2 className="h-100">
            <DataView
                routeDetails={{ heading: `Tax Invoices` }}
                getSearchableValue={getSearchableValue}
                queryKeyParameter={queryKey}
                DisplayComponent={DataviewList}
                queryFunctionParameter={queryFunction}
                ShowElement={{ Component: InvoiceCard }}
                searchingPlaceholder={"Search By Id and Customer Name"}
            />
        </Grid2>
    )
}