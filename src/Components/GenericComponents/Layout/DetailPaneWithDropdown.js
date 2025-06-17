import { Box, Button, Menu, MenuItem, Tabs } from "@mui/material";
import { useState, useMemo } from "react";
import NavItemTabButton from "./NavItemTabButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function DetailPaneWithDropdown({ item, tabData, paneID }) {
    const [showMenu, setShowMenu] = useState(null);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    // Memoize tab components to avoid re-creating them on each render
    const tabComponents = useMemo(() => {
        return tabData.map(tab => (tab.Component ? <tab.Component item={item} /> : <div>{tab.name}</div>));
    }, [tabData, item]);

    const selectedTab = tabData[selectedTabIndex];

    const handleTabChange = (tabIndex) => {
        setSelectedTabIndex(tabIndex);
        handleClose();
    };

    const handleClick = (event) => {
        setShowMenu(event.currentTarget);
    };

    const handleClose = () => {
        setShowMenu(null);
    };

    return (
        <Box
            overflow={"auto"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}>
            <Box className="d-sm-none w-100 d-flex gap-2">

                <Button variant="outlined" fullWidth>
                    <span style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>
                        {selectedTab.name}
                    </span>
                </Button>

                <Button color="info"
                    className="align-items-center"
                    aria-controls="dropdown-menu"
                    variant="outlined"
                    aria-haspopup="true"
                    size="large"
                    onClick={handleClick}
                >
                    <KeyboardArrowDownIcon />
                </Button>
            </Box>

            <Menu
                slotProps={{
                    paper: {
                        sx: {
                            width: '70%'
                        }
                    }
                }}
                id="dropdown-menu"
                anchorEl={showMenu}
                open={Boolean(showMenu)}
                onClose={handleClose}
            >
                {tabData.map((tab, index) => (
                    <MenuItem
                        key={tab.id}
                        disabled={tab.disabled}
                        selected={selectedTabIndex === index} onClick={() => handleTabChange(index)}>

                        {tab.name}

                    </MenuItem>
                ))}
            </Menu>

            <Tabs
                className="nav nav-tabs d-none d-sm-flex"
                id={paneID}
                value={selectedTabIndex}
                onChange={(event, value) => handleTabChange(value)}
            >
                {tabData.map((tab, index) => (
                    <NavItemTabButton
                        disabled={tab.disabled}
                        key={tab.id}
                        active={selectedTabIndex === index}
                        id={tab.id}
                        name={tab.name}
                        onClick={() => handleTabChange(index)}
                    />
                ))}
            </Tabs>

            <div className="tab-content flex-grow-1 overflow-auto" id={paneID + "Content"}>
                {tabComponents.map((component, index) =>
                    <div
                        className="h-100"
                        key={tabData[index].id}
                        role="tabpanel"
                        hidden={selectedTabIndex !== index}
                        id={`${tabData[index].id}-tab-pane`}
                    >
                        {component}
                    </div>
                )}
            </div>
        </Box>
    );
}

export default DetailPaneWithDropdown;
