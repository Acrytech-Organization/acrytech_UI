import { useLocation } from "react-router-dom";
import BOMFormat from "./BOMFormat";

export default function BOMController() {
    const location = useLocation();
    const { item } = location.state || {};

    return <BOMFormat item={item} />;
}
