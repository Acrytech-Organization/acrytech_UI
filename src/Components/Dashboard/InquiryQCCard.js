import React, { useContext } from 'react';
import { DELETE_FIELD, FAIL, INQUIRY_PRODUCTION, INQUIRY_REJECTION, INQUIRY_STORE_ACCOUNT_ID, PASS, REJECT, SCRAP_STORE_ACCOUNT_ID } from '../../Helpers/ConstantProperties';
import { addDaysToToday } from '../../Helpers/helpers';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FirmContext } from '../Contexts/FirmContext';
import { useSnackbar } from '../Contexts/SnackbarProvider';
import { v4 as uuidv4 } from 'uuid';
import { getMutateObject } from './InquiryCalculations';
import { DialogContext } from '../GenericComponents/Dialog/GenericDialogWithButton';
import InquiryQCTable from './inquiryQCTable';
import { GetTransactionsFromQCObject } from '../TaxInvoice/VoucherHelper';
import { DateContext } from '../Contexts/DateContext';

const InquiryQCCard = ({ inquiryID, productionPlan, totalInQC }) => {
    const { khID } = useContext(FirmContext);
    const { closeDialog } = useContext(DialogContext);
    const { currentDate } = useContext(DateContext);
    const { showSnackbar } = useSnackbar();

    const passResources = {};
    const rejectResources = {};

    let note = "Quality Check Report: \r\n";

    let markProdNeeded = false;
    let markStoreNeeded = false;
    let dispatchNeeded = false;

    const batchesToUpdate = {}
    let totalChecked = 0;

    const queryFn = async () => {
        const update = {
            followUpDate: addDaysToToday(2),
        };

        if (Object.entries(passResources).length > 0) {
            const voucher = {
                type: INQUIRY_PRODUCTION,
                date: currentDate,
                verified: true,
                inquiryId: inquiryID,
                markers: [],
            }

            voucher.transactions = GetTransactionsFromQCObject(
                passResources,
                inquiryID,
                INQUIRY_STORE_ACCOUNT_ID,
                currentDate,
                voucher.markers
            );

            if (dispatchNeeded)
                update.readyToDispatch = true;

            await serviceHelpers.creteProductVoucher(khID, voucher);
        }

        if (Object.entries(rejectResources).length > 0) {
            const voucher = {
                type: INQUIRY_REJECTION,
                date: currentDate,
                verified: true,
                inquiryId: inquiryID,
            }

            voucher.transactions = GetTransactionsFromQCObject(
                rejectResources, inquiryID, SCRAP_STORE_ACCOUNT_ID);

            await serviceHelpers.creteProductVoucher(khID, voucher);
        }

        Object.entries(batchesToUpdate).forEach(async ([batchID, update]) => {
            await serviceHelpers.patchBatches(khID, batchID, update);
        })

        // Check if all the QC has been done.
        if (totalChecked === totalInQC)
            update.qcNeeded = DELETE_FIELD;

        if (markProdNeeded) update.prodNeeded = true;
        if (markStoreNeeded) update.storeNeeded = true;

        await serviceHelpers.updateLeadStatus(khID, update, inquiryID, note);
        if (closeDialog) closeDialog()
    }

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation(
        getMutateObject(queryClient, queryFn, showSnackbar, "QC Saved Succesfully", inquiryID)
    );

    const onChangeAction = (action, product) => {
        const id = product.workingID;
        const quantity = product.inQC;
        totalChecked += quantity;

        const update = {
            inQC: product.inQC - quantity
        }

        if (action === PASS) {

            note += quantity + " qty of " + product.name + " Passed. \r\n";

            if (!product.skipStore)
                passResources[id] = {
                    [inquiryID]: quantity,
                    productID: product.id,
                    name: product.name
                }

            update.passed = product.passed + quantity;

            if (product.showInDispatch) {
                dispatchNeeded = true;
            }
        } else {
            const reason = product.rejectionReason ? product.rejectionReason : "Not Provided."
            note += quantity + " qty of " + product.name + " Failed because " + reason + ". \r\n";

            if (action === FAIL) {
                markProdNeeded = true;

                update.failed = product.failed + quantity;
                update["FAIL-" + uuidv4()] = {
                    date: new Date().getTime(),
                    units: quantity,
                    reason: reason
                }
            }

            if (action === REJECT) {
                markStoreNeeded = true;

                if (!product.skipStore)
                    rejectResources[id] = { [inquiryID]: quantity, productID: product.id }

                update.rejected = product.rejected + quantity;
                update["REA-" + uuidv4()] = {
                    date: new Date().getTime(),
                    units: quantity,
                    reason: reason
                }
            }
        }

        batchesToUpdate[product.batchID] = update;
    }

    return <InquiryQCTable
        mutate={mutate}
        isPending={isPending}
        productionPlan={productionPlan}
        onChangeAction={onChangeAction} />
};

export default InquiryQCCard;