import React, { useContext } from 'react';
import { FirmContext } from '../../Contexts/FirmContext';
import { DateContext } from '../../Contexts/DateContext';
import dayjs from 'dayjs';
import { getDetailsFromMarker, getProductionMarkerQuery } from '../../../Helpers/MarkerHelper';
import { AuthContext } from '../../Auth/Auth';
import { useQueries } from '@tanstack/react-query';
import GenericSpinner from '../../GenericComponents/FormComponent/GenericSpinner';
import { GenericErrorComponent } from '../../GenericComponents/FormComponent/GenericAlertComponent';
import Grid2 from '@mui/material/Unstable_Grid2';
import BarChartDisplay from '../../GenericComponents/Charts/BarChart';
import { Box } from '@mui/material';

const DailyProduction = () => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const { currentDate } = useContext(DateContext);

    // Get Markers from last 7 days
    const queries = [];

    for (let index = 0; index < 7; index++) {
        const dateForMarker = dayjs(currentDate).add(-index, "day");
        queries.push(getProductionMarkerQuery(uid, khID, dateForMarker))
    }

    const results = useQueries({ queries: queries });

    if (results.some((result) => result.isPending)) return <GenericSpinner />

    // TODO: Need Better Error Handeling
    if (results.some((result) => result.isError)) return <GenericErrorComponent />

    if (results.every((result) => result.isSuccess)) {
        const products = {};

        results.forEach((result) => {
            result.data.forEach((marker) => {
                const details = getDetailsFromMarker(marker.id);

                if (details.id) {
                    const id = details.id;

                    products[id] = products[id] ? products[id] : { entry: [] }
                    products[id].entry.push({
                        name: dayjs(details.date).format("DD-MMM"),
                        units: marker.units,
                        product: marker.name
                    })
                }
            })
        })

        return (
            <Box width={"50%"}>
                <Grid2 container rowSpacing={3} columnSpacing={3} paddingTop={4}>
                    {
                        Object.entries(products).map(([pid, entries]) => {
                            return (
                                <React.Fragment key={pid}>
                                    <Grid2 xs={12}>
                                        <h3>{entries.entry[0].product}</h3>
                                    </Grid2>
                                    <Grid2 xs={12} minHeight={"300px"}>
                                        <BarChartDisplay data={entries.entry} />
                                    </Grid2>
                                </React.Fragment>
                            )
                        })
                    }
                </Grid2>
            </Box>
        )
    }

    return <></>
};

export default DailyProduction;