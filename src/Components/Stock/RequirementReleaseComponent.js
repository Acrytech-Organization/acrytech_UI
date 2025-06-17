import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { commonFontWeight } from "../../Helpers/ConstantProperties";

export const RequirementReleaseComponent = ({ OpenDialog, Dialog, ReleaseButtontext, disable }) => {
    const handleClick = () => {
        OpenDialog(!Dialog);
    }
    return (
        <Grid2 lg={6} className="w-100 text-nowrap" fontWeight={commonFontWeight}>
            <Button variant="outlined" disabled={disable} onClick={() => handleClick()} className="text-noWrap">{ReleaseButtontext}</Button>
        </Grid2>
    )
}