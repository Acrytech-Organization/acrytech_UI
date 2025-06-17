import { Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useScreenSize, SMALL_SCREEN, MEDIUM_SCREEN, getSaleRate } from '../../../Helpers/helpers';
import QuotationCalculations from '../QuotationProducts/QuotationCalculations';
import QuotationRmContent from './QuotationRmContent';
import ResponsiveRmProductContent from './ResponsiveRmProductContent';
import { CODE_IP, commonFontSize, EIGHTEEN_GST, INTERNAL_PROCESS, LABOUR_COST } from '../../../Helpers/ConstantProperties';
import { NO_DATA } from "../../../Helpers/ExtraProperties";
import ProductHeading from "./ProductHeading";
import TotalsRow from "../TotalsRow";

function QuotationRmProductList({ products = [] }) {
  const screenSize = useScreenSize();

  const combinedMaterials = products.reduce((acc, product) => {
    const materials = [...(product.rmlist || []), ...(product.processes || [])];
    var labour = {
      productItemcode: product.product?.productItemcode,
      materialItemcode: CODE_IP,
      name: LABOUR_COST,
      productHSNcode: NO_DATA,
      units: 1,
      product: {
        saleRate: 0,
        GSTRate: EIGHTEEN_GST
      },
      saleRate: 0
    }
    materials.forEach(material => {
      if (material.product.productState === INTERNAL_PROCESS) {
        const internalTaxableRate = getSaleRate(material.product) * 1 * material.units;
        labour.saleRate += internalTaxableRate;
      } else {
        acc.push({
          productItemcode: product.product?.productItemcode,
          materialItemcode: material.product.productItemcode,
          name: material.product.name,
          productHSNcode: material.product.productHSNcode,
          saleRate: getSaleRate(material.product),
          ...material,
          //TODO : why do we need this
        });
      }
    });
    if (labour.saleRate !== 0) acc.push(labour)
    return acc;
  }, []);

  const { taxableAmounts, totalQuantity, totalTaxableAmount, totalTax, totalAmountAfterTax } = QuotationCalculations({ products: combinedMaterials, discount: 0 });

  return (
    <Grid2 container direction="column" spacing={{ xs: 2, sm: 2, md: 0, lg: 0 }}>
      <Grid2 xs={12} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
        <Paper elevation={0} className='mt-4 px-1'>
          <Grid2 container spacing={1} className='bg-primary-subtle rounded' sx={{ textAlign: 'center', p: 1 }}>
            <ProductHeading showRmHeading={true} />
          </Grid2>
        </Paper>
      </Grid2>

      {combinedMaterials.map((material, index) => {
        const { taxableAmount, totalAmount } = taxableAmounts[index] || {};
        return (
          <Grid2 xs={12} key={index}>
            <Paper className='px-0 py-2 rounded-0' sx={{ border: { xs: 'none', md: '1px solid lightgray' }, borderColor: 'divider', boxShadow: { xs: 2, md: 0 } }}>
              <Grid2 container>
                {screenSize === SMALL_SCREEN || screenSize === MEDIUM_SCREEN ? (
                  <ResponsiveRmProductContent
                    productData={{
                      ...material,
                      taxableAmount,
                      totalAmount,
                    }}
                  />
                ) : (
                  <QuotationRmContent
                    productData={{
                      ...material,
                      taxableAmount,
                      totalAmount,
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
          showRmList={true}
        />
      </Grid2>
    </Grid2>
  );
}

export default QuotationRmProductList;
