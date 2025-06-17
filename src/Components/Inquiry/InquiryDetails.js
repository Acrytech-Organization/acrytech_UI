import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CATEGORIES, getLocalDateString } from "../../Helpers/helpers";
import { SUBTEXT_COLOR } from "../../Helpers/ConstantProperties";

function InquiryDetails({ item }) {
    return (
        <Grid2>
            <Grid2 display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                <Typography className='fs-4 fw-bold'>
                    {item.contactPerson}
                </Typography>
            </Grid2>

            <Grid2 container spacing={3} gap={1} direction='row'>
                <GridItem title={'Last Update'} value={getLocalDateString(item.lastUpdated)} />
                <GridItem title={'Contact No'} value={item.contactPhone} />
                <GridItem title={'E-mail ID'} value={item.contactEmail} />
                <GridItem title={'Stage'} value={CATEGORIES[item.status]?.name} />
            </Grid2>

            <Grid2>
                <Typography className='fw-bold mb-1'>
                    Description
                </Typography>
                <Typography >
                    {item.description ? item.description : "Not Available"}
                </Typography>
            </Grid2>
        </Grid2>
    )
}

export default InquiryDetails;

const GridItem = ({ title, value }) => (
    <Grid2 sm={6} md={3}>
        <Typography>{title}</Typography>
        <Typography color={SUBTEXT_COLOR}>{value}</Typography>
    </Grid2>
);