import { useLocation } from "react-router-dom";
import { getLocalDateString } from "../../Helpers/helpers";
import { DOC_PO } from "../../Helpers/ConstantProperties";
import DocumentFormat from "../GenericComponents/Layout/DocumentFormat";
import { getRateDetails } from "../Quotation/RateCalculator";
import { useContext } from "react";
import { FirmContext } from "../Contexts/FirmContext";
import { DocumentFormatContext } from "../Contexts/DocumentFormatContext";

const GeneratePo = () => {
  const { currentFirm } = useContext(FirmContext);
  const { selectedFormat } = useContext(DocumentFormatContext);

  const location = useLocation();
  const item = location.state || {};
  let cData = item?.inquiry?.cData;

  if (!cData) {
    cData = getRateDetails({
      inquiry: item.inquiry,
      currentFirm: currentFirm,
      docFormat: selectedFormat
    });
  }

  const documentTitle = "Purchase Order";
  const documentID = item.inquiry.refranceId;
  const documentDate = item.inquiry.orderDate;

  const detailsToShow = {
    ID: documentID,
    Date: getLocalDateString(documentDate),
    Expiry: getLocalDateString(item.inquiry.validTill)
  }

  const context = {
    inquiry: item.inquiry,
    document: DOC_PO,
    documentTitle: documentTitle,
    cData: cData,
    detailsToShow: detailsToShow
  }

  return <DocumentFormat context={context} />
};

export default GeneratePo;
