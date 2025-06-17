import { useContext, useState } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { COMMON_BATCH, commonFontSize, commonFontWeight, DELETE_FIELD, INQUIRY_MATERIAL, INQUIRY_STORE_ACCOUNT_ID, PRODUCTION_PLAN_RESOURCE_ID } from "../../Helpers/ConstantProperties";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../Contexts/SnackbarProvider";
import { addDaysToToday, checkValueNumber, getProductTransactionArray, ShowNumber } from "../../Helpers/helpers";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { calculateGoodTotalsForAssignment, getMutateObject, getProductPlanBatchObject, removeFromStore } from "../Dashboard/InquiryCalculations";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, Typography } from "@mui/material";
import GenericSpinner from "../GenericComponents/FormComponent/GenericSpinner";
import AllotPlan from "./AllotPlan";
import { DialogContext } from "../GenericComponents/Dialog/GenericDialogWithButton";
import { v4 as uuidv4 } from 'uuid';
import { DateContext } from "../Contexts/DateContext";

function AssignGoods({ balanceDetails, inquiryID, canAllotAll }) {
    const { khID } = useContext(FirmContext);
    const { currentDate } = useContext(DateContext);
    const { closeDialog } = useContext(DialogContext);

    const { showSnackbar } = useSnackbar();
    const [disabled, setDisabled] = useState(true);

    const queryFunction = async ({ batcheOBJ, patchOBJ }) => {
        let note = "Balance Alloted: \r\n"
        let totalFg = 0;

        const batches = [];
        const debitBatch = [];
        let totalFG = 0;
        let index = 0

        const operations = [];

        Object.entries(batcheOBJ).forEach(([workingID, values]) => {
            if (values.batchID) {
                const update = {
                    assigned: values.units + values.assigned
                }

                debitBatch.push({
                    id: values.batchID,
                    units: values.units
                })

                operations.push(serviceHelpers.patchBatches(khID, values.batchID, update))
            }
            else {
                //get Batch Object
                const batchObject = getProductPlanBatchObject(
                    workingID,
                    values.productId,
                    inquiryID)

                batchObject.assigned = values.units;

                batches.push(batchObject);

                debitBatch.push({
                    index: index,
                    units: values.units
                })

                index++;
            }

            totalFG += values.units;
        });

        if (totalFG > 0) {
            // Create Voucher
            const transactions = getProductTransactionArray(
                { units: totalFG },
                PRODUCTION_PLAN_RESOURCE_ID,
                INQUIRY_STORE_ACCOUNT_ID,
                inquiryID,
                debitBatch,
                [{ id: COMMON_BATCH, units: -totalFG }],
            )

            const voucher = {
                id: uuidv4(),
                type: INQUIRY_MATERIAL,
                date: new Date().valueOf(),
                verified: true,
                transactions: transactions,
                batches: batches
            }

            note += "With Voucher ID: " + voucher.id + " \r\n";

            voucher.inquiryId = inquiryID;
            voucher.date = currentDate;

            operations.push(serviceHelpers.creteProductVoucher(khID, voucher))
        }

        Object.entries(patchOBJ).forEach(([productId, values]) => {

            note += "\r\n For " + values.name + ": \r\n"
            totalFg += values.units;

            Object.entries(values.batches).forEach(([batchID, units]) => {
                note += "From Batch: " + batchID + ": " + ShowNumber(units, 2) + " \r\n";

                operations.push(
                    serviceHelpers.patchBalance(khID, {
                        accountID: INQUIRY_STORE_ACCOUNT_ID,
                        resourceID: productId,
                        units: units,
                        fromBatch: batchID,
                        toBatch: inquiryID,
                        notes: `${batchID} has been transferred`,
                    })
                );
            })
        });

        await Promise.all(operations);

        const update = {
            readyToDispatch: true,
            followUpDate: addDaysToToday(2),
        };

        if (removeFromStore(balanceDetails, totalFg)) {
            update.storeNeeded = DELETE_FIELD;
            note += "No more Goods needed, inquiry moved out of store."
        }

        const result = await serviceHelpers.updateLeadStatus(khID, update, inquiryID, note);

        setDisabled(true);
        if (closeDialog) closeDialog();

        return result;
    }

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation(
        getMutateObject(queryClient, queryFunction, showSnackbar, "Assigned Succesfully", inquiryID)
    );

    const getPlannedQty = (product) => product.planned;
    const getRemainingQty = (product) => product.remaining;

    const handleSubmit = (getQty) => {
        let batcheOBJ = {}
        let patchOBJ = {};

        balanceDetails
            .filter((product) => getQty(product) > 0)
            .forEach((details) => {
                patchOBJ[details.id] =
                    patchOBJ[details.id]
                    || { units: 0, name: details.name, storeBatches: details.storeBatches };

                patchOBJ[details.id].units += getQty(details);

                batcheOBJ[details.workingID] = {
                    name: details.name,
                    units: getQty(details),
                    batchID: details.batchID,
                    productId: details.id,
                    assigned: details.assigned
                }
            })

        Object.values(patchOBJ).forEach((details) => {
            const { returnBatch } =
                calculateGoodTotalsForAssignment(
                    details.storeBatches,
                    details.units);

            details.batches = returnBatch
        })

        mutate({ batcheOBJ, patchOBJ });
    }

    const onPlanChange = () => {
        const validInput = balanceDetails.every((product) => product.allotable >= product.planned);
        setDisabled(!validInput);
    }

    if (isPending) <GenericSpinner />

    return (
        <Grid2 container padding={1}>
            <Grid2 xs={12} textAlign={"left"} padding={1}>
                {
                    isPending
                        ? <GenericSpinner />
                        : <Button
                            onClick={() => handleSubmit(getRemainingQty)}
                            disabled={!canAllotAll}>
                            Allot All
                        </Button>
                }
            </Grid2>

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
                        <Grid2 md>In Store</Grid2>
                        <Grid2 md>Ready</Grid2>
                        <Grid2 md>Remaining</Grid2>
                        <Grid2 md>Max Plannable</Grid2>
                        <Grid2 md>Plan</Grid2>
                    </Grid2>
                </Typography>
            </Grid2>

            <Grid2 xs={12} >
                <Typography component={"span"} fontSize={commonFontSize}>
                    {
                        balanceDetails.filter((product) => product.allotable > 0)
                            .map((details, index) => (
                                <Grid2
                                    alignItems={"center"}
                                    key={index}
                                    textAlign={"center"}
                                    container
                                    className="p-2">

                                    <Grid2 xs={12} md={3}>{details.name}</Grid2>
                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.required)}
                                    </Grid2>
                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.storeBalance)}
                                    </Grid2>
                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.productionDone)}
                                    </Grid2>
                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.remaining)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.allotable)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        <AllotPlan
                                            ProductBalance={details}
                                            maxPossible={details.allotable}
                                            onPlannChange={onPlanChange} />
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
                        : <Button onClick={() => handleSubmit(getPlannedQty)} disabled={disabled}>
                            Allot
                        </Button>
                }
            </Grid2>

        </Grid2>
    )
}

export default AssignGoods;