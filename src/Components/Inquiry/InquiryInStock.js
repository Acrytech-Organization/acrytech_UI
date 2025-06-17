import { useLocation } from "react-router-dom";
import { DESIGN, PRODUCT_TYPE_RAW, RMLIST, STOCK } from "../../Helpers/ConstantProperties";
import { checkInquiryHasProcesses } from "../../Helpers/helpers";
import { DashBoardController } from "../Dashboard/DashBoardController";
import { UserActionContext } from "../Dashboard/SummaryPage";

const InquiryInStock = () => {
    const location = useLocation()
    const filterObject = {
        status: DESIGN,
    }
    const filterFunction = (inquiry) => {
        return inquiry.filter(inquiry => {
            let hasRawMaterialRemaining = false;
            inquiry.products.forEach(product => {
                product[RMLIST]?.forEach(rm => {
                    if (rm.units - rm.balance !== 0) hasRawMaterialRemaining = true
                })
            });
            return hasRawMaterialRemaining && checkInquiryHasProcesses(inquiry)
        })
    }

    return <UserActionContext.Provider value={{ routeDetails: { navigateTo: location.pathname } }}>
        <DashBoardController
            filterObject={filterObject}
            customQueryKey={[STOCK]}
            withBalance={true}
            filterFunction={filterFunction}
            productType={PRODUCT_TYPE_RAW}
        />
    </UserActionContext.Provider>
}
export default InquiryInStock;
