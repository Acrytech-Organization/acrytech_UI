import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { checkValue } from '../../Helpers/helpers';
import { commonFontSize, commonFontWeight, largeFontSize } from '../../Helpers/ConstantProperties';
import { Typography } from '@mui/material';

const Label = ({ label, value }) => (
    <Typography
        className='text-break'
        variant={"body2"}
        noWrap={false}
        fontSize={commonFontSize}
        padding={0.5}
    >
        <span><strong>{label}</strong> {value}</span>
    </Typography>
);

const QuotationInfo = ({ title, name, address, city, pincode, gstin, pan, phoneNumber, email }) => (
    <Grid2 container>
        <Grid2 xs={12} padding={0.5}>
            <Typography variant='body2' >{title}</Typography>
        </Grid2>
        <Grid2 xs={12}>
            <Typography
                paddingX={0.5}
                variant="body1"
                sx={{ fontWeight: commonFontWeight, fontSize: largeFontSize }}
                color={'primary.main'}>
                {name}
            </Typography>
        </Grid2>
        {(address || city) && (
            <Grid2 container spacing={1} xs={12}>
                {address && pincode ? (
                    <Grid2 xs={12}>
                        <Label label="Address:" value={`${checkValue(address)}, ${checkValue(city)}, ${checkValue(pincode)}`} />
                    </Grid2>
                ) : city && (
                    <Grid2 xs={12}>
                        <Label label="City:" value={checkValue(city)} />
                    </Grid2>
                )}
            </Grid2>
        )}
        <Grid2 container>
            <Grid2 xs={12}>
                <Label label="GSTIN:" value={checkValue(gstin)} />
            </Grid2>
            <Grid2 xs={12}>
                <Label label="PAN:" value={checkValue(pan)} />
            </Grid2>
            <Grid2 xs={12}>
                <Label label="Contact No:" value={checkValue(phoneNumber)} />
            </Grid2>
            <Grid2 xs={12}>
                <Label label="Email ID:" value={checkValue(email)} />
            </Grid2>
        </Grid2>
    </Grid2>
);

export default QuotationInfo;