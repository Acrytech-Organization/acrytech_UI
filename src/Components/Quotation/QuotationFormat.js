import { Alert } from "@mui/material";
import { addDaysToToday, getLocalDateString } from "../../Helpers/helpers";
import DocumentFormat from "../GenericComponents/Layout/DocumentFormat"
import { getRateDetails } from "./RateCalculator";
import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { DOC_QUOTE } from "../../Helpers/ConstantProperties";
import { DocumentFormatContext } from "../Contexts/DocumentFormatContext";

const QuotationFormat = ({ item, showSave = false }) => {
    const { currentFirm } = useContext(FirmContext);
    const { selectedFormat } = useContext(DocumentFormatContext);

    if (!item?.quotationId) {
        return (
            <Alert severity="warning" className="m-3">
                Quotation for this inquiry is not yet generated.
            </Alert>
        );
    }

    const cData = getRateDetails({
        inquiry: item,
        currentFirm: currentFirm,
        docFormat: selectedFormat
    });

    const documentID = item.quotationId
    const documentDate = item.quotationDate
    const validTillDate = addDaysToToday(7, new Date(documentDate))

    const context = {
        document: DOC_QUOTE,
        documentTitle: "Quotation",
        cData: cData,
        save: showSave,
        fileName: documentID + ".pdf",
        menuName: "Save Quotation",
        detailsToShow: {
            ID: documentID,
            Date: getLocalDateString(documentDate),
            "Valid Till": getLocalDateString(validTillDate)
        }
    }

    return <DocumentFormat context={context} />
}

export default QuotationFormat