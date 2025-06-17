import { Box } from "@mui/material";
import Appbar from "../../Nav/Appbar";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function WelcomeAlert() {
    return <Grid2 className="w-100">
        <Box>
            <Appbar />
        </Box>
    </Grid2>
}

export default WelcomeAlert;