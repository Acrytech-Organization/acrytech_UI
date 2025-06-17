import React, { useContext, useState } from 'react';
import { SchemaTypes } from '../../../Helpers/ExtraProperties';
import Grid2 from '@mui/material/Unstable_Grid2';
import AddProperty from '../../AddProperties/AddProperty';
import { Box, Typography } from '@mui/material';
import { ShowNumber } from '../../../Helpers/helpers';
import { commonFontWeight, DELETE_FIELD, INR_RESOURCE_ID, TRANSPORT_ACCOUNT_ID, TRANSPORT_VOUCHER_TYPE, UPDATE_ON_VOUCHER } from '../../../Helpers/ConstantProperties';
import { v4 as uuidv4 } from 'uuid';
import { serviceHelpers } from '../../../Helpers/ServiceHelpers';
import { useQueryClient } from '@tanstack/react-query';
import GenericMutateButton from '../../GenericComponents/Buttons/GenericMutateButton';
import { FirmContext } from '../../Contexts/FirmContext';

const TransportInput = ({ document }) => {
    const { khID } = useContext(FirmContext);

    const [cost, setCost] = useState(0);

    const property = {
        item: {
            displayName: "Transport Cost",
            name: "transportConst",
            type: SchemaTypes.Number,
            required: true,
            helperText: 'Please enter the Transport Cost',
        },
        attributes: {
            xs: 12
        }
    }

    const canSubmit = cost > 0 && document.inquiryId !== undefined;

    // Query FN
    const addTransport = async () => {
        const description = "Transport cost of " + (document.refranceId || document.id);

        const fromTransaction = {
            resourceID: INR_RESOURCE_ID,
            accountID: TRANSPORT_ACCOUNT_ID,
            batches: [{ id: document.inquiryId, units: -cost }],
            units: -cost,
            description: description
        }

        const toTransaction = {
            resourceID: INR_RESOURCE_ID,
            accountID: document.inquiryId,
            batches: [{ id: TRANSPORT_VOUCHER_TYPE, units: cost }],
            units: cost,
            description: description
        }

        const voucher = {
            id: uuidv4(),
            type: TRANSPORT_VOUCHER_TYPE,
            date: new Date().valueOf(),
            verified: true,
            refranceId: document.refranceId || document.id,
            transactions: [
                fromTransaction,
                toTransaction,
            ]
        }

        const note = "Transport cost of "
            + ShowNumber(cost, 2, true)
            + " for "
            + (document.refranceId || document.id)
            + " added. Voucher ID: " + voucher.id;

        const voucherUpdate = {
            transportConst: cost,
            transportVoucher: voucher.id,
        }

        await serviceHelpers.creteProductVoucher(khID, voucher);
        await serviceHelpers.patchVoucher(khID, voucherUpdate, document.id);
        return await serviceHelpers.updateLeadStatus(khID, {}, document.inquiryId, note);
    }

    const deleteTransport = async () => {
        // Delete INR voucher
        const tranportVID = document.transportVoucher;

        const voucherUpdate = {
            transportConst: DELETE_FIELD,
            transportVoucher: DELETE_FIELD,
        }

        const note = "Transport voucher " + tranportVID + " deleted.";

        await serviceHelpers.deleteChallans(khID, tranportVID);
        await serviceHelpers.patchVoucher(khID, voucherUpdate, document.id);
        return await serviceHelpers.updateLeadStatus(khID, {}, document.inquiryId, note);
    }

    const queryClient = useQueryClient();

    const onSuccess = async () => {
        queryClient.invalidateQueries({
            predicate: (query) => query.queryKey.includes(UPDATE_ON_VOUCHER),
        })

        return true;
    }

    if (document.transportConst) {
        return (
            <Box>
                <Grid2 container rowGap={2}>
                    <Grid2 xs={12}>
                        <Typography
                            component={"span"}
                            fontWeight={commonFontWeight}>
                            {
                                "Transport Cost: "
                            }
                        </Typography>

                        <Typography
                            component={"span"}
                            color={"primary"}>
                            {ShowNumber(document.transportConst, 2, true)}
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} textAlign={"right"}>
                        <GenericMutateButton
                            buttonText={"Delete"}
                            disable={false}
                            onSuccess={onSuccess}
                            queryFn={deleteTransport}
                            successMessage={"Transport cost deleted."} />
                    </Grid2>
                </Grid2>
            </Box>
        );
    }
    else {
        return (
            <Box>
                <Grid2 container rowGap={2}>
                    <AddProperty
                        deleteField={(element) => { setCost(0) }}
                        data={property}
                        currentValue={cost}
                        onChange={(e) => setCost(e.value)}
                    />

                    <Grid2 xs={12} textAlign={"right"}>
                        <GenericMutateButton
                            disable={!canSubmit}
                            onSuccess={onSuccess}
                            queryFn={addTransport}
                            successMessage={"Transport cost added."} />
                    </Grid2>
                </Grid2>
            </Box>
        )
    }
};

export default TransportInput;