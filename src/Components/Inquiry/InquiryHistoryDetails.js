import { Typography } from "@mui/material";
import { getLocalDateString } from "../../Helpers/helpers";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function InquiryHistoryDetails({ transaction }) {
    if (transaction.id === "NoOpeningBalance") return <></>;

    return (
        <Grid2>
            <Typography>
                <span className="fw-bold">{transaction.lastUpdatedBy + " "}</span>
                commented on {getLocalDateString(transaction.date)}
            </Typography>
            <Typography className="text-break display-linebreak">{transaction.note}</Typography>
        </Grid2>
    )
}