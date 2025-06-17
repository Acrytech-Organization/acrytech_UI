import { useContext } from "react";
import { RouteContext } from "./InquiryDashboard";
import { UserCardContent } from "../User/UserCardContent";
import { DELIVERY_AND_INVOICE_MANAGEMENT, INQ_OVERDUE, INQ_UNASSGNED, NEW_PRODUCTION, NEW_QUALITY_CHECK, REQUIREMENT, STOCK_MANAGEMENT } from "../../Helpers/ConstantProperties";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CurrentStatus from "./CurrentStatus";
import DashboardCardDate from "./DashboardCardDate";
import GenericProductList from "../GenericComponents/Body/GenericProductList";
import InquiryOwner from "./InquiryOwner"
import { FirmContext } from "../Contexts/FirmContext";
import { getRateDetails } from "../Quotation/RateCalculator";
import InquiryTotalValue from "./InquiryTotalValue";
import { CATEGORIES } from "../../Helpers/helpers";
import DashboardActions from "./DashboardActions";
import { CLOSED_INQUIRY_TAG, INQUIRY_REJECT_TAG, PO_TAG } from "../../Helpers/ExtraProperties";
import { DashboardCardRejection } from "./DashboardCardRejection";
import DashboardCardUserActions from "./DashboardCardUserActions";
import DashboardUpdateStatusAction from "./DashboardUpdateStatusAction";
import InquiryProduction from "./InquiryProduction";
import InquiryQC from "./InquiryQC";
import UnlockInquiryButton from "./UnlockInquiryButton";
import ValidTillDate from "./ValidTillDate";
import ViewPoButton from "../GenericComponents/Buttons/ViewPoButton";
import PoNoDisplay from "../Purchase/PoNoDisplay";
import InquiryDate from "./InquiryDate";
import InquiryPlanning from "./InquiryPlanning";
import InquiryDispatchCard from "./inquiryDispatchCard";

export default function InquiryCardBody({ inquiry, handleDialogOpen }) {
    const { statusGroup, routeDetails } = useContext(RouteContext);
    const { currentFirm } = useContext(FirmContext);



    if (inquiry.tag === INQUIRY_REJECT_TAG) {
        return (
            <DashboardCardRejection item={inquiry} />
        )
    }

    const cData = getRateDetails({
        inquiry: inquiry,
        currentFirm: currentFirm
    })

    // PO inquiry
    if (inquiry.tag === PO_TAG) {
        return (
            <>
                <Grid2 xs={6} md={1.5}>
                    <DashboardCardDate item={inquiry} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <ValidTillDate validTillDate={inquiry.validTill} />
                </Grid2>
                <Grid2 xs></Grid2>
                <Grid2 xs={6} md={2}>
                    <ViewPoButton inquiry={inquiry} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <InquiryTotalValue cData={cData} />
                </Grid2>
                <DashboardCardUserActions item={inquiry} handleDialogOpen={handleDialogOpen} />
                <DashboardActions item={inquiry} />
            </>
        )
    }

    // Closed Inquiry
    if (inquiry.tag === CLOSED_INQUIRY_TAG) {
        return (
            <>
                <Grid2 xs={6} md={1.5}>
                    <PoNoDisplay cData={cData} />
                </Grid2>
                <Grid2 xs={6} md={2}>
                    <DashboardCardDate item={inquiry} />
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <GenericProductList products={inquiry.products || []} />
                </Grid2>
                <Grid2 xs={6} md={2}>
                    <InquiryTotalValue cData={cData} />
                </Grid2>
                <Grid2 xs></Grid2>
                <DashboardActions item={inquiry} />
            </>
        )
    }

    // Locked Inquiry
    if (currentFirm.lockInquiry && statusGroup.name === INQ_OVERDUE) {
        return (
            <>
                <Grid2 xs={6} md={1.5}>
                    <PoNoDisplay cData={cData} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <InquiryDate dateToShow={inquiry.createdAt} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <InquiryOwner inquiry={inquiry} />
                </Grid2>
                <Grid2 xs={6} md={2}>
                    <InquiryTotalValue cData={cData} />
                </Grid2>
                <Grid2 xs={7} md={2}>
                    <UnlockInquiryButton item={inquiry} />
                </Grid2>
            </>
        )
    }

    if (routeDetails.reassignInquiry || statusGroup.name === INQ_UNASSGNED) {
        return <UserCardContent item={inquiry} />
    }

    if (routeDetails.isOrdershowSummary) {
        return (
            <>
                <Grid2 xs={6} md={1.5}>
                    <PoNoDisplay cData={cData} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <InquiryDate dateToShow={inquiry.createdAt} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <InquiryOwner inquiry={inquiry} />
                </Grid2>
                <Grid2 xs={6} md={2}>
                    <InquiryTotalValue cData={cData} />
                </Grid2>
                <Grid2 xs={7} md={2}>
                    <GenericProductList products={inquiry.products || []} />
                </Grid2>
                <DashboardActions item={inquiry} />
            </>
        )
    }

    if (routeDetails.showSummary) {
        // This one for Summary Page, so no actions except cancel
        return (
            <>
                <Grid2 xs={6} md={1.5}>
                    <CurrentStatus statusCategory={CATEGORIES[inquiry.status]} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <InquiryDate dateToShow={inquiry.createdAt} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <InquiryOwner inquiry={inquiry} />
                </Grid2>
                <Grid2 xs={6} md={2}>
                    <InquiryTotalValue cData={cData} />
                </Grid2>
                <Grid2 xs={7} md={2}>
                    <GenericProductList products={inquiry.products || []} />
                </Grid2>
                <DashboardActions item={inquiry} />
            </>
        )
    }
    if (inquiry.designNeeded) {
        return (
            <>
                <Grid2 xs={6} md={3}>
                    <DashboardCardDate item={inquiry} />
                </Grid2>
                <Grid2 xs={12} md={1.5}>
                    <PoNoDisplay cData={cData} />
                </Grid2>
                <Grid2 xs={12} md>
                    <GenericProductList products={inquiry.products || []} />
                </Grid2>
                <DashboardCardUserActions item={inquiry} handleDialogOpen={handleDialogOpen} />
                <DashboardActions item={inquiry} />
            </>
        )
    }

    if (routeDetails.path === STOCK_MANAGEMENT) {
        return (
            <>
                <Grid2 xs={6} md={1.5}>
                    <DashboardCardDate item={inquiry} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <PoNoDisplay cData={cData} />
                </Grid2>
                <Grid2 xs={6} md></Grid2>
                <Grid2 xs={12} md={2} paddingX={1}>
                    <GenericProductList products={inquiry.products || []} />
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <InquiryPlanning inquiry={inquiry} />
                </Grid2>
                <DashboardCardUserActions item={inquiry} handleDialogOpen={handleDialogOpen} />
                <DashboardActions item={inquiry} />
            </>
        )
    }

    if (routeDetails.path === NEW_PRODUCTION) {
        return (
            <>
                <Grid2 xs={6} md></Grid2>
                <Grid2 xs={6} md={1.5}>
                    <PoNoDisplay cData={cData} />
                </Grid2>
                <InquiryProduction inquiry={inquiry} />
                <DashboardCardUserActions item={inquiry} handleDialogOpen={handleDialogOpen} />
                <DashboardActions item={inquiry} />
            </>
        )
    }

    if (routeDetails.path === NEW_QUALITY_CHECK) {
        return (
            <>
                <Grid2 xs={6} md={1.5}>
                    <DashboardCardDate item={inquiry} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <PoNoDisplay cData={cData} />
                </Grid2>
                <Grid2 xs={6} md></Grid2>
                <InquiryQC inquiry={inquiry} />
                <DashboardActions item={inquiry} />
            </>
        )
    }

    if (routeDetails.path === DELIVERY_AND_INVOICE_MANAGEMENT) {
        return (
            <>
                <Grid2 xs={6} md={1.5}>
                    <DashboardCardDate item={inquiry} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <PoNoDisplay cData={cData} />
                </Grid2>
                <Grid2 xs={6} md></Grid2>
                <Grid2 xs={12} md>
                    <GenericProductList products={inquiry.products || []} />
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <InquiryDispatchCard inquiry={inquiry} />
                </Grid2>
                <DashboardActions item={inquiry} />
            </>
        )
    }

    if (routeDetails.path === REQUIREMENT) {
        return (
            <>
                <Grid2 xs={6} md={2}>
                    <CurrentStatus statusCategory={CATEGORIES[inquiry.status]} />
                </Grid2>
                <Grid2 xs={6} md={1.5}>
                    <DashboardCardDate item={inquiry} />
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <GenericProductList products={inquiry.products || []} />
                </Grid2>
                <Grid2 xs={6} md={2}>
                    <DashboardUpdateStatusAction item={inquiry} />
                </Grid2>
                <DashboardCardUserActions item={inquiry} handleDialogOpen={handleDialogOpen} />
                <DashboardActions item={inquiry} />
            </>
        )
    }

    return (
        <>
            <Grid2 xs={6} md={1.5}>
                <PoNoDisplay cData={cData} />
            </Grid2>
            <Grid2 xs={6} md={2}>
                <DashboardCardDate item={inquiry} />
            </Grid2>
            <Grid2 xs={12} md={2}>
                <GenericProductList products={inquiry.products || []} />
            </Grid2>
            <Grid2 xs={6} md={2}>
                <DashboardUpdateStatusAction item={inquiry} />
            </Grid2>
            <DashboardCardUserActions item={inquiry} handleDialogOpen={handleDialogOpen} />
            <DashboardActions item={inquiry} />
        </>
    )
}