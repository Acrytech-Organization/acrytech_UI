import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import { checkValueNumber } from "../../Helpers/helpers";

const ProductReqStatus = ({ product }) => {
    const border = "1px solid lightgray";

    if (!product.rmlist || product.rmlist.length === 0) return <></>

    return (

        <Box paddingY={1} border={border}>
            {
                product.rmlist.map((details, index) => {
                    const isLast = index === product.rmlist.length - 1;
                    const isMissing =
                        parseFloat(details.remaining) > parseFloat(details.storeBalance);

                    return (
                        <Grid2
                            key={index}
                            borderBottom={isLast ? "" : border}
                            textAlign={"center"}
                            color={isMissing ? "red" : ""}
                            container
                            paddingY={1}>

                            <Grid2 xs={12} md={3}>{details.name}</Grid2>
                            <Grid2 xs={12} md>
                                {checkValueNumber(details.required)}
                            </Grid2>
                            <Grid2 xs={12} md>
                            </Grid2>
                            <Grid2 xs={12} md>
                            </Grid2>
                            <Grid2 xs={12} md>
                            </Grid2>
                            <Grid2 xs={12} md>
                                {checkValueNumber(details.remaining)}
                            </Grid2>
                            <Grid2 xs={12} md>
                                {checkValueNumber(details.storeBalance)}
                            </Grid2>
                        </Grid2>
                    )
                })
            }
        </Box>
    )
};

export default ProductReqStatus;