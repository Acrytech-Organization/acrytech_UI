import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { commonFontSize, commonFontWeight } from '../../Helpers/ConstantProperties';
import { checkValueNumber } from '../../Helpers/helpers';

const InquiryVendorOutQty = ({ reqList }) => {
    if (reqList.length === 0) return <></>

    return (
        <Grid2 container>
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
                        <Grid2 md>Ready To Dispatch</Grid2>
                    </Grid2>
                </Typography>
            </Grid2>

            <Grid2 xs={12} >
                <Typography component={"span"} fontSize={commonFontSize}>
                    {
                        reqList.map((product, index) => {
                            return (

                                <Grid2
                                    key={index}
                                    textAlign={"center"}
                                    alignItems={"center"}
                                    container
                                    className="p-2">

                                    <Grid2 xs={12} md={3}>{product.name}</Grid2>

                                    <Grid2 xs={12} md>
                                        {checkValueNumber(product.planned)}
                                    </Grid2>

                                </Grid2>
                            )
                        })
                    }
                </Typography>
            </Grid2>
        </Grid2>
    )
};

export default InquiryVendorOutQty;