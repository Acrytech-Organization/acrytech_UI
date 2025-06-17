import { getLocalDateString } from "../../Helpers/helpers"

export const getValidity = (khInfo) => {
    if (khInfo.validity) {
        if (khInfo.validity.validTill) {
            return "The business is active till "
                + getLocalDateString(khInfo.validity.validTill)
                + "."
        }

        if (khInfo.validity.count !== 0) {
            return "The business is active for another " + khInfo.validity.count + " invoices."
        }
    }

    return ""
}