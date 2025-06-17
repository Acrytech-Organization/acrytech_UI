import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { commonFontWeight } from "../../Helpers/ConstantProperties";

function CustomerDropDownDisplayComponent({ option }) {
    return (
        <Grid2 container direction={'row'} justifyContent={'space-between'} className='px-1 w-100'>
            <Grid2 xs={8} className="text-truncate">
                <Typography
                    variant="body"
                    noWrap
                >
                    {option.name}
                </Typography>
                <Typography
                    noWrap
                    variant="body2"
                    sx={{
                        color: 'text.secondary'
                    }}
                >
                    {option.phoneNumber}
                </Typography>
            </Grid2>
            <Grid2 xs={4} sx={{ textAlign: "right" }}>
                <Typography
                    noWrap
                    variant="subtitle2"
                    color={"primary.main"}
                    sx={{
                        fontWeight: commonFontWeight,
                    }}
                >
                    {option.contactPerson}
                </Typography>
                <Typography
                    noWrap
                    variant="body2"
                    sx={{
                        color: 'text.secondary'
                    }}
                >
                    {option.city}
                </Typography>
            </Grid2>
        </Grid2>
    )
}

export default CustomerDropDownDisplayComponent;