import { createContext } from "react";
import { DashBoardController } from "../Dashboard/DashBoardController";

export const UserActionContext = createContext({ showAssigned: false });

const SummaryPage = ({ filterFunction, customQueryKey = [], routeDetails }) => {

    return (
        <UserActionContext.Provider value={{ showAssigned: true, routeDetails: routeDetails }}>
            <DashBoardController
                filterFunction={filterFunction}
                customQueryKey={customQueryKey}
                routeDetails={routeDetails}
            />
        </UserActionContext.Provider>
    );
};

export default SummaryPage;