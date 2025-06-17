import { customSaleRate, getSaleRate } from "../../../Helpers/helpers";

const QuotationCalculations = ({ products = [] }) => {
  // Initialize totals
  let totalAmount = 0;
  let totalQuantity = 0;
  let totalTaxableAmount = 0;
  let totalTax = 0;
  let totalAmountAfterTax = 0;

  customSaleRate(products);
  // Initialize taxableAmounts array
  const taxableAmounts = [];

  // Loop through products to calculate totals
  products?.forEach((row) => {
    const product = row.product;
    const saleRate = parseFloat(getSaleRate(row)) || 0; // Ensure saleRate is a number
    const units = parseFloat(row.units) || 0; // Ensure units is a number
    const gstRate = parseFloat(product.GSTRate); // Ensure GSTRate is a number

    const taxableAmount = saleRate * units;
    const gst = (taxableAmount * gstRate) / 100;

    const totalAmountWithTax = taxableAmount + gst;

    totalAmount += taxableAmount;
    totalQuantity += units;
    totalTaxableAmount += taxableAmount;
    totalTax += gst;
    totalAmountAfterTax += totalAmountWithTax;

    taxableAmounts.push({
      taxableAmount,
      totalAmount: totalAmountWithTax
    });
  });

  totalAmount = Math.round(totalAmount);
  totalAmountAfterTax = Math.round(totalAmountAfterTax);

  // Prepare taxData in the expected format
  const taxData = {
    sgst: {
      taxableAmount: totalTaxableAmount,
      rate: totalTax / 2 / totalTaxableAmount * 100, // Calculated rate based on total
      taxAmount: totalTax / 2
    },
    cgst: {
      taxableAmount: totalTaxableAmount,
      rate: totalTax / 2 / totalTaxableAmount * 100, // Calculated rate based on total
      taxAmount: totalTax / 2
    },
    igst: {
      taxableAmount: totalTaxableAmount,
      rate: totalTax / totalTaxableAmount * 100, // Calculated rate based on total
      taxAmount: totalTax
    }
  };

  return {
    taxableAmounts,
    totalAmount,
    totalQuantity,
    totalTaxableAmount,
    totalTax,
    totalAmountAfterTax,
    taxData // Include taxData in the return value
  };
};

export default QuotationCalculations;