import { defaultSources, sourceWiseReportColors } from "../../../Helpers/ConstantProperties";
import { NO_DATA } from "../../../Helpers/ExtraProperties";
import { DashBoardController } from "../../Dashboard/DashBoardController";
import PieChartComponent from "../../GenericComponents/Charts/PieChartComponent";

function SourcewisePieChart() {

     const getSourceNameById = (id) => {
        const source = defaultSources.find(source => source.id === id);
        return source ? source.name : NO_DATA;
      };
      

    const pieChart = ({ leads }) => {
        leads = Object.groupBy(leads, ({ sourceOfLeadId }) => sourceOfLeadId);
        const data = Object.entries(leads).map(([key, value]) => ({ label: getSourceNameById(key), value: value.length }));

        return (
            <PieChartComponent data={data}
                colors={sourceWiseReportColors}
                showTotal={true}
                totalLabel="Total Inquiries"
                tiltle="Source Wise Inquiries"
            />
        )
    }

    return <DashBoardController
        RenderedComponent={pieChart}
    />;
}

export default SourcewisePieChart;