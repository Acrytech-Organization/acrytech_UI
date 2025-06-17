import { Box, IconButton } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import { callTo } from "../../Helpers/helpers";
import FollowUpDialogContent from "../Dashboard/FollowUpDialogContent";
import { CustomerHeader } from "./CustomerHeader";

export const CustomerAction = ({ item, handleDialogOpen }) => {
    const DialogTitle = "Follow Up Customer";

    const handleMailDialogOpen = () => {
        const dialogContentObj = (
            <FollowUpDialogContent
                DialogHeader={CustomerHeader}
                item={item}
                onClose={() => handleDialogOpen(undefined, false, DialogTitle)}
            />
        );
        handleDialogOpen(dialogContentObj, true, DialogTitle);
    };

    return (
        <Grid2 xs={6} sm={4} md={1.5} >
            <Box sx={{ display: 'flex', justifyContent: { xs: 'end', md: 'center' }, alignItems: 'center', marginTop: 1 }}>
                <IconButton onClick={() => callTo(item.phoneNumber)} aria-label="call" color="success">
                    <CallRoundedIcon />
                </IconButton>
                <IconButton aria-label="call" color="warning" onClick={handleMailDialogOpen}>
                    <AddCommentRoundedIcon />
                </IconButton>
            </Box>
        </Grid2>
    )
}