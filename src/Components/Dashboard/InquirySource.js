import { Typography } from "@mui/material";

export default function InquirySource({ inquiry }) {
    return (
        <Typography
            variant="body2"
            sx={{
                textAlign: { xs: 'left', sm: 'center' },
            }}
        >
            {inquiry.sourceOfLead}
        </Typography>
    )
}