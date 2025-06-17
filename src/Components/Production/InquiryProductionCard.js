import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useContext, useState } from 'react';
import { commonFontSize, commonFontWeight, DELETE_FIELD, INQUIRY_PRODUCTS, INQUIRY_STORE_ACCOUNT_ID } from '../../Helpers/ConstantProperties';
import { addDaysToToday, checkValueNumber, getVoucher } from '../../Helpers/helpers';
import ProductionPlanText from '../Stock/ProductionPlanText';
import { FirmContext } from '../Contexts/FirmContext';
import { useSnackbar } from '../Contexts/SnackbarProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import GenericSpinner from '../GenericComponents/FormComponent/GenericSpinner';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { getMutateObject, isProductionNeeded } from '../Dashboard/InquiryCalculations';
import { DialogContext } from '../GenericComponents/Dialog/GenericDialogWithButton';

const InquiryProductionCard = ({ prodData, InquiryID }) => {
    const { khID } = useContext(FirmContext);
    const { closeDialog } = useContext(DialogContext);

    const { showSnackbar } = useSnackbar();
    const [disabled, setDisabled] = useState(true);
    const [count, setCount] = useState(1);

    const onPlannChange = () => {
        const total = prodData.reduce((total, product) => total + product.planned, 0);

        const isPossible = prodData.filter((product) => product.remainingProduction > 0)
            .every((product) => product.planned <= product.remainingProduction);

        const canMark = (total > 0) && isPossible;

        setCount(count + 1);
        setDisabled(!canMark);
    }

    const queryFunction = async () => {
        const resources = {};
        const batchesToUpdate = {};
        let notes = "Production Marked: \n";

        prodData.filter((product) => product.planned > 0 && product.batchID).forEach((product) => {
            notes += product.name + " : " + product.planned + "\n";

            const batchObject = {
                inQC: product.inQC += product.planned,
            }

            product.remainingProduction -= product.planned;

            if (product.failed > 0) {
                batchObject.failed =
                    product.failed -= Math.min(product.failed, product.planned);
            }

            batchesToUpdate[product.batchID] = batchObject;

            product.processes.forEach((process) => {
                resources[process.id] =
                    resources[process.id] ? resources[process.id] : { [InquiryID]: 0 };

                resources[process.id][InquiryID] += product.planned * process.fgRate;
            });
        })

        let voucher = getVoucher(
            InquiryID,
            INQUIRY_STORE_ACCOUNT_ID,
            resources,
            INQUIRY_PRODUCTS
        );

        voucher.inquiryId = InquiryID

        const update = {
            followUpDate: addDaysToToday(2),
            qcNeeded: true
        };

        if (!isProductionNeeded(prodData)) {
            update.prodNeeded = DELETE_FIELD;
            notes += "Production Done for " + InquiryID + "\n";
        }

        Object.entries(batchesToUpdate).forEach(async ([batchID, update]) => {
            await serviceHelpers.patchBatches(khID, batchID, update);
        })

        if (voucher.transactions.length > 0) {
            const result = await serviceHelpers.creteProductVoucher(khID, voucher);
            notes += "Voucher ID: " + result.id;
        }

        await serviceHelpers.updateLeadStatus(khID, update, InquiryID, notes);

        setDisabled(true);
        if (closeDialog) closeDialog()
    }

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation(
        getMutateObject(
            queryClient, queryFunction, showSnackbar, "Production Recorded Succesfully", InquiryID)
    );

    return (
        <Grid2 container>
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
                        <Grid2 md>In Quality Check</Grid2>
                        <Grid2 md>At Vendor</Grid2>
                        <Grid2 md>QC Passed</Grid2>
                        <Grid2 md>QC Rejected</Grid2>
                        <Grid2 md>Remaining</Grid2>
                        <Grid2 md>Plan</Grid2>
                    </Grid2>
                </Typography>
            </Grid2>

            <Grid2 xs={12} >
                <Typography component={"span"} fontSize={commonFontSize}>
                    {
                        prodData.filter((product) => product.remainingProduction > 0).map(
                            (details, index) => (
                                <Grid2
                                    key={index}
                                    textAlign={"center"}
                                    container
                                    className="p-2">

                                    <Grid2 xs={12} md={3}>{details.name}</Grid2>

                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.released)}
                                    </Grid2>


                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.inQC)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.atVendor)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.passed)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.rejected)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        {checkValueNumber(details.remainingProduction)}
                                    </Grid2>

                                    <Grid2 xs={12} md>
                                        <ProductionPlanText
                                            ProductBalance={details}
                                            onPlannChange={onPlannChange}
                                            maxPossible={details.remainingProduction} />
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
                            Mark As Produced
                        </Button>
                }
            </Grid2>
        </Grid2>
    )
};

export default InquiryProductionCard;