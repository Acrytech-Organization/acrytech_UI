import { DOC_OUT_CHALLAN } from "../../Helpers/ConstantProperties";
import { checkValue, getLocalDateString } from "../../Helpers/helpers";
import DocumentFormat from "../GenericComponents/Layout/DocumentFormat";

const OutChallanFormat = ({ item, showSave = false }) => {
    const cData = item.cData;

    const documentTitle = "Out Challan";
    const documentID = item.refranceId;
    const documentDate = item.date;

    const context = {
        document: DOC_OUT_CHALLAN,
        documentTitle: documentTitle,
        cData: cData,
        detailsToShow: {
            "Challan No": documentID,
            "Challan Date": getLocalDateString(documentDate),
            "PO Number": checkValue(cData?.poNumber),
            "Project": checkValue(cData?.projectName),
            "Vehical": checkValue(item.vehicalNo)
        },
        save: showSave,
        fileName: documentID + ".pdf",
        menuName: "Save Challan",
    }

    return <DocumentFormat context={context} />
};

export default OutChallanFormat;