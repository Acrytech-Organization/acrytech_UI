import { Typography } from "@mui/material";
import { checkValue } from "../../Helpers/helpers";

export default function CurrentStatus({statusCategory}) {
    return (
        <Typography
            variant="body2"
            sx={{
                textAlign: { xs: 'left', sm: 'center' },
                color: statusCategory?.color
            }}
        >
            {checkValue(statusCategory?.name)}
        </Typography>
    )
}