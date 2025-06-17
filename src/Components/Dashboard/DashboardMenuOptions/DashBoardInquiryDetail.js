import { Typography } from "@mui/material"
import { largeFontSize, PRIMARY_COLOR, regularFontSize } from "../../../Helpers/ConstantProperties"
import { CATEGORIES, checkValue, getFormattedPhone, getLocalDateString } from "../../../Helpers/helpers"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"

export const DashBoardInquiryDetail = ({ item }) => {

    const GridElement = ({ name, value }) => {
        return (
            <Grid2 container display={"flex"} flexDirection={"column"} >
                <Grid2 xs={12}>
                    <Typography fontSize={regularFontSize} alignSelf={"center"} className="text-break">
                        {name}
                    </Typography>
                </Grid2>
                <Grid2 flexGrow={1} xs={12} display={"flex"}>
                    <Typography fontSize={regularFontSize} sx={{ color: PRIMARY_COLOR }} className='text-break'>
                        {value}
                    </Typography>
                </Grid2>
            </Grid2>
        )
    }

    const contactPhone = checkValue(item.contactPhone);
    const formattedPhone = typeof contactPhone === 'string' ? getFormattedPhone(contactPhone) : 'Invalid phone number';

    return (
        <Grid2 container width={"100%"} padding={1}>
            <Grid2 md={12} >
                <Typography fontSize={largeFontSize} className="fw-bolder mb-2">{item.customerName}</Typography>
            </Grid2>
            <Grid2 md={12} container width={'100%'} columnGap={2} rowGap={2}>
                <Grid2 sm={3} md={2.1} >
                    <GridElement
                        name={"Last Follow-up"}
                        value={getLocalDateString(item.lastUpdated)}
                    />
                </Grid2>
                <Grid2 sm={3} md={2.1}>
                    <GridElement
                        name={"Next Follow-up"}
                        value={getLocalDateString(item.followUpDate)}
                    />

                </Grid2>
                <Grid2 sm={3} md={2.1}>
                    <GridElement
                        name={"Contact No"}
                        value={formattedPhone}
                    />
                </Grid2>
                <Grid2 sm={3} md={2.1}>
                    <GridElement
                        name={"E-mail ID"}
                        value={item.contactEmail}
                    />
                </Grid2>
                <Grid2 sm={3} md={2.1}>
                    <GridElement
                        name={"Stage"}
                        value={checkValue(CATEGORIES[item.status]?.name)}
                    />
                </Grid2>
            </Grid2>
        </Grid2>
    )
}