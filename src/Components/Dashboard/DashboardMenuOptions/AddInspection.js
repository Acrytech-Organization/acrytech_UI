import React from "react";
import { MenuItem } from "@mui/material";
import InpectionDialogTable from "../../InspectionReport/InpectionDialogTable";
import GradingRoundedIcon from '@mui/icons-material/GradingRounded';

function AddInspection({ item, handleMenuItemClick, handleClose, source }) {

    const hasInspectionReports = item?.products?.some((product) => product?.inspectionReport?.length > 0);
    const displayIcon = {
        icon: GradingRoundedIcon,
        color: "success",
    };

    const contents = (
        <InpectionDialogTable item={item} source={source} displayIcon={displayIcon} />
    )

    const onClick = () => handleMenuItemClick(contents, "Create Inspection Report", handleClose())

    return (
        <MenuItem onClick={onClick} disabled={!hasInspectionReports}>Create Inspection</MenuItem>
    );
}

export default AddInspection;