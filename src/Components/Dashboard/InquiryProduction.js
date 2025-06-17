import React, { useContext } from 'react';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import { useQuery } from '@tanstack/react-query';
import GenericSpinner from '../GenericComponents/FormComponent/GenericSpinner';
import { GenericErrorComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';
import GenericDialogWithButton from '../GenericComponents/Dialog/GenericDialogWithButton';
import InquiryProductionCard from '../Production/InquiryProductionCard';
import { getProdPlanQureyObject, getProductResultDetails } from './InquiryCalculations';
import { commonFontSize } from '../../Helpers/ConstantProperties';
import GenerateOutChallan from './DashboardMenuOptions/GenerateOutChallan';
import GenerateInwordChallan from './DashboardMenuOptions/GenerateInwordChallan';

const InquiryProduction = ({ inquiry }) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const query = getProdPlanQureyObject(uid, khID, inquiry.id);

    const { data, error, isLoading } = useQuery(query);

    if (isLoading) return <GenericSpinner />

    if (error) return <GenericErrorComponent error={error} />

    if (data) {
        const productionPlan = getProductResultDetails(
            inquiry,
            data[0],
            null);

        const isFailedResources = productionPlan.some((product) => product.failed > 0);

        return (
            <>
                <Grid2 xs={12} md={1}>
                    {isFailedResources
                        &&
                        <Typography
                            fontSize={commonFontSize}
                            color={"error"}
                            width={"90%"}>

                            QC Failed, Needs Fixing
                        </Typography>
                    }
                </Grid2>
                <Grid2 xs={12} md={2} paddingX={0.5}>
                    <GenerateOutChallan item={inquiry} balanceDetails={productionPlan} />
                </Grid2>
                <Grid2 xs={12} md={2} paddingX={0.5}>
                    <GenerateInwordChallan item={inquiry} balanceDetails={productionPlan} />
                </Grid2>
                <Grid2 xs={12} md={2} paddingX={0.5}>
                    <Box width={"90%"}>
                        <GenericDialogWithButton
                            buttonProps={{
                                variant: "outlined",
                                fullWidth: true
                            }}
                            buttonText={"Mark Production"}
                            dialogTitle={"Mark Production"}
                            dialogContents={
                                <InquiryProductionCard
                                    prodData={productionPlan} InquiryID={inquiry.id} />} />
                    </Box>
                </Grid2>
            </>
        )
    }

    return <></>
};

export default InquiryProduction;