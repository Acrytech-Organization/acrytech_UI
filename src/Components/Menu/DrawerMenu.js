import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Toolbar, Drawer, Divider, Box, Grid } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MenuContext } from '../Contexts/MenuContext';
import { FirmContext } from '../Contexts/FirmContext';
import { menuItems } from '../../Helpers/ExtraProperties';
import { DARK_GREY, DEFAULT_TEXT_COLOR, LIGHT_GREY, MEDIUM_GREY, PRIMARY_COLOR, SECONDARY_COLOR, gradientMenuColors } from '../../Helpers/ConstantProperties';
import { checkAccessLevel, checkAdmin } from '../../Helpers/helpers';
import { OriginContext } from '../Contexts/OriginContext';
import GenericFooter from '../GenericComponents/Footer/Footer';

export default function DrawerMenu() {
    const { mobileOpen, handleDrawerClose, handleDrawerTransitionEnd } = useContext(MenuContext);
    const { currentFirm } = useContext(FirmContext);
    const { limitFunctionality } = useContext(OriginContext);
    const location = useLocation();
    const currentPath = location.pathname;
    const firmColorIndex = currentFirm ? currentFirm.colorIndex : null;
    const firmGradientColor = firmColorIndex !== null
        ? gradientMenuColors[firmColorIndex % gradientMenuColors.length]
        : SECONDARY_COLOR;

    const theme1 = createTheme({
        palette: {
            main: SECONDARY_COLOR,
            background: {
                default: LIGHT_GREY,
                drawer: PRIMARY_COLOR,
                listItem: PRIMARY_COLOR,
                selectedListItem: PRIMARY_COLOR,
            },
            text: {
                primary: DEFAULT_TEXT_COLOR,
                navLink: SECONDARY_COLOR,
                selectedNavLink: PRIMARY_COLOR,
            },
        },
    });

    const theme2 = createTheme({
        palette: {
            main: SECONDARY_COLOR,
            background: {
                default: LIGHT_GREY,
                drawer: DARK_GREY,
                listItem: MEDIUM_GREY,
                selectedListItem: firmGradientColor,
            },
            text: {
                primary: SECONDARY_COLOR,
                navLink: DEFAULT_TEXT_COLOR,
                selectedNavLink: SECONDARY_COLOR,
            },
        },
    });

    const theme = currentFirm && currentFirm.name && currentFirm.khID ? theme2 : theme1;

    const handleClick = (e, disabledPath) => {
        if (disabledPath) e.preventDefault()
    }

    var menu = menuItems;

    if (limitFunctionality) {
        menu = menu.filter((menu) => menu.showInLimit);
    }

    menu = menu.filter(item => checkAdmin(currentFirm.currentAccess,) || checkAccessLevel(currentFirm.currentAccess, item.accessByLevel));

    const drawer = (
        <Box
            sx={{
                backgroundColor: theme.palette.background.drawer,
                height: '100%',
                overflowY: 'auto',
            }}
        >
            <Toolbar />
            <List>
                {menu.map((item, index) => {
                    const isMenuSelected = item.path === currentPath;
                    const disabledPath = !item.path

                    const backgroundColor = isMenuSelected
                        ? theme.palette.background.selectedListItem
                        : theme.palette.background.listItem;

                    const textColor = isMenuSelected
                        ? theme.palette.text.selectedNavLink
                        : theme.palette.text.navLink;

                    return (
                        <Grid container key={index}>
                            <Grid item xs={12} className="ms-1">
                                <ListItem
                                    key={index}
                                    disablePadding
                                    className={`p-0 mt-1 mb-1 rounded-start ${isMenuSelected ? 'bg-white text-primary' : ' '}`}
                                    sx={{
                                        background: backgroundColor,
                                        opacity: disabledPath ? 0.5 : 1,
                                        pointerEvents: disabledPath ? 'none' : 'auto',
                                    }}
                                >
                                    <NavLink
                                        onClick={(e) => handleClick(e, disabledPath)}
                                        to={item.path}
                                        className="text-decoration-none text-center w-100 p-2 d-block"
                                        style={{
                                            color: textColor,
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <ListItemText
                                            primary={item.text}
                                        />
                                    </NavLink>
                                </ListItem>
                            </Grid>
                            {index < menu.length - 1 && (
                                <Grid item xs={12}>
                                    <Divider
                                        sx={{
                                            height: '0.125rem',
                                            backgroundColor: theme.palette.background.default,
                                        }}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    );
                })}
                <GenericFooter />
            </List>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: theme.spacing(30) },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: theme.spacing(30) },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </>
        </ThemeProvider>
    );
}
