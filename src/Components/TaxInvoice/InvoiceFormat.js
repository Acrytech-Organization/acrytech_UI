import { useContext } from "react";
import { checkValue, getLocalDateString } from "../../Helpers/helpers";
import DocumentFormat from "../GenericComponents/Layout/DocumentFormat"
import { getRateDetails } from "../Quotation/RateCalculator";
import { FirmContext } from "../Contexts/FirmContext";
import { DOC_INVOICE, NOT_AVAILABLE } from "../../Helpers/ConstantProperties";
import { DocumentFormatContext } from "../Contexts/DocumentFormatContext";

const InvoiceFormat = ({ item, cData, showSave = false }) => {
    const { currentFirm } = useContext(FirmContext);
    const { selectedFormat } = useContext(DocumentFormatContext);

    if (!cData) {
        cData = getRateDetails({
            inquiry: item,
            currentFirm: currentFirm,
            docFormat: selectedFormat
        });

        cData.invoiceId = item.invoiceId;
        cData.invoiceDate = item.invoiceDate;
    }

    const documentTitle = cData.invoiceId ? "Tax Invoice" : "Proforma Invoice";
    const documentID = cData.invoiceId ? cData.invoiceId : documentTitle;
    const documentDate = cData.invoiceDate ? new Date(cData.invoiceDate * 1) : new Date();
    const poDate = cData.poDate ? getLocalDateString(cData.poDate) : NOT_AVAILABLE;

    const context = {
        document: DOC_INVOICE,
        documentTitle: documentTitle,
        cData: cData,
        detailsToShow: {
            "Invoice No": documentID,
            "Invoice Date": getLocalDateString(documentDate),
            "PO Number": checkValue(cData.poNumber),
            "PO Date": checkValue(poDate),
        },
        save: showSave,
        fileName: documentID + ".pdf",
        menuName: "Save Invoice",
    }

    return <DocumentFormat context={context} />
}

export default InvoiceFormat