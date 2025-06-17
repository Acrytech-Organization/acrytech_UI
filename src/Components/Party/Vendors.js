import { CREATEVENDOR, UPDATE_ON_VENDOR } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import Party from "./Party";

export default function Vendors() {
    return <Party
        qKey={UPDATE_ON_VENDOR}
        queryFn={serviceHelpers.getVendors}
        heading={'Vendors'}
        btnText={"New Vendor"}
        navigateTo={CREATEVENDOR}
    />
}