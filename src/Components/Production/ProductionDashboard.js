import { useLocation } from 'react-router-dom';
import { DESIGN, PROCESSESS, PRODUCT_TYPE_FINISHED, PRODUCTION, RMLIST } from '../../Helpers/ConstantProperties';
import { calculateFinishedGoodFromRM, checkInquiryHasProcesses, hasRawMaterial } from '../../Helpers/helpers';
import { DashBoardController } from '../Dashboard/DashBoardController';
import { UserActionContext } from '../Dashboard/SummaryPage';


export const calculateRequiredQuantityFG = (item) => {
    let requiredQuantity = item.units * 1
    let isRawMaterial = hasRawMaterial(item)
    if (isRawMaterial) {
        requiredQuantity = (item.balance || 0) + calculateFinishedGoodFromRM(item.units * 1, item[RMLIST][0].balance, item[RMLIST][0].units)
    }
    if (!isRawMaterial && hasRawMaterial(item, PROCESSESS)) {
        requiredQuantity += (item.balance || 0)
    } // that is for process make the voucher of the process and the fg
    return requiredQuantity;
}

const ProductionDashboard = () => {
    const location = useLocation()
    const filterObject = {
        status: DESIGN,
    }

    const filterFunction = (data) => {
        return data?.filter(inquiry => {
            if (!checkInquiryHasProcesses(inquiry)) {
                return false;
            }
            let someRemainingToPassToQualityCheck = false;
            inquiry.products.forEach(product => {
                if (!someRemainingToPassToQualityCheck && calculateRequiredQuantityFG(product) > 0) someRemainingToPassToQualityCheck = true
            })
            // if the shouldAdd is still zero it means all products in the inquiry
            //are gone to the quality check
            return someRemainingToPassToQualityCheck
        })
    }

    return <UserActionContext.Provider value={{ routeDetails: { navigateTo: location.pathname } }}>
        <DashBoardController
            filterObject={filterObject}
            customQueryKey={[PRODUCTION]}
            productType={PRODUCT_TYPE_FINISHED}
            filterFunction={filterFunction}
            withBalance={true}
        />
    </UserActionContext.Provider>
}

export default ProductionDashboard