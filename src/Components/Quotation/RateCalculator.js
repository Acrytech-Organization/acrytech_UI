import { CODE_IP, EIGHTEEN_GST, INTERNAL_PROCESS, LABOUR_COST } from "../../Helpers/ConstantProperties";
import { NO_DATA } from "../../Helpers/ExtraProperties";
import { getRoundUptoTwoPlaces, getSaleRate, getTotalUnitsForReq, isIGST, ShowNumber } from "../../Helpers/helpers";

const getIDFromData = (data) => data.productHSNcode + "-" + data.GSTRate;

export const getRateDetails = ({
    inquiry,
    currentFirm,
    docFormat,
    isBOM = false,
}) => {

    const igstApp = isIGST(currentFirm, inquiry);

    const retVal = {
        igstApp: igstApp,
        items: [],
        totalQuantity: 0,
        totalTaxableAmount: 0,
        totalTax: 0,
        totalAmountAfterTax: 0,
        taxTypeWiseList: [],
        hsnWiseList: {},
        roundedTotal: 0,
        roundOff: 0,
        totalPages: 1,
    }

    // Save few of the inquiry properties to the return object
    // This will enable us to show the document without inquiry
    // object present.
    retVal.poNumber = inquiry.poNumber;
    retVal.poDate = inquiry.poDate;

    retVal.customerName = inquiry.customerName;
    retVal.contactPerson = inquiry.contactPerson;
    retVal.city = inquiry.city;
    retVal.gstin = inquiry.gstin
    retVal.panNumber = inquiry.panNumber
    retVal.contactPhone = inquiry.contactPhone
    retVal.contactEmail = inquiry.contactEmail;

    retVal.billingAddress = inquiry.billingAddress;
    retVal.shippingAddress = inquiry.shippingAddress;

    retVal.paymentTerms = inquiry.paymentTerms
    retVal.transportTerms = inquiry.transportTerms
    retVal.otherTnC = inquiry.otherTnC

    const calculateTaxData = (itemToAdd) => {
        itemToAdd.tax = itemToAdd.taxableAmount * itemToAdd.GSTRate / 100;

        // Make the tax even this is because we spilt the tax in 2
        // in case of CGST, and due to rounding error, the total
        // doesnt match.
        itemToAdd.tax = getRoundUptoTwoPlaces(itemToAdd.tax / 2);
        itemToAdd.tax = itemToAdd.tax * 2;

        itemToAdd.totalAmount = itemToAdd.taxableAmount + itemToAdd.tax;

        itemToAdd.gstString = igstApp
            ? itemToAdd.GSTRate + "%"
            : (itemToAdd.GSTRate / 2) + "% - " + (itemToAdd.GSTRate / 2) + "%"

        itemToAdd.gstValueString = igstApp
            ? "IGST: " + ShowNumber(itemToAdd.tax, 2, true)
            : "C/S GST: " + ShowNumber(itemToAdd.tax / 2, 2, true)

        return itemToAdd;
    }

    const getItemWithDetails = (itemToAdd, product, fgQty = 1) => {
        // Sale Rate and Inclusive Rate needs to be rounded.
        itemToAdd.saleRate = getRoundUptoTwoPlaces(parseFloat(getSaleRate(product)));

        itemToAdd.inclusiveRate = itemToAdd.saleRate * (100 + itemToAdd.GSTRate) / 100;
        itemToAdd.inclusiveRate = getRoundUptoTwoPlaces(itemToAdd.inclusiveRate);

        itemToAdd.units = getTotalUnitsForReq(product, fgQty)
        itemToAdd.productdescription = product.productdescription;

        itemToAdd.taxableAmount = itemToAdd.saleRate * itemToAdd.units;
        itemToAdd.workingID = product.workingID;

        return itemToAdd;
    }

    inquiry.products?.forEach((product) => {
        let itemToAdd = getItemWithDetails({ ...product.product }, product);

        if (isBOM) {
            itemToAdd.taxableAmount = 0;
            itemToAdd.units = 0;

            const requirements = [...(product.rmlist || []), ...(product.processes || [])];

            var labour = {
                fgCode: itemToAdd.productItemcode,
                id: CODE_IP,
                productItemcode: CODE_IP,
                name: LABOUR_COST,
                productHSNcode: NO_DATA,
                units: 1,
                saleRate: 0,
                taxableAmount: 0,
                GSTRate: EIGHTEEN_GST
            }

            requirements.forEach((req) => {
                const reqToAdd = getItemWithDetails({ ...req.product }, req, product.units);
                reqToAdd.fgCode = itemToAdd.productItemcode;

                itemToAdd.taxableAmount += reqToAdd.taxableAmount;

                if (reqToAdd.productState === INTERNAL_PROCESS) {
                    labour.saleRate += reqToAdd.taxableAmount;
                    labour.taxableAmount += reqToAdd.taxableAmount;
                }
                else {
                    itemToAdd.units += reqToAdd.units;
                    retVal.items.push(reqToAdd);
                }
            })

            if (labour.taxableAmount > 0) {
                itemToAdd.units += labour.units;
                retVal.items.push(labour);
            }

            itemToAdd = calculateTaxData(itemToAdd)
        }
        else {
            retVal.items.push(calculateTaxData(itemToAdd));
        }

        const gstID = getIDFromData(itemToAdd);

        if (!retVal.hsnWiseList[gstID]) {
            retVal.hsnWiseList[gstID] = {
                taxable: 0,
                hsncode: itemToAdd.productHSNcode,
                GSTRate: itemToAdd.GSTRate,
                quantity: 0,
                tax: 0,
            };
        }

        retVal.hsnWiseList[gstID].taxable += itemToAdd.taxableAmount;
        retVal.hsnWiseList[gstID].quantity += itemToAdd.units;
        retVal.hsnWiseList[gstID].tax += itemToAdd.tax;

        retVal.totalQuantity += itemToAdd.units;
        retVal.totalTaxableAmount += itemToAdd.taxableAmount;
        retVal.totalTax += itemToAdd.tax;
        retVal.totalAmountAfterTax += itemToAdd.totalAmount;
    })

    // For IGST -- Total Taxable is all IGST
    if (igstApp) {
        retVal.taxTypeWiseList.push({
            type: "IGST",
            taxable: retVal.totalTaxableAmount,
            tax: retVal.totalTax
        })
    }
    else {
        // For CGST and SGST the total tax is half of total
        // and taxable is same as total
        retVal.taxTypeWiseList.push({
            type: "CGST",
            taxable: retVal.totalTaxableAmount,
            tax: retVal.totalTax / 2
        })

        retVal.taxTypeWiseList.push({
            type: "SGST",
            taxable: retVal.totalTaxableAmount,
            tax: retVal.totalTax / 2
        })
    }

    retVal.roundedTotal = Math.round(retVal.totalAmountAfterTax)
    retVal.roundOff = getRoundUptoTwoPlaces(retVal.roundedTotal - retVal.totalAmountAfterTax)

    if (docFormat?.maxInPage) {
        let totalItems = retVal.items.length;
        const maxInPage = docFormat.maxInPage;
        const pageSize = docFormat.pageSize;

        if (totalItems > maxInPage) {
            const rem = totalItems - maxInPage;
            retVal.totalPages += Math.ceil(rem / pageSize)
        }
    }

    return retVal;
}