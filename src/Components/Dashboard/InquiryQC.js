import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useContext } from 'react';
import GenericDialogWithButton from '../GenericComponents/Dialog/GenericDialogWithButton';
import InquiryQCCard from './InquiryQCCard';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import { useQuery } from '@tanstack/react-query';
import GenericSpinner from '../GenericComponents/FormComponent/GenericSpinner';
import { GenericErrorComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { getProdPlanQureyObject, getProductResultDetails } from './InquiryCalculations';

const InquiryQC = ({ inquiry }) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);

    const query = getProdPlanQureyObject(uid, khID, inquiry.id);

    const { data, error, isLoading } = useQuery(query);

    if (isLoading) return <GenericSpinner />

    if (error) return <GenericErrorComponent error={error} />

    if (data) {
        let productionPlan = getProductResultDetails(
            inquiry,
            data[0],
            null);

        productionPlan = productionPlan.filter((prod) => prod.inQC > 0);
        const totalInQC = productionPlan.reduce((total, plan) => total + plan.inQC, 0);

        return (
            <Grid2 xs={12} md={2}>
                <Box width={"90%"}>
                    <GenericDialogWithButton
                        buttonProps={{
                            variant: "outlined",
                            fullWidth: true
                        }}
                        buttonText={"Mark Quality"}
                        dialogTitle={"Mark Quality"}
                        dialogContents={
                            <InquiryQCCard
                                totalInQC={totalInQC}
                                inquiryID={inquiry.id}
                                productionPlan={productionPlan} />}
                    />
                </Box>
            </Grid2>
        )
    }

    return <></>;
};

export default InquiryQC;