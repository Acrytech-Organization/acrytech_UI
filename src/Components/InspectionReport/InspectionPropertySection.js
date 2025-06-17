import React from 'react';
import { Typography, Box } from '@mui/material';
import AddProperty from '../AddProperties/AddProperty';
import { commonFontSize, CREATE_INSPECTIONS } from '../../Helpers/ConstantProperties';

const InspectionPropertySection = ({
    parameter,
    value,
    handleInputChange,
    inputValues,
    isFormCard = true,
    source,
    tolerance,
    dimension,
}) => {
    const showFullDetails = source === CREATE_INSPECTIONS;
    return (
        <Box sx={{ py: 0.5 }}>
            {isFormCard ? (
                <>
                    <AddProperty
                        data={{
                            item: {
                                name: parameter,
                                type: 'String',
                                disabled: false,
                                required: true,
                                displayName: parameter
                            },
                        }}
                        currentValue={inputValues[parameter] || ''}
                        onChange={({ name, value }) => handleInputChange(name, value)}
                    />
                </>
            ) : (
                <Box sx={{ display: !showFullDetails ? 'flex' : 'block', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', textAlign: 'left', gap: 3 }}>
                    <Typography fontSize={commonFontSize} component="div">
                        <strong>{parameter}:</strong> {value || 'N/A'}
                    </Typography>

                    {/* Conditionally render Dimension and Tolerance if source is CREATE_INSPECTIONS */}
                    {!showFullDetails && (
                        <>
                            <Typography fontSize={commonFontSize} component="div">
                                <strong>Dimension :</strong> {dimension || 'N/A'}
                            </Typography>
                            <Typography fontSize={commonFontSize} component="div">
                                <strong>Tolerance :</strong> {tolerance || 'N/A'}
                            </Typography>
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default InspectionPropertySection;
