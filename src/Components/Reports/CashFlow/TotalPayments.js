import React from 'react';
import { getTotalPaymentssMarkersQuery } from '../../../Helpers/MarkerHelper';
import MarkerMonthChart from '../../GenericComponents/Charts/MarkerMonthChart';

const TotalPayments = ({ transform }) => {
    return (
        <MarkerMonthChart
            title={"Cash-Out"}
            transform={transform}
            getQueryFn={getTotalPaymentssMarkersQuery}
            syncId='Report' />
    )
};

export default TotalPayments;