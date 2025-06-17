import Grid2 from '@mui/material/Unstable_Grid2';
import { checkValue, getLocalDateString } from '../../Helpers/helpers';
import { commonFontWeight } from '../../Helpers/ConstantProperties';
import TextEllipsis from '../Quotation/TextEllipsis';

const ChalanIdAndDate = ({ item }) => {

    return (
        <Grid2 container spacing={2} p={2} direction="column">
            <Grid2 xs={12}>
                <TextEllipsis
                    text='Challan Details'
                    variant="h6"
                    sx={{ fontWeight: commonFontWeight, mb: 2 }}
                />
            </Grid2>
            <Grid2 container spacing={1} xs={12}>
                <Grid2 xs={12}>
                    <TextEllipsis
                        text={<span><strong>Challan ID:</strong> {item.refranceId || item.id}</span>}
                        variant="body2"
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <TextEllipsis
                        text={<span><strong>Challan Date:</strong> {getLocalDateString(item.date * 1)}</span>}
                        variant="body2"
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <TextEllipsis
                        text={<span><strong>PO Number:</strong> {checkValue(item.poNumber)}</span>}
                        variant="body2"
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <TextEllipsis
                        text={<span><strong>Project name:</strong> {checkValue(item.projectName)}</span>}
                        variant="body2"
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <TextEllipsis
                        text={<span><strong>Veical No:</strong> {checkValue(item.vehicalNo)}</span>}
                        variant="body2"
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <TextEllipsis
                        text={<span><strong>Driver Name:</strong> {checkValue(item.driverName)}</span>}
                        variant="body2"
                    />
                </Grid2>
            </Grid2>
        </Grid2>
    );
};

export default ChalanIdAndDate;