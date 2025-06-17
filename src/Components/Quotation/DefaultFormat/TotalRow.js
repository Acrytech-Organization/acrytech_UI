import { useContext } from "react";
import { DocumentContext } from "../../GenericComponents/Layout/DocumentFormat";
import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { commonFontSize, commonFontWeight } from "../../../Helpers/ConstantProperties";
import { ShowNumber } from "../../../Helpers/helpers";

export default function TotalRow() {
    const { context } = useContext(DocumentContext);
    const cData = context.cData;

    return (
        <Box display={{ xs: "none", md: "block" }}>
            <Grid2 container paddingY={1} textAlign={"center"}>
                <Grid2 xs={12} md={5}>
                    <Typography
                        textAlign={{ xs: "left", md: "center" }}
                        fontWeight={commonFontWeight}>
                        Total
                    </Typography>
                </Grid2>

                <Grid2 xs={12} md={1}>
                    <Typography fontWeight={commonFontWeight} fontSize={commonFontSize}>
                        {ShowNumber(cData.totalQuantity, 2)}
                    </Typography>
                </Grid2>

                <Grid2 md={2} display={{ xs: "none", md: "block" }}>
                </Grid2>

                <Grid2 xs={12} md={1}>
                    <Typography fontWeight={commonFontWeight} fontSize={commonFontSize}>
                        {ShowNumber(cData.totalTaxableAmount, 2, true)}
                    </Typography>
                </Grid2>

                <Grid2 xs={12} md={1}>
                    <Typography fontWeight={commonFontWeight} fontSize={commonFontSize}>
                        {ShowNumber(cData.totalTax, 2, true)}
                    </Typography>
                </Grid2>

                <Grid2 xs={12} md={2}>
                    <Typography fontWeight={commonFontWeight} fontSize={commonFontSize}>
                        {ShowNumber(cData.totalAmountAfterTax, 2, true)}
                    </Typography>
                </Grid2>

            </Grid2>
        </Box>
    )
}