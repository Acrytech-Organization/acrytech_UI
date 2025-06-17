import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { getLocalDateString, ShowNumber } from '../../Helpers/helpers';
import { commonFontSize, commonFontWeight } from '../../Helpers/ConstantProperties';
import { getExpenceDetails, getExpenceType } from './InquiryCalculations';

const InquiryCostReport = ({ costStatement, cData }) => {
    const totalCost = costStatement.reduce((acc, cost) => acc + cost.units, 0);

    return (
        <Grid2
            container
            mx={"auto"}
            padding={1}
            rowGap={1}
            border={1}
            borderColor={"grey.500"}
            borderRadius={1}>

            <Grid2 xs={12} paddingBottom={2}>
                <Typography component={"span"} fontWeight={commonFontWeight}>
                    <Grid2 container textAlign={"center"}>
                        <Grid2 md={2}>
                            Date
                        </Grid2>

                        <Grid2 md={3}>
                            Type
                        </Grid2>

                        <Grid2 md={4}>
                            Details
                        </Grid2>

                        <Grid2 md={3}>
                            Amount
                        </Grid2>
                    </Grid2>
                </Typography>
            </Grid2>
            {
                costStatement.map((cost, index) => {
                    if (index === 0) return <React.Fragment key={index}></React.Fragment>

                    if (cost.units === 0) return <React.Fragment key={index}></React.Fragment>

                    return (
                        <Grid2 key={index} xs={12}>
                            <Typography component={"span"} fontSize={commonFontSize}>
                                <Grid2 container textAlign={"center"}>

                                    <Grid2 xs={12} md={2}>
                                        {getLocalDateString(cost.date)}
                                    </Grid2>

                                    <Grid2 xs={12} md={3}>
                                        {getExpenceType(cost)}
                                    </Grid2>

                                    <Grid2 xs={12} md={4} textAlign={"left"}>
                                        {getExpenceDetails(cost)}
                                    </Grid2>

                                    <Grid2 xs={12} md={3} textAlign={"right"} paddingRight={1}>
                                        {ShowNumber(cost.units, 2, true)}
                                    </Grid2>

                                </Grid2>
                            </Typography>
                        </Grid2>
                    )
                })
            }

            <Grid2 xs={12} paddingTop={3}>
                <Typography component={"span"} fontWeight={commonFontWeight}>
                    <Grid2 container>
                        <Grid2 md={4}>
                        </Grid2>

                        <Grid2 md={4}>
                            Total
                        </Grid2>

                        <Grid2 md={4} textAlign={"right"}>
                            {ShowNumber(totalCost, 2, true)}
                        </Grid2>
                    </Grid2>
                </Typography>
            </Grid2>

            <Grid2 xs={12}>
                <Typography component={"span"} fontWeight={commonFontWeight}>
                    <Grid2 container>
                        <Grid2 md={4}>
                        </Grid2>

                        <Grid2 md={4}>
                            Income
                        </Grid2>

                        <Grid2 md={4} textAlign={"right"}>
                            {ShowNumber(cData.totalTaxableAmount, 2, true)}
                        </Grid2>
                    </Grid2>
                </Typography>
            </Grid2>

            <Grid2 xs={12}>
                <Typography component={"span"} fontWeight={commonFontWeight}>
                    <Grid2 container>
                        <Grid2 md={4}>
                        </Grid2>

                        <Grid2 md={4}>
                            Profit/Loss
                        </Grid2>

                        <Grid2 md={4} textAlign={"right"}>
                            {ShowNumber(cData.totalTaxableAmount - totalCost, 2, true)}
                        </Grid2>
                    </Grid2>
                </Typography>
            </Grid2>

        </Grid2>
    )
};

export default InquiryCostReport;