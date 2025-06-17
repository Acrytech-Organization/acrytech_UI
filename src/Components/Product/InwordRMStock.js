import { InwordRMPropList, RM_GROUP_NAME } from "../../Helpers/ExtraProperties";
import InwordStock from "./InwordStock";

export default function InwordRMStock() {
    return (
        <InwordStock propName={RM_GROUP_NAME} propList={InwordRMPropList} />
    )
}