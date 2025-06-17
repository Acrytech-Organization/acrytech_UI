import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import Typography from '@mui/material/Typography'
import GenericTabs from "../GenericComponents/Tabs/GenericTabs"
import InquiryContent from "./InquiryContent"
import { InquiryDetailBody } from "./InquiryDetailBody"
import { commonFontWeight, regularFontSize } from "../../Helpers/ConstantProperties"
import InquiryProductDetails from "./InquiryProductDetails"

export const InquiryDetail = ({ item }) => {
    const Tabs = [
        {
            label: "Products",
            Component: <InquiryProductDetails allowActions={false} data={item} />
        },
        {
            label: "Comments",
            Component: <div className=" view-height-50 "><InquiryContent item={item} /></div>
        }
    ]

    return (
        <Grid2 sx={{ backgroundColor: '#FFFFFF', paddingBottom: '15px' }}>
            <Grid2 className={"  m-1 m-sm-2 px-0 px-sm-3 "}>
                <Grid2 className="  px-2  "
                    xl={12} spacing={2} container direction='column' >
                    <Grid2 className="col-12">
                        <Typography fontWeight={commonFontWeight} className="text-break" sx={{ fontSize: regularFontSize }} >
                            {item.contactPerson}
                        </Typography>
                    </Grid2>
                    <InquiryDetailBody item={item} />
                    <GenericTabs
                        initialTabs={Tabs[0]}
                        tabs={Tabs}
                    />
                </Grid2>
            </Grid2>
        </Grid2>
    )
}