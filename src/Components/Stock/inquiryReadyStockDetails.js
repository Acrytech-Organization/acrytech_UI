import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { commonFontSize, commonFontWeight } from '../../Helpers/ConstantProperties';
import { checkValueNumber } from '../../Helpers/helpers';
import GenerateOutInvoice from '../Dashboard/DashboardMenuOptions/GenerateOutInvoice';

const InquiryReadyStockDetails = ({ inquiry, balanceDetails }) => {
    return (
        <Grid2 container padding={1}>
            <Grid2 xs={12} className="d-none d-sm-block">
                <Typography
                    component={"span"}
                    fontSize={commonFontSize}
                    fontWeight={commonFontWeight}>
                    <Grid2
                        textAlign={"center"}
                        container
                        className='bg-primary-subtle rounded p-2'>
                        <Grid2 md={3}>Product Name</Grid2>
                        <Grid2 md>Required</Grid2>
                        <Grid2 md>Dispatched</Grid2>
                        <Grid2 md>Ready To Dispatch</Grid2>
                        <Grid2 md>Remaining</Grid2>
                    </Grid2>
                </Typography>
            </Grid2>

            <Grid2 xs={12} >
                <Typography component={"span"} fontSize={commonFontSize}>
                    {
                        balanceDetails.filter((product) => product.showInDispatch)
                            .map((product, index) => (
                                <Grid2
                                    key={index}
                                    textAlign={"center"}
                                    container
                                    className="p-2">

                                    <Grid2 xs={12} md={3}>{product.name}</Grid2>
                                    <Grid2 xs={12} md>
                                        {checkValueNumber(product.required)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        {checkValueNumber(product.dispatched)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        {checkValueNumber(product.inStore)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        {checkValueNumber(product.remainingDispatch)}
                                    </Grid2>

                                </Grid2>
                            ))
                    }
                </Typography>
            </Grid2>

            <Grid2 xs={12} paddingTop={3}>
                <Box>
                    <Grid2 container columnSpacing={2}>
                        <Grid2 xs={12} md></Grid2>

                        <Grid2 xs={12} md={2} >
                            <GenerateOutInvoice item={inquiry} balanceDetails={balanceDetails} />
                        </Grid2>

                        <Grid2 xs={12} md></Grid2>
                    </Grid2>
                </Box>
            </Grid2>
        </Grid2>
    )
};

export default InquiryReadyStockDetails;