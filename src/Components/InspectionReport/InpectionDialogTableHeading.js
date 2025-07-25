import Grid2 from "@mui/material/Unstable_Grid2";
import { InpectionDialogTableHeading } from "../../Helpers/helpers";
import { Paper, Typography } from "@mui/material";
import { commonFontSize } from "../../Helpers/ConstantProperties";

export const InpectionDialogTableHeadingComponent = () => {

    return (
        <>
            <Paper elevation={1} className='mt-4 px-2 d-none d-sm-block'>
                <Grid2 container spacing={2} className='bg-primary-subtle rounded' sx={{ textAlign: 'center', pb: 1 }}>
                    {InpectionDialogTableHeading.map((heading, index) => (
                        <Grid2
                            key={index}
                            lg={heading.lg}
                            md={heading.md || heading.lg}
                            sm={heading.sm || heading.lg}
                            xs={heading.xs}
                            sx={{
                                display: 'flex',
                                justifyContent: { xs: 'flex-start', sm: 'center' },
                                alignItems: 'center'
                            }}
                        >
                            <Typography fontSize={commonFontSize} variant="subtitle1">
                                <strong>{heading.label}</strong>
                            </Typography>
                        </Grid2>
                    ))}
                </Grid2>
            </Paper>
        </>
    );
};
