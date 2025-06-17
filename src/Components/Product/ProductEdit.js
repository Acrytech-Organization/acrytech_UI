import { useLocation } from "react-router-dom";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { PRODUCT_TYPE_PROCESS, UPDATE_ON_PRODUCT } from "../../Helpers/ConstantProperties";
import { GenericEditForm } from "../GenericComponents/FormComponent/GenericEditForm";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { productProps } from "../../Helpers/ExtraProperties";
import { deepCopyObject, updatePropertyListProduct } from "../../Helpers/helpers";

export const ProductEdit = () => {
    const location = useLocation();

    let SuccessMsg = "Product Edited Successfully"

    const editProductQueryFunction = async (state, khID) => {
        return await serviceHelpers.updateProduct(khID, state, location.state.id)
    }

    var PropsList = productProps

    if (location.state.type === PRODUCT_TYPE_PROCESS) {
        PropsList = updatePropertyListProduct(deepCopyObject(productProps), PRODUCT_TYPE_PROCESS)
    }

    const EditProps = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={SuccessMsg} />,
        navigateTo: "/Products",
        queryKeyValue: UPDATE_ON_PRODUCT,
        formTitle: "Edit Product",
        propertyList: PropsList,
        currentData: location.state,
        queryFunction: editProductQueryFunction,
    }

    return <GenericEditForm
        {...EditProps}
    />
}