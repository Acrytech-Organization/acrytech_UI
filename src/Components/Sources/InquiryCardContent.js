import { CardContent, Tooltip, Typography } from "@mui/material";

export default function InquiryCardContent({ item }) {
    return (
        <CardContent>
            <Tooltip
                arrow
                placement='top-start'
                color='primary'
                variant='outlined'
                title={item.name} >
                <Typography noWrap variant="h5" component="div">
                    {item.name}
                </Typography>
            </Tooltip>
        </CardContent>
    );
}