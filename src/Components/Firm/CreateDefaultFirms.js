import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { Box, Button, Typography, Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMutation } from '@tanstack/react-query';
import { BANK_ACCOUNT_TAG, HSN_CODE_PROP } from "../../Helpers/ExtraProperties";
import { v4 as uuidv4 } from 'uuid';

const CreateDefaultFirms = () => {
    const { resetFirmList } = useContext(FirmContext);

    const CanaraBankObject = {
        name: 'Canara bank',
        bankaccount: '6636201000107',
        ifsc: 'CNRB0006636',
        bankbranch: 'Satara',
        id: uuidv4(),
        tag: BANK_ACCOUNT_TAG
    }

    const AxisBankObject = {
        name: 'Axis Bank',
        bankaccount: '920020051334735',
        ifsc: 'UTIB0003058',
        bankbranch: 'Satara',
        id: uuidv4(),
        tag: BANK_ACCOUNT_TAG
    }

    const ACRYTECHKHID = 'BWQPS6057L';
    const ACRYPLUS = 'ABSFA5362N'

    var customFirms = [{
        name: 'ACRYTECH SOLUTION',
        khID: ACRYTECHKHID,
        address: 'Shade No.04, Sr No.22/2/2A/1, Hari Industries, Ambai Mata Road, Narhe, Pune.',
        phoneNumber: '+91 9765931073',
        email: 'info@acrytechsolutions.com',
        city: 'Pune',
        pincode: '411041',
        gstin: '27BWQPS6057L1ZJ',
        logoUrl: 'random.png',
        bankName: CanaraBankObject.name,
        accountNo: CanaraBankObject.bankaccount,
        ifscCode: CanaraBankObject.ifsc,
        bankId: CanaraBankObject.id,
        branch: CanaraBankObject.bankbranch,
        [HSN_CODE_PROP]: '3920511',
        gstDropdownList: ['0', '5', '12', '18', '28'],
        defaultGST: '18',
        accounts: [CanaraBankObject]
    },
    {
        name: 'ACRYPLUS INDUSTRIAL SOLUTIONS',
        khID: ACRYPLUS,
        address: 'Acryplus Industrial Solutions Shed No 1, Sr. No. 21/1/4, Laygude Industries, Narhe, Pune.',
        phoneNumber: '+91 96578 68253',
        email: 'fabrication@acryplus.in',
        city: 'Pune',
        pincode: '411041',
        gstin: '27ABSFA5362N1ZQ',
        logoUrl: 'https://firebasestorage.googleapis.com/v0/b/khatavani-933a5.appspot.com/o/ABSFA5362N%2FAcryPlusLogo.png?alt=media&token=3424f01f-6e7a-48fc-9ea6-a8466bea20b0',
        bankName: AxisBankObject.name,
        accountNo: AxisBankObject.bankaccount,
        ifscCode: AxisBankObject.ifsc,
        branch: AxisBankObject.bankbranch,
        bankId: AxisBankObject.id,
        accounts: [AxisBankObject]
    }
    ];

    const { data, mutate, isPending } = useMutation({
        mutationFn: async () => {
            const result = await Promise.all(
                customFirms.map(async (firm) => await serviceHelpers.createFirm(firm))
            );
            resetFirmList();
            return result;
        }
    });

    const handleClick = () => {
        mutate();
    };

    return (
        <Box alignItems="center" display={"flex"} flexGrow={"1"} spacing={1} sx={{ p: 2, gap: 2, flexDirection: 'column' }}>
            {customFirms.map((firm) => (
                <Paper key={firm.khID}>
                    Firm Name: {firm.name}, Firm ID: {firm.khID}, Status: {data?.some(item => item.id === firm.khID) ? 'Created' : 'Pending'}
                </Paper>
            ))}
            <Grid2>
                <Typography>
                    Proceed?
                </Typography>
            </Grid2>
            <Grid2 className='flex-grow-1'>
                <Button disabled={isPending} onClick={handleClick} variant="contained">
                    Ok
                </Button>
            </Grid2>
        </Box>
    );
};

export default CreateDefaultFirms;