import React, { useContext } from 'react';
import { Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useScreenSize, SMALL_SCREEN, MEDIUM_SCREEN, getSaleRate } from '../../../Helpers/helpers';
import QuotationCalculations from '../QuotationProducts/QuotationCalculations';
import TotalsRow from '../TotalsRow';
import ResponsiveProductContent from './ResponsiveProductContent';
import ProductHeading from './ProductHeading';
import { commonFontSize } from '../../../Helpers/ConstantProperties';
import { GSTContext } from '../QuotationPage';
import { useQuotationFormat } from '../../Contexts/QuotationFormatContext';

function QuotationProductList({ item, products = [] }) {
  const screenSize = useScreenSize();
  const { igst } = useContext(GSTContext);
  const { formatDetails } = useQuotationFormat();

  if (!products || products.length === 0) return <></>;

  const { taxableAmounts, totalQuantity, totalTaxableAmount, totalTax, totalAmountAfterTax } = QuotationCalculations({ products, discount: 0 });

  return (
    <Grid2 container direction="column" spacing={{ xs: 2, sm: 2, md: 0, lg: 0 }}>
      <Grid2
        xs={12}
        sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}
      >
        <Paper elevation={0} className='mt-4 px-1'>
          <Grid2
            container
            spacing={1}
            className='bg-primary-subtle rounded'
            sx={{ textAlign: 'center', p: 1 }}
          >
            <ProductHeading item={item} />
          </Grid2>
        </Paper>
      </Grid2>
      {products.map((row, index) => {
        const product = row.product;
        const { taxableAmount, totalAmount } = taxableAmounts[index] || {};

        const gstRateObject = { igst: igst, rate: product.GSTRate }
        if (!igst) gstRateObject.rate = Math.round((gstRateObject.rate / 2) * 100) / 100;

        return (
          <Grid2 xs={12} key={index}>
            <Paper
              className='px-0 py-2 rounded-0'
              sx={{
                border: { xs: 'none', sm: 'none', md: '1px solid lightgray', lg: '1px solid lightgray' },
                borderColor: 'divider',
                boxShadow: { xs: 2, sm: 2, md: 0, lg: 0 },
              }}
            >
              <Grid2 container>
                {screenSize === SMALL_SCREEN || screenSize === MEDIUM_SCREEN ? (
                  <ResponsiveProductContent
                    item={item}
                    productData={{
                      productItemcode: product.productItemcode,
                      productName: product.name,
                      productdescription: row.productdescription,
                      productHSNcode: product.productHSNcode,
                      units: row.units,
                      unit: product.unit,
                      saleRate: getSaleRate(row),
                      taxableAmount: taxableAmount,
                      gstRate: gstRateObject,
                      totalAmount: totalAmount
                    }}
                  />
                ) : (
                  <formatDetails.MainDisplayComponent
                    item={item}
                    productData={{
                      productItemcode: product.productItemcode,
                      productName: product.name,
                      productdescription: row.productdescription,
                      productHSNcode: product.productHSNcode,
                      units: row.units,
                      unit: product.unit,
                      saleRate: getSaleRate(row),
                      taxableAmount: taxableAmount,
                      gstRate: gstRateObject,
                      totalAmount: totalAmount
                    }}
                  />
                )}
              </Grid2>
            </Paper>
          </Grid2>
        );
      })}
      <Grid2 xs={12}>
        <TotalsRow
          screenSize={screenSize}
          commonFontSize={commonFontSize}
          totalQuantity={totalQuantity}
          totalTaxableAmount={totalTaxableAmount}
          totalTax={totalTax}
          totalAmountAfterTax={totalAmountAfterTax}
        />
      </Grid2>
    </Grid2>
  );
}

export default QuotationProductList;