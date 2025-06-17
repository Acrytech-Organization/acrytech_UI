import { Box, IconButton } from "@mui/material";
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import { callTo } from "../../Helpers/helpers";
import { CLOSED_INQUIRY_TAG } from "../../Helpers/ExtraProperties";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import FollowUpDialogContent from "./FollowUpDialogContent";

function DashboardCardUserActions({ item, handleDialogOpen }) {
    const hideActions = item.tag === CLOSED_INQUIRY_TAG ? "none" : "block";
    const DialogTitle = "Follow Up Inquiry";

    const handleMailDialogOpen = () => {
        const dialogContentObj = (
            <FollowUpDialogContent
                item={item}
                onClose={() => handleDialogOpen(undefined, false, DialogTitle)}
            />
        );
        handleDialogOpen(dialogContentObj, true, DialogTitle);
    };

    return (
        <Grid2 display={hideActions} xs={5} sm={4} md={1} >
            <Box sx={{ display: 'flex', justifyContent: "right" }}>
                <IconButton onClick={() => callTo(item.contactPhone)} aria-label="call" color="success">
                    <CallRoundedIcon />
                </IconButton>
                <IconButton aria-label="call" color="warning" onClick={handleMailDialogOpen}>
                    <AddCommentRoundedIcon />
                </IconButton>
            </Box>
        </Grid2>
    )
}

export default DashboardCardUserActions;