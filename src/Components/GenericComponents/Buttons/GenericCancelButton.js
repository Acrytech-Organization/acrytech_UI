import { Button, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { smallFontSize } from '../../../Helpers/ConstantProperties';

const GenericCancelButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navigateTo = location?.state?.navigateTo;

    const handleCancel = () => {
        navigateTo ? navigate(navigateTo) : navigate(-1)
    };

    return (
        <Button
            color="error"
            variant="contained"
            size="small"
            onClick={handleCancel}
            startIcon={<CancelRoundedIcon fontSize="small" />}
            aria-label="Cancel"
        >
            <Typography fontSize={smallFontSize} variant='subtitle2'>
                Cancel
            </Typography>
        </Button>
    )
}

export default GenericCancelButton;