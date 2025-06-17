import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { commonFontSize, commonFontWeight, regularFontSize, SUBTEXT_COLOR } from "../../Helpers/ConstantProperties";
import { Typography } from "@mui/material";

export const InquiryGridItem = ({ title, value, xl, sm, xs, display }) => (
    <Grid2
        className={" align-items-xxl-center " + display}
        flexDirection={"column"}
        xs={xs}
        xl={xl}
        sm={sm}>

        <Grid2 m={0} p={0}>
            <Typography noWrap fontWeight={commonFontWeight} sx={{ fontSize: regularFontSize }} component="div">{title}</Typography>
        </Grid2>
        <Grid2 m={0} p={0}>
            <Typography className="text-break" fontWeight={commonFontWeight} sx={{ fontSize: commonFontSize }} color={SUBTEXT_COLOR} component="div">{value}</Typography>
        </Grid2>
    </Grid2>
);