import React, { useContext } from 'react';
import { serviceHelpers } from '../../Helpers/ServiceHelpers';
import { GST_RATE, HSN_CODE_PROP, INSPECTION_REPORT_GROUP_NAME, PROCESS_GROUP_NAME, productProps, propertyList, QC_LIST_GROUP_NAME, RM_GROUP_NAME, } from '../../Helpers/ExtraProperties';
import { AUTO_GENERATE, INSPECTION_REPORT_LIST, INTERNAL_PROCESS, NUMBERS, PROCESSESS, PRODUCT_STATE, PRODUCT_TYPE_CUSTOM, PRODUCT_TYPE_PROCESS, PRODUCT_TYPE_RAW, PRODUCT_TYPE_SEMIFINISHED, RMLIST, UPDATE_ON_INQUIRY, UPDATE_ON_PRODUCT } from '../../Helpers/ConstantProperties';
import GenericForm from '../GenericComponents/FormComponent/GenericForm';
import { GenericErrorComponent, GenericSuccessComponent } from '../GenericComponents/FormComponent/GenericAlertComponent';
import { GenericVerifyComponent } from '../GenericComponents/VerifyComponent/FirmVerifyComponent';
import { FirmContext } from '../Contexts/FirmContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { InpectionHeading, proceessPostDispatch, ProcessHeading, productConfig, QcHeading, RawHeading, updateProductListObjects, ShowNumber } from '../../Helpers/helpers';
import ProductTable from './ProductTable';
import QcTable from './QcTable';
import InpectionTable from './InpectionTable';
import { OriginContext } from '../Contexts/OriginContext';
import { getRateDetails } from '../Quotation/RateCalculator';
import { v4 as uuidv4 } from 'uuid';
import { getPropList } from './createProductHelper';

const CreateProduct = () => {
    const { currentFirm } = useContext(FirmContext);
    const { limitFunctionality } = useContext(OriginContext);
    const navigate = useNavigate()

    const extraProps = {};

    const location = useLocation();
    const locationProps = location.state.extraProp;

    const inquiry = locationProps?.inquiry;
    const editProduct = location.state?.editProduct || false;

    const productType = location.state?.type;
    const productRoute = location.state?.navigateTo;

    const navigateOut = () => {
        const destination = productRoute;
        const state = productType === PRODUCT_TYPE_SEMIFINISHED ? { state: { item: inquiry } } : {}

        navigate(destination, state);
    }

    const autoPrefix = productConfig[productType].autoPrefix;

    var invalidateQueryKey = UPDATE_ON_PRODUCT;

    if (inquiry
        && (
            productType === PRODUCT_TYPE_CUSTOM ||
            productType === PRODUCT_TYPE_SEMIFINISHED
        )) {

        invalidateQueryKey = UPDATE_ON_INQUIRY;
    }

    const queryFunction = async (state, khID) => {
        delete state.navigateTo;
        delete state.extraProp;

        if (productType === PRODUCT_TYPE_PROCESS) {
            state.saleRate = !state.saleRate ? 0 : state.saleRate;
            state.GSTRate = !state.GSTRate ? 0 : state.GSTRate;
        }

        state.type = productType

        updateProductListObjects(state, RM_GROUP_NAME);
        updateProductListObjects(state, PROCESS_GROUP_NAME);

        if (state.productItemcode.toString().trim().toLowerCase() === AUTO_GENERATE.toLowerCase()) {
            const refId = await serviceHelpers.getSeriesNumber(khID, { prefix: autoPrefix });
            state.productItemcode = refId.id
        }

        if (productType === PRODUCT_TYPE_CUSTOM && inquiry) {
            const productToUpdate = inquiry ? inquiry.products[locationProps?.index] : {}

            productToUpdate.product = state;
            delete productToUpdate.saleRate;

            productToUpdate[RMLIST] = state[RMLIST] || [];
            productToUpdate[PROCESSESS] = state[PROCESSESS] || [];
            productToUpdate[QC_LIST_GROUP_NAME] = state[QC_LIST_GROUP_NAME] || [];
            productToUpdate[INSPECTION_REPORT_LIST] = state[INSPECTION_REPORT_LIST] || [];

            return await serviceHelpers.updateInquiry(khID, inquiry, inquiry.id);
        }

        if (productType === PRODUCT_TYPE_SEMIFINISHED && inquiry) {
            state.id = uuidv4();

            const product = { product: state };

            product[RMLIST] = state[RMLIST] || [];
            product[PROCESSESS] = state[PROCESSESS] || [];
            product[QC_LIST_GROUP_NAME] = state[QC_LIST_GROUP_NAME] || [];
            product[INSPECTION_REPORT_LIST] = state[INSPECTION_REPORT_LIST] || [];

            if (!inquiry.sfg) inquiry.sfg = [];
            inquiry.sfg.push(product);

            await serviceHelpers.createProduct(khID, state);
            return await serviceHelpers.updateInquiry(khID, inquiry, inquiry.id);
        }

        return await serviceHelpers.createProduct(khID, state, editProduct)
    }

    if (currentFirm.gstDropdownList) {
        const obj = productProps.find((element) => element.item.name === GST_RATE);
        obj.item = propertyList.gstDropdown
        obj.item.dropDownList = currentFirm.gstDropdownList;
    }

    var PropsList = getPropList(productType);

    const hidePane = limitFunctionality
        || [PRODUCT_TYPE_PROCESS, PRODUCT_TYPE_RAW].includes(productType)

    if (!hidePane) {
        extraProps.displayPane = true;
        extraProps.paneID = 'createProductPane';
    }

    var currentData = {
        unit: NUMBERS,
        [HSN_CODE_PROP]: currentFirm[HSN_CODE_PROP],

        // gstrate has toString because of dropdown thows error if value is number
        GSTRate: currentFirm.defaultGST?.toString(),
        productItemcode: AUTO_GENERATE
    }

    if (productType === PRODUCT_TYPE_PROCESS) {
        currentData[PRODUCT_STATE] = INTERNAL_PROCESS
    }

    const { formTitle, successMessage, addButtonText } = productConfig[productType];

    const newFormProps = {
        formTitle,
        propertyList: PropsList,
        queryFunction,
        queryKeyValue: invalidateQueryKey,
        handleCancel: navigateOut,
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        addButtonText,
        enableBack: true,
        enableVerify: true,
        VerifyAlertComponent: (data) => {
            let message = undefined;

            let calculatedSalRate = getRateDetails({
                inquiry: { products: [data.data] },
                currentFirm: currentFirm,
                isBOM: true
            });

            const bomSaleRate = calculatedSalRate.totalTaxableAmount;

            if (data.data.saleRate < bomSaleRate) {
                message = `SaleRate Should be ${ShowNumber(bomSaleRate, 2, true)}`
            }

            return <GenericVerifyComponent Body={message} />
        },
        buttonClasses: "",
        currentData: { ...currentData, ...location.state },
        enableClear: true,
        afterDispatch: proceessPostDispatch,
        ...extraProps,
        GroupDetailsComponent: (props) => {

            switch (props.groupName) {
                case PROCESS_GROUP_NAME:
                    return <ProductTable
                        {...props}
                        groupFieldName={PROCESS_GROUP_NAME}
                        headingList={ProcessHeading}
                    />
                case RM_GROUP_NAME:
                    return <ProductTable
                        {...props}
                        groupFieldName={RM_GROUP_NAME}
                        headingList={RawHeading}
                    />
                case QC_LIST_GROUP_NAME:
                    return <QcTable
                        {...props}
                        groupFieldName={QC_LIST_GROUP_NAME}
                        headingList={QcHeading}
                    />
                case INSPECTION_REPORT_GROUP_NAME:
                    return <InpectionTable
                        {...props}
                        groupFieldName={INSPECTION_REPORT_GROUP_NAME}
                        headingList={InpectionHeading}
                    />
                default:
                    return <></>
            }

        }
    }

    return (
        <GenericForm
            {...newFormProps}
        />
    )
}
export default CreateProduct
