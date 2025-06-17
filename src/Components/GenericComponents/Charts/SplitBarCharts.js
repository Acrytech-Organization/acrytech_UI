import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import ReportHeader from '../../Reports/Formats/ReportHeader';
import { ShowNumber } from '../../../Helpers/helpers';
import BarChartDisplay from './BarChart';

const SplitBarCharts = ({ data, transform, title }) => {
    const total = data.reduce((acc, item) => {
        if (item.units) {
            return acc + item.units;
        }
        return acc;
    }, 0);

    return (
        <Grid2 container rowGap={2} minHeight={"300px"}>
            <Grid2 xs={12} className="text-danger">
                <ReportHeader
                    total={ShowNumber(total, 2, true)}
                    header={title}
                    transform={transform} />
            </Grid2>

            <Grid2 xs={12} paddingRight={2}>
                <BarChartDisplay data={data} />
            </Grid2>
        </Grid2>
    )
};

export default SplitBarCharts;