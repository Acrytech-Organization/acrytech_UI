import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"
import { commonFontSize, extraSmallFontSize, PROCESSESS } from "../../Helpers/ConstantProperties";
import { useState } from "react";
import { INPUT_TYPE_NUM, SchemaTypes } from "../../Helpers/ExtraProperties";
import { calculateFinishedGoodFromRM, hasRawMaterial } from "../../Helpers/helpers";
import AddProperty from "../AddProperties/AddProperty";

const calculateRequiredQty = (productBalanceObject, data, item) => {
    var requiredQuantity = item.units * 1;
    var calculatedRm = 0;
    if (hasRawMaterial(item)) calculatedRm = calculateFinishedGoodFromRM(item.units, item.rmlist[0].balance, item.rmlist[0].units)
    if (!item.rmlist || item.rmlist?.length === 0) requiredQuantity = 0 // that is for if we dont have the raw material but other have the raw material 
    if (calculatedRm * 1 > 0) requiredQuantity = requiredQuantity - calculatedRm * 1
    return hasRawMaterial(item, PROCESSESS) ? requiredQuantity : 0;
}

export const StockInput = ({ item, data, productBalanceObject, calculateRequiredQuantity = calculateRequiredQty, calculatedTotalUnits = (productBalanceObject, data, item) => item.units }) => {
    const [completedQuantity, setCompletedQuantity] = useState(0)

    var requiredQuantity = calculateRequiredQuantity(productBalanceObject, data, item) * 1;
    const propertyList = {
        data: {
            item: {
                displayName: "",
                name: 'units',
                type: SchemaTypes.Number,
            },
            inputMode: INPUT_TYPE_NUM,
        },
        gridSizes: {
            lg: 6
        },
        currentValue: completedQuantity,
        onChange: (e) => {
            if (requiredQuantity >= e.value) {
                setCompletedQuantity(e.value)
                item.completedFinishedGoods = e.value
            }
        }
    }

    return (
        <Grid2 lg={12} sx={{ display: 'flex', gap: '0', width: '100%', paddingX: '2' }} className="border border-1">
            <Grid2 sx={{ padding: commonFontSize, display: { xs: 'none', md: 'flex' } }} className="flex-grow-1 align-content-center " lg={2}>
                <Typography sx={{ borderRight: commonFontSize, textAlign: 'center', width: '100%', alignContent: 'space-around' }}>
                    {item.product.name}
                </Typography>
            </Grid2>
            <Grid2 className="flex-grow-1 align-content-center " sx={{ padding: { xs: extraSmallFontSize, md: commonFontSize } }} lg={1.5} xs={2}>
                <Typography sx={{ borderRight: commonFontSize, textAlign: 'center' }}>
                    {calculatedTotalUnits(productBalanceObject, data, item)}
                </Typography>
            </Grid2>
            <Grid2 className="flex-grow-1 align-content-center " sx={{ padding: { xs: extraSmallFontSize, md: commonFontSize } }} lg={1.5} xs={2}>
                <Typography sx={{ borderRight: commonFontSize, textAlign: 'center' }}>
                    {requiredQuantity > 0 ? requiredQuantity : 0}
                </Typography>
            </Grid2>
            <Grid2 className="flex-grow-1 align-content-center " sx={{ padding: { xs: extraSmallFontSize, md: commonFontSize } }} lg={2} xs={2}>
                <AddProperty
                    {...propertyList}
                />
            </Grid2>
        </Grid2>
    );
}