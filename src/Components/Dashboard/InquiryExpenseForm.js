import { useContext, useState } from 'react';
import { propertyList, SchemaTypes } from '../../Helpers/ExtraProperties';
import Grid2 from '@mui/material/Unstable_Grid2';
import AddProperty from '../AddProperties/AddProperty';
import GenericMutateButton from '../GenericComponents/Buttons/GenericMutateButton';
import { EXTERNAL_VOUCHER_TYPE, INR_RESOURCE_ID, UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import { useQueryClient } from '@tanstack/react-query';
import { ShowNumber } from '../../Helpers/helpers';
import { v4 as uuidv4 } from 'uuid';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { FirmContext } from '../Contexts/FirmContext';

const InquiryExpenseForm = ({ inquiry }) => {
    const { khID } = useContext(FirmContext);

    const [vendor, setVendor] = useState(null);
    const [refID, setRefID] = useState(null);
    const [cost, setCost] = useState(0);
    const [description, setDescription] = useState("");
    const queryClient = useQueryClient();

    const successMessage = "Invoice Created Successfully";

    const disabled = (vendor === null || cost === 0 || refID === null);

    const propList = [
        {
            item: propertyList.VendorDropDown,
            attributes: {
                xs: 12,
                md: 4
            }
        },
        {
            item: propertyList.documentRefID,
            attributes: {
                xs: 12,
                md: 4
            }
        },
        {
            item: {
                displayName: "Taxable Cost",
                name: "processCost",
                type: SchemaTypes.Number,
                required: true,
                helperText: 'Please enter the Process Cost',
            },
            attributes: {
                xs: 12,
                md: 4
            }
        },
        {
            item: propertyList.description,
            attributes: {
                xs: 12,
            },
            extraProps: {
                multiline: true,
                rows: 2
            },
        }
    ]

    const queryFunction = async () => {
        const fromTransaction = {
            resourceID: INR_RESOURCE_ID,
            accountID: vendor.id,
            batches: [{ id: inquiry.id, units: -cost }],
            units: -cost,
            description: description
        }

        const toTransaction = {
            resourceID: INR_RESOURCE_ID,
            accountID: inquiry.id,
            batches: [{ id: vendor.id, units: cost }],
            units: cost,
            name: vendor.name,
            description: description
        }

        const voucher = {
            id: uuidv4(),
            type: EXTERNAL_VOUCHER_TYPE,
            date: new Date().valueOf(),
            refranceId: refID,
            verified: true,
            transactions: [
                fromTransaction,
                toTransaction,
            ]
        }

        const note = "Invoice cost of "
            + ShowNumber(cost, 2, true)
            + " for "
            + vendor.name
            + " added. Voucher ID: " + voucher.id

        const result = await serviceHelpers.creteProductVoucher(khID, voucher);

        await serviceHelpers.updateLeadStatus(khID, {}, inquiry.id, note);

        setVendor(null);
        setCost(0);
        setDescription("");

        return result
    }

    const onSuccess = async () => {
        queryClient.invalidateQueries({
            predicate: (query) => query.queryKey.includes(UPDATE_ON_INQUIRY),
        })

        return true;
    }

    return (
        <Grid2 container>
            <AddProperty
                currentValue={vendor}
                data={propList[0]}
                onChange={(value) => setVendor(value.value)} />

            <AddProperty
                currentValue={refID}
                data={propList[1]}
                onChange={(value) => setRefID(value.value)} />

            <AddProperty
                currentValue={cost}
                data={propList[2]}
                onChange={(value) => setCost(value.value)} />

            <AddProperty
                currentValue={description}
                data={propList[3]}
                onChange={(value) => setDescription(value.value)} />

            <Grid2 xs={12} textAlign={"center"} padding={2}>
                <GenericMutateButton
                    disable={disabled}
                    onSuccess={onSuccess}
                    queryFn={queryFunction}
                    successMessage={successMessage} />

            </Grid2>
        </Grid2>
    )
};

export default InquiryExpenseForm;