import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import InquiryStockDetails from "../Stock/InquiryStockDetails";
import InquiryStockProduction from "../Stock/InquiryStockProduction";
import GenericFormHeader from "../GenericComponents/FormComponent/GenericFormHeader";
import { DetailPaneContext } from "../Inquiry/InquiryInformation";
import DetailPaneWithDropdown from "../GenericComponents/Layout/DetailPaneWithDropdown";
import InquiryReadyStockDetails from "../Stock/inquiryReadyStockDetails";
import { commonFontSize } from "../../Helpers/ConstantProperties";
import LaunchIcon from '@mui/icons-material/Launch';
import { InquiryGridItem } from "../Inquiry/InquiryGridItem";
import { checkValue, getPOString } from "../../Helpers/helpers";

export default function InquiryStockCard({ inquiry, balanceDetails, dispatch }) {
    const canAllotRM =
        balanceDetails.some((product) => product.prodPossible > 0);

    const stockDetails = {
        id: 0,
        name: "Balance Details",
        Component: (props) => <InquiryStockDetails balanceDetails={balanceDetails} />
    }

    const prodPlanDetails = {
        id: 2,
        disabled: !canAllotRM,
        name: "Production Planning",
        Component: (props) => <InquiryStockProduction
            balanceDetails={balanceDetails}
            inquiryID={inquiry.id} />
    }

    const dispatchDetails = {
        id: 3,
        name: "Dispatch",
        Component: (props) => <InquiryReadyStockDetails
            inquiry={inquiry}
            balanceDetails={balanceDetails} />
    }

    const tabData = [];

    if (dispatch) {
        tabData.push(dispatchDetails);
    }
    else {
        tabData.push(stockDetails);
        tabData.push(prodPlanDetails);
    }

    return (
        <Box elevation={1} className='p-3'>
            <GenericFormHeader enableBack={true} title={"Order Details"} />

            <Typography component={"span"} fontSize={commonFontSize}>
                <Grid2 container>
                    <Grid2 xs={12}>
                        <Grid2 container rowGap={2} paddingY={1}>
                            <InquiryGridItem
                                sm={3}
                                xs={12}
                                title={'Customer'}
                                value={inquiry.customerName} />

                            <InquiryGridItem
                                sm={1.5}
                                xs={12}
                                title={'City'}
                                value={checkValue(inquiry.city)} />

                            <InquiryGridItem
                                sm={3}
                                xs={12}
                                title={'PO Number'}
                                value={getPOString(inquiry)} />

                            <InquiryGridItem
                                sm={2}
                                xs={12}
                                title={'Source of Lead'}
                                value={checkValue(inquiry.sourceOfLead)} />

                            <InquiryGridItem
                                sm={2}
                                xs={12}
                                title={'Design Link'}
                                value={
                                    inquiry.designUrl ?
                                        <Grid2 className="">
                                            <a href={inquiry.designUrl} target="blank">
                                                <LaunchIcon />
                                            </a>
                                        </Grid2>
                                        : "Not Available"
                                } />

                            <InquiryGridItem
                                xs={11.5}
                                title={'Description'}
                                value={checkValue(inquiry.description)} />

                        </Grid2>
                    </Grid2>
                </Grid2>
            </Typography>

            <Grid2 container display={"flex"} paddingTop={2}>
                <Grid2 xs={12} flexGrow={1}>
                    <Box overflow={"auto"}>
                        <DetailPaneContext.Provider value={{ disableAction: true }}>
                            <DetailPaneWithDropdown
                                item={inquiry}
                                tabData={tabData}
                                paneID={"InqPlanInformation"}
                            />
                        </DetailPaneContext.Provider>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    )
}