import React from 'react';
import { Typography, Grid } from "@mui/material";
import { commonFontSize } from "../../../Helpers/ConstantProperties";
import { ShowNumber } from '../../../Helpers/helpers';

const QuotationTotalAmount = ({ isDiscountAvailable, discountPercentage, totalAmountAfterTax, discountAmount, totalAfterDiscount, hasDiscountPrice }) => {

    return (
        <Grid container direction="row" spacing={1} display={'flex'} justifyContent={'end'} alignItems={"center"}>
            <Grid item >
                <TotalTextField value={'Sub Total :'} />
                {!isDiscountAvailable && (
                    <TotalTextField value={hasDiscountPrice ? `Discount :` : `Discount( ${discountPercentage}% ):`} />
                )}
                <TotalTextField value={'Total Amount :'} />
            </Grid>
            <Grid item>
                <TotalTextField value={ShowNumber(totalAmountAfterTax, 2, true)} textAlign={'right'} />
                {!isDiscountAvailable && (
                    <TotalTextField value={ShowNumber(discountAmount, 2, true)} textAlign={'right'} />
                )}
                <TotalTextField value={ShowNumber(totalAfterDiscount, 2, true)} textAlign={'right'} />
            </Grid>
        </Grid>
    );
};

export default QuotationTotalAmount;

const TotalTextField = ({ value, textAlign }) => {
    return <Typography fontSize={commonFontSize} p={1} textAlign={textAlign}>
        <strong>{value}</strong>
    </Typography>
}