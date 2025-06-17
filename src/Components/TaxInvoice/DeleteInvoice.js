import React, { useContext, useState } from 'react';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { FirmContext } from '../Contexts/FirmContext';
import { BALANCE, CONVERTED, INQUIRY_STORE_ACCOUNT_ID, OUTWORD_CHALLAN, PRODUCTION_PLAN_RESOURCE_ID, TAX_INVOICE, TRANSPORT_RESOURCE_ID, UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import { INQUIRY_TAG, SchemaTypes } from '../../Helpers/ExtraProperties';
import { addDaysToToday } from '../../Helpers/helpers';
import { useQueryClient } from '@tanstack/react-query';
import Grid2 from '@mui/material/Unstable_Grid2';
import AddProperty from '../AddProperties/AddProperty';
import GenericMutateButton from '../GenericComponents/Buttons/GenericMutateButton';
import dayjs from 'dayjs';

const DeleteInvoice = ({ item }) => {
    const { khID } = useContext(FirmContext);
    const queryClient = useQueryClient();

    const [reason, setReason] = useState("");

    const canSubmit = reason !== "";

    const queryFunction = async () => {

        if (item.inquiryId) {
            // Get the Planning Object
            const balanceOption = {
                accountID: item.inquiryId,
                resourceID: PRODUCTION_PLAN_RESOURCE_ID,
                date: dayjs().endOf('day'),
                withBatches: true,
            }

            const prodPlan = await serviceHelpers.getResourceBalance(khID, balanceOption);
            const batchesToUpdate = {};

            if (prodPlan && prodPlan[0]) {
                const planResultData = prodPlan[0];

                item.cData.items.forEach((product) => {
                    if (product.workingID && product.workingID !== TRANSPORT_RESOURCE_ID) {

                        const productionResult = planResultData?.batches[product.workingID];

                        const update = {
                            dispatched: productionResult.dispatched - product.units
                        }

                        batchesToUpdate[product.workingID] = update;
                    }
                })
            }

            const update = {
                followUpDate: addDaysToToday(2),
                status: CONVERTED,
                tag: INQUIRY_TAG,
                readyToDispatch: true,
                deletedInvoice: {
                    id: item.id,
                    date: item.date,
                }
            }

            const note = "Invoice " + item.id + " deleted because." + reason + ". items returned to store."

            await serviceHelpers.updateLeadStatus(khID, update, item.inquiryId, note);

            Object.entries(batchesToUpdate).forEach(async ([batchID, update]) => {
                await serviceHelpers.patchBatches(khID, batchID, update);
            })
        }

        return await serviceHelpers.deleteInvoices(khID, item.id, reason);
    }

    const qkeys = [TAX_INVOICE, (BALANCE + INQUIRY_STORE_ACCOUNT_ID), OUTWORD_CHALLAN]

    if (item.inquiryId) {
        qkeys.push(UPDATE_ON_INQUIRY);
        qkeys.push(BALANCE + item.inquiryId);
    }

    const predicate = (query) =>
        qkeys.some((queryKey) => query.queryKey.includes(queryKey))

    const onSuccess = async () => {
        await queryClient.invalidateQueries({
            predicate: predicate
        })
    }

    return (
        <Grid2 container>
            <Grid2 xs={12}>
                <AddProperty
                    data={{
                        item: {
                            displayName: 'Reason For Deletion',
                            name: 'reason',
                            type: SchemaTypes.String,
                            required: true,
                            helperText: 'Please enter the reason',
                        },
                    }}
                    deleteField={(element) => { setReason("") }}
                    currentValue={reason}
                    onChange={(e) => setReason(e.value)}
                />
            </Grid2>

            <Grid2 xs={12} textAlign={"center"} paddingY={2}>
                <GenericMutateButton
                    queryFn={queryFunction}
                    disable={!canSubmit}
                    onSuccess={onSuccess}
                    successMessage="Invoice Deleted" />
            </Grid2>
        </Grid2>
    )
};

export default DeleteInvoice;