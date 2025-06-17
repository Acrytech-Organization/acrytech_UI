import React from 'react';
import MarkerGroupChart from '../../GenericComponents/Charts/MarkerGroupChart';
import { CUSTOMER_TAG } from '../../../Helpers/MarkerHelper';

const MonthlyCustomerSale = ({ date }) => {
    return (
        <MarkerGroupChart
            title={"Customers Sale"}
            tag={CUSTOMER_TAG}
            transform={true}
            date={date} />
    )
};

export default MonthlyCustomerSale;