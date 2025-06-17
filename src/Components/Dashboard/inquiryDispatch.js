import React, { useContext } from 'react';
import { AuthContext } from '../Auth/Auth';
import { FirmContext } from '../Contexts/FirmContext';
import { getProdPlanQureyObject, getProductResultDetails, getStoreProductQueryObject } from './InquiryCalculations';
import { useQueries } from '@tanstack/react-query';
import GenericSpinner from '../GenericComponents/FormComponent/GenericSpinner';
import { GenericErrorComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import InquiryDispatchCard from './inquiryDispatchCard';
import { PRODUCTION_PLAN_RESOURCE_ID } from '../../Helpers/ConstantProperties';
import { DateContext } from '../Contexts/DateContext';

const InquiryDispatch = ({ inquiry }) => {
    const { uid } = useContext(AuthContext);
    const { khID } = useContext(FirmContext);
    const { currentDate } = useContext(DateContext);

    const queries = [];

    inquiry.products.forEach((product) => {
        queries.push(getStoreProductQueryObject(uid, khID, product.product.id));
    })

    // Get the balance of Planned Data
    queries.push(getProdPlanQureyObject(uid, khID, inquiry.id, currentDate))

    const results = useQueries({ queries: queries });

    if (results.some((result) => result.isPending)) return <GenericSpinner />

    // TODO: Need Better Error Handeling
    if (results.some((result) => result.isError)) return <GenericErrorComponent />

    if (results.every((result) => result.isSuccess)) {
        // There is only one planned balance query, we are not adding it for the store
        // so we can be sure that the planned balance is for the inquiry.
        const plannedBalanceResult = results.find(
            (res) => res.data[0]?.resourceID === PRODUCTION_PLAN_RESOURCE_ID);
        const plannedBalance = plannedBalanceResult?.data[0];

        const balanceDetails = getProductResultDetails(
            inquiry,
            plannedBalance,
            results);

        return <InquiryDispatchCard balanceDetails={balanceDetails} inquiry={inquiry} />
    }

    return <></>
};

export default InquiryDispatch;