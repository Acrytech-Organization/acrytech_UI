import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import { getInquiryINRStatement, getProductInquiryObject } from './InquiryCalculations';
import GenericSpinner from '../GenericComponents/FormComponent/GenericSpinner';
import { GenericErrorComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { useQueries } from '@tanstack/react-query';
import Grid2 from '@mui/material/Unstable_Grid2';
import InquiryCostReport from './InquiryCostReport';
import GenerateRequirementContent from '../Requirement/GenerateRequirementContent';
import { Typography } from '@mui/material';
import { commonFontWeight, RMLIST } from '../../Helpers/ConstantProperties';
import { getRateDetails } from '../Quotation/RateCalculator';
import InquiryMaterialReport from './InquiryMaterialReport';

const InquiryReport = () => {
    const location = useLocation();
    const inquiry = location.state?.inquiry;

    const { uid } = useContext(AuthContext);
    const { khID, currentFirm } = useContext(FirmContext);

    const combinedRMList = {};
    const queries = [];
    const productsToManu = [...(inquiry.products || []), ...(inquiry.sfg || [])];

    productsToManu.forEach((product) => {

        combinedRMList[product.product.id] = product.product;

        product[RMLIST]?.forEach((raw) => {
            combinedRMList[raw.product.id] = raw.product;
        })
    })

    Object.keys(combinedRMList).map((rmID) => queries.push(
        getProductInquiryObject(uid, khID, rmID, inquiry.id)));

    queries.push(getInquiryINRStatement(uid, khID, inquiry));

    const results = useQueries({ queries: queries });

    if (!inquiry) {
        return <div>Invalid Inquiry</div>
    }

    const cData = getRateDetails({
        inquiry: inquiry,
        currentFirm: currentFirm
    })

    if (results.some((result) => result.isPending)) return <GenericSpinner />

    // TODO: Need Better Error Handeling
    if (results.some((result) => result.isError)) return <GenericErrorComponent />

    if (results.every((result) => result.isSuccess)) {
        return (
            <Grid2 container rowGap={2} padding={1}>
                <Grid2 xs={12}>
                    <Typography variant='h6' component="h2" sx={{ fontWeight: commonFontWeight }}>
                        Inquiry Report for {inquiry.customerName}
                    </Typography>
                </Grid2>

                <Grid2 xs={12}>
                    <GenerateRequirementContent item={inquiry} />
                </Grid2>

                <Grid2 xs={12}>
                    <InquiryMaterialReport
                        combinedRMList={combinedRMList}
                        balanceResult={results} />
                </Grid2>

                <Grid2 xs={12}>
                    <InquiryCostReport costStatement={results.at(-1).data} cData={cData} />
                </Grid2>
            </Grid2>
        )
    }

    return <></>;
};

export default InquiryReport;