import Grid2 from "@mui/material/Unstable_Grid2";
import CurrentStatus from "../../Dashboard/CurrentStatus";
import DashboardCardDate from "../../Dashboard/DashboardCardDate";
import { Box, Paper, Typography } from "@mui/material";
import { CATEGORIES, getDateDifferance } from "../../../Helpers/helpers";
import { InquiryRejectionObj } from "../../../Helpers/ExtraProperties";
import { commonFontWeight, NOT_AVAILABLE } from "../../../Helpers/ConstantProperties";
import UnlockInquiryButton from "../../Dashboard/UnlockInquiryButton";
import { DateContext } from "../../Contexts/DateContext";
import { useContext } from "react";

function ReportInquiryCard({ item,handleDialogOpen }) {
    const statusCategory = CATEGORIES[item.status] ? CATEGORIES[item.status] : InquiryRejectionObj;
    const isNewCustomer = item.customerId ? '' : ' *';

    const customerName = item.customerName
        ? item.customerName + isNewCustomer
        : "New Customer";

    const { currentDate } = useContext(DateContext);

    const dateDifference = getDateDifferance(item.followUpDate, currentDate);
    const overdue = dateDifference > 0;

    return (
        <Paper
            className='m-1 p-2 w-100'
        >
            <Grid2 container alignItems="center" spacing={1}>
                <Grid2 xs={12} md={2.5}>
                    <Box className='px-2'>
                        <Typography
                            noWrap
                            variant="subtitle2"
                            color={"primary.main"}
                            sx={{
                                fontWeight: commonFontWeight,
                                textAlign: 'left'
                            }}
                        >
                            {item.contactPerson || NOT_AVAILABLE}
                        </Typography>
                        <Typography
                            noWrap
                            variant="body2"
                            sx={{
                                textAlign: 'left',
                                color: 'text.secondary'
                            }}
                        >
                            {item.city}
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        sx={{
                            textAlign: { xs: 'left', sm: 'center' },
                            fontWeight: commonFontWeight,
                        }}
                    >
                        {customerName}
                    </Typography>
                </Grid2>
                <Grid2 xs={12} md={overdue ? 2 : 3}>
                    <DashboardCardDate item={item} />
                </Grid2>
                <Grid2 xs={6} md={overdue ? 2 : 2.5} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        sx={{
                            textAlign: { xs: 'left', sm: 'center' }
                        }}
                    >
                        {item.sourceOfLead}
                    </Typography>
                </Grid2>
                <Grid2 xs={6} md={overdue ? 1.5 : 2}>
                    <CurrentStatus statusCategory={statusCategory} />
                </Grid2>
                <Grid2 xs={6} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {overdue && (
                        <UnlockInquiryButton item={item} handleDialogOpen={handleDialogOpen} />
                    )}
                </Grid2>
            </Grid2>
        </Paper>
    )
}

export default ReportInquiryCard;