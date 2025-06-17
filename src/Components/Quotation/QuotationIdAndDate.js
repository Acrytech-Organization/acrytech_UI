import Grid2 from '@mui/material/Unstable_Grid2';
import { addDaysToToday, checkValue, getDate, getLocalDateString } from '../../Helpers/helpers';
import TextEllipsis from './TextEllipsis';
import { commonFontWeight } from '../../Helpers/ConstantProperties';

const QuotationIdAndDate = ({ detailsTitle, idTitle, dateTitle, id, date, hideValidityDate }) => {

    const validTillDate = addDaysToToday(7, new Date(getDate(date)))
    return (
        <Grid2 container spacing={2} p={2} direction="column">
            <Grid2 xs={12}>
                <TextEllipsis
                    text={detailsTitle}
                    variant="h6"
                    sx={{ fontWeight: commonFontWeight, mb: 2 }}
                />
            </Grid2>
            <Grid2 container spacing={1} xs={12}>
                <Grid2 xs={12}>
                    <TextEllipsis
                        text={<span><strong>{idTitle}</strong> {checkValue(id)}</span>}
                        variant="body2"
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <TextEllipsis
                        text={<span><strong>{dateTitle}</strong> {getLocalDateString(getDate(date))}</span>}
                        variant="body2"
                    />
                </Grid2>
                {!hideValidityDate && <Grid2 xs={12}>
                    <TextEllipsis
                        text={<span><strong>Valid Till Date:</strong> {getLocalDateString(validTillDate)}</span>}
                        variant="body2"
                    />
                </Grid2>}
            </Grid2>
        </Grid2>
    );
};

export default QuotationIdAndDate;