import React, { createContext, useContext, useMemo } from 'react';
import { FORMAT_ONE } from '../../Helpers/ConstantProperties';
import { FirmContext } from './FirmContext';
import {
    NewquotationTableValues,
    ProductTaxNewHeading,
    ProductTaxDefaultHeading,
    quotationRmTableValues,
    quotationTableValues,
    quotationNewArray,
    quotationDefaultArray,
    bomDefaultArray
} from '../../Helpers/helpers';
import ProductContent from '../Quotation/QuotationProducts/ProductContent';
import QuotationRmContent from '../Quotation/QuotationProducts/QuotationRmContent';
import NewProductTaxContent from '../Quotation/QuotationProducts/NewProductTaxContent';
import NewProductContent from '../Quotation/QuotationProducts/NewProductContent';
import ProductTaxDefaultComponent from '../Quotation/QuotationProducts/ProductTaxDefaultComponent';

export const QuotationFormatContext = createContext();

export const QuotationFormatProvider = ({ children }) => {
    const { currentFirm } = useContext(FirmContext);

    const dropDownValue = currentFirm.useFormat;

    const getQuotationFormatDetails = (dropDownValue) => {
        switch (dropDownValue) {
            case FORMAT_ONE:
                return {
                    MainHeadingList: NewquotationTableValues,
                    MainDisplayComponent: NewProductContent,
                    RmHeadingList: NewquotationTableValues,
                    RmDisplayComponent: NewProductContent,
                    TaxHeadingList: ProductTaxNewHeading,
                    TaxDisplayComponent: NewProductTaxContent,
                    MainTotalsRowList: quotationNewArray,
                    RmTotalRowList: quotationNewArray,
                };

            default:
                return {
                    MainHeadingList: quotationTableValues,
                    MainDisplayComponent: ProductContent,
                    RmHeadingList: quotationRmTableValues,
                    RmDisplayComponent: QuotationRmContent,
                    TaxHeadingList: ProductTaxDefaultHeading,
                    TaxDisplayComponent: ProductTaxDefaultComponent,
                    MainTotalsRowList: quotationDefaultArray,
                    RmTotalRowList: bomDefaultArray,
                };
        }
    };

    const formatDetails = useMemo(() => getQuotationFormatDetails(dropDownValue), [dropDownValue]);

    return (
        <QuotationFormatContext.Provider value={{ formatDetails }}>
            {children}
        </QuotationFormatContext.Provider>
    );
};

export const useQuotationFormat = () => useContext(QuotationFormatContext);
