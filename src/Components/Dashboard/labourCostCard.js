import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { checkValue, getLocalDateString, ShowNumber } from '../../Helpers/helpers';

const LabourCostCard = ({ item }) => {
    return (
        <Grid2 container>
            <Grid2 xs={12} md={2}>
                {getLocalDateString(item.date)}
            </Grid2>

            <Grid2 xs={12} md={2}>
                {item.name}
            </Grid2>

            <Grid2 xs={12} md={2}>
                {ShowNumber(item.hrs, 2)} Hrs
            </Grid2>

            <Grid2 xs={12} md={2}>
                {ShowNumber(item.units, 2, true)}
            </Grid2>

            <Grid2 xs={12} md={4}>
                {checkValue(item.description)}
            </Grid2>
        </Grid2>
    );
};

export default LabourCostCard;