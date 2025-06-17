import { useContext } from "react";
import { BALANCE, INQUIRY_STORE_ACCOUNT_ID, INWORD_FG_STOCK, INWORD_RM_STOCK, PRODUCT_TYPE_PROCESS, PRODUCTS, UPDATE_ON_PRODUCT } from "../../Helpers/ConstantProperties";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import DataView from "../GenericComponents/DataView/DataView";
import StockCard from "./StockCard";
import { PRODUCT_TAG } from "../../Helpers/ExtraProperties";
import { OriginContext } from "../Contexts/OriginContext";
import DataviewList from "../GenericComponents/DataView/DataviewList";

export default function StockBalance() {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const { limitFunctionality } = useContext(OriginContext);

    const queryKey = [
        uid,
        khID,
        BALANCE + INQUIRY_STORE_ACCOUNT_ID,
        UPDATE_ON_PRODUCT,
        PRODUCTS
    ];

    const queryFunction = async (pageParam) => {
        return await serviceHelpers.getResourceBalance(
            khID,
            {
                accountID: INQUIRY_STORE_ACCOUNT_ID,
                date: Date.now(),
                tag: PRODUCT_TAG,
            },
            pageParam);
    }

    const getSearchableValue = (current) => {
        return (
            current.resource.name + " "
        )
    }

    const filterData = (data) => {
        return data.filter((balance) => {
            if (balance.units === 0) return false;
            return balance.resource.type !== PRODUCT_TYPE_PROCESS
        })
    }

    const navigateTo = limitFunctionality ? INWORD_FG_STOCK : INWORD_RM_STOCK

    return (
        <DataView
            routeDetails={{ heading: "Stock Management" }}
            limitSupported={true}
            filterData={filterData}
            getSearchableValue={getSearchableValue}
            queryKeyParameter={queryKey}
            queryFunctionParameter={queryFunction}
            ShowElement={{ Component: StockCard }}
            searchingPlaceholder={"Search By Name"}
            DisplayComponent={DataviewList}
            buttonDetails={{ text: "Inword Stock", navigateTo: navigateTo }}
        />
    );
}