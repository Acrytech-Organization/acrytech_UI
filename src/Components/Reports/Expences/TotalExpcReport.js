import MarkerMonthChart from "../../GenericComponents/Charts/MarkerMonthChart";
import { getTotalExpensesMarkersQuery } from "../../../Helpers/MarkerHelper";

const TotalExpcReport = ({ transform }) => {
    return (
        <MarkerMonthChart
            title={"Expenses"}
            transform={transform}
            getQueryFn={getTotalExpensesMarkersQuery}
            syncId='Report' />
    )
};

export default TotalExpcReport;