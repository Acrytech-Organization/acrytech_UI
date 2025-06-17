import React, { useContext, useState } from 'react';
import { IconButton, Menu, Button, Divider } from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CreateCustomer from './DashboardMenuOptions/CreateCustomer';
import EditInquiryAction from './DashboardMenuOptions/EditInquiryAction';
import GenerateQuotation from './DashboardMenuOptions/GenerateQuotation';
import GenericDialog from '../GenericComponents/Dialog/GenericDialog';
import RejectInquiry from './DashboardMenuOptions/RejectInquiry';
import AddDesign from '../Inquiry/AddDesign';
import AddRequirement from './DashboardMenuOptions/AddRequirement';
import {
    DEFAULT_TEXT_COLOR,
    regularFontSize,
    CREATE_INSPECTIONS,
    DISPLAY_INSPECTIONS,
    CLOSED,
} from '../../Helpers/ConstantProperties';
import GenerateBOM from './DashboardMenuOptions/GenerateBOM';
import EditOrder from '../Order/OrderActions/EditOrder';
import { CATEGORIES, disableAddReq, disableBOM, disableForRevise, checkAdmin } from '../../Helpers/helpers';
import ApplyTermsAndCondition from './DashboardMenuOptions/ApplyTermsAndCondition';
import AddDiscount from './DashboardMenuOptions/AddDiscount';
import AddInspection from './DashboardMenuOptions/AddInspection';
import { OriginContext } from '../Contexts/OriginContext';
import ViewInspection from './DashboardMenuOptions/ViewInspection';
import ReviseQuotation from './DashboardMenuOptions/ReviseQuotation';
import Grid2 from '@mui/material/Unstable_Grid2';
import { RouteContext } from './InquiryDashboard';
import { FirmContext } from '../Contexts/FirmContext';
import CloseInquiry from './DashboardMenuOptions/CloseInquiry';
import AddLabourCost from './DashboardMenuOptions/AddLabourCost';
import AddExpenses from './DashboardMenuOptions/AddExpences';
import ShowInqReport from './DashboardMenuOptions/ShowInqReport';
import { PO_TAG } from '../../Helpers/ExtraProperties';
import EditPOMenu from '../Party/EditPOMenu';
import SaveQuotation from './DashboardMenuOptions/SaveQuotation';
import AddExpectedCloseDate from '../Inquiry/AddExpectedCloseDate';

export const defaultButton = {
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

export const CustomButton = ({ children, sxProps, showDivider, ...props }) => (
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

const DashboardActions = ({ item }) => {
    const { limitFunctionality } = useContext(OriginContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [contents, setContents] = useState(<></>);
    const [title, setTitle] = useState("");

    const { currentFirm } = useContext(FirmContext);
    const { routeDetails } = useContext(RouteContext);

    const handleOpenDialog = (contents, title) => {
        setContents(contents)
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

    const headerMenu = {
        sxProps: { backgroundColor: 'grey.300' },
        component: 'More Actions'
    }

    const rejectInquiry = {
        component: <RejectInquiry item={item} handleMenuItemClick={handleOpenDialog} handleClose={() => setDialogOpen(false)} />
    }

    const showReport = {
        component: <ShowInqReport inquiry={item} />
    }

    const buttonConfigs = [
        headerMenu,
        {
            disable: !!item.customerId,
            component: <CreateCustomer item={item} />
        },
        {
            disable: CATEGORIES[item.status]?.showInOrder,
            component: <EditInquiryAction item={item} handleClose={handleClose} />
        },
        {
            disable: limitFunctionality || disableAddReq(item),
            component: <AddRequirement item={item} />
        },
        {
            disable: CATEGORIES[item.status]?.showInOrder || CATEGORIES[item.status]?.disableQuote,
            component: <ApplyTermsAndCondition item={item} />
        },
        {
            disable: CATEGORIES[item.status]?.showInOrder || CATEGORIES[item.status]?.disableQuote,
            component: <AddDiscount item={item} handleMenuItemClick={handleOpenDialog} handleClose={() => setDialogOpen(false)} />
        },
        {
            disable: disableForRevise(item),
            component: <ReviseQuotation item={item} />,
        },
        {
            // This is actuly View Quotation
            disable: !item?.quotationId || CATEGORIES[item.status]?.showInOrder,
            component: <GenerateQuotation item={item} />
        },
        {
            // This is actuly View Quotation
            disable: !item?.quotationId || CATEGORIES[item.status]?.showInOrder,
            component: <SaveQuotation item={item} />
        },
        {
            // This is View BOM
            disable: disableBOM(item),
            component: <GenerateBOM item={item} />
        },
        {
            disable: !CATEGORIES[item.status]?.showInOrder && !checkAdmin(currentFirm.currentAccess),
            component: <EditOrder item={item} />,
        },
        {
            disable: !item.designNeeded,
            component: <AddDesign item={item} handleMenuItemClick={handleOpenDialog} handleClose={() => setDialogOpen(false)} />
        },
        {
            disable:
                !checkAdmin(currentFirm.currentAccess)
                || !CATEGORIES[item.status]?.showInOrder,

            component: <AddExpectedCloseDate
                item={item}
                handleMenuItemClick={handleOpenDialog}
                handleClose={() => setDialogOpen(false)} />
        },
        {
            disable: limitFunctionality || !CATEGORIES[item.status]?.showInOrder,
            component: <AddInspection item={item} handleMenuItemClick={handleOpenDialog} handleClose={() => setDialogOpen(false)} source={CREATE_INSPECTIONS} />,
        },
        {
            disable: limitFunctionality || !CATEGORIES[item.status]?.showInOrder,
            component: <AddLabourCost item={item} />
        },
        {
            disable: limitFunctionality || !CATEGORIES[item.status]?.showInOrder,
            component: <AddExpenses item={item} />
        },
        {
            disable: limitFunctionality || !item.qcNeeded,
            component: <ViewInspection item={item} handleMenuItemClick={handleOpenDialog} handleClose={() => setDialogOpen(false)} source={DISPLAY_INSPECTIONS} />,
        },
        {
            disable: !item.readyToDispatch,
            component: <CloseInquiry
                item={item}
                handleMenuItemClick={handleOpenDialog}
                handleClose={() => setDialogOpen(false)} />
        },

        rejectInquiry
    ];

    var filteredConfig = routeDetails.showSummary
        ? [headerMenu, rejectInquiry]
        : buttonConfigs.filter((config) => !config.disable);

    if (item.status === CLOSED) {
        filteredConfig = [
            headerMenu,
            {
                disable: limitFunctionality,
                component: <AddLabourCost item={item} />
            },
            {
                disable: limitFunctionality,
                component: <AddExpenses item={item} />
            },
            showReport]
    }

    if (item.tag === PO_TAG) {
        filteredConfig = [
            headerMenu,
            {
                disable: false,
                component: <EditPOMenu item={item} />
            },
            {
                disable: false,
                component: <ApplyTermsAndCondition item={item} />
            },
            rejectInquiry
        ]
    }

    const moreActions = filteredConfig.map((button, index) => {
        return (
            <CustomButton
                key={index}
                sxProps={button.sxProps || defaultButton}
                showDivider={index < buttonConfigs.length - 1}
                disabled={button.extraProps?.disableMenu}
            >
                {button.component}
            </CustomButton>
        )
    });

    return (
        <Grid2 xs={0.5}>
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
                content={contents}>
            </GenericDialog>
        </Grid2>
    );
};

export default DashboardActions;