import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ADDINVOICE } from "../../../Helpers/ConstantProperties";

const AddExpenses = ({ item }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(ADDINVOICE, { state: { item } });
    }

    return (
        <MenuItem onClick={handleClick} >Add Invoice</MenuItem>
    );
};

export default AddExpenses;