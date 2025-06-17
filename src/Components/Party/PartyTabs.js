import Grid2 from "@mui/material/Unstable_Grid2";
import { CustomerInvoices } from "./CustomerInvoices";
import { Box, Button, Paper, Typography } from "@mui/material";
import DetailPaneWithDropdown from "../GenericComponents/Layout/DetailPaneWithDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { DetailPaneContext } from "../Inquiry/InquiryInformation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { commonFontWeight, regularFontSize } from "../../Helpers/ConstantProperties";
import { CustomerInformation } from "./CustomerInformation";
import InquiryList from "../Dashboard/InquiryList";
import PartySaleReport from "./PartySaleReport";

export const PartyTabs = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    const tabData = [
        {
            id: 0, name: "Customer Information", Component: (props) => <CustomerInformation {...props} />
        },
        {
            id: 1, name: "Invoices", Component: (props) => <CustomerInvoices customerId={state.id} />
        },
        {
            id: 2, name: "Inquiries", Component: (props) => <InquiryList filterObject={{ customerId: props.item.id }} routeDetails={{}} />
        },
        {
            id: 4, name: "Reports", Component: (props) => <PartySaleReport id={state.id} />
        },
    ];

    return (
        <Paper elevation={1} className='p-3'>
            <Grid2 container display={"flex"}>

                <Grid2 className="px-2 d-flex" xs={12}>

                    <Button variant="text" onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                    </Button>

                    <Typography
                        fontWeight={commonFontWeight}
                        className="text-break align-self-center"
                        sx={{ fontSize: regularFontSize }} >

                        {state.name}
                    </Typography>

                </Grid2>

                <Grid2 xs={12} height={"80vh"} flexGrow={1}>
                    <Box height={"100%"}>
                        <DetailPaneContext.Provider value={{ disableAction: true }}>
                            <DetailPaneWithDropdown
                                item={state}
                                tabData={tabData}
                                paneID={"Customer Information"}
                            />
                        </DetailPaneContext.Provider>
                    </Box>
                </Grid2>
            </Grid2>
        </Paper>
    )
}