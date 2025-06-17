import React from 'react';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import QuotationProductTax from './QuotationProductTax';
import QuotationTotalAmount from './QuotationTotalAmount';
import { useScreenSize, SMALL_SCREEN, MEDIUM_SCREEN, numberToWords } from '../../../Helpers/helpers';
import { commonFontSize, commonFontWeight, GENERATEBOM, PRIMARY_COLOR, NO_DISCOUNT_ID } from '../../../Helpers/ConstantProperties';
import QuotationCalculations from './QuotationCalculations';
import { Typography } from '@mui/material';

const QuotationSummary = ({ item, rawMaterials, products = [] }) => {
  const screenSize = useScreenSize();
  const source = item?.source;
  const isDiscountAvailable = item.discountPlanID === NO_DISCOUNT_ID

  const materialsOrProducts = source === GENERATEBOM ? rawMaterials : products;
  const isSmallOrMediumScreen = screenSize === SMALL_SCREEN || screenSize === MEDIUM_SCREEN;
  const { totalAmountAfterTax } = QuotationCalculations({ products: materialsOrProducts });

  const discountPercentage = parseFloat(item.discount) || 0;
  const discountAmount = item.discountPrice ? parseFloat(item.discountPrice) : (totalAmountAfterTax * discountPercentage) / 100;

  const totalAfterDiscount = totalAmountAfterTax - discountAmount;


  return (
    <>
      <Grid2 container spacing={2} alignItems='center'>
        {!isSmallOrMediumScreen && (
          <Grid2 xs={12} md={8}>
            <QuotationProductTax source={source} rawMaterials={rawMaterials} products={materialsOrProducts} />
          </Grid2>
        )}
        <Grid2 xs={12} md={4}>
          <QuotationTotalAmount isDiscountAvailable={isDiscountAvailable} hasDiscountPrice={item.discountPrice ? true : false} discountPercentage={discountPercentage} totalAmountAfterTax={totalAmountAfterTax} discountAmount={discountAmount} totalAfterDiscount={totalAfterDiscount} />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} p={2}>
        <Typography textAlign={'left'} fontSize={commonFontSize} fontWeight={commonFontWeight}>
          {`Total Amount in words : `}
        </Typography>
        <Typography textAlign={'left'} fontSize={commonFontSize} color={PRIMARY_COLOR}>
          {` ${numberToWords(totalAfterDiscount)}`}
        </Typography>
      </Grid2>
    </>
  );
};

export default QuotationSummary;