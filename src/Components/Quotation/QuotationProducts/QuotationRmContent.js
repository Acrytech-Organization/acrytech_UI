import React from 'react';
import { useQuotationFormat } from '../../Contexts/QuotationFormatContext';

const QuotationRmContent = ({ productData }) => {
  const { formatDetails } = useQuotationFormat();
  return <formatDetails.MainDisplayComponent productData={productData} tableValues={formatDetails.RmHeadingList} />
};

export default QuotationRmContent;