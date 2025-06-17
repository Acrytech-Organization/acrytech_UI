import { useContext, useState } from 'react';
import { FirmContext } from '../Contexts/FirmContext';
import { useSnackbar } from '../Contexts/SnackbarProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMutateObject } from '../Dashboard/InquiryCalculations';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GenericErrorComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import Grid2 from '@mui/material/Unstable_Grid2';
import GenericFormHeader from '../GenericComponents/FormComponent/GenericFormHeader';
import { Button, Paper } from '@mui/material';
import AddProperty from '../AddProperties/AddProperty';
import GenericSpinner from '../GenericComponents/FormComponent/GenericSpinner';
import InquirySFOutQty from './InquirySFOutQty';
import { propertyList } from '../../Helpers/ExtraProperties';
import { addDaysToToday, checkValue } from '../../Helpers/helpers';
import { ACCOUNT_USER_LEVEL_ID, BILLING_ADDRESS, NEW_PRODUCTION, OUTWORD_CHALLAN, SHIPPING_ADDRESS, STORE_MANAGER_USER_LEVEL_ID } from '../../Helpers/ConstantProperties';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import InquiryVendorOutQty from './InquiryVendorOutQty';
import { getRateDetails } from '../Quotation/RateCalculator';
import { DocumentFormatContext } from '../Contexts/DocumentFormatContext';

const InqOutChallan = () => {
    const { khID, currentFirm } = useContext(FirmContext);
    const { selectedFormat } = useContext(DocumentFormatContext);

    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [vehical, setVehical] = useState("");
    const [driver, setDriver] = useState("");
    const [eway, setEway] = useState("");
    const [poNumber, setPoNumber] = useState("");
    const [vendor, setVendor] = useState(null);
    const [totalPlanned, setTotalPlanned] = useState(0);
    const [requirementList, setReqList] = useState([]);

    const canSubmit =
        totalPlanned > 0 &&
        vendor !== null &&
        vehical !== ""

    const location = useLocation();
    const inquiry = location.state?.inquiry
    const balanceDetails = location.state?.balanceDetails;

    const queryClient = useQueryClient();

    const queryFunction = async () => {
        let note = "Products sent to " + vendor.name + " for processing: \r\n";

        const batchesToUpdate = {};

        const voucher = {
            vehicalNo: checkValue(vehical),
            driverName: checkValue(driver),
            eway: checkValue(eway),
            vendorName: vendor.name,
            [BILLING_ADDRESS]: vendor[BILLING_ADDRESS],
            [SHIPPING_ADDRESS]: vendor[SHIPPING_ADDRESS],
            inquiryId: inquiry.id,
            type: OUTWORD_CHALLAN,
            date: new Date().valueOf(),
            verified: true,
            transactions: [],
            effectAccess: [ACCOUNT_USER_LEVEL_ID, STORE_MANAGER_USER_LEVEL_ID]
        }

        const fromAccount = inquiry.id;
        const toAccount = vendor.id;

        balanceDetails.forEach((product) => {
            if (product.planned > 0 && product.batchID) {

                const batchObject = {
                    atVendor: product.atVendor += product.planned,
                    vendorID: vendor.id
                }

                if (product.failed > 0) {
                    batchObject.failed =
                        product.failed -= Math.min(product.failed, product.planned);
                }

                batchesToUpdate[product.batchID] = batchObject;

                note += product.name + ": " + product.planned + " \r\n";
            }
        });

        note += "\r\n SFG / RM Sent: \r\n";

        const voucherProducts = []

        requirementList.forEach((product) => {

            voucherProducts.push({
                product: product,
                units: product.planned
            });

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
                batches: [{ id: vendor.id, units: -1 * product.planned }]
            })

            // To
            voucher.transactions.push({
                ...txnObject,
                accountID: toAccount,
                units: product.planned,
                batches: [{ id: inquiry.id, units: product.planned }]
            })

            note += product.name + ": " + product.planned + " \r\n";
        })

        const update = {
            followUpDate: addDaysToToday(2)
        };

        Object.entries(batchesToUpdate).forEach(async ([batchID, update]) => {
            await serviceHelpers.patchBatches(khID, batchID, update);
        })

        if (voucher.transactions.length > 0) {
            const refId = await serviceHelpers.getSeriesNumber(
                khID, { prefix: currentFirm.prefixes.challan });

            voucher.refranceId = refId.id;

            const challanProps = {
                vehicalNo: vehical,
                driverName: driver,
                customerName: vendor.name,
                poNumber: poNumber,
                contactPhone: vendor.partyPhone,
                contactEmail: vendor.partyEmail,
                city: vendor.city,
                inquiryId: inquiry.id,
                products: voucherProducts
            }

            voucher.cData = getRateDetails({
                inquiry: challanProps,
                currentFirm: currentFirm,
                docFormat: selectedFormat
            });

            await serviceHelpers.creteProductVoucher(khID, voucher);
            note += "Voucher ID: " + voucher.refranceId;
        }

        await serviceHelpers.updateLeadStatus(khID, update, inquiry.id, note);

        setTotalPlanned(0);
        return true;
    }

    // TODO: Create a challan format and navigatge to that.
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
        const reqList = []

        balanceDetails
            .filter((product) => product.planned > 0)
            .forEach(product => {

                totalPlanned += product.planned;

                const extraPlanned = product.planned - product.failed;

                if (product.failed > 0) {
                    reqList.push({
                        id: product.id,
                        name: product.name,
                        productHSNcode: product.productHSNcode,
                        productItemcode: product.productItemcode,
                        unit: product.unit,
                        planned: product.failed
                    })
                }

                if (extraPlanned > 0) {
                    product.rmlist.forEach(req => {
                        const reqObject = reqList.find((reqItem) => reqItem.id === req.id);

                        if (reqObject) {
                            reqObject.planned += req.fgRate * product.planned
                        }
                        else {
                            reqList.push({
                                id: req.id,
                                name: req.name,
                                productHSNcode: req.productHSNcode,
                                productItemcode: req.productItemcode,
                                unit: req.unit,
                                planned: req.fgRate * extraPlanned
                            })
                        }
                    });
                }


            });

        setTotalPlanned(totalPlanned);
        setReqList(reqList);
    }

    if (!(balanceDetails && inquiry)) {
        return <GenericErrorComponent error={"Data Not Present"} />
    }

    const propList = [
        {
            item: propertyList.VendorDropDown,
            attributes: {
                lg: 8
            }
        },
        {
            item: propertyList.PoNumber,
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
                lg: 4
            }
        },
        {
            item: {
                displayName: 'Driver',
                helperText: 'Please Enter the Driver Name',
            },
            attributes: {
                lg: 4
            }
        },
        {
            item: {
                displayName: 'EWay',
                helperText: 'Please Enter the Eway Number',
            },
            attributes: {
                lg: 4
            }
        }
    ]

    return (
        <>
            <GenericFormHeader title={"Generate Out Challan"} enableBack={true} />
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Grid2 container rowGap={2}>
                    <AddProperty
                        deleteField={(element) => { setVendor(null) }}
                        data={propList[0]}
                        currentValue={vendor}
                        onChange={(e) => setVendor(e.value)}
                    />

                    <AddProperty
                        deleteField={(element) => { setPoNumber("") }}
                        data={propList[1]}
                        currentValue={poNumber}
                        onChange={(e) => setPoNumber(e.value)}
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

                    <AddProperty
                        deleteField={(element) => { setEway("") }}
                        data={propList[4]}
                        currentValue={eway}
                        onChange={(e) => setEway(e.value)}
                    />

                    <Grid2 xs={12}>
                        <InquirySFOutQty
                            balanceDetails={balanceDetails}
                            onPlannedChange={onPlannedChange} />
                    </Grid2>

                    <Grid2 xs={12}>
                        <InquiryVendorOutQty reqList={requirementList} />
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

export default InqOutChallan;