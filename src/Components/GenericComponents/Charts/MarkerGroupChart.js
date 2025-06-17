import React, { useContext } from 'react';
import { AuthContext } from '../../Auth/Auth';
import { FirmContext } from '../../Contexts/FirmContext';
import { getMonthSaleForTagMarkersQuery } from '../../../Helpers/MarkerHelper';
import { useQuery } from '@tanstack/react-query';
import GenericSpinner from '../FormComponent/GenericSpinner';
import { GenericErrorComponent } from '../FormComponent/GenericAlertComponent';
import Grid2 from '@mui/material/Unstable_Grid2';
import SplitBarCharts from './SplitBarCharts';
import { Alert, Typography } from '@mui/material';
import { commonFontSize, largeFontSize } from '../../../Helpers/ConstantProperties';
import { ShowNumber } from '../../../Helpers/helpers';

const MarkerGroupChart = ({ date, tag, title, transform }) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const query = getMonthSaleForTagMarkersQuery(uid, khID, date, tag);

    const { data, isLoading, error } = useQuery(query);

    if (isLoading) return <GenericSpinner />

    if (error) return <GenericErrorComponent error={error} />

    if (data) {
        if (data.length === 0) {
            return <Alert severity="warning">Data not available for {title} in this month</Alert>
        }

        const max = data[0].units;

        const highRollers = [];
        const lowRollers = [];
        let total = 0;

        data.forEach(item => {
            if (item.units && item.units > max * 0.5) {
                highRollers.push(item);
            }
            else {
                lowRollers.push(item);
            }

            total += item.units;
        });

        return (
            <Typography component={"span"} fontSize={commonFontSize} noWrap={true}>
                <Grid2 container columnSpacing={1}>
                    <Grid2 xs={12} md={4}>
                        <SplitBarCharts data={highRollers} transform={true} title={title + " (High)"} />
                    </Grid2>

                    <Grid2 xs={12} md={8}>
                        <SplitBarCharts data={lowRollers} transform={false} title={title + " (Low)"} />
                    </Grid2>

                    <Grid2 xs={12} textAlign={"right"} padding={2} className="text-primary">
                        <Typography
                            fontSize={largeFontSize}>

                            Total: {ShowNumber(total, 2, true)}
                        </Typography>

                    </Grid2>
                </Grid2>
            </Typography>
        )
    }

    return <></>
};

export default MarkerGroupChart;