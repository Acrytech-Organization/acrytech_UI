import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Tooltip } from '@mui/material';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';

export const RequirementAction = ({ RawMaterialComponent, ProcessComponent, setOpen, setComponent, handleDelete, rawMaterialExtraProps,
    processExtraProps }) => {

    return (
        <Box className="d-flex flex-row w-100 justify-content-sm-center justify-content-lg-center">
            <Tooltip title="Process">
                <IconButton size='small' onClick={() => {
                    setComponent({ Component: ProcessComponent, extraProperties: processExtraProps })
                    setOpen(true)
                }}>
                    <AutorenewRoundedIcon color="warning" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Raw Material">
                <IconButton size='small' onClick={() => {
                    setOpen(true)
                    setComponent({ Component: RawMaterialComponent, extraProperties: rawMaterialExtraProps })

                }}>
                    <CategoryRoundedIcon color="primary" />
                </IconButton>
            </Tooltip>
            {
                handleDelete && <IconButton size='small' onClick={handleDelete}>
                    <DeleteIcon color="error" />
                </IconButton>}
        </Box>
    )
}