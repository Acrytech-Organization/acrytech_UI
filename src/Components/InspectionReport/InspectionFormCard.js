import React, { useId, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import InspectionPropertySection from './InspectionPropertySection';
import Grid2 from '@mui/material/Unstable_Grid2';
import InspectionReportController from './InspectionReportController';

const InspectionFormCard = ({ tableData, item, index }) => {
    const [inputValues, setInputValues] = useState({});
    const formId = useId();

    const handleInputChange = (parameter, value) => {
        setInputValues((prev) => ({ ...prev, [parameter]: value }));
    };

    const resetInputValues = () => {
        setInputValues({});
    };

    return (
        <Grid2 container spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <Grid2 xs={12} sm={8} md={6} lg={4}>
                <Card sx={{ padding: 1, maxWidth: "100%" }}>
                    <CardContent>
                        <form className="needs-validation" id={formId}>
                            {tableData.map((row, rowIndex) => (
                                <InspectionPropertySection
                                    key={rowIndex}
                                    parameter={row.parameter}
                                    value={inputValues[row.parameter] || ''}
                                    handleInputChange={handleInputChange}
                                    inputValues={inputValues}
                                    isInspectionFormCard={true}
                                    dimension={row.dimension}
                                    tolerance={row.tolerance}
                                />
                            ))}
                            <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 5 }}>
                                <InspectionReportController
                                    resetInputValues={resetInputValues}
                                    formId={formId}
                                    item={item}
                                    inputValues={inputValues}
                                    index={index}
                                />
                            </Grid2>
                        </form>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    );
}

export default InspectionFormCard;
