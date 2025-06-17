import { Typography } from "@mui/material";
import { commonFontSize, commonFontWeight, PRIMARY_COLOR } from "../../Helpers/ConstantProperties";

export default function PoNoDisplay({ cData }) {
    return (
        <Typography
            fontWeight={commonFontWeight}
            fontSize={commonFontSize}
            color={PRIMARY_COLOR}
            paddingRight={{ xs: 0, md: 2 }}
            textAlign={{ xs: "center", md: "right" }}>
            PO: {cData?.poNumber || "Not Available"}
        </Typography>
    )
}