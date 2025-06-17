import { PRODUCT_TYPE_FINISHED } from "../../../Helpers/ConstantProperties"
import { NO_DATA, SchemaTypes } from "../../../Helpers/ExtraProperties"
import { serviceHelpers } from "../../../Helpers/ServiceHelpers"
import { GenericFileRead } from "./GenericReader"

const parsePercentage = (value) => {
    if (typeof value === 'string' && value.includes('%')) {
        return parseFloat(value.replace('%', ''));
    }

    return parseFloat(value * 100);
}

export const BulkProductCreation = () => {
    const ignoreColumn = ["SR.NO", "QUATITY"]
    const startHeaderIndex = 0

    const changeTo = {
        "ITEM NAME": "name",
        "HSN CODE": "productHSNcode",
        "UNIT": "unit",
        "ITEM CODE": "productItemcode",
        "SALE RATE/PER NOS": "saleRate",
        "DISCRIPTION": "productdescription",
    }

    const customerDetails = {
        item: {
            displayName: "Product xlsx file",
            name: "product",
            type: SchemaTypes.file,
            required: true
        }
    }

    let currentProducts = [];

    const createProduct = async (khID, product) => {
        var productObject = product //here we are storing the product at new object
        //because javascript take the properties which is not yet added
        //first

        if (
            productObject.TaxType === NO_DATA &&
            productObject.productHSNcode === NO_DATA &&
            productObject.itemCode === NO_DATA &&
            productObject.name === NO_DATA) {
            return ""
        }
        //that is for removing the blank spaces after reading we get
        //we are moving that code at outside because there are lots possiblities where we want the particular
        //properties needs to be present
        //do not check the property which we are assigning if that properties are not present

        product.type = PRODUCT_TYPE_FINISHED;

        if (product["GST RATE"]) {
            product.GSTRate = parsePercentage(product["GST RATE"])
            delete product["GST RATE"]
        }

        product.name = product.name + " -- " + product.productItemcode;

        if (currentProducts.length === 0) {
            currentProducts = await serviceHelpers.getAllProducts(khID);
        }

        if (currentProducts.some((p) => p.productItemcode === product.productItemcode)) {
            console.log("Product already exists: ", product.name);
            return "";
        }

        return await serviceHelpers.createProduct(khID, product);
    }

    return (
        <GenericFileRead
            onSuccess={createProduct}
            changeTo={changeTo}
            propertyListObject={customerDetails}
            ignoreColumn={ignoreColumn}
            startHeaderIndex={startHeaderIndex}
            message={" Creating Products...."}
            title={"Bulk Product Upload"}
        />
    )
}