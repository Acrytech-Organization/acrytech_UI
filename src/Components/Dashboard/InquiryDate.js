import { Typography } from '@mui/material';
import NoteRoundedIcon from '@mui/icons-material/NoteRounded';
import { getLocalDateString } from '../../Helpers/helpers';

const InquiryDate = ({ dateToShow }) => {
    return (
        <Typography
            variant="body2"
            textAlign={"center"}
        >
            <NoteRoundedIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: 'grey.400' }} />
            {getLocalDateString(dateToShow)}
        </Typography>
    )
};

export default InquiryDate;