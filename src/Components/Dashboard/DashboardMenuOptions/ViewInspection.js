import React from "react";
import { MenuItem } from "@mui/material";
import InpectionDialogTable from "../../InspectionReport/InpectionDialogTable";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

function ViewInspection({ item, handleMenuItemClick, handleClose, source }) {

    const hasInspectionReports = item?.products?.some((product) => product?.inspectionReport?.length > 0);
    const displayIcon = {
        icon: RemoveRedEyeRoundedIcon,
        color: "primary",
    };

    const contents = (
        <InpectionDialogTable item={item} source={source} displayIcon={displayIcon} />
    )

    const onClick = () => handleMenuItemClick(contents, "View Inspection Report", handleClose())

    return (
        <MenuItem onClick={onClick} disabled={!hasInspectionReports}>View Inspection</MenuItem>
    );
}

export default ViewInspection;