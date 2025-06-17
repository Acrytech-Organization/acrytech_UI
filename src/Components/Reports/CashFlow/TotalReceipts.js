import React from 'react';
import MarkerMonthChart from '../../GenericComponents/Charts/MarkerMonthChart';
import { getTotalReceiptsMarkersQuery } from '../../../Helpers/MarkerHelper';

const TotalReceipts = ({ transform }) => {
    return (
        <MarkerMonthChart
            title={"Cash-In"}
            transform={transform}
            getQueryFn={getTotalReceiptsMarkersQuery}
            syncId='Report' />
    )
};

export default TotalReceipts;