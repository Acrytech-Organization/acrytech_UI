import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import ViewInpespectionReport from "./ViewInpespectionReport";

const CreateInspectionReport = () => {
  const location = useLocation();
  const { item, product, index, source } = location.state;

  const { headerParts, tableData, productName, reports } = useMemo(() => {
    const inspectionReport = product?.inspectionReport || [];
    const reports = product?.reports?.length > 0 ? product.reports : [];

    if (inspectionReport.length === 0) {
      return { headerParts: [], tableData: [], productName: "N/A" };
    }

    const headerParts = reports.map((_, index) => `Part ${index + 1}`);

    const tableData = inspectionReport.map((inspection) => ({
      parameter: inspection.inspectionParameter || "N/A",
      dimension: inspection.inspectionDiamention || "N/A",
      tolerance: inspection.inspectionTolerance || "N/A",
      parts: reports?.map((report) => report[inspection.inspectionParameter] || "N/A")
    }));

    return { headerParts, tableData, productName: product?.product.name || "N/A", reports: reports };
  }, [product]);

  return (
    <ViewInpespectionReport
      item={item}
      source={source}
      productName={productName}
      headerParts={headerParts}
      tableData={tableData}
      reports={reports}
      index={index}
    />
  );
};

export default CreateInspectionReport;
