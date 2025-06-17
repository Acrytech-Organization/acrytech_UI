import Grid2 from "@mui/material/Unstable_Grid2";
import { ACCOUNT_USER_LEVEL_ID, INR_RESOURCE_ID, LABOUR_VOUCHER_TYPE, MANHR_RESOURCE_ID, UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { labourCostToInqProp } from "../../Helpers/ExtraProperties";
import AddProperty from "../AddProperties/AddProperty";
import { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FirmContext } from "../Contexts/FirmContext";
import GenericMutateButton from "../GenericComponents/Buttons/GenericMutateButton";
import { v4 as uuidv4 } from 'uuid';
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { addDaysToToday, ShowNumber } from "../../Helpers/helpers";

const InquiryLabourForm = ({ inquiry }) => {
    const { khID } = useContext(FirmContext);
    const queryClient = useQueryClient();

    const [labour, setLabour] = useState(null);
    const [hrs, setHrs] = useState(0);
    const [description, setDescription] = useState("");

    const successMessage = "Labour Created Successfully";

    const queryFunction = async () => {
        const cost = labour.perHrRate * hrs;
        const note = "Labour cost of "
            + ShowNumber(cost, 2, true)
            + " for "
            + labour.name
            + " added."

        const fromTransaction = {
            resourceID: INR_RESOURCE_ID,
            accountID: labour.id,
            batches: [{ id: inquiry.id, units: -cost }],
            units: -cost,
            description: description
        }

        const toTransaction = {
            resourceID: INR_RESOURCE_ID,
            accountID: inquiry.id,
            batches: [{ id: labour.id, units: cost }],
            units: cost,
            name: labour.name,
            hrs: hrs,
            description: description
        }

        const fromHrTxn = {
            resourceID: MANHR_RESOURCE_ID,
            accountID: labour.id,
            batches: [{ id: inquiry.id, units: -hrs }],
            units: -hrs,
            description: description
        }

        const toHrTxn = {
            resourceID: MANHR_RESOURCE_ID,
            accountID: inquiry.id,
            batches: [{ id: labour.id, units: hrs }],
            units: hrs,
            name: labour.name,
            description: description
        }

        const voucher = {
            id: uuidv4(),
            type: LABOUR_VOUCHER_TYPE,
            date: new Date().valueOf(),
            verified: true,
            transactions: [
                fromTransaction,
                toTransaction,
                fromHrTxn,
                toHrTxn
            ],
            effectAccess: [ACCOUNT_USER_LEVEL_ID]
        }

        const result = await serviceHelpers.creteProductVoucher(khID, voucher);

        const update = {
            followUpDate: addDaysToToday(1),
        };

        await serviceHelpers.updateLeadStatus(khID, update, inquiry.id, note);

        setLabour(null);
        setHrs(0);
        setDescription("");

        return result
    }

    const onSuccess = async () => {
        queryClient.invalidateQueries({
            predicate: (query) => query.queryKey.includes(UPDATE_ON_INQUIRY),
        })

        return true;
    }

    const disabled = (labour === null || hrs === 0)

    return (
        <Grid2 container>
            <AddProperty
                currentValue={labour}
                data={labourCostToInqProp[0]}
                onChange={(value) => setLabour(value.value)} />

            <AddProperty
                currentValue={hrs}
                data={labourCostToInqProp[1]}
                onChange={(value) => setHrs(value.value)} />

            <AddProperty
                currentValue={description}
                data={labourCostToInqProp[2]}
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

export default InquiryLabourForm;