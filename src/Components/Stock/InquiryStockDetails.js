import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { commonFontSize, commonFontWeight } from "../../Helpers/ConstantProperties";
import React from "react";
import ProductStockDetails from "./ProductStockDetails";

export default function InquiryStockDetails({ balanceDetails }) {
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
                        <Grid2 md>Released</Grid2>
                        <Grid2 md>Passed</Grid2>
                        <Grid2 md>Rejected</Grid2>
                        <Grid2 md>Remaining</Grid2>
                        <Grid2 md>Stock</Grid2>
                    </Grid2>
                </Typography>
            </Grid2>

            <Grid2 xs={12}>
                <Typography component={"span"} fontSize={commonFontSize}>
                    {
                        balanceDetails.map((product) => {
                            return <ProductStockDetails key={product.id} product={product} />
                        })
                    }
                </Typography>
            </Grid2>
        </Grid2>
    )

}