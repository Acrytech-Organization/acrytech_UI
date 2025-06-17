import React from 'react';
import Box from '@mui/material/Box';
import Appbar from '../../Nav/Appbar';
import { FirmContextConsumer } from '../../Contexts/FirmContextConsumer';
import { Toolbar } from '@mui/material';
import { drawerWidth } from '../../../Helpers/ConstantProperties';
import DrawerMenu from '../../Menu/DrawerMenu';

function GenericLayout({ Component, needsFirmSelected = true }) {

    return (
        <>
            <Appbar />
            <Box display={"flex"} flexDirection={"column"} className="h-100 overflow-auto" >
                <Box>
                    <Toolbar />
                </Box>
                <Box display={"flex"} sx={{ flexGrow: 1 }} className="overflow-auto">
                    {needsFirmSelected && <Box
                        component="nav"
                        sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
                        aria-label="mailbox folders">
                        <DrawerMenu />
                    </Box>}
                    <Box sx={{ flexGrow: 1 }} className="overflow-auto">
                        {
                            needsFirmSelected
                                ? <FirmContextConsumer>{Component}</FirmContextConsumer>
                                : Component
                        }
                    </Box>
                </Box>
            </Box >
        </>
    );
}

export default GenericLayout;
