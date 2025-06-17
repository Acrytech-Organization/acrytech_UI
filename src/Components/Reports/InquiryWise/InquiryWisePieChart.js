import { inquiryReportColors } from "../../../Helpers/ConstantProperties";
import { DashBoardController } from "../../Dashboard/DashBoardController";
import PieChartComponent from "../../GenericComponents/Charts/PieChartComponent";

function InquiryWisePieChart() {

    const pieChart = ({ leads }) => {
        leads = Object.groupBy(leads, ({ status }) => status)
        const data = Object.entries(leads).map(([key, value]) => ({ label: key, value: value.length }));

        return (
            <PieChartComponent data={data}
                colors={inquiryReportColors}
                showTotal={true}
                totalLabel="Total Inquiries"
                tiltle="Total Inquiries"
            />
        )
    }
    

    return <DashBoardController
        RenderedComponent={pieChart}
    />;
}

export default InquiryWisePieChart;