import Grid2 from "@mui/material/Unstable_Grid2"
import DashboardCardDate from "../Dashboard/DashboardCardDate"
import GenericProductList from "../GenericComponents/Body/GenericProductList"
import { Button, Tooltip } from "@mui/material"

export const HomeStockDashboardCard = ({ item }) => {
    return (
        <Tooltip title="Read Only">
            <Grid2 sx={{ display: { xs: "block", md: "flex" } }} xs={12} lg={6}>
                <Grid2 xs={6} lg={6}>
                    <DashboardCardDate item={item} />
                </Grid2>
                <GenericProductList products={item.products} />
                <Grid2 xs={6} lg={6}>
                    <Button sx={{ display: 'flex', justifyContent: "end" }} disabled>Order</Button>
                </Grid2>
            </Grid2>
        </Tooltip>
    )
}