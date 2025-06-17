import { useState } from "react";
import DetailedReportHeader from "./DetailedReportHeader";
import DetailedReportBody from "./DetailedReportBody";
import { PRODUCT_WISE_INQUIRY, REASON_WISE_INQUIRY, SOURCE_WISE_INQUIRY } from "../../../Helpers/ConstantProperties";

function DetailedReport() {
    const [showReport, setReport] = useState();
    
    const dropDownList = [{ name: SOURCE_WISE_INQUIRY }, { name: PRODUCT_WISE_INQUIRY }, { name: REASON_WISE_INQUIRY }];
    return (
        <>
            <DetailedReportHeader dropDownList={dropDownList} showReport={showReport} setReport={setReport} />
            <DetailedReportBody selectedReport={showReport}/>
        </>
    );
}

export default DetailedReport;