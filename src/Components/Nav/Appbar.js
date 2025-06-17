import React, { useState, useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, List, Divider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import LogoutButton from "./LogoutButton";
import { AuthContext } from "../Auth/Auth";
import SelectFirm from "../Firm/FirmList";
import FirmMessageButton from "../Firm/FirmMessageButton";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import { MenuContext } from "../Contexts/MenuContext";
import { FirmContext } from "../Contexts/FirmContext";
import { MULTIPLE_Role } from "../../Helpers/ExtraProperties";
import { SMALL_SCREEN, useScreenSize } from "../../Helpers/helpers";
import ChangeDate from "../GenericComponents/Navbars/changeDate";
import { DEFAULT_TEXT_COLOR } from "../../Helpers/ConstantProperties";
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import AppNotification from "./AppNotification";
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import RechargeButton from "./RechargeButton";

const Appbar = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const { currentUserObject } = useContext(AuthContext);
    const { currentFirm } = useContext(FirmContext)
    const { handleDrawerToggle } = useContext(MenuContext);


    const { firmColor, textColor, borderColor } = !currentFirm?.color?.appBarColor || currentFirm?.color?.appBarColor === theme.palette.common.white
        ? { firmColor: theme.palette.common.white, textColor: DEFAULT_TEXT_COLOR, borderColor: theme.palette.common.black }
        : { firmColor: currentFirm?.color?.appBarColor, textColor: theme.palette.common.white, borderColor: theme.palette.common.white };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const ImageSizeClass = useScreenSize() === SMALL_SCREEN ? "FirmImageSmScr" : "FirmImageLgScr";
    const FirmImage = currentFirm?.logoUrl ? "d-block" : "d-none"
    var CurrentRole = "";

    if (currentFirm?.currentAccess?.length === 1) {
        CurrentRole = currentFirm.currentAccess[0].name;
    } else if (currentFirm?.currentAccess?.length > 1) {
        CurrentRole = MULTIPLE_Role
    }

    return (
        <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: firmColor }}
            className="container-fluid w-100">
            <Toolbar>
                <IconButton
                    onClick={handleDrawerToggle}
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2, display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' } }}
                >
                    <MenuIcon className="fs-2" sx={{ color: theme.palette.primary.main }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Box className={FirmImage}>
                        <img className={ImageSizeClass} alt="" src={currentFirm?.logoUrl} />
                    </Box>
                </Typography>

                {/* The change date is needed only for demo purpose
                it needs to be hidden in all other cases. */}
                <Box className="d-none">
                    <ChangeDate />
                </Box>
                <Box>
                    <Box className="d-flex">
                        <Box className="border-start d-none d-md-block"
                            sx={{ borderColor: borderColor, borderRight: 1 }} />
                        <Box>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle className="fs-2" sx={{ color: textColor }} />
                            </IconButton>
                        </Box>
                        <Box className="d-flex flex-column text-wrap w-75 d-none d-md-block text-body fw-medium text-truncate">
                            <Typography variant="body1" className="text-truncate" sx={{ color: textColor }}>
                                {currentUserObject.displayName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: textColor }}>
                                {CurrentRole}
                            </Typography>
                        </Box>
                    </Box>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                width: { xs: '50%', sm: '30%', md: '20%', lg: '13%' },
                                maxWidth: '100%',
                            }
                        }}
                        className="p-0"
                    >
                        <List className="py-2">
                            <Typography variant="body2" align="center" py={1} >
                                <BusinessRoundedIcon fontSize="small" /> Select Firm
                            </Typography>
                            <Divider sx={{ width: '80%', mx: 'auto', borderBottomWidth: 1, bgcolor: 'black', my: 0 }} />
                            <SelectFirm />

                        </List>

                        <MenuItem className="px-2">
                            <FirmMessageButton onClose={handleMenuClose} />
                        </MenuItem>
                        <Typography variant="body2" align="center"  >
                            <NotificationsActiveRoundedIcon fontSize="small" /> Notification
                        </Typography>
                        <MenuItem className="px-2">
                            <AppNotification onClose={handleMenuClose} />
                        </MenuItem>
                        <MenuItem className="px-2">
                            <RechargeButton />
                        </MenuItem>
                        <MenuItem className="px-2">
                            <LogoutButton onClose={handleMenuClose} />
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;