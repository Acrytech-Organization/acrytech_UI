import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { AuthContext } from "../Auth/Auth";
import { PROCESSESS, PRODUCTION_PLAN_RESOURCE_ID, RMLIST } from "../../Helpers/ConstantProperties";
import { useQueries } from "@tanstack/react-query";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import InquiryStockCard from "./InquiryStockCard";
import { getProdPlanQureyObject, getProductResultDetails, getStoreProductQueryObject } from "./InquiryCalculations";
import { DateContext } from "../Contexts/DateContext";
import { useLocation } from "react-router-dom";

export default function InquiryStock() {
    const { uid } = useContext(AuthContext);
    const { khID, currentFirm } = useContext(FirmContext);
    const { currentDate } = useContext(DateContext);
    const location = useLocation()

    const inquiry = location.state.inquiry;
    const dispatch = location.state.dispatch || false;

    const combinedRMList = {};
    const queries = [];
    const productsToManu = [...(inquiry.products || []), ...(inquiry.sfg || [])];

    productsToManu.forEach((product) => {
        // We only worry about the raw materials if there are any processes for the product
        // Otherwise there is no point in checking the raw material balance and requirement.

        // The product without any process will be considered only for trading and not for
        // production. But in case, the firm is marked to disableTrade, then all the products
        // are to be considered for production

        if (product[PROCESSESS]?.length > 0 || currentFirm.disableTrade) {

            product[RMLIST]?.forEach((raw) => {
                combinedRMList[raw.product.id] = 1;
            })
        }

        queries.push(getStoreProductQueryObject(uid, khID, product.product.id, currentDate));
    })

    Object.keys(combinedRMList).map((rmID) => queries.push(
        getStoreProductQueryObject(uid, khID, rmID, currentDate)));

    // Get the balance of Planned Data
    queries.push(getProdPlanQureyObject(uid, khID, inquiry.id, currentDate))

    const results = useQueries({ queries: queries });

    if (results.some((result) => result.isPending)) return <GenericSpinner />

    // TODO: Need Better Error Handeling
    if (results.some((result) => result.isError)) return <GenericErrorComponent />

    if (results.every((result) => result.isSuccess)) {

        // There is only one planned balance query, we are not adding it for the store
        // so we can be sure that the planned balance is for the inquiry.
        const plannedBalanceResult = results.find(
            (res) => res.data[0]?.resourceID === PRODUCTION_PLAN_RESOURCE_ID);

        const plannedBalance = plannedBalanceResult?.data[0];
        const balanceData = getProductResultDetails(
            inquiry,
            plannedBalance,
            results);

        return <InquiryStockCard
            inquiry={inquiry}
            balanceDetails={balanceData}
            dispatch={dispatch} />
    }

    return <></>
}