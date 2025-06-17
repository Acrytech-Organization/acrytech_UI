import { IconButton, Button, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Grid2 from "@mui/material/Unstable_Grid2";

const ActionButtons = ({ isEditing, onEdit, onDelete, onCancel, enableAdd = false, onAdd = () => { }, onSave }) => {
    if (enableAdd) {
        return (
            <Box display="flex" alignItems="center">
                <IconButton onClick={() => onAdd()}>
                    <AddCircleOutlineRoundedIcon color="success" />
                </IconButton>
            </Box>
        );
    }

    if (isEditing) {
        return <Grid2 className="d-flex justify-content-between">
            <Button color='error' onClick={onCancel}>Cancel</Button>
            <Button color='primary' onClick={onSave}>Save</Button>
        </Grid2>
    }

    return (
        <Box display="flex" alignItems="center">
            <IconButton onClick={onEdit}>
                <EditIcon color="success" />
            </IconButton>
            <IconButton onClick={onDelete}>
                <DeleteIcon color="error" />
            </IconButton>
        </Box>
    );
}

export default ActionButtons;
