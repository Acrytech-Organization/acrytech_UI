import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { extraSmallFontSize } from "../../../Helpers/ConstantProperties";

const GenericFooter = () => {
    return (
        <Typography component={"span"} color={"black"} fontSize={extraSmallFontSize}>

            <Grid2 container>
                <Grid2 xs={12} className="text-center">
                    &copy; 2024 Opankys INC. All rights reserved.
                </Grid2>
            </Grid2>

        </Typography>
    )
};

export default GenericFooter;