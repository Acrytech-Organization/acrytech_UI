import { Card, CardContent, Skeleton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { extraLargeFontSize, regularFontSize } from "../../../Helpers/ConstantProperties";

function GenericSkeleton() {
    const color = 'grey.600';
    return (
        <Card className="border rounded-4">
            <CardContent>
                <Grid2
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid2>
                        <Skeleton
                            variant="circular"
                            sx={{ bgcolor: color }}
                            width={40}
                            height={40} />
                    </Grid2>
                    <Grid2 className="flex-grow-1">
                        <Skeleton variant="text" sx={{ bgcolor: color, fontSize: extraLargeFontSize }} />
                        <Skeleton variant="text" sx={{ bgcolor: color, fontSize: regularFontSize }} />
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>)
}

export default GenericSkeleton;