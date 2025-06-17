import { Typography } from "@mui/material";
import { getLocalDateString } from "../../Helpers/helpers";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import UpdateIcon from '@mui/icons-material/Update';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { CLOSED_INQUIRY_TAG } from "../../Helpers/ExtraProperties";
import dayjs from "dayjs";

function DashboardCardDate({ item }) {
    let date = item.followUpDate;
    let color = "primary";
    let icon = <UpdateIcon color={color} sx={{ verticalAlign: 'middle', marginRight: 1 }} />;

    if (item.expectedCloseDate) {
        date = item.expectedCloseDate;
        color = "success";

        icon = <FactCheckIcon color={color} sx={{ verticalAlign: 'middle', marginRight: 1 }} />

        const today = dayjs();
        const validity = dayjs(date);

        const diff = today.diff(validity, 'day');


        if (diff === 0) color = "warning";
        if (diff > 0) color = "error";
    }

    if (item.tag === CLOSED_INQUIRY_TAG) {
        date = item.lastUpdated;
        icon = <AssignmentTurnedInIcon
            color={color} sx={{ verticalAlign: 'middle', marginRight: 1 }} />
    }

    return (
        <Typography
            variant="body2"
            textAlign={"center"}
        >
            {icon}
            {getLocalDateString(date)}
        </Typography>
    )
}

export default DashboardCardDate;