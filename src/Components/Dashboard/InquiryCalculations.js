import dayjs from 'dayjs'
import {
    BALANCE,
    EXTERNAL_VOUCHER_TYPE,
    INQUIRY_PRODUCTS,
    INQUIRY_STORE_ACCOUNT_ID,
    INR_RESOURCE_ID,
    LABOUR_VOUCHER_TYPE,
    PROCESSESS,
    PRODUCT_TYPE_SEMIFINISHED,
    PRODUCTION_PLAN,
    PRODUCTION_PLAN_RESOURCE_ID,
    RMLIST,
    TRANSPORT_VOUCHER_TYPE,
    UPDATE_ON_CUSTOMER,
    UPDATE_ON_INQUIRY,
    UPDATE_ON_PRODUCT,
    userLevels
} from '../../Helpers/ConstantProperties'
import { DecodeServerError, filterAndSortBatchObject, getFgRate, getRoundUptoTwoPlaces, getSaleRate, getTotalUnitsForReq } from '../../Helpers/helpers'
import { serviceHelpers } from '../../Helpers/ServiceHelpers'

export const getStoreProductQueryObject = (uid, khID, productID, date) => ({
    queryKey: [
        uid,
        khID,
        BALANCE + INQUIRY_STORE_ACCOUNT_ID,
        productID
    ],
    queryFn: async () => {
        const storeOptions = {
            accountID: INQUIRY_STORE_ACCOUNT_ID,
            resourceID: productID,
            date: dayjs(date).endOf('day'),
            withBatches: true,
        }

        return await serviceHelpers.getResourceBalance(khID, storeOptions)
    }
})

export const getProdPlanQureyObject = (uid, khID, inquiryID, date) => {
    return {
        queryKey: [
            uid,
            khID,
            BALANCE + inquiryID,
            PRODUCTION_PLAN_RESOURCE_ID
        ],
        queryFn: async () => {
            const balanceOption = {
                accountID: inquiryID,
                resourceID: PRODUCTION_PLAN_RESOURCE_ID,
                date: dayjs(date).endOf('day'),
                withBatches: true,
            }

            return await serviceHelpers.getResourceBalance(khID, balanceOption)
        }
    }
}

export const getProductInquiryObject = (uid, khID, productID, inquiryID) => {
    return {
        queryKey: [
            uid,
            khID,
            BALANCE + inquiryID,
            productID
        ],
        queryFn: async () => {
            const balanceOption = {
                accountID: inquiryID,
                resourceID: productID,
                date: dayjs().endOf('day'),
                withBatches: true,
            }

            return await serviceHelpers.getResourceBalance(khID, balanceOption)
        }
    }
}

export const getInquiryINRStatement = (uid, khID, inquiry) => {
    return {
        queryKey: [
            uid,
            khID,
            INR_RESOURCE_ID,
            BALANCE + inquiry.id,
        ],
        queryFn: async () => {
            return await serviceHelpers.getINRStatement(khID, inquiry)
        }
    }
}

export const getProductWisePlanning = (plannedBalance) => {
    const retObject = {}

    if (!plannedBalance) return retObject;

    Object.values(plannedBalance.batches).forEach((batch) => {
        if (batch.BatchObject?.productID) {
            retObject[batch.BatchObject.productID] = batch;
        }
    })

    return retObject;
}

const getStoreBalanceForProduct = (storeResult, productID) => {

    const storeBalanceResult = storeResult.find(
        (res) => res.data[0]?.resourceID === productID);

    return storeBalanceResult?.data[0];
}

export const getBatchUnits = (batch) => {
    // There are 2 ways the batch units are stored.
    // if the result is withBatches, then the batch object have
    // a property named units
    // if the result is withoutBatches, then the value of batch
    // object is a number reoresenting the units.

    return (typeof (batch) === "object") ? batch.units : batch;
}

export const calculateGoodTotalsForAssignment = (batch, units) => {
    const returnBatch = {};
    let required = Number(units);
    let inr_cost = 0;

    const batchKeys = Object.keys(batch);

    for (const element of batchKeys) {
        if (required <= 0) break;

        const batchUnits = getBatchUnits(batch[element]);
        const rate = batch[element].BatchObject?.rate || 0;

        const alloted = Math.min(required, batchUnits);
        inr_cost += alloted * rate;

        returnBatch[element] = alloted;
        required -= alloted;
    }

    return { returnBatch, inr_cost };
};

export const getProductResultDetails = (
    inquiry,
    planResultData,
    storeResult = null) => {

    const products = [];

    const productsToManu = [...(inquiry.products || []), ...(inquiry.sfg || [])];

    const quantities = getTotalQuantity(inquiry);

    productsToManu.forEach((product) => {
        // For all the products, first get all the common props
        const units = product.units ? product.units : (quantities[product.product.id]?.units || 0);
        const isSFG = product.product.type === PRODUCT_TYPE_SEMIFINISHED;

        const productData = {
            id: product.product.id,
            name: product.product.name,
            description: product.product.description,
            productItemcode: product.product.productItemcode,
            unit: product.product.unit,
            workingID: product.workingID,

            saleRate: getSaleRate(product),
            GSTRate: product.product.GSTRate,
            productHSNcode: product.product.productHSNcode,

            required: parseFloat(units),

            inStore: 0,
            storeBalance: 0,
            inquiryBalance: 0,

            prodPossible: 0,
            planned: 0,

            released: 0,
            inQC: 0,
            atVendor: 0,
            passed: 0,
            failed: 0,
            rejected: 0,

            allotable: 0,
            assigned: 0,

            dispatched: 0,
            showInDispatch: !isSFG,

            rmlist: [],
            processes: [],

            hasRM: product[RMLIST]?.length > 0,
            hasProcess: (product[PROCESSESS]?.length > 0)
        }

        if (storeResult) {
            const storeBalance = getStoreBalanceForProduct(storeResult, productData.id);

            if (storeBalance) {
                productData.storeBatches = filterAndSortBatchObject(storeBalance.batches);

                // This is the total balance store can allot to the inquiry. It is not the same
                // as the total store balance as there are other inquiry balance are present in
                // the store.
                productData.storeBalance =
                    Object.values(productData.storeBatches).reduce(
                        (total, batch) => total + getBatchUnits(batch), 0);

                // This is the balance of this inquiry in the store.
                productData.inquiryBalance = (getBatchUnits(storeBalance.batches[inquiry.id]) || 0)
            }
        }

        // Now add details from the Production Plan
        const productionResult = planResultData?.batches[product.workingID];

        if (productionResult) {
            const batchObject = productionResult.BatchObject;

            productData.released = productionResult.units;

            productData.inQC = batchObject.inQC || 0
            productData.passed = batchObject.passed || 0
            productData.failed = batchObject.failed || 0
            productData.rejected = batchObject.rejected || 0
            productData.atVendor = batchObject.atVendor || 0
            productData.assigned = batchObject.assigned || 0;

            productData.dispatched = batchObject.dispatched || 0;

            productData.vendorID = batchObject.vendorID
            productData.batchID = batchObject.id;

            productData.released -= productData.rejected;
            productData.released -= productData.assigned;

            productData.inProduction = productData.released - productData.passed;

            // This number shows, how many units still needs to produce
            productData.remainingProduction =
                productData.inProduction - productData.inQC - productData.atVendor;
        }

        // Now make other calculations

        // This is the number which represents the total ready product
        // This wil include the qty assigned as well.
        productData.productionDone = productData.passed + productData.assigned;

        productData.inStore = Math.min(
            (productData.productionDone - productData.dispatched), productData.inquiryBalance);

        // This is the number which shows how many more units to plan
        productData.remaining = productData.required - productData.released;

        // This number shows how many units still needs to dispatch
        productData.remainingDispatch = productData.required - productData.dispatched;

        // This number shows, how many units still needs to produce
        productData.remainingProduction =
            productData.released - productData.inQC - productData.atVendor - productData.passed

        // System can only allot FG if the remaining items are going to 0
        // There is no reason to just allot half requirement and wait for
        // other half to come from other sources.
        productData.canAllot =
            productData.remaining !== 0 &&
            productData.remaining <= (productData.storeBalance);

        // Now lets tackle the requirements
        product[RMLIST]?.forEach((req) => {
            const reqObject = {
                id: req.product.id,
                name: req.product.name,
                productHSNcode: req.product.productHSNcode,
                productItemcode: req.product.productItemcode,
                unit: req.product.unit,
                required: getTotalUnitsForReq(req, productData.required),
                fgRate: getFgRate(req, productData.required),
                fgID: productData.id,
                inStore: 0,
                storeBalance: 0,
            }

            const isSFG = req.product.type === PRODUCT_TYPE_SEMIFINISHED;

            if (storeResult) {
                const storeBalance = getStoreBalanceForProduct(storeResult, reqObject.id);

                if (storeBalance) {

                    reqObject.storeBatches = isSFG
                        ? storeBalance.batches
                        : filterAndSortBatchObject(storeBalance.batches);


                    reqObject.storeBalance =
                        Object.values(reqObject.storeBatches).reduce(
                            (total, batch) => total + getBatchUnits(batch), 0);
                }
            }

            reqObject.released = productData.released * reqObject.fgRate;
            reqObject.remaining = productData.remaining * reqObject.fgRate;

            productData.rmlist.push(reqObject);
        })

        product[PROCESSESS]?.forEach((req) => {

            const reqObject = {
                id: req.product.id,
                name: req.product.name,
                required: getTotalUnitsForReq(req, productData.required),
                fgRate: getFgRate(req, productData.required),
                fgID: productData.id,
            }

            productData.processes.push(reqObject);
        })

        // This needs to happen after we done with the RM calculations
        // so cant move up.
        productData.prodPossible = productData.planned + getFGWiseRequirement(productData);

        products.push(productData);
    })

    return products;
}

export const getFGWiseRequirement = (product, plannedRM = {}) => {
    // This functions returns the MIN of remaining and Possible Production as
    // per the store balance.

    // When we add a planning for one of the product, we want the total
    // remaining of other products to go down but not the one we updated.
    // This is not easy to do in a single iteration. Hence we add the planned
    // production back to min Possible at the return value.
    const remaining = product.remaining - product.planned

    return product.rmlist.reduce((possible, raw) => {

        const storeBalance = raw.storeBalance - (plannedRM[raw.id]?.units || 0);

        const maxPossible = getRoundUptoTwoPlaces(storeBalance / raw.fgRate);
        raw.maxPossible = Math.min(maxPossible, remaining);

        return Math.min(possible, raw.maxPossible);

    }, remaining);
}

export const getPlannedRM = (balanceDetails, withBatch = false) => {
    const plannedRM = {}
    const plannedFG = {}

    balanceDetails.forEach((product) => {
        if (product.planned > 0) {
            plannedFG[product.workingID] = {
                productID: product.id,
                batchID: product.batchID,
                planned: product.planned
            };
        }

        product.rmlist.forEach((raw) => {
            if (raw.planned) {
                plannedRM[raw.id] = plannedRM[raw.id] ? plannedRM[raw.id] : { units: 0 };
                plannedRM[raw.id].units += (raw.planned)

                if (withBatch) {
                    plannedRM[raw.id].storeBatches = raw.storeBatches
                }
            }
        })
    })

    return { plannedRM, plannedFG };
}

export const updateProdPossible = (balanceDetails) => {
    // This whole method is not really optimized
    // We are iterating product array multiple times.
    // This is not optimal and we need to think a better design.

    // For now we start with this implimentation as the number of
    // products in an inquiry may not be that many.
    const { plannedRM } = getPlannedRM(balanceDetails);
    let disableButton = true;

    balanceDetails.forEach((product) => {

        // When we add a planning for one of the product, we want the total
        // remaining of other products to go down but not the one we updated.
        // This is not easy to do in a single iteration. Hence we add the planned
        // production back to min Possible so to keep the calculation correct.
        product.prodPossible = product.planned + getFGWiseRequirement(product, plannedRM);

        // Check if all the requirement is within limit
        // If any of the planned data is less than possible, we can save the data
        // so enable the save button.
        if (product.planned <= product.prodPossible) disableButton = false;
    })

    return disableButton;
}

export const getProductPlanBatchObject = (workingID, productID, inquiryID) => {
    return {
        id: workingID,
        productID: productID,
        inquiryID: inquiryID,
        name: PRODUCTION_PLAN,
        entityPublicAccess: true,
        effectAccess: userLevels.map((level) => level.id)
    }
}

export const getMutateObject = (
    queryClient,
    queryFunction,
    showSnackbar,
    message,
    inquiryID,
    navigateTo = null
) => {
    return {
        mutationFn: queryFunction,

        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.includes(BALANCE + inquiryID) ||
                    query.queryKey.includes(BALANCE + INQUIRY_STORE_ACCOUNT_ID) ||
                    query.queryKey.includes(UPDATE_ON_INQUIRY) ||
                    query.queryKey.includes(UPDATE_ON_PRODUCT) ||
                    query.queryKey.includes(UPDATE_ON_CUSTOMER) ||
                    query.queryKey.includes(PRODUCTION_PLAN_RESOURCE_ID)
            })

            showSnackbar(message, 'success')
            if (navigateTo) navigateTo(data)
        },
        onError: (error) => {
            const message = DecodeServerError(error);
            showSnackbar(message, 'error');
        },
    }
}

export const isProductionNeeded = (balance) => {
    const prodDone = balance.every((product) => {
        return product.remainingProduction === 0
            && product.atVendor === 0
    })

    return !prodDone
}

export const removeFromStore = (balance, relesedUnits) => {
    const totalRemaining = balance.reduce((total, product) => total + product.remaining, 0);
    return totalRemaining <= relesedUnits;
}

export const getTotalQuantity = (inquiry) => {
    const quantities = {};

    // For all Products
    inquiry.products.forEach((product) => {

        product[RMLIST]?.forEach((req) => {
            const requiredQty = parseFloat(getTotalUnitsForReq(req, product.units));

            if (quantities[req.product.id]) {
                quantities[req.product.id].units += requiredQty;
            }
            else {
                quantities[req.product.id] = {
                    name: req.product.name,
                    saleRate: req.product.saleRate,
                    units: requiredQty
                }
            }
        })
    })

    // for all SFG in reverse order
    inquiry.sfg?.toReversed().forEach((sfg) => {
        const sfgQty = quantities[sfg.product.id]?.units || 1;

        sfg[RMLIST]?.forEach((req) => {
            const requiredQty = parseFloat(getTotalUnitsForReq(req, sfgQty));

            if (quantities[req.product.id]) {
                quantities[req.product.id].units += requiredQty;
            }
            else {
                quantities[req.product.id] = {
                    name: req.product.name,
                    saleRate: req.product.saleRate,
                    units: requiredQty
                }
            }
        })
    })

    return quantities;
}

export const getExpenceType = (transaction) => {
    switch (transaction.type) {
        case INQUIRY_PRODUCTS:
            return "Material Cost"
        case LABOUR_VOUCHER_TYPE:
            return "Labour Cost"
        case TRANSPORT_VOUCHER_TYPE:
            return "Transport Cost"
        case EXTERNAL_VOUCHER_TYPE:
            return "Process Cost"
        default:
            return "OTHER"
    }
}

export const getExpenceDetails = (transaction) => {
    if (transaction.type === INQUIRY_PRODUCTS) {
        return "Details as above."
    }

    if (transaction.type === LABOUR_VOUCHER_TYPE) {
        return "Labour cost of " + transaction.hrs + " Hrs for " + transaction.name + ". Working on " + transaction.description;
    }

    if (transaction.type === TRANSPORT_VOUCHER_TYPE) {
        return transaction.description;
    }

    if (transaction.type === EXTERNAL_VOUCHER_TYPE) {
        return "Invoice Ref: " + transaction.refranceId + " from " + transaction.name + " for " + transaction.description;
    }

    return "Other Expences";
}