import { Box, Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TotalSaleReport from "./Sales/TotalSaleReport";
import SourcewisePieChart from "./Sourcewise/SourcewisePieChart";
import RejectedInquiryPieChart from "./ReasonWise/RejectedInquiryPieChart";
import MonthlyReport from "./INR/MonthlyReport";

function Reports() {
    return (
        <Box padding={2}>
            <Grid2 container columnSpacing={2} rowSpacing={5}>
                <Grid2 xs={12}>
                    <Paper elevation={2}>
                        <TotalSaleReport transform={true} />
                    </Paper>
                </Grid2>

                <Grid2 xs={12}>
                    <Paper elevation={2}>
                        <MonthlyReport />
                    </Paper>
                </Grid2>

                <Grid2 xs={12} md={6} flexGrow={1}>
                    <Paper elevation={2}>
                        <SourcewisePieChart transform={true} />
                    </Paper>
                </Grid2>

                <Grid2 xs={12} md={6}>
                    <Paper elevation={2}>
                        <RejectedInquiryPieChart transform={false} />
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default Reports;