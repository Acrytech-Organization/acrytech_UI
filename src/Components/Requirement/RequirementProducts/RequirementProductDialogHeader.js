import { Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { commonFontSize, largeFontSize, PRIMARY_COLOR, regularFontSize } from "../../../Helpers/ConstantProperties"
import { checkValue } from "../../../Helpers/helpers"

export const RequirementProductDialogHeader = ({ item }) => {
    const GridElement = ({ name, value }) => {
        return (
            <Grid2 container display={"flex"} flexDirection={"column"} >
                <Grid2 xs={12}>
                    <Typography fontSize={regularFontSize} alignSelf={"center"} className="text-break">
                        {name}
                    </Typography>
                </Grid2>
                <Grid2 flexGrow={1} xs={12} display={"flex"}>
                    <Typography fontSize={regularFontSize} sx={{ color: PRIMARY_COLOR }} className='text-break'>
                        {value}
                    </Typography>
                </Grid2>
            </Grid2>
        )
    }

    return (
        <Grid2 container width={"100%"} padding={1} margin={{ sm: '0px', md: commonFontSize }}>
            <Grid2 md={12} >
                <Typography fontSize={largeFontSize} className="fw-bolder mb-2">{item.customerName}</Typography>
            </Grid2>
            <Grid2 md={12} container width={'100%'} columnGap={2} rowGap={3}>
                <Grid2 sm={3} md={3} >
                    <GridElement
                        name={"Product Code"}
                        value={checkValue(item.product?.productItemcode)}
                    />
                </Grid2>
                <Grid2 sm={3} md={3}>
                    <GridElement
                        name={"Product Name"}
                        value={checkValue(item.product?.name)}
                    />

                </Grid2>
                <Grid2 sm={3} md={3}>
                    <GridElement
                        name={"Quantity"}
                        value={checkValue(item.units)}
                    />
                </Grid2>
            </Grid2>
            <Grid2 sm={12} md={12}>
                <GridElement
                    name={"Description"}
                    value={checkValue(item.productdescription)}
                />
            </Grid2>
        </Grid2>
    )
}