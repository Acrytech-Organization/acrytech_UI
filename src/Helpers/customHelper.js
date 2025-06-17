export const updateRequiredPropsForOrder = (updateObject, inquiry) => {
    // For Acrytech .. all products needs design, regardless of the
    // known status.

    updateObject.designNeeded = true;
}

export const showRateChangeForInvoice = (disableRate) => {
    return disableRate
}