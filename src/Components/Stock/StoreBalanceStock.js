import { createContext, useContext } from "react"
import { AuthContext } from "../Auth/Auth"
import { FirmContext } from "../Contexts/FirmContext"
import { serviceHelpers } from "../../Helpers/ServiceHelpers"
import { useQuery } from "@tanstack/react-query"
import { BALANCE, COMMON_BATCH, INQUIRY_STORE_ACCOUNT_ID, STOCK, UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties"
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent"
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner"
import LeadInStore from "./LeadInStore"

export const StoreBalanceContext = createContext({})

export const StoreBalanceStock = (
    {
        Dashboardtitle = "Dilevery And Invoice Management",
        queryKeyValue = STOCK,
        BalanceAcc = INQUIRY_STORE_ACCOUNT_ID
    }
) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const queryKey = [
        uid,
        khID,
        UPDATE_ON_INQUIRY,
        BALANCE + BalanceAcc,
        queryKeyValue,
    ]

    const { data, error, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const balance = await serviceHelpers.getProductBalanceOfAccount(khID, BalanceAcc);

            const grouped = balance.reduce((acc, entry) => {
                for (const [inquiryId, quantity] of Object.entries(entry.batches)) {

                    if (inquiryId === COMMON_BATCH) continue;
                    if (quantity === 0) continue;

                    if (!acc[inquiryId]) {
                        acc[inquiryId] = [];
                    }
                    acc[inquiryId].push({
                        quantity,
                        resourceBalance: entry
                    });
                }
                return acc;
            }, {});

            return grouped;

        }
    });


    if (isLoading) {
        return <GenericSpinner />;
    }

    if (error) {
        return <GenericErrorComponent error={error} />;
    }

    if (data) {

        return (
            <StoreBalanceContext.Provider value={{ balanceData: data }}>
                <LeadInStore Dashboardtitle={Dashboardtitle} />
            </StoreBalanceContext.Provider>
        )
    }

    return <></>
}