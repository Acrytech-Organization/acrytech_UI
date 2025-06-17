import { IconButton, Typography } from "@mui/material";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { TITLE_COLOR } from "../../../Helpers/ConstantProperties"
function DialogHeader({ title, handleCancel }) {
    return (
        <div className="border bg-body-tertiary rounded d-flex justify-content-between align-items-center">
            <Typography className='fs-5 p-2  fw-bolder' color={TITLE_COLOR}>
                {title}
            </Typography>

            <IconButton onClick={handleCancel} size="large">
                <CancelPresentationIcon
                    color='error'
                    fontSize='inherit' />
            </IconButton>
        </div>)
}

export default DialogHeader;