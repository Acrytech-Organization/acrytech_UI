import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { commonFontSize, commonFontWeight } from '../../Helpers/ConstantProperties';
import { ShowNumber } from '../../Helpers/helpers';

const InquiryMaterialReport = ({ combinedRMList, balanceResult }) => {
    const batches = []

    balanceResult.forEach(element => {
        const productBatches = element.data[0].batches;
        const product = combinedRMList[element.data[0].resourceID];

        Object.values(productBatches)
            .filter(batch => batch.BatchObject !== undefined)
            .forEach(batch => {
                batches.push({
                    name: product.name,
                    unit: product.unit,
                    units: batch.units,
                    vendor: batch.BatchObject.name,
                    rate: batch.BatchObject.rate
                })
            });
    });

    return (
        <Grid2
            container
            mx={"auto"}
            width={{ xs: "100%", md: "70%" }}
            padding={1}
            border={1}
            borderColor={"grey.500"}
            borderRadius={1}>

            <Grid2 xs={12} paddingBottom={2}>
                <Typography component={"span"} fontWeight={commonFontWeight}>
                    <Grid2 container textAlign={"center"}>

                        <Grid2 md={3}>
                            Material
                        </Grid2>

                        <Grid2 md={3}>
                            Vendor
                        </Grid2>

                        <Grid2 md={3}>
                            Qty
                        </Grid2>

                        <Grid2 md={3}>
                            Rate
                        </Grid2>

                    </Grid2>
                </Typography>
            </Grid2>

            {
                batches.map((result, index) => {
                    return (
                        <Grid2 key={index} xs={12} textAlign={"center"}>
                            <Typography component={"span"} fontSize={commonFontSize}>
                                <Grid2 container>
                                    <Grid2 xs={12} md={3}>
                                        {result.name}
                                    </Grid2>

                                    <Grid2 xs={12} md={3}>
                                        {result.vendor}
                                    </Grid2>

                                    <Grid2 xs={12} md={3} textAlign={"right"}>
                                        {ShowNumber(result.units, 2) + " " + result.unit}
                                    </Grid2>

                                    <Grid2 xs={12} md={3} textAlign={"right"}>
                                        {ShowNumber(result.rate, 2, true)}
                                    </Grid2>
                                </Grid2>
                            </Typography>
                        </Grid2>
                    )
                })
            }
        </Grid2>
    )
};

export default InquiryMaterialReport;