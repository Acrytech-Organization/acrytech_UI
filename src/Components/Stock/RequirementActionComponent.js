import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import { IconButton } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import DashboardActions from '../Dashboard/DashboardActions';

export const RequirementActionComponent = ({ setOpenDialog, data }) => {
    return (
        <Grid2 className="w-100 d-flex flex-row" lg={12} xs={6} >
            <Grid2 lg={6}>
                <IconButton aria-label="call" color="warning" onClick={() => setOpenDialog(true)}>
                    <AddCommentRoundedIcon />
                </IconButton>
            </Grid2>
            <Grid2 lg={6}>
                <DashboardActions item={data} />
            </Grid2>
        </Grid2>
    )
}