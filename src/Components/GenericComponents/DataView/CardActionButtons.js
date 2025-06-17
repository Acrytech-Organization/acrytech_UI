import React, { useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

const CardActionButtons = ({ menuList = [] }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const [open, setOpen] = useState(false);
    const [contents, setContents] = useState(<></>);
    const [title, setTitle] = useState("");

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const setContentAndOpen = ({ contents, title }) => {
        handleClose();
        setContents(contents);
        setTitle(title);
        setOpen(true);
    }

    const additionalProps = {
        showDialog: setContentAndOpen
    }

    const addPropsToComponents = () => {
        return menuList.map((Component, index) => {
            return React.cloneElement(Component, { ...additionalProps, key: index });
        });
    };

    return (
        <Box paddingY={1}>
            <IconButton
                aria-label="more"
                color="info"
                onClick={handleClick}
            >
                <MoreHorizRoundedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    sx: { paddingX: 1, paddingY: 0 }
                }}
            >
                <MenuItem sx={{ backgroundColor: 'grey.300' }}>More Actions</MenuItem>
                {
                    addPropsToComponents().map((menu, index) => (
                        <Box key={index}>
                            {menu}
                        </Box>
                    ))
                }
            </Menu>
            <Dialog open={open} fullWidth={"lg"} onClose={() => setOpen(false)}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{contents}</DialogContent>
            </Dialog>
        </Box>
    );
};

export default CardActionButtons;