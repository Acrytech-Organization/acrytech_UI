import React from 'react'
import { calculateFinishedGoodFromRM, CheckforRelease, getProductIDResourceID, getRequirementArray, getStockTable, getStockValue, hasRawMaterial } from '../../Helpers/helpers';
import StockDashboardCard from './StockDashboardCard';
import { NEW_PRODUCTION, PROCESSESS, PRODUCT_TYPE_PROCESS, PRODUCT_TYPE_RAW, PRODUCTION, ProductionTable, QUALITY_CHECK, RMLIST, STOCK_MANAGEMENT, UPDATE_ON_INQUIRY } from '../../Helpers/ConstantProperties';
import { StockInput } from './StockInput';

export const processBtnText = "Mark Complete";
export const rmHoldProperty = "checkRmHold";
export const processHoldProperty = "checkProcessHold"
export const rmBtnText = "Release Material";
export const rmAccordionName = "Raw Material";
export const processAccordionName = "Processes"
export const rmSuccessMessage = "Raw Material Passed successfully"
export const processSuccessMessage = "Finished Product Pass to Quality Check successfully "
export const rmDialogTitle = "Mark Requirement Completed";
export const processDialogTitle = "Mark Process Completed"

const calculateTotalUnitsProcess = (productBalanceObject, data, item) => {
    let totalUnits = item.units;
    if (hasRawMaterial(item)) {
        totalUnits = calculateFinishedGoodFromRM(item.units * 1, item[RMLIST][0].balance, item[RMLIST][0].units)
    }
    return totalUnits;
}

export const calculateRequiredQuantityFG = (productBalanceObject, data, item) => {
    let requiredQuantity = item.units * 1
    if (hasRawMaterial(item)) {
        requiredQuantity = calculateFinishedGoodFromRM(item.units * 1, item[RMLIST][0].balance, item[RMLIST][0].units)
    }
    if (productBalanceObject[getProductIDResourceID(data.id, item.product.id)] < 0) {
        requiredQuantity = requiredQuantity + (productBalanceObject[getProductIDResourceID(data.id, item.product.id)] * 1)
    }
    return requiredQuantity;
}

const StockDashboard = (props) => {

    const extraProps = {
        reqPropName: PROCESSESS,
        note: "Production Complete, Status changed to Ready For Dispatch",
        nextStatus: QUALITY_CHECK,
        headings: ProductionTable,
        btnText: processBtnText,
        ProductDialogTableTitle: processDialogTitle,
        navigateOnCancel: NEW_PRODUCTION,
        productType: PRODUCT_TYPE_PROCESS,
        AccordionName: processAccordionName,
        successMessage: processSuccessMessage,
        CheckforRelease: (item, storeBalanceObject, productType) => {
            return {
                checkforZero: true,
                checkForEmptyStore: false
            }
        },
        RenderedComponent: (props) => <StockInput {...props}
            calculatedTotalUnits={calculateTotalUnitsProcess}
            calculateRequiredQuantity={calculateRequiredQuantityFG} />,
        defaultButtonText: undefined
    }

    if (props.reqType === PRODUCT_TYPE_RAW) {
        extraProps.reqPropName = RMLIST;
        extraProps.note = "Raw Material Relesed, Status changed to In Production";
        extraProps.nextStatus = PRODUCTION;
        extraProps.headings = getStockTable();
        extraProps.btnText = rmBtnText
        extraProps.navigateOnCancel = STOCK_MANAGEMENT;
        extraProps.ProductDialogTableTitle = rmDialogTitle
        extraProps.productType = PRODUCT_TYPE_RAW
        extraProps.holdproperty = rmHoldProperty
        extraProps.CheckforRelease = CheckforRelease
        extraProps.AccordionName = rmAccordionName
        extraProps.successMessage = rmSuccessMessage
        extraProps.RenderedComponent = undefined
    }

    const stockProps = {
        headings: extraProps.headings,
        ReleaseButtontext: extraProps.btnText,
        successMessage: extraProps.successMessage,
        AccordionName: extraProps.AccordionName,
        buttonText: "Save",
        getProductArray: getRequirementArray,
        getValue: getStockValue,
        inValidateQueryKey: UPDATE_ON_INQUIRY,
        navigateOnCancel: extraProps.navigateOnCancel,
        productType: extraProps.productType,
        ProductDialogTableTitle: extraProps.ProductDialogTableTitle,
        CheckforRelease: extraProps.CheckforRelease,
        reqPropName: extraProps.reqPropName,
        nextStatus: extraProps.nextStatus,
        note: extraProps.note,
        holdproperty: extraProps.holdproperty,
        RenderedComponent: extraProps.RenderedComponent,
    }

    return (
        <StockDashboardCard
            {...props}
            {...stockProps}
        />
    )
}

export default StockDashboard