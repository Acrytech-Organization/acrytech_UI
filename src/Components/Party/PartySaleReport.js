import React from 'react';
import MarkerMonthChart from '../GenericComponents/Charts/MarkerMonthChart';
import { getCustomerSaleMarkersQuery } from '../../Helpers/MarkerHelper';
import { Box } from '@mui/material';

const PartySaleReport = ({ id }) => {
    return (
        <Box padding={1}>
            <MarkerMonthChart
                title={"Sale In Last 12 Months"}
                transform={true}
                getQueryFn={(uid, khID, date) => getCustomerSaleMarkersQuery(uid, khID, date, id)} />
        </Box>
    )
};

export default PartySaleReport;