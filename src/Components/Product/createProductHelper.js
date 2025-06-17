import { PRODUCT_TYPE_CUSTOM, PRODUCT_TYPE_FINISHED, PRODUCT_TYPE_PROCESS, PRODUCT_TYPE_RAW, PRODUCT_TYPE_SEMIFINISHED } from "../../Helpers/ConstantProperties";
import { INPUT_TYPE_NUM, inspectionPropertyGroup, processPropertyGroup, productProps, productPropsForSFG, propertyList, qcPropertyGroup, rmPropertyGroup } from "../../Helpers/ExtraProperties";

export const getPropList = (productType) => {
    const reqProduct = [
        PRODUCT_TYPE_FINISHED,
        PRODUCT_TYPE_SEMIFINISHED,
        PRODUCT_TYPE_CUSTOM
    ]

    if (reqProduct.includes(productType)) {

        var PropsList = productType === PRODUCT_TYPE_SEMIFINISHED
            ? productPropsForSFG
            : productProps;

        PropsList = [
            ...PropsList,
            { ...rmPropertyGroup, tabId: 1, },
            { ...processPropertyGroup, tabId: 2, },
            { ...inspectionPropertyGroup, tabId: 3 },
            { ...qcPropertyGroup, tabId: 4 }
        ];

        return PropsList;
    }

    if (productType === PRODUCT_TYPE_RAW) {
        return [
            {
                item: { ...propertyList.productItemCode, required: false },
                attributes: {
                    lg: 3
                }
            },
            {
                item: propertyList.productName,
                attributes: {
                    lg: 9
                }
            },
            {
                item: {...propertyList.productHsnCode},
                inputMode: INPUT_TYPE_NUM,
                attributes: {
                    lg: 3
                }
            },
            {
                item: {...propertyList.ProductgstRate},
                inputMode: INPUT_TYPE_NUM,
                attributes: {
                    lg: 3
                }
            },
            {
                item: propertyList.productSaleRate,
                inputMode: INPUT_TYPE_NUM,
                attributes: {
                    lg: 3
                }
            },
            {
                item: propertyList.productUnit,
                attributes: {
                    lg: 3
                }
            },
            {
                item: propertyList.description,
                attributes: {
                    lg: 12
                },
                extraProps: {
                    multiline: true,
                    rows: 3
                }
            }
        ]
    }

    if (productType === PRODUCT_TYPE_PROCESS) {
        return [
            {
                item: { ...propertyList.productItemCode, required: false },
                attributes: {
                    lg: 3
                }
            },
            {
                item: propertyList.productName,
                attributes: {
                    lg: 9
                }
            },
            {
                item: { ...propertyList.productHsnCode, disabled: true },
                inputMode: INPUT_TYPE_NUM,
                attributes: {
                    lg: 3
                }
            },
            {
                item: { ...propertyList.ProductgstRate, disabled: true },
                inputMode: INPUT_TYPE_NUM,
                attributes: {
                    lg: 3
                }
            },
            {
                item: { ...propertyList.productSaleRate, disabled: true },
                inputMode: INPUT_TYPE_NUM,
                attributes: {
                    lg: 3
                }
            },
            {
                item: propertyList.productUnit,
                attributes: {
                    lg: 3
                }
            },
            {
                item: propertyList.description,
                attributes: {
                    lg: 12
                },
                extraProps: {
                    multiline: true,
                    rows: 3
                }
            },
            {
                item: propertyList.productState,
                attributes: {
                    lg: 3
                },
                manageState: true
            }
        ]
    }

    return null;
}