import { InquiryProps } from "../../Helpers/ExtraProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import CreateInquiry from "./CreateInquiry";

function CreateOpenInquiry() {
    const queryFunction = async (khID, state, currentDate) => {
        return await serviceHelpers.createInquiry(khID, state, currentDate)
    }
    return (
        <CreateInquiry
            propertyList={InquiryProps}
            queryFunction={queryFunction}
            successMessage="Inquiry Successfully Added"
            formTitle="Add New Inquiry"
        />
    )
}

export default CreateOpenInquiry;