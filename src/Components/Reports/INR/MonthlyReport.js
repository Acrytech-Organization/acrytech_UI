import { IconButton, Paper } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useContext, useState } from 'react';
import MonthlyCustomerSale from '../Sales/MonthlyCustomerSale';
import { DateContext } from '../../Contexts/DateContext';
import AddProperty from '../../AddProperties/AddProperty';
import { SchemaTypes } from '../../../Helpers/ExtraProperties';
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const MonthlyReport = () => {
    const { currentDate } = useContext(DateContext);
    const [selectedDate, setSelectedDate] = useState(dayjs(currentDate).subtract(1, 'month'));

    return (
        <Grid2 container alignItems={"center"} rowSpacing={5} padding={2}>
            <Grid2 xs></Grid2>

            <Grid2 xs={1}>
                <IconButton color='primary' onClick={() => {
                    const newDate = dayjs(selectedDate).subtract(1, 'month');
                    setSelectedDate(newDate);
                }}>
                    <ArrowBackIcon />
                </IconButton>
            </Grid2>

            <Grid2 xs={3}>
                <AddProperty
                    data={{
                        item: {
                            displayName: 'Report Month',
                            name: 'documentDate',
                            required: true,
                            type: SchemaTypes.DATEPICKER,
                            helperText: 'Please Select the Date',
                        },
                        extraProps: {
                            views: ['year', 'month']
                        }
                    }}
                    deleteField={(element) => { setSelectedDate(dayjs(currentDate)) }}
                    currentValue={selectedDate}
                    onChange={(e) => setSelectedDate(e.value)}
                />
            </Grid2>

            <Grid2 xs={1}>
                <IconButton color='primary' onClick={() => {
                    const newDate = dayjs(selectedDate).add(1, 'month');
                    setSelectedDate(newDate);
                }} >
                    <ArrowForwardIcon />
                </IconButton>
            </Grid2>

            <Grid2 xs={12}>
                <Paper elevation={2}>
                    <MonthlyCustomerSale date={dayjs(selectedDate)} />
                </Paper>
            </Grid2>

        </Grid2>
    );
};

export default MonthlyReport;