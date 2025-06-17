import React, { useContext } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { commonFontSize, largeFontSize, PRIMARY_COLOR } from '../../Helpers/ConstantProperties';
import Grid2 from '@mui/material/Unstable_Grid2';
import { AuthContext } from '../Auth/Auth';

const InspectionHeaderCard = ({ productName, reports }) => {
    const latestReport = reports[reports.length - 1];
    const{ currentUserObject } = useContext(AuthContext)
    const userName = currentUserObject.displayName;

    return (
        <Grid2 xs={12}>
            <Card>
                <CardContent>
                    <Typography textAlign="center" fontSize={largeFontSize} color={PRIMARY_COLOR} component="h2">
                        <strong>Inspection Report</strong>
                    </Typography>
                    {[
                        { label: 'Product Name', value: productName },
                        { label: 'Last Updated By', value: userName },
                        { label: 'Date', value: latestReport?.reportDate || 'N/A' }
                    ].map(({ label, value }) => (
                        <Typography key={label} sx={{ py: 0.5 }} fontSize={commonFontSize} component="div">
                            <strong>{label}: </strong>{value}
                        </Typography>
                    ))}
                </CardContent>
            </Card>
        </Grid2>
    );
};

export default InspectionHeaderCard;
