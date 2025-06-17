import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { commonFontSize, commonFontWeight, NOT_AVAILABLE } from "../../Helpers/ConstantProperties";
import { getSaleRate, ShowNumber } from "../../Helpers/helpers";
import { RequirementActionForm } from "./RequirementActionForm";
import DependencyTable from "./DependancyTable";

export default function RequirementTable({ inquiry, disableActions }) {
    return (
        <Grid2 container className="mt-2">
            <Grid2 xs={12} className="d-none d-sm-block">
                <Typography component={"span"} fontSize={commonFontSize} fontWeight={commonFontWeight}>
                    <Grid2
                        textAlign={"center"}
                        container
                        className='bg-primary-subtle rounded p-2'>
                        <Grid2 md>Product Name</Grid2>
                        <Grid2 md={1}>Quantity</Grid2>
                        <Grid2 md={2}>Rate</Grid2>
                        <Grid2 md>Requirements</Grid2>
                        {!disableActions && <Grid2 md={1}>Actions</Grid2>}
                    </Grid2>
                </Typography>
            </Grid2>
            <Grid2 xs={12} >
                <Typography component={"span"} fontSize={commonFontSize}>
                    {
                        inquiry.products?.map((product, index) => (

                            <Grid2
                                alignItems={"center"}
                                key={index}
                                textAlign={"center"}
                                container
                                className="p-2">
                                <Grid2 md>{product.product.name}</Grid2>
                                <Grid2 md={1}>{product.units}</Grid2>
                                <Grid2 md={2}>
                                    {
                                        0 === getSaleRate(product)
                                            ? NOT_AVAILABLE
                                            : ShowNumber(getSaleRate(product), 2, true)}
                                </Grid2>
                                <Grid2 md>
                                    <DependencyTable product={product} units={product.units} />
                                </Grid2>
                                {
                                    !disableActions &&
                                    <Grid2 md={1}>
                                        <RequirementActionForm
                                            item={product}
                                            data={inquiry}
                                            products={inquiry.products} />
                                    </Grid2>
                                }
                            </Grid2>
                        ))
                    }
                </Typography>
            </Grid2>
        </Grid2>
    )
}