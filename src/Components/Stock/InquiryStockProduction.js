import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { COMMON_BATCH, commonFontSize, commonFontWeight, DELETE_FIELD, INQUIRY_PRODUCTS, INQUIRY_STORE_ACCOUNT_ID, INR_RESOURCE_ID, PRODUCTION_PLAN_RESOURCE_ID } from "../../Helpers/ConstantProperties";
import { addDaysToToday, checkValueNumber, getProductTransactionArray, getVoucher } from "../../Helpers/helpers";
import ProductionPlanText from "./ProductionPlanText";
import React, { useContext, useState } from "react";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../Contexts/SnackbarProvider";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import { FirmContext } from "../Contexts/FirmContext";
import { calculateGoodTotalsForAssignment, getMutateObject, getPlannedRM, getProductPlanBatchObject, removeFromStore, updateProdPossible } from "../Dashboard/InquiryCalculations";
import { DialogContext } from "../GenericComponents/Dialog/GenericDialogWithButton";

export default function InquiryStockProduction({ balanceDetails, inquiryID }) {
    const { khID } = useContext(FirmContext);
    const { closeDialog } = useContext(DialogContext);

    const { showSnackbar } = useSnackbar();
    const [disabled, setDisabled] = useState(true);
    const [count, setCount] = useState(1);

    const queryFunction = async () => {
        const withBatches = true;
        const { plannedRM, plannedFG } = getPlannedRM(balanceDetails, withBatches);

        const resources = {
            [INR_RESOURCE_ID]: {}
        };

        Object.entries(plannedRM).forEach(([productID, value]) => {
            if (value.units > 0) {
                const { returnBatch, inr_cost } =
                    calculateGoodTotalsForAssignment(
                        value.storeBatches,
                        value.units);

                resources[productID] = returnBatch;
                resources[INR_RESOURCE_ID][productID] = inr_cost;
            }
        });

        const batches = [];
        const debitBatch = [];
        let totalFG = 0;
        let index = 0

        Object.entries(plannedFG).forEach(([workingID, value]) => {
            if (!value.batchID) {

                batches.push(getProductPlanBatchObject(workingID, value.productID, inquiryID));

                debitBatch.push({
                    index: index,
                    units: value.planned
                })

                index++;
            }
            else {
                debitBatch.push({
                    id: value.batchID,
                    units: value.planned
                })
            }

            totalFG += value.planned;
        });

        const transactions = getProductTransactionArray(
            { units: totalFG },
            PRODUCTION_PLAN_RESOURCE_ID,
            INQUIRY_STORE_ACCOUNT_ID,
            inquiryID,
            debitBatch,
            [{ id: COMMON_BATCH, units: -totalFG }],
        )

        let voucher = getVoucher(
            INQUIRY_STORE_ACCOUNT_ID,
            inquiryID,
            resources,
            INQUIRY_PRODUCTS
        );

        voucher.inquiryId = inquiryID

        voucher.transactions.push(...transactions);

        if (index > 0) {
            voucher.batches = batches;
        }

        const update = {
            prodNeeded: true,
            followUpDate: addDaysToToday(2),
        };

        // As we need the note to say FG first and then RM
        // we have to re-iterate the balanceDetails again.
        let notes = "Production Plan: \n";

        balanceDetails.forEach((product) => {
            if (product.planned > 0) {
                notes += product.name + " : " + product.planned + "\n";

                product.rmlist.forEach((rm) => {
                    notes += "   " + rm.name + " : " + rm.planned + " released. \n";
                })
            }
        })

        if (removeFromStore(balanceDetails, totalFG)) {
            update.storeNeeded = DELETE_FIELD;
            notes += "No more Goods needed, inquiry moved out of store. \n";
        }

        const result = await serviceHelpers.creteProductVoucher(khID, voucher);

        notes += "Voucher ID: " + result.id;
        await serviceHelpers.updateLeadStatus(khID, update, inquiryID, notes);

        if (closeDialog) closeDialog()
    }

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation(
        getMutateObject(
            queryClient, queryFunction, showSnackbar, "Material Released Succefully", inquiryID)
    );

    const onPlannChange = () => {
        setCount(count + 1);
        setDisabled(updateProdPossible(balanceDetails));
    }

    return (
        <Grid2 container padding={1}>
            <Grid2 xs={12} className="d-none d-sm-block">
                <Typography
                    component={"span"}
                    fontSize={commonFontSize}
                    fontWeight={commonFontWeight}>
                    <Grid2
                        textAlign={"center"}
                        container
                        className='bg-primary-subtle rounded p-2'>
                        <Grid2 md={3}>Product Name</Grid2>
                        <Grid2 md>Required</Grid2>
                        <Grid2 md>Relesed</Grid2>
                        <Grid2 md>In Store</Grid2>
                        <Grid2 md>Dispatched</Grid2>
                        <Grid2 md>Remaining</Grid2>
                        <Grid2 md>Max Plannable</Grid2>
                        <Grid2 md>Plan</Grid2>
                    </Grid2>
                </Typography>
            </Grid2>

            <Grid2 xs={12} >
                <Typography component={"span"} fontSize={commonFontSize}>
                    {
                        balanceDetails.filter((product) => product.prodPossible > 0)
                            .map((details, index) => (
                                <Grid2
                                    key={index}
                                    textAlign={"center"}
                                    container
                                    className="p-2">

                                    <Grid2 xs={12} md={3}>{details.name}</Grid2>
                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.required)}
                                    </Grid2>
                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.released)}
                                    </Grid2>
                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.inStore)}
                                    </Grid2>
                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.dispatched)}
                                    </Grid2>
                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.remaining)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.prodPossible)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        <ProductionPlanText
                                            ProductBalance={details}
                                            onPlannChange={onPlannChange}
                                            maxPossible={details.prodPossible} />
                                    </Grid2>

                                </Grid2>
                            ))
                    }
                </Typography>
            </Grid2>

            <Grid2 xs={12} textAlign={"center"}>
                {
                    isPending
                        ? <GenericSpinner />
                        : <Button onClick={mutate} disabled={disabled}>
                            Release
                        </Button>
                }
            </Grid2>
        </Grid2>
    )
}