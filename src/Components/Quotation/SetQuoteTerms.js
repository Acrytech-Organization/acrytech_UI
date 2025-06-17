import { Alert, Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useLocation } from "react-router-dom";
import { commonFontWeight } from "../../Helpers/ConstantProperties";
import GenerateRequirementContent from "../Requirement/GenerateRequirementContent";
import CreateTermsAndCondition from "./QuotationDetails/CreateTermsAndCondition";

export default function SetQuoteTerms() {
    const location = useLocation();

    const { inquiry, navigateTo } = location.state;

    if (!inquiry.id) {
        return (
            <Alert severity="warning" className="m-3">
                No inquiry is selected to set terms.
            </Alert>
        );
    }

    return (
        <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
            <Grid2 container direction="column" spacing={2}>
                <Grid2 xs={12}>
                    <Typography variant='h6' component="h2" sx={{ fontWeight: commonFontWeight }}>
                        {inquiry.customerName}
                    </Typography>
                </Grid2>

                <Grid2 xs={12}>
                    <GenerateRequirementContent item={inquiry} />
                </Grid2>

                <Grid2 xs={12}>
                    <CreateTermsAndCondition item={inquiry} navigateTo={navigateTo} />
                </Grid2>
            </Grid2>
        </Paper>
    );
}