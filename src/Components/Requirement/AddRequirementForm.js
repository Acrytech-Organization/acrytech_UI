import { useNavigate } from "react-router-dom";
import { QUOTATION, UPDATE_ON_INQUIRY } from "../../Helpers/ConstantProperties";
import { requirementRawMaterialHeading } from "../../Helpers/ExtraProperties";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import InquiryProductDetails from "../Inquiry/InquiryProductDetails";
import { RequirementProductDialogHeader } from "./RequirementProducts/RequirementProductDialogHeader";
import GenericForm from "../GenericComponents/FormComponent/GenericForm";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { InquiryPostDispatch } from "../../Helpers/helpers";
import RequirementRawMaterialContent from "./RequirementRawMaterialContent";

export const AddRequirementForm = ({
    item,
    queryFunction,
    successMessage,
    newPropertyListObject,
}) => {
    const navigate = useNavigate();
    const handleReditect = () => {
        navigate(QUOTATION)
    }

    const FormProperties = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText: "Add",
        navigateTo: QUOTATION,
        queryKeyValue: UPDATE_ON_INQUIRY,
        formTitle: " ",
        propertyList: newPropertyListObject,
        queryFunction: (state) => queryFunction(state, item),
        buttonClasses: "",
        currentData: item ? item : {},
        handleCancel: handleReditect,
        afterDispatch: InquiryPostDispatch,
        GroupDetailsComponent: (props) => <InquiryProductDetails
            ResponsiveContentComponent={RequirementRawMaterialContent}
            {...props}
            headingList={requirementRawMaterialHeading}
            groupFieldName={newPropertyListObject[0].groupName} />,
        enableClear: true
    }

    return (
        <Grid2 lg={12} className="d-flex flex-column gap-1">
            <RequirementProductDialogHeader item={item} />
            <GenericForm {...FormProperties} />
        </Grid2>)
}
