import { INQUIRY_REJECT_TAG, InquiryRejectionObj } from "../../Helpers/ExtraProperties";
import DashboardUpdateStatusAction from "./DashboardUpdateStatusAction";
import DashboardCardDate from "./DashboardCardDate";
import { DashboardCardRejection } from "./DashboardCardRejection";
import { CREATE_NEW_INQUIRY, DESIGN, NEW_PRODUCTION, NEW_QUALITY_CHECK, OPEN, PRODUCT_TYPE_PROCESS, PRODUCT_TYPE_RAW, STOCK_MANAGEMENT } from "../../Helpers/ConstantProperties";
import CurrentStatus from "./CurrentStatus";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { UserCardContent } from "../User/UserCardContent";
import { CATEGORIES } from "../../Helpers/helpers";
import StockDashboard from "../Stock/StockDashboard";
import QualityCheckContent from "../Qualikty Check/QualityCheckContent";
import { UserActionContext } from "./SummaryPage";
import { useContext } from "react";
import { HomeStockDashboardCard } from "../Stock/HomeStockDashboardCard";

function DashboardCardBody({ item }) {
    const { routeDetails } = useContext(UserActionContext);

    const statusCategory = CATEGORIES[item.status] ? CATEGORIES[item.status] : InquiryRejectionObj;

    if (item.tag === INQUIRY_REJECT_TAG) {
        return (
            <DashboardCardRejection
                statusCategory={statusCategory}
                item={item}
            />
        )
    }

    if ((item.status === OPEN && !item.assignee) || routeDetails?.reassignInquiry) {
        return (
            <UserCardContent
                item={item}
            />
        )
    }
    if (item.status === DESIGN) {
        item.checked = false;
        switch (routeDetails?.navigateTo) {
            case CREATE_NEW_INQUIRY:
                return <HomeStockDashboardCard item={item} />
            case STOCK_MANAGEMENT:
                return <StockDashboard reqType={PRODUCT_TYPE_RAW} item={item} />
            case NEW_PRODUCTION:
                return <StockDashboard reqType={PRODUCT_TYPE_PROCESS} item={item} />
            case NEW_QUALITY_CHECK:
                return <QualityCheckContent item={item} />
            default:
                break;
        }
    }

    return (
        <>
            <Grid2 xs={12} sm={4} md={2}>
                <DashboardCardDate item={item} />
            </Grid2>
            <Grid2 xs={12} sm={4} md={2}>
                <CurrentStatus statusCategory={statusCategory} />
            </Grid2>
            <Grid2 xs={6} sm={4} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <DashboardUpdateStatusAction
                    item={item}
                    statusCategory={statusCategory}
                />
            </Grid2>
        </>
    )
}

export default DashboardCardBody;
