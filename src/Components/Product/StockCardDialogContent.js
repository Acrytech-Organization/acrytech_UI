import React, { useContext } from "react";
import { getLocalDateString, removeBatchPrefix, ShowNumber, SMALL_SCREEN, sortByObjectKey, useScreenSize } from "../../Helpers/helpers";
import { AuthContext } from "../Auth/Auth";
import { FirmContext } from "../Contexts/FirmContext";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { INQUIRY_STORE_ACCOUNT_ID, INTERNAL_PRODUCTION, NA, PRODUCT_TYPE_CUSTOM, PRODUCT_TYPE_FINISHED, PRODUCT_TYPE_SEMIFINISHED, STOCK_STMT_DETAILS } from "../../Helpers/ConstantProperties";
import { PRODUCT_TAG } from "../../Helpers/ExtraProperties";
import { useQuery } from "@tanstack/react-query";
import { Card, CircularProgress, Typography } from "@mui/material";
import { GenericErrorComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import Grid2 from "@mui/material/Unstable_Grid2";
import ProductContentCell from "../Inquiry/ProductContentCell";

export default function StockCardDialogContent({ item }) {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const screenSize = useScreenSize();

    const queryFunction = async () => {
        var data = await serviceHelpers.getResourceBalance(
            khID,
            {
                withBatches: true,
                resourceID: item.resourceID,
                accountID: INQUIRY_STORE_ACCOUNT_ID,
                date: Date.now(),
                tag: PRODUCT_TAG
            });

        data = data
            .map(item => {
                item.batches = sortByObjectKey(item.batches, item);
                return item;
            })

        return data
    }

    const { data, isLoading, error } = useQuery(
        {
            queryKey: [
                uid,
                khID,
                STOCK_STMT_DETAILS,
                item.resourceID
            ],
            queryFn: queryFunction
        }
    );

    if (error) {
        return <GenericErrorComponent error={error} />
    }

    if (isLoading) {
        return <CircularProgress />;
    }

    return <>
        {data && data.map((element) => Object.values(element.batches).map((value, index) => {
            const finishGoods = [
                PRODUCT_TYPE_FINISHED,
                PRODUCT_TYPE_CUSTOM,
                PRODUCT_TYPE_SEMIFINISHED]

            const isFinishGood = finishGoods.includes(item.resource.type);

            if (isFinishGood) {
                value.BatchObject = item.resource
            }

            const proplist = [{
                label: 'Purchase Date',
                value: getLocalDateString(Number(!isFinishGood ? removeBatchPrefix(value.BatchObject?.id) : element.date)),
                sx: { md: 3 }
            }, {
                label: 'Vendor',
                value: isFinishGood ? INTERNAL_PRODUCTION : value.BatchObject?.name,
                sx: { md: 3 }
            }, {
                label: 'Purchase Rate',
                value: value.BatchObject?.rate ? ShowNumber(value.BatchObject?.rate, 2, true) : NA,
                sx: { md: 3 }
            }, {
                label: 'Quantity',
                value: ShowNumber(value.units, 2),
                sx: { md: 3 }
            }]

            return (
                <Card elevation={3} sx={{ mb: 1, p: 1 }} key={index}>
                    <Grid2 container>
                        {proplist.map((item, i) => (
                            screenSize === SMALL_SCREEN ? <Grid2 key={i}
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >

                                <Typography sx={{ mr: 1 }} textAlign={'end'}>
                                    {item.label}
                                </Typography>

                                {item.value}

                            </Grid2>
                                :
                                <ProductContentCell xs={12} md={2} {...item.sx} key={i}>
                                    {item.value}
                                </ProductContentCell>
                        ))}
                    </Grid2>
                </Card>
            )
        }))}
    </>;
}
