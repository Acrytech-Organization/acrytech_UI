import { Card, CardActionArea, CardContent, Skeleton, Typography } from "@mui/material"
import { regularFontSize } from "../../Helpers/ConstantProperties"
export const UserRoleSkeletonCard = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <Skeleton variant="text" width={150} sx={{ fontSize: regularFontSize }} />
                    </Typography>
                </CardContent>
                <CardContent>
                    <div className="d-flex flex-row gap-2 justify-content-end">
                        <Skeleton variant="rectangular" width={110} height={60} />
                        <Skeleton variant="rectangular" width={110} height={60} />
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}