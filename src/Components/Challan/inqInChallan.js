import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GenericErrorComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { propertyList } from '../../Helpers/ExtraProperties';
import GenericFormHeader from '../GenericComponents/FormComponent/GenericFormHeader';
import { Button, Paper } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import AddProperty from '../AddProperties/AddProperty';
import GenericSpinner from '../GenericComponents/FormComponent/GenericSpinner';
import InquirySFInQty from './InquirySFInQty';
import { getMutateObject, isProductionNeeded } from '../Dashboard/InquiryCalculations';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../Contexts/SnackbarProvider';
import { FirmContext } from '../Contexts/FirmContext';
import { addDaysToToday, checkValue } from '../../Helpers/helpers';
import { ACCOUNT_USER_LEVEL_ID, DELETE_FIELD, INWORD_CHALLAN, NEW_PRODUCTION, STORE_MANAGER_USER_LEVEL_ID } from '../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';

const InqInChallan = () => {
    const { khID } = useContext(FirmContext);
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [vehical, setVehical] = useState("");
    const [driver, setDriver] = useState("");
    const [refid, setRefID] = useState("");
    const [vendor, setVendor] = useState(null);
    const [totalPlanned, setTotalPlanned] = useState(0);

    const canSubmit =
        totalPlanned > 0 &&
        vendor !== null &&
        vehical !== "" &&
        refid !== ""

    const location = useLocation();
    const inquiry = location.state?.inquiry
    const balanceDetails = location.state?.balanceDetails;

    var filteredBalance = []

    if (vendor !== null) {
        filteredBalance = balanceDetails.filter((product) => product.vendorID === vendor.id);
    }

    const propList = [
        {
            item: propertyList.VendorDropDown,
            attributes: {
                lg: 8
            }
        },
        {
            item: propertyList.documentRefID,
            attributes: {
                lg: 4
            }
        },
        {
            item: {
                displayName: 'Vehical',
                helperText: 'Please Enter the Vehical Number',
                required: true,
            },
            attributes: {
                lg: 6
            }
        },
        {
            item: {
                displayName: 'Driver',
                helperText: 'Please Enter the Driver Name',
            },
            attributes: {
                lg: 6
            }
        },
    ]

    const queryClient = useQueryClient();

    const queryFunction = async () => {
        let note = "Products received from " + vendor.name + " after processing: \r\n";

        const batchesToUpdate = {};

        const voucher = {
            vehicalNo: checkValue(vehical),
            driverName: checkValue(driver),
            vendorName: vendor.name,
            inquiryId: inquiry.id,
            type: INWORD_CHALLAN,
            date: new Date().valueOf(),
            verified: true,
            refranceId: refid,
            transactions: [],
            effectAccess: [ACCOUNT_USER_LEVEL_ID, STORE_MANAGER_USER_LEVEL_ID]
        }

        const fromAccount = vendor.id;
        const toAccount = inquiry.id;

        balanceDetails.forEach((product) => {
            if (product.planned > 0) {
                const batchObject = {
                    atVendor: product.atVendor -= product.planned,
                    inQC: product.inQC += product.planned,
                }

                // In this case we don't need to update the remainingProduction
                // property of the production Planning object
                // As the material came from vendor and moved to QC
                // keeping the remainingProduction unchanged.

                batchesToUpdate[product.batchID] = batchObject;

                const txnObject = {
                    vendorName: vendor.name,
                    inquiryID: inquiry.id,
                    resourceID: product.id,
                }

                // From
                voucher.transactions.push({
                    ...txnObject,
                    accountID: fromAccount,
                    units: -1 * product.planned,
                    batches: [{ id: inquiry.id, units: -1 * product.planned }]
                })

                // To
                voucher.transactions.push({
                    ...txnObject,
                    accountID: toAccount,
                    units: product.planned,
                    batches: [{ id: vendor.id, units: product.planned }]
                })

                note += product.name + ": " + product.planned + " \r\n";
            }
        })

        const update = {
            followUpDate: addDaysToToday(2),
            qcNeeded: true,
        };

        if (!isProductionNeeded(balanceDetails)) {
            update.prodNeeded = DELETE_FIELD;
            note += "Production Done for " + inquiry.id + "\n";
        }

        Object.entries(batchesToUpdate).forEach(async ([batchID, update]) => {
            await serviceHelpers.patchBatches(khID, batchID, update);
        })

        if (voucher.transactions.length > 0) {
            const result = await serviceHelpers.creteProductVoucher(khID, voucher);
            note += "Voucher ID: " + result.id;
        }

        await serviceHelpers.updateLeadStatus(khID, update, inquiry.id, note);

        setTotalPlanned(0);
        return true;
    }

    const navigateOut = (result) => navigate(NEW_PRODUCTION);

    const { mutate, isPending } = useMutation(
        getMutateObject(
            queryClient,
            queryFunction,
            showSnackbar,
            "Challan generated succesfully",
            inquiry.id,
            navigateOut)
    )

    const onPlannedChange = () => {
        var totalPlanned = 0;

        balanceDetails
            .filter((product) => product.planned > 0)
            .forEach(product => {
                totalPlanned += product.planned;
            });

        setTotalPlanned(totalPlanned);
    }

    if (!(balanceDetails && inquiry)) {
        return <GenericErrorComponent error={"Data Not Present"} />
    }

    return (
        <>
            <GenericFormHeader title={"Generate Inword Challan"} enableBack={true} />
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Grid2 container rowGap={2}>
                    <AddProperty
                        deleteField={(element) => { setVendor(null) }}
                        data={propList[0]}
                        currentValue={vendor}
                        onChange={(e) => setVendor(e.value)}
                    />

                    <AddProperty
                        deleteField={(element) => { setRefID("") }}
                        data={propList[1]}
                        currentValue={refid}
                        onChange={(e) => setRefID(e.value)}
                    />

                    <AddProperty
                        deleteField={(element) => { setVehical("") }}
                        data={propList[2]}
                        currentValue={vehical}
                        onChange={(e) => setVehical(e.value)}
                    />

                    <AddProperty
                        deleteField={(element) => { setDriver("") }}
                        data={propList[3]}
                        currentValue={driver}
                        onChange={(e) => setDriver(e.value)}
                    />

                    <Grid2 xs={12}>
                        <InquirySFInQty
                            balanceDetails={filteredBalance}
                            onPlannedChange={onPlannedChange} />
                    </Grid2>

                    <Grid2 xs={12} textAlign={"center"}>
                        {
                            isPending
                                ? <GenericSpinner />
                                : <Button onClick={mutate} disabled={!canSubmit}>
                                    Generate
                                </Button>
                        }
                    </Grid2>

                </Grid2>
            </Paper>
        </>
    )
};

export default InqInChallan;