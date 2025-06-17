import { useContext } from "react"
import { FirmContext } from "./FirmContext";
import FailedAlert from "../GenericComponents/Alerts/FailedAlert";
import { Navigate } from "react-router-dom";
import { JOINFIRMMSG } from "../../Helpers/ConstantProperties";

// This component is different than Context.Consumer component in React
// The only purpose for adding this component, is to block the page from
// render if a firm is not seleted. This way we can keep the experience
// constant across multiple endpoints.

const errorMessage = "A Firm must be selected for you to view this page."

export function FirmContextConsumer({ children }) {
    const { khID, currentFirm } = useContext(FirmContext);

    //when no firm is attached with user currentFirm passing object
    //already {khID:"",name:""} so no need to check null
    if (!currentFirm.currentAccess) {
        return <Navigate to={JOINFIRMMSG} />;
    }

    if (!khID) {
        return (
            <div className="heightAndOverflow vstack">
                <FailedAlert message={errorMessage} />
            </div>
        );
    }

    return <>{children}</>
}