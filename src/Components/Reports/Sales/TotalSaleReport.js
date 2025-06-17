import { getTotalSaleMarkersQuery } from '../../../Helpers/MarkerHelper';
import MarkerMonthChart from '../../GenericComponents/Charts/MarkerMonthChart';

const TotalSaleReport = ({ transform }) => {
    return (
        <MarkerMonthChart
            title={"Sale"}
            transform={transform}
            getQueryFn={getTotalSaleMarkersQuery}
            syncId='Report' />
    )
};

export default TotalSaleReport;