import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { VIEW_PO } from "../../../Helpers/ConstantProperties";

export default function ViewPoButton({ inquiry }) {
    const navigate = useNavigate();

    const handleViewPoClick = () => {
        navigate(VIEW_PO, { state: { inquiry } });
    };

    return (
        <Button onClick={handleViewPoClick} variant="outlined"
            color="primary"
            size="medium">
            View Purchase Order
        </Button>
    );
}