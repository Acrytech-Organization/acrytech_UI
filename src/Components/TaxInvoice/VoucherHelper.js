import { getProductionMarkers } from "../../Helpers/MarkerHelper";

export const GetTransactionsFromQCObject = (
    qcObject, inquiryID, toAccount, date, markers = null) => {

    const transactions = [];

    Object.entries(qcObject).forEach(([workingID, details]) => {

        const units = details[inquiryID];
        const productID = details.productID;

        if (units !== 0) {
            // From Transaction
            const fromTransaction = {
                accountID: inquiryID,
                resourceID: productID,
                units: -1 * units,
                batches: [{ id: workingID, units: -1 * units }]
            }

            const toAccountObject = {
                accountID: toAccount,
                resourceID: productID,
                units: units,
                batches: [{ id: inquiryID, units: units }]
            }

            transactions.push(fromTransaction, toAccountObject);
            markers?.push(getProductionMarkers(date, productID, details.name, units));
        }
    });

    return transactions;
}