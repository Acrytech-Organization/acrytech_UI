import { Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { CHECK_ACTIONS, commonFontSize, extraSmallFontSize } from "../../Helpers/ConstantProperties"
import { getProductIDResourceID } from "../../Helpers/helpers"
import { NO_DATA } from "../../Helpers/ExtraProperties"
import { CheckBoxAction } from "./CheckBoxAction"

export const RequirementCard = ({ item, getProductArray, productType, getValue, heading, productBalanceObject, data }) => {
    let productArray = getProductArray(item, productType)

    return (
        <Grid2 lg={12} sx={{ display: 'flex', gap: '0', width: '100%', paddingX: '2' }} className="border border-1">
            <Grid2 sx={{ padding: commonFontSize, display: { xs: 'none', md: 'flex' } }} className="flex-grow-1 m-3" lg={2}>
                <Typography sx={{ borderRight: commonFontSize, textAlign: 'center' }}>
                    {item.product.name}
                </Typography>
            </Grid2>
            {
                heading.map((element, index) => {
                    return (
                        <Grid2 key={index} className="flex-grow-1" sx={{ padding: { xs: extraSmallFontSize, md: commonFontSize } }} lg={2} xs={2}>
                            {
                                (productArray.length === 0) ? <Typography className="text-center">{NO_DATA}</Typography> :
                                    productArray?.map((product, index) => {
                                        if (element.label === CHECK_ACTIONS) {
                                            return <CheckBoxAction key={index} item={data} product={product} />
                                        }
                                        return (
                                            <Typography key={index} className="m-3" noWrap sx={{ borderRight: commonFontSize, textAlign: 'center' }} >
                                                {getValue(element, product, productBalanceObject, getProductIDResourceID(item.product.id, product.product.id))}
                                            </Typography>
                                        )
                                    })
                            }
                        </Grid2>)
                })
            }
        </Grid2>
    );
};
