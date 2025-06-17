import { getTotalPurchaseMarkersQuery } from '../../../Helpers/MarkerHelper';
import MarkerMonthChart from '../../GenericComponents/Charts/MarkerMonthChart';

const TotalPurchaseSale = ({ transform }) => {
    return (
        <MarkerMonthChart
            title={"Purchase"}
            transform={transform}
            getQueryFn={getTotalPurchaseMarkersQuery}
            syncId='Report' />
    )
};

export default TotalPurchaseSale;