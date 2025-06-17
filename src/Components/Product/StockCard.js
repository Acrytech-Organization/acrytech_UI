import { useState } from "react";
import { ShowNumber } from "../../Helpers/helpers";
import GenericSkeleton from "../GenericComponents/DataView/GenericSkeleton";
import { Box, Button, Paper, Typography } from "@mui/material";
import GenericDialog from "../GenericComponents/Dialog/GenericDialog";
import StockCardDialogContent from "./StockCardDialogContent";
import Grid2 from "@mui/material/Unstable_Grid2";
import { COLOR_PURPLE, commonFontWeight } from "../../Helpers/ConstantProperties";

export default function StockCard({ item }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    if (item.showSkeleton) return <GenericSkeleton />;

    return (
        <Grid2 key={item.id} xs={12}>
            <Paper
                sx={{
                    borderLeft: `15px solid ${COLOR_PURPLE}`,
                    padding: '0.3rem',
                    minWidth: 0,
                    px: 1
                }}
                elevation={2} >

                <Grid2 container alignItems="center" spacing={2}>
                    <Grid2 xs={6} md={3}>
                        <Box className='px-2'>
                            <Typography
                                noWrap
                                variant="subtitle2"
                                color={"primary.main"}
                                sx={{
                                    fontWeight: commonFontWeight,
                                    textAlign: { xs: 'left', sm: 'left' }
                                }}
                            >
                                {item.resource.name}
                            </Typography>
                            <Typography
                                noWrap
                                variant="body2"
                                sx={{
                                    textAlign: { xs: 'left', sm: 'left' },
                                    color: 'text.secondary'
                                }}
                            >
                                {item.resource.type}
                            </Typography>
                        </Box>
                    </Grid2>

                    <Grid2 xs={6} md={2}>
                        <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{
                                paddingRight: { xs: 2, sm: 0 },
                                textAlign: { xs: 'right', sm: 'center' },
                            }}
                        >
                            {item.resource.productItemcode}
                        </Typography>
                    </Grid2>

                    <Grid2 xs />

                    <Grid2 xs={2}>
                        <Button fullWidth variant="outlined" onClick={() => setDialogOpen(true)}>
                            Details
                        </Button>
                    </Grid2>

                    <Grid2 xs={6} md={2}>
                        <Typography
                            noWrap
                            sx={{
                                paddingRight: 1,
                                textAlign: "right",
                            }}
                        >
                            {ShowNumber(item.units, 2)}
                        </Typography>
                    </Grid2>

                </Grid2>
            </Paper>
            <GenericDialog
                title={`${item.resource.name} Details`}
                open={dialogOpen}
                setOpen={setDialogOpen}
                content={<StockCardDialogContent item={item} />}>
            </GenericDialog>

        </Grid2>
    )
}