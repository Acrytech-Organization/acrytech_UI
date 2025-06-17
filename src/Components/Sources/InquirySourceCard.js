import { useNavigate } from "react-router-dom";
import GenericCard from "../GenericComponents/DataView/GenericCard";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { EDITINQUIRYSOURCE, NEW_INQUIRY_SOURCE, UPDATE_ON_INQUIRY_SOURCE } from "../../Helpers/ConstantProperties";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import InquiryCardContent from "./InquiryCardContent";

function InquirySourceCard({ item }) {
    const navigate = useNavigate();

    let successMessage = "Inquiry Source Deleted SuccessFully"

    const deleteInquiry = async (khid) => {
        return await serviceHelpers.deleteInquirySource(khid, item.id);
    }

    const onDelete = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: NEW_INQUIRY_SOURCE,
        queryFunction: deleteInquiry,
        queryKeyValue: UPDATE_ON_INQUIRY_SOURCE,
    }

    const onEdit = () => {
        navigate(EDITINQUIRYSOURCE, { state: item })
    }

    return <GenericCard
        key={item.id}
        contentComponent={InquiryCardContent}
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
    />

}

export default InquirySourceCard;
