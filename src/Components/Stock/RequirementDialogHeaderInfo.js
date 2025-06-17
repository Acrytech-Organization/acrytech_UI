import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { InquiryGridItem } from "../Inquiry/InquiryGridItem"
import { getLocalDateString } from "../../Helpers/helpers"
import { commonFontSize, commonFontWeight, largeFontSize } from "../../Helpers/ConstantProperties"
import { Typography } from "@mui/material"

export const RequirementDialogHeaderInfo = ({ item }) => {
    return (<Grid2 className={"w-100"}>
        <Grid2 className="p-1 flex-grow-1 d-flex">
            <Typography noWrap fontWeight={commonFontWeight} sx={{ borderRight: commonFontSize, textAlign: 'center', fontSize: largeFontSize }} >{item.customerName}</Typography>
        </Grid2>
        <Grid2 className="d-flex justify-content-start" xl={12} spacing={2} container direction='column' >
            <Grid2 className="d-flex flex-column gap-3 col-12">
                <Grid2 container gap={2} direction={"row"} width={'100%'}>
                    <InquiryGridItem display={"block"} xl={2} xs={4} title={'PO Number'} value={item.poNumber || '12322'} />
                    <InquiryGridItem display={"block"} xl={2} xs={4} title={'Last Update'} value={getLocalDateString(item.lastUpdated)} />
                    <InquiryGridItem display={"block"} xl={2} xs={4} title={'Status'} value={item.status} />
                </Grid2>
            </Grid2>
        </Grid2>
    </Grid2>
    )
}