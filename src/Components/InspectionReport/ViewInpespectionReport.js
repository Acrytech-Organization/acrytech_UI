import React from 'react';
import { Box } from '@mui/material';
import InspectionHeaderCard from './InspectionHeaderCard';
import InspectionFormCard from './InspectionFormCard';
import InspectionPartsCard from './InspectionPartsCard';
import Grid2 from '@mui/material/Unstable_Grid2';
import { DISPLAY_INSPECTIONS } from '../../Helpers/ConstantProperties';

const ViewInspectionReport = ({
    productName,
    headerParts,
    tableData,
    index,
    reports,
    source,
    item,
}) => (
    <Box sx={{ padding: 2, height: "100%" }}>
        <Grid2 container spacing={2}>
            <InspectionHeaderCard
                productName={productName}
                reports={reports}
            />
            {source !== DISPLAY_INSPECTIONS && (
                <InspectionFormCard
                    tableData={tableData}
                    index={index}
                    source={source}
                    item={item}
                />
            )}
            <InspectionPartsCard
                headerParts={headerParts}
                tableData={tableData}
                reports={reports}
                source={source}
            />
        </Grid2>
    </Box>
)

export default ViewInspectionReport;

