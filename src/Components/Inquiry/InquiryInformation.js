import { Box, Button, Paper } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { useLocation, useNavigate } from "react-router-dom"
import { InquiryDetailBody } from "./InquiryDetailBody"
import { commonFontWeight, HOME, regularFontSize } from "../../Helpers/ConstantProperties"
import { Typography } from "@mui/material"
import InquiryProductDetails from "./InquiryProductDetails"
import InquiryContent from "./InquiryContent"
import DetailPaneWithDropdown from "../GenericComponents/Layout/DetailPaneWithDropdown"
import { createContext, useContext } from "react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InquiryProductHeading from "./InquiryProductHeading";
import { canEditSaleRate, getProductHeadingWithoutAction } from "../../Helpers/helpers"
import { FirmContext } from "../Contexts/FirmContext"
import { OriginContext } from "../Contexts/OriginContext"
import InquiryMessageTab from "../Messages/InquiryMessageTab"
import QuotationFormat from "../Quotation/QuotationFormat"
import BOMFormat from "../Quotation/BOMFormat"
import Invoices from "../TaxInvoice/Invoices"
import GenerateRequirement from "../Requirement/GenerateRequirement"

export const DetailPaneContext = createContext();

export const InquiryInformation = () => {
    const { state } = useLocation();
    const { currentFirm } = useContext(FirmContext);
    const { limitFunctionality } = useContext(OriginContext);

    const inquiry = state.inquiry;
    const returnPath = state.returnPath || HOME;

    const navigate = useNavigate()
    const checkDisable = inquiry.products?.length === 0 || !inquiry.products
    const tabData = [
        {
            id: 0, name: "Contact Detail", Component: ({ item }) => (
                <Grid2 className="border border-1 m-1">
                    <InquiryDetailBody item={item} />
                    <InquiryProductDetails
                        allowActions={false}
                        data={item}
                        HeadingComponent={
                            (props) => <InquiryProductHeading {...props} heading={getProductHeadingWithoutAction(canEditSaleRate(currentFirm))} />}
                    />
                </Grid2>
            )
        },
        { id: 6, name: "Stages", Component: (props) => <GenerateRequirement inquiry={inquiry} /> },
        { id: 1, name: "Quotation", Component: (props) => <QuotationFormat item={inquiry} />, disabled: checkDisable },
        { id: 2, name: "BOM", Component: (props) => <BOMFormat item={inquiry} />, disabled: checkDisable },
        { id: 3, name: "Invoice", Component: (props) => <Invoices inquiry={inquiry} />, disabled: checkDisable },
        { id: 4, name: "Comments", Component: InquiryContent },
        { id: 5, name: "WhatsApp", Component: InquiryMessageTab },
    ];

    if (limitFunctionality) {

        // Remove requirement tab.
        tabData.splice(2, 1);
    }

    return (
        <Paper elevation={1} className='p-3'>
            <Grid2 container display={"flex"}>

                <Grid2 className="px-2 d-flex" xs={12}>

                    <Button variant="text" onClick={() => navigate(returnPath)}>
                        <ArrowBackIcon />
                    </Button>

                    <Typography
                        fontWeight={commonFontWeight}
                        className="text-break align-self-center"
                        sx={{ fontSize: regularFontSize }} >

                        {inquiry.customerName}
                    </Typography>

                </Grid2>

                <Grid2 xs={12} flexGrow={1}>
                    <Box height={"80vh"} overflow={"auto"}>
                        <DetailPaneContext.Provider value={{ disableAction: true }}>
                            <DetailPaneWithDropdown
                                item={inquiry}
                                tabData={tabData}
                                paneID={"InquiryInformation"}
                            />
                        </DetailPaneContext.Provider>
                    </Box>
                </Grid2>
            </Grid2>
        </Paper>
    )
}