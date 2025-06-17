import React, { useContext } from 'react';
import { AuthContext } from '../../Auth/Auth';
import { FirmContext } from '../../Contexts/FirmContext';
import { DateContext } from '../../Contexts/DateContext';
import dayjs from 'dayjs';
import { useQueries } from '@tanstack/react-query';
import GenericSpinner from '../FormComponent/GenericSpinner';
import { GenericErrorComponent } from '../FormComponent/GenericAlertComponent';
import { getDetailsFromMarker } from '../../../Helpers/MarkerHelper';
import LineChartDisplay from './LineChart';
import { COMMON_BATCH, commonFontSize } from '../../../Helpers/ConstantProperties';
import Grid2 from '@mui/material/Unstable_Grid2';
import ReportHeader from '../../Reports/Formats/ReportHeader';
import { ShowNumber } from '../../../Helpers/helpers';
import { Typography } from '@mui/material';

const MarkerMonthChart = ({ getQueryFn, transform, title, syncId = COMMON_BATCH }) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const { currentDate } = useContext(DateContext);

    const queries = [];
    let total = 0

    for (let index = 0; index < 12; index++) {
        const dateForMarker = dayjs(currentDate).subtract(index, "month");
        queries.push(getQueryFn(uid, khID, dateForMarker))
    }

    const results = useQueries({ queries: queries });

    if (results.some((result) => result.isPending)) return <GenericSpinner />

    // TODO: Need Better Error Handeling
    if (results.some((result) => result.isError)) return <GenericErrorComponent />

    if (results.every((result) => result.isSuccess)) {
        const resultData = [];

        results.forEach((res, index) => {
            const marker = res.data;

            if (!marker || !marker.id) {

                resultData.push({
                    name: dayjs(currentDate).subtract(index, "month").format("MMM-YYYY"),
                    units: 0,
                })

                return
            }

            const details = getDetailsFromMarker(marker.id);

            if (details.id) {

                resultData.push({
                    name: dayjs(details.month).format("MMM-YYYY"),
                    units: marker.units,
                })

                total += marker.units;
            }
        })

        return (
            <Typography component={"span"} fontSize={commonFontSize} noWrap={true}>
                <Grid2 container rowGap={2} minHeight={"300px"}>
                    <Grid2 xs={12} className="text-danger">
                        <ReportHeader
                            total={ShowNumber(total, 2, true)}
                            header={title}
                            transform={transform} />
                    </Grid2>

                    <Grid2 xs={12} paddingRight={2}>
                        <LineChartDisplay data={resultData.reverse()} syncId={syncId} />
                    </Grid2>
                </Grid2>
            </Typography>
        )

    }

    return <></>
};

export default MarkerMonthChart;