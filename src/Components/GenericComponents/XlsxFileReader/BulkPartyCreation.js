import { CUSTOMER } from "../../../Helpers/ConstantProperties"
import { NO_DATA, SchemaTypes } from "../../../Helpers/ExtraProperties"
import { serviceHelpers } from "../../../Helpers/ServiceHelpers"
import { GenericFileRead } from "./GenericReader"


export const BulkPartyCreation = () => {
    const ignoreColumn = ["Sl No.", "PAN NO"]
    const startHeaderIndex = 2

    const changeTo = {
        "Email": "email",
        "Mobile": "phoneNumber",
        "GSTIN NO": "gstin",
        "Name": "name",
        "Type": "internal_type",
        "Customer Type": "customerType"
    }

    const customerDetails = {
        item: {
            displayName: "customer xlsx file",
            name: "customer",
            type: SchemaTypes.file,
            required: true
        }
    }
    const createParties = async (khID, account) => {
        let accountObect = account;
        if (accountObect.email === NO_DATA &&
            accountObect.name === NO_DATA &&
            accountObect.phoneNumber === NO_DATA &&
            accountObect.gstin === NO_DATA
        ) {
            //here we are checking the NO_DATA value if the above propertise does not exist it means the
            //give row is empty by default the xlsx package remove the empty rows that condition is added
            // inorder to remove the first row and the row which has the unsable data
            return ""
        }
        account.type = CUSTOMER
        return await serviceHelpers.createParty(khID, account)
    }

    return (
        <GenericFileRead
            changeTo={changeTo}
            propertyListObject={customerDetails}
            ignoreColumn={ignoreColumn}
            startHeaderIndex={startHeaderIndex}
            onSuccess={createParties}
            message={"  Creating Parties...."}
            title={"Bulk Party Upload"}
        />
    )
}