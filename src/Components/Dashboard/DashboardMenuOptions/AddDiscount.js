import React from "react";
import { MenuItem } from "@mui/material";
import CreateCustomDiscount from "../../Discount/CreateCustomDiscount";

function AddDiscount({ item, handleMenuItemClick, handleClose }) {

    const contents = (
        <CreateCustomDiscount item={item} handleClose={handleClose} />
    )

    const onClick = () => handleMenuItemClick(contents, "Apply Discount", handleClose())

    return (
        <>
            <MenuItem onClick={onClick}>Apply Discount</MenuItem>
        </>
    );
}

export default AddDiscount;