import Grid2 from '@mui/material/Unstable_Grid2';
import { Divider, Typography } from '@mui/material';
import { getLocalDateString } from '../../../Helpers/helpers';
import TransportInput from './TransportInput';
import { commonFontWeight } from '../../../Helpers/ConstantProperties';

const TransportForm = ({ document }) => {

    return (
        <Grid2 container paddingTop={2} rowGap={2} >

            <Grid2 xs={12}>
                <Typography component={"span"} fontWeight={commonFontWeight}>
                    {"Name: "}
                </Typography>
                {document.vendorName || document.customerName}
            </Grid2>

            <Grid2 xs={12}>
                <Typography component={"span"} fontWeight={commonFontWeight}>
                    {"Type: "}
                </Typography>
                {document.type}
            </Grid2>

            <Grid2 xs={12}>
                <Typography component={"span"} fontWeight={commonFontWeight}>
                    {"Date: "}
                </Typography>
                {getLocalDateString(document.date)}
            </Grid2>

            <Grid2 xs={12}>
                <Typography component={"span"} fontWeight={commonFontWeight}>
                    {"Ref ID: "}
                </Typography>
                {document.refranceId || document.id}
            </Grid2>

            <Grid2 xs={12}>
                <Divider
                    className='rounded'
                    sx={{ borderBottomWidth: 2, bgcolor: 'black', mt: 1 }} />
            </Grid2>

            <Grid2 xs={12}>
                <TransportInput document={document} />
            </Grid2>

        </Grid2>
    )
};

export default TransportForm;