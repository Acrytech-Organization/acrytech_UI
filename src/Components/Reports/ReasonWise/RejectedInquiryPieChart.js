import { ReasonWiseRejectedInquiryReportColors } from "../../../Helpers/ConstantProperties";
import { INQUIRY_REJECT_TAG, rejectComments } from "../../../Helpers/ExtraProperties";
import { DashBoardController } from "../../Dashboard/DashBoardController";
import PieChartComponent from "../../GenericComponents/Charts/PieChartComponent";

function RejectedInquiryPieChart() {

    const pieChart = ({ leads }) => {
        leads = Object.groupBy(leads, ({ rejectionReasonId }) => rejectionReasonId)
        const data = Object.entries(leads).map(([key, value]) => ({ label: rejectComments[Number(key) - 1]?.message, value: value.length }));

        return (
            <PieChartComponent data={data}
                colors={ReasonWiseRejectedInquiryReportColors}
                showTotal={true}
                totalLabel="Rejected Inquiries"
                tiltle="Reason Wise Rejection"
            />
        )
    }

    return <DashBoardController
        RenderedComponent={pieChart}
        tag={INQUIRY_REJECT_TAG}
    />;
}

export default RejectedInquiryPieChart;