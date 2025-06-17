import Grid2 from "@mui/material/Unstable_Grid2"
import { InquiryGridItem } from "../Inquiry/InquiryGridItem"
import { checkValue, getLocalDateString } from "../../Helpers/helpers"

export const CustomerInformation = ({ item }) => {
    return (
        <Grid2 className="border border-1 m-1 p-2">
            <Grid2 className="px-2">
                <Grid2 container paddingY={2} width={'100%'}>
                    <InquiryGridItem sm={4} xs={4} title={'Contact Person'} value={checkValue(item.contactPerson)} />
                    <InquiryGridItem sm={4} xs={6} title={'E-mail ID'} value={checkValue(item.email)} />
                    <InquiryGridItem sm={4} xs={6} title={'Contact No'} value={checkValue(item.phoneNumber)} />

                </Grid2>
                <Grid2 container paddingY={2} width={'100%'}>
                    <InquiryGridItem sm={4} xs={4} title={'City'} value={checkValue(item.city)} />
                    <InquiryGridItem sm={4} xs={4} title={'Last Update'} value={getLocalDateString(item.lastUpdated)} />
                    <InquiryGridItem sm={4} xs={4} title={'Next Follow Up'} value={getLocalDateString(item.followUpDate)} />
                </Grid2>
            </Grid2>
        </Grid2>
    )
}