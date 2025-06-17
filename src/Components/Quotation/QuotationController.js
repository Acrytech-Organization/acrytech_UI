import { useLocation } from "react-router-dom";
import QuotationFormat from "./QuotationFormat";

export default function QuotationController() {
    const location = useLocation();
    const { item } = location.state || {};

    return <QuotationFormat item={item} />;
}
