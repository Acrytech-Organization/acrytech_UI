import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Paper, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import GenerateRequirementContent from './GenerateRequirementContent'; // Adjust the path as necessary
import { commonFontWeight, CREATEPRODUCT, GENERATE_REQUIREMENT, PRODUCT_TYPE_SEMIFINISHED } from '../../Helpers/ConstantProperties';
import RequirementTable from './RequirementTable';
import FGRequirementTable from './FGRequirementTable';

const GenerateRequirement = ({ inquiry = undefined }) => {
    const location = useLocation();
    var item = inquiry || location.state?.item || {};
    const disableActions = inquiry !== undefined;

    const navigate = useNavigate();

    const navigateTo = () => navigate(
        CREATEPRODUCT,
        {
            state: {
                type: PRODUCT_TYPE_SEMIFINISHED,
                navigateTo: GENERATE_REQUIREMENT,
                extraProp: { inquiry: item }
            }
        }
    )

    return (
        <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
            <Grid2 container gap={2}>
                <Grid2 xs={12}>
                    <Typography variant='h6' component="h2" sx={{ fontWeight: commonFontWeight }}>
                        {item.customerName}
                    </Typography>
                </Grid2>

                <Grid2 xs={9}>
                    <GenerateRequirementContent item={item} />
                </Grid2>

                <Grid2 xs={2}>
                    {
                        !disableActions &&
                        <Button onClick={navigateTo} variant="outlined">Add SFG</Button>
                    }

                </Grid2>

                <Grid2 xs={12}>
                    <RequirementTable inquiry={item} disableActions={disableActions} />
                </Grid2>

                <Grid2 xs={12}>
                    <FGRequirementTable inquiry={item} disableActions={disableActions} />
                </Grid2>

            </Grid2>
        </Paper>
    );
};

export default GenerateRequirement;