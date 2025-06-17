import React from 'react';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import InspectionPropertySection from './InspectionPropertySection';
import { commonFontSize, extraSmallFontSize, PRIMARY_COLOR } from '../../Helpers/ConstantProperties';

const InspectionPartsCard = ({ headerParts, tableData, reports, source }) => {
    const reversedHeaderParts = [...headerParts].reverse();
    const reversedReports = [...reports].reverse();

    return (
        <>
            {reversedHeaderParts.map((part, partIndex) => (
                <Grid2 xs={12} sm={6} md={4} key={partIndex}>
                    <Card sx={{ padding: 1 }}>
                        <CardContent>
                            <Typography sx={{ mb: 3, textTransform: "capitalize" }} fontSize={commonFontSize} color={PRIMARY_COLOR} component="div">
                                <strong>{part}</strong>
                                <Divider sx={{ borderBottomWidth: 1, bgcolor: 'black', my: 2 }} />
                            </Typography>

                            {reversedReports[partIndex] && (
                                <>
                                    {tableData.map((row, rowIndex) => (
                                        <InspectionPropertySection
                                            key={rowIndex}
                                            parameter={row.parameter}
                                            value={reversedReports[partIndex][row.parameter]}
                                            part={part}
                                            partIndex={partIndex}
                                            source={source}
                                            isFormCard={false}
                                            tableData={tableData}
                                            dimension={row.dimension}
                                            tolerance={row.tolerance}
                                        />
                                    ))}
                                    <Typography
                                        sx={{ textAlign: 'right', mt: 3 }}
                                        fontSize={extraSmallFontSize}
                                        className="text-secondary"
                                    >
                                        {reversedReports[partIndex].reportTime}
                                    </Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </>
    );
};

export default InspectionPartsCard;
