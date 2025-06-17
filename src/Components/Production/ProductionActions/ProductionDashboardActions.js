import React, { useState } from 'react';
import { Grid, IconButton, Menu, Button, Divider } from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { DEFAULT_TEXT_COLOR, regularFontSize } from '../../../Helpers/ConstantProperties';
import RejectInquiry from '../../Dashboard/DashboardMenuOptions/RejectInquiry';
import GenericDialog from '../../GenericComponents/Dialog/GenericDialog';
import ViewProduction from './ViewProduction';
import EditProduction from './EditProduction';

const defaultButton = {
    color: DEFAULT_TEXT_COLOR,
    justifyContent: 'center',
    padding: 0,
    textTransform: 'none',
    cursor: 'none',
    fontSize: regularFontSize,
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: 'grey.300',
    },
};

const CustomButton = ({ children, sxProps, showDivider, ...props }) => (
    <>
        <Button
            fullWidth
            sx={{
                ...defaultButton,
                ...sxProps,
            }}
            {...props}
        >
            {children}
        </Button>
        {showDivider && <Divider sx={{ margin: 0, backgroundColor: 'black' }} />}
    </>
);

const ProductionDashboardActions = ({ item, processes }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [contents, setContents] = useState(<></>);
    const [title, setTitle] = useState("");

    const handleOpenDialog = (contents, title) => {
        setContents(contents);
        setTitle(title);
        setDialogOpen(true);
        handleClose();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const buttonConfigs = [
        {
            sxProps: { backgroundColor: 'grey.300' },
            component: 'More Actions'
        },
        {
            sxProps: defaultButton,
            component: <ViewProduction item={item} processes={processes} />,
        },
        {
            sxProps: defaultButton,
            component: <EditProduction item={item} />,
        },
        {
            sxProps: defaultButton,
            component: <RejectInquiry item={item} handleMenuItemClick={handleOpenDialog} handleClose={() => setDialogOpen(false)} MenuItemText = "Cancle/Reject Production" />
        },
    ];

    const moreActions = buttonConfigs.map((button, index) => (
        <CustomButton
            key={index}
            sxProps={button.sxProps}
            showDivider={index < buttonConfigs.length - 1}
            onClick={button.onClick}
        >
            {button.component}
        </CustomButton>
    ));

    return (
        <Grid item>
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
                    sx: { padding: 0 }
                }}
            >
                {moreActions}
            </Menu>

            <GenericDialog
                title={title}
                open={dialogOpen}
                setOpen={setDialogOpen}
                content={contents}
            />
        </Grid>
    );
};

export default ProductionDashboardActions;
