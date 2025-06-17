import { Box, Typography } from "@mui/material";
import { commonFontWeight, CUSTOMER, INQUIRY_DETAIL, INWORD_CHALLAN, NOT_AVAILABLE, OUTWORD_CHALLAN, TAX_INVOICE } from "../../Helpers/ConstantProperties";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RouteContext } from "./InquiryDashboard";

function DashboardCardCommonPart({ item }) {
    const { routeDetails } = useContext(RouteContext);
    const navigate = useNavigate()

    var handleContactClick = () => {
        navigate(INQUIRY_DETAIL, { state: { inquiry: item, returnPath: routeDetails.path } })
    };

    const isNewCustomer = item.customerId ? '' : ' *';

    var customerName = item.customerName
        ? item.customerName + isNewCustomer
        : "New Customer";

    var cursor = 'pointer';

    if (item.type === CUSTOMER) {
        handleContactClick = () => { }
        customerName = item.name;
        cursor = 'default'
    }

    if (item.type === TAX_INVOICE || item.type === OUTWORD_CHALLAN) {
        handleContactClick = () => { }
        customerName = item.customerName;
        cursor = 'default'
    }

    if (item.type === INWORD_CHALLAN) {
        handleContactClick = () => { }
        customerName = item.vendorName || item.customerName;
        cursor = 'default'
    }

    return (
        <>
            <Grid2 xs={6} md={2}>
                <Box className='px-2'>
                    <Typography
                        noWrap
                        variant="subtitle2"
                        color={"primary.main"}
                        onClick={() => handleContactClick()}
                        sx={{
                            fontWeight: commonFontWeight,
                            cursor: cursor,
                            textAlign: { xs: 'left', sm: 'left' }
                        }}
                    >
                        {customerName}
                    </Typography>
                    <Typography
                        noWrap
                        variant="body2"
                        sx={{
                            textAlign: { xs: 'left', sm: 'left' },
                            color: 'text.secondary'
                        }}
                    >
                        {item.contactPerson || NOT_AVAILABLE}
                    </Typography>
                </Box>
            </Grid2>
            <Grid2 xs={6} md={1}>
                <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{
                        paddingRight: { xs: 2, sm: 0 },
                        textAlign: { xs: 'right', sm: 'center' },
                    }}
                >
                    {item.city}
                </Typography>
            </Grid2>
        </>
    )
}

export default DashboardCardCommonPart;