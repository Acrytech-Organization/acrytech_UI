import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { commonFontWeight, extraLargeFontSize, largeFontSize, REPORT_CARD_GRADIENT } from '../../../Helpers/ConstantProperties';

function GradientCard({ heading, data = [], detailsObject = REPORT_CARD_GRADIENT, height = 120 }) {

    return (
        <Card sx={{
            p: 1,
            width: '100%',
            borderRadius: '12px',
            background: detailsObject[heading]?.gradiantColor,
            color: '#fff',
            boxShadow: 3,
            height: height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }}>
            <Box>
                <Typography fontSize={largeFontSize} fontWeight={commonFontWeight} component="div">
                    {detailsObject[heading]?.name}
                </Typography>
                <Typography fontSize={extraLargeFontSize} fontWeight={commonFontWeight} color="text.secondary">
                    {detailsObject[heading]?.detailText(data)}
                </Typography>
            </Box>
        </Card>
    );
}

export default GradientCard;
