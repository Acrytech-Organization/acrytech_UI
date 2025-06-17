import { useContext } from "react";
import { DocumentContext } from "../../GenericComponents/Layout/DocumentFormat";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Box, Typography } from "@mui/material";
import { ShowNumber } from "../../../Helpers/helpers";
import { commonFontSize, commonFontWeight } from "../../../Helpers/ConstantProperties";

export default function BOMItemsTotal() {
    const { context } = useContext(DocumentContext);
    const cData = context.cData;

    return (
        <Box display={{ xs: "none", md: "block" }}>
            <Grid2 container paddingY={1}>
                <Grid2 xs={12} md={5.5}>
                    <Typography
                        fontWeight={commonFontWeight}
                        textAlign={{ xs: "left", md: "center" }}>
                        Total
                    </Typography>
                </Grid2>

                <Grid2 fontSize={commonFontSize}
                    fontWeight={commonFontWeight}
                    xs={12} md={1.5}
                    textAlign={"center"}>

                    {ShowNumber(cData.totalQuantity, 2)}

                </Grid2>

                <Grid2 md={2} display={{ xs: "none", md: "block" }}>
                </Grid2>

                <Grid2 fontSize={commonFontSize}
                    fontWeight={commonFontWeight}
                    xs={12} md={3} textAlign={"right"}
                    paddingRight={2}>

                    {ShowNumber(cData.totalTaxableAmount, 2, true)}
                </Grid2>
            </Grid2>
        </Box>
    )
}