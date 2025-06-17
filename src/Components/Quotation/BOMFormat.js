import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { Alert } from "@mui/material";
import { addDaysToToday, getLocalDateString } from "../../Helpers/helpers";
import { getRateDetails } from "./RateCalculator";
import DocumentFormat from "../GenericComponents/Layout/DocumentFormat";
import { DOC_BOM } from "../../Helpers/ConstantProperties";
import { DocumentFormatContext } from "../Contexts/DocumentFormatContext";

export default function BOMFormat({ item }) {
    const { currentFirm } = useContext(FirmContext);
    const { selectedFormat } = useContext(DocumentFormatContext);

    if (!item?.quotationId) {
        return (
            <Alert severity="warning" className="m-3">
                BOM Quotation for this inquiry is not yet generated.
            </Alert>
        );
    }

    const cData = getRateDetails({
        inquiry: item,
        currentFirm: currentFirm,
        isBOM: true,
        docFormat: selectedFormat
    });

    if (cData.items.length === 0) {
        return (
            <Alert severity="warning" className="m-3">
                BOM is not available for the products.
            </Alert>
        );
    }

    const documentID = item.quotationId
    const documentDate = item.quotationDate
    const validTillDate = addDaysToToday(7, new Date(documentDate))

    const context = {
        document: DOC_BOM,
        documentTitle: "BOM Quotation",
        cData: cData,
        detailsToShow: {
            ID: documentID,
            Date: getLocalDateString(documentDate),
            "Valid Till": getLocalDateString(validTillDate)
        }
    }

    return <DocumentFormat context={context} />
}