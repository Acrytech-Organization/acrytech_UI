import { Typography } from "@mui/material";

export default function InquiryOwner({ inquiry }) {
    return (
        <Typography variant="body2" textAlign={{ xs: "left", md: "center" }}>
            {inquiry.assignee?.displayName || "No One"}
        </Typography>
    )
}