import React from 'react';
import MarkerGroupChart from '../../GenericComponents/Charts/MarkerGroupChart';
import { HSN_TAG } from '../../../Helpers/MarkerHelper';

const MonthlyHSNSale = ({ date }) => {
    return (
        <MarkerGroupChart
            title={"HSN Sale"}
            tag={HSN_TAG}
            transform={true}
            date={date} />
    )
};

export default MonthlyHSNSale;