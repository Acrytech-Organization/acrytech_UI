import dayjs from "dayjs"
import { serviceHelpers } from "./ServiceHelpers"
import { getRoundUptoThreePlaces } from "./helpers"

const MARKER = "M"

const SALE = "_001_"
const EXPENSES = "_002_"
const PURCHASE = "_003_"
const PRODUCTION = "_004_"
const RECEIPT = "_005_"
const PAYMENT = "_006_"
const WORKING = "_007_"

export const HSN_TAG = "_t_t001";
export const CUSTOMER_TAG = "_t_t002";
export const EXPENSES_TAG = "_t_t003";
export const PRODUCTION_TAG = "_t_t004";
export const TOTAL_TAG = "_t_t005";

const DATE_MARKER = "D:";
const MONTH_MARKER = "M:";
const ID_MARKER = "I:";

const TOTAL_SALE_MARKER = "TS";
const TOTAL_EXPENSES_MARKER = "TE";
const TOTAL_PURCHASE_MARKER = "TP";
const TOTAL_RECEIPT_MARKER = "TR";
const TOTAL_PAYMENT_MARKER = "TPA";

const getMarkerGroupForMonthWorking = (date, type) => {
    return MARKER + WORKING + type + MONTH_MARKER + dayjs(date).format("YYYYMM");
}

const getMarkerGroupForMonthSale = (date, type) => {
    return MARKER + SALE + type + MONTH_MARKER + dayjs(date).format("YYYYMM");
}

const getMarkerGroupForMonthExpenses = (date, type) => {
    return MARKER + EXPENSES + type + MONTH_MARKER + dayjs(date).format("YYYYMM");
}

const getMarkerGroupForMonthPurchase = (date, type) => {
    return MARKER + PURCHASE + type + MONTH_MARKER + dayjs(date).format("YYYYMM");
}

const getMarkerGroupForDayProduction = (date) => {
    return MARKER + PRODUCTION + PRODUCTION_TAG + DATE_MARKER + dayjs(date).format("YYYYMMDD");
}

// ID could be product or customer or HSN
const getMarkerForMonthSale = (date, id) => {
    return MARKER + SALE + MONTH_MARKER + dayjs(date).format("YYYYMM") + id
}

// // ID could be product or customer or HSN
// const getMarkerForTotalSale = (id) => {
//     return MARKER + SALE + ID_MARKER + id
// }

const getMarkerForMonthExpenses = (date, id) => {
    return MARKER + EXPENSES + MONTH_MARKER + dayjs(date).format("YYYYMM") + id
}

const getMarkerForMonthPurchse = (date, id) => {
    return MARKER + PURCHASE + MONTH_MARKER + dayjs(date).format("YYYYMM") + id
}

const getMarkerForMonthReceipts = (date, id = TOTAL_RECEIPT_MARKER) => {
    return MARKER + RECEIPT + MONTH_MARKER + dayjs(date).format("YYYYMM") + id
}

const getMarkerForMonthPayments = (date, id = TOTAL_PAYMENT_MARKER) => {
    return MARKER + PAYMENT + MONTH_MARKER + dayjs(date).format("YYYYMM") + id
}

const getMarkerForDayProduction = (date, id) => {
    return MARKER + PRODUCTION + DATE_MARKER + dayjs(date).format("YYYYMMDD") + id
}

export const getDetailsFromMarkerTag = (markerTag) => {
    const type = markerTag.substring(1, 6);
    const tag = markerTag.substring(6, 13);
    const date = markerTag.substring(13);

    return { type, tag, date }
}

export const getDetailsFromMarker = (marker) => {
    const type = marker.substring(1, 6);

    let date = null;
    let month = null;
    let id = null;

    const markerDetails = marker.substring(6, 8);

    switch (markerDetails) {
        case DATE_MARKER:
            date = marker.substring(8, 16);
            id = marker.substring(16);
            break;

        case MONTH_MARKER:
            month = marker.substring(8, 14);
            id = marker.substring(14);
            break;

        case ID_MARKER:
            id = marker.substring(8);
            break;

        default:
            break;
    }

    return { type, date, month, id }
}

export const getProductionMarkerQuery = (uid, khID, date) => ({
    queryKey: [
        uid,
        khID,
        PRODUCTION_TAG + date.format("YYYYMMDD")
    ],

    queryFn: async () => {
        const group = getMarkerGroupForDayProduction(date);
        return await serviceHelpers.getMarkersForGroup(khID, group);
    }
})

export const getTotalSaleMarkersQuery = (uid, khID, date) => ({
    queryKey: [
        uid,
        khID,
        SALE,
        TOTAL_SALE_MARKER + date.format("YYYYMM")
    ],

    queryFn: async () => {
        const markerID = getMarkerForMonthSale(date, TOTAL_SALE_MARKER);
        return await serviceHelpers.getMarkers(khID, markerID);
    }
})

export const getCustomerSaleMarkersQuery = (uid, khID, date, id) => ({
    queryKey: [
        uid,
        khID,
        SALE,
        id + date.format("YYYYMM")
    ],

    queryFn: async () => {
        const markerID = getMarkerForMonthSale(date, id);
        return await serviceHelpers.getMarkers(khID, markerID);
    }
})

export const getMonthSaleForTagMarkersQuery = (uid, khID, date, tag) => ({
    queryKey: [
        uid,
        khID,
        SALE,
        tag + date.format("YYYYMM")
    ],
    queryFn: async () => {
        const group = getMarkerGroupForMonthSale(date, tag);
        return await serviceHelpers.getMarkersForGroup(khID, group);
    }
});

export const getTotalPurchaseMarkersQuery = (uid, khID, date) => ({
    queryKey: [
        uid,
        khID,
        PURCHASE,
        TOTAL_PURCHASE_MARKER + date.format("YYYYMM")
    ],

    queryFn: async () => {
        const markerID = getMarkerForMonthPurchse(date, TOTAL_PURCHASE_MARKER);
        return await serviceHelpers.getMarkers(khID, markerID);
    }
})

export const getTotalExpensesMarkersQuery = (uid, khID, date) => ({
    queryKey: [
        uid,
        khID,
        EXPENSES,
        TOTAL_EXPENSES_MARKER + date.format("YYYYMM")
    ],

    queryFn: async () => {
        const markerID = getMarkerForMonthExpenses(date, TOTAL_EXPENSES_MARKER);
        return await serviceHelpers.getMarkers(khID, markerID);
    }
})

export const getTotalReceiptsMarkersQuery = (uid, khID, date) => ({
    queryKey: [
        uid,
        khID,
        RECEIPT,
        TOTAL_RECEIPT_MARKER + date.format("YYYYMM")
    ],

    queryFn: async () => {
        const markerID = getMarkerForMonthReceipts(date);
        return await serviceHelpers.getMarkers(khID, markerID);
    }
})

export const getTotalPaymentssMarkersQuery = (uid, khID, date) => ({
    queryKey: [
        uid,
        khID,
        PAYMENT,
        TOTAL_PAYMENT_MARKER + date.format("YYYYMM")
    ],

    queryFn: async () => {
        const markerID = getMarkerForMonthPayments(date);
        return await serviceHelpers.getMarkers(khID, markerID);
    }
})

export const getSaleMarkersFromCData = (cData, currentDate, party) => {
    const markers = [];

    // HSN Markers
    // Object.values(cData.hsnWiseList).forEach((hsnObject) => {
    //     const hsnMonthly = getMarkerForMonthSale(currentDate, hsnObject.hsncode);
    //     const HSNtagM = getMarkerGroupForMonthSale(currentDate, HSN_TAG);
    //     markers.push({
    //         id: hsnMonthly,
    //         tag: HSNtagM,
    //         name: hsnObject.hsncode.toString(),
    //         units: getRoundUptoThreePlaces(hsnObject.taxable)
    //     });
    // })

    // Customer Markers
    const custMonthly = getMarkerForMonthSale(currentDate, party.id);
    const CusttagM = getMarkerGroupForMonthSale(currentDate, CUSTOMER_TAG);
    markers.push({
        id: custMonthly,
        tag: CusttagM,
        name: party.name,
        units: getRoundUptoThreePlaces(cData.totalTaxableAmount)
    });

    // Total Sale Markers
    const totalSaleMarker = getMarkerForMonthSale(currentDate, TOTAL_SALE_MARKER);
    const totalSaleTag = getMarkerGroupForMonthWorking(currentDate, TOTAL_TAG);
    markers.push({
        id: totalSaleMarker,
        tag: totalSaleTag,
        name: "Total Sale",
        units: getRoundUptoThreePlaces(cData.totalTaxableAmount)
    });

    return markers;
}

export const getPurchaseMarkersFromCData = (cData, currentDate, party) => {
    const markers = [];

    // HSN Markers
    Object.values(cData.hsnWiseList).forEach((hsnObject) => {
        const hsnMonthly = getMarkerForMonthPurchse(currentDate, hsnObject.hsncode);
        const HSNtagM = getMarkerGroupForMonthPurchase(currentDate, HSN_TAG);
        markers.push({
            id: hsnMonthly,
            tag: HSNtagM,
            name: hsnObject.hsncode.toString(),
            units: getRoundUptoThreePlaces(hsnObject.taxable)
        });
    })

    // Vendor Markers
    const custMonthly = getMarkerForMonthPurchse(currentDate, party.id);
    const CusttagM = getMarkerGroupForMonthPurchase(currentDate, CUSTOMER_TAG);
    markers.push({
        id: custMonthly,
        tag: CusttagM,
        name: party.name,
        units: getRoundUptoThreePlaces(cData.totalTaxableAmount)
    });

    // Total Markers
    const totalSaleMarker = getMarkerForMonthPurchse(currentDate, TOTAL_PURCHASE_MARKER);
    const totalSaleTag = getMarkerGroupForMonthWorking(currentDate, TOTAL_TAG);
    markers.push({
        id: totalSaleMarker,
        tag: totalSaleTag,
        name: "Total Purchase",
        units: getRoundUptoThreePlaces(cData.totalTaxableAmount)
    });

    return markers;
}

export const getExpensesMarkerFromCData = (cData, currentDate) => {
    const markers = [];

    var totalExpences = 0;

    // HSN Markers
    cData.forEach((account) => {

        const units = account.units;
        const marker = getMarkerForMonthExpenses(currentDate, account.id);
        const markertag = getMarkerGroupForMonthExpenses(currentDate, EXPENSES_TAG);

        markers.push({
            id: marker,
            tag: markertag,
            name: account.name,
            units: units
        });

        totalExpences += parseFloat(units);
    })

    // Total Markers
    if (totalExpences > 0) {
        const totalSaleMarker = getMarkerForMonthExpenses(currentDate, TOTAL_EXPENSES_MARKER);
        const totalSaleTag = getMarkerGroupForMonthWorking(currentDate, TOTAL_TAG);
        markers.push({
            id: totalSaleMarker,
            tag: totalSaleTag,
            name: "Total Expenses",
            units: getRoundUptoThreePlaces(totalExpences)
        });
    }

    return markers;
}

export const getProductionMarkers = (date, productID, name, units) => {
    const group = getMarkerGroupForDayProduction(date);

    const marker = getMarkerForDayProduction(date, productID);
    return {
        id: marker,
        name: name,
        tag: group,
        units: units
    }
}

export const getReceiptMarkersFromCData = (total, currentDate) => {
    const totalReceiptMarker = getMarkerForMonthReceipts(currentDate);
    const totalReceiptTag = getMarkerGroupForMonthWorking(currentDate, TOTAL_TAG);

    return {
        id: totalReceiptMarker,
        tag: totalReceiptTag,
        name: "Cash In",
        units: Math.abs(total)
    };
}

export const getPaymentMarkersFromCData = (total, currentDate) => {
    const totalPaymentMarker = getMarkerForMonthPayments(currentDate);
    const totalPaymentReceipt = getMarkerGroupForMonthWorking(currentDate, TOTAL_TAG);

    return {
        id: totalPaymentMarker,
        tag: totalPaymentReceipt,
        name: "Cash Out",
        units: Math.abs(total)
    };
}