import { GenericVerifyComponent } from "../VerifyComponent/FirmVerifyComponent"
import GenericForm from "./GenericForm"
import { useNavigate } from "react-router-dom";
import FormButtons from "./FormButtons";

export const GenericEditForm = (
    {
        ErrorComponent,
        SuccessComponent,
        navigateTo,
        queryKeyValue,
        formTitle,
        propertyList,
        currentData,
        queryFunction,
        GroupDetailsComponent,
        navigateOnSuccess,
        afterDispatch = () => { }
    }
) => {

    const navigateOnCancel = useNavigate()

    const EditProps = {
        ErrorComponent: ErrorComponent,
        SuccessComponent: SuccessComponent,
        addButtonText: "Edit",
        navigateTo: navigateTo,
        queryKeyValue: queryKeyValue,
        enableVerify: true,
        VerifyAlertComponent: GenericVerifyComponent,
        formTitle: formTitle,
        propertyList: propertyList,
        currentData: currentData,
        queryFunction: queryFunction,
        navigateOnSuccess: navigateOnSuccess,
        handleCancel: () => navigateOnCancel(navigateTo),
        GroupDetailsComponent: GroupDetailsComponent,
        afterDispatch: afterDispatch,
        CustomButtonComponent: ({ onClick }) => (
            <FormButtons onSaveClick={onClick} navigateTo={navigateTo} />
        ),
    }

    return (
        <GenericForm
            {...EditProps}
        />
    )
}