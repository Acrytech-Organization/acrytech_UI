import { CREATEPARTY, UPDATE_ON_CUSTOMER } from "../../Helpers/ConstantProperties";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import Party from "./Party";

export default function Customers() {
    return <Party
        qKey={UPDATE_ON_CUSTOMER}
        queryFn={serviceHelpers.getCustomers}
        heading={'Customers'}
        btnText={"New Customer"}
        navigateTo={CREATEPARTY}
    />
}