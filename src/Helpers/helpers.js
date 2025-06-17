import parsePhoneNumberFromString, { parsePhoneNumber, isPossiblePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
import { ACTION, ADMIN_USER_LEVEL_ID, ADMIN_USER_LEVEL_NAME, BILLING_ADDRESS, CLOSED, COLOR_TEAL, CONVERTED, DESIGN, DIMENTION, DISPATCH, FIXED_AMOUNT_ID, INQUIRY_PRODUCTS, INQUIRY_STORE_ACCOUNT_ID, INQ_CLOSED, INQ_ONTRACK, INQ_OPEN, INQ_OVERDUE, INQ_REJECTED, INQ_TODAY, INQ_UNASSGNED, INSPECTION_REPORT_LIST, INTERNAL_PROCESS, INW_STK_PREFIX, MODERATOR_LEVEL_NAME, NEW_CUSTOMER, NOT_AVAILABLE, OPEN, PARAMETER, PRIMARY_COLOR, PROCESS, PROCESSESS, PRODUCT_STATE, PRODUCT_TYPE_CUSTOM, PRODUCT_TYPE_FINISHED, PRODUCT_TYPE_PROCESS, PRODUCT_TYPE_RAW, PRODUCT_TYPE_SEMIFINISHED, PROFORMA_INVOICE_ID, PURCHASE_ORDER_NAME, QCNAME, QTY, QUOTATION_PENDING, QUOTATION_READY, QUOTED, RAW_MATERIAL_TITLE, REVISE_QUOTATION, RMLIST, SALES_MANAGER_USER_LEVEL_ID, SALE_RATE_HEAD, SHIPPING_ADDRESS, STATUS_OPTIONS, TOLERANCE, USER_LEVEL_NAME, Unknown, userLevels } from "./ConstantProperties";
import { GST_RATE, HSN_CODE_PROP, INQUIRY_REJECT_TAG, NO_DATA, PO_TAG, QC_LIST_GROUP_NAME, SALE_RATE, SchemaTypes, known_Custom_Types, propertyList } from "./ExtraProperties";
import { useMediaQuery, useTheme } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

export const USER_MUST_BE_PRESENT = "UserMustBePresent";
export const USER_MUST_BE_ABSENT = "UserMustBeAbsent";
export const CONTENT_TYPE = 'Content-Type';

export const FETCHING_ITEMS_LIMIT = 50;
const EMAIN_DOMAIN = "@opankys.com"

export const megabytesToBytes = (megabytes) => {
    return megabytes * 1024 * 1024;
}

export function deepCopyObject(fromObject) {
    return JSON.parse(JSON.stringify(fromObject));
}

export function getEmailfromPhone(phoneno) {
    const phoneNumber = parsePhoneNumber(phoneno)
    return phoneNumber.nationalNumber + EMAIN_DOMAIN;
}

export function getFormattedPhone(phoneno) {
    if (!isPossiblePhoneNumber(phoneno)) return NO_DATA;
    const phoneNumber = parsePhoneNumber(phoneno)
    return phoneNumber.number;
}

export function getInitials(inputString) {
    const words = inputString.split(' ')
    let abbreviation = '';
    for (const word of words) {
        if (word !== "") {
            abbreviation += word[0];
            if (abbreviation.length === 3) break;
        }
    }
    return abbreviation;
}

export const getSaleRate = (product) => {
    if (product.saleRate !== undefined) {
        return product.saleRate;
    }

    return product?.product?.saleRate || 0;
};

export const getBackgroundColor = (userLevel) => {
    switch (userLevel) {
        case ADMIN_USER_LEVEL_NAME:
            return 'lightblue';
        case MODERATOR_LEVEL_NAME:
            return 'lightcoral';
        case USER_LEVEL_NAME:
            return 'Thistle';
        default:
            return 'lightgrey';
    }
};

export const checkProductOrRM = (item) => {
    // This code assumes there are products available
    // As the inq will not be On Boarded without products.

    var allProductsAreKnown = true;

    item.products?.forEach((product) => {
        if (!product.product?.productItemcode) {
            const reqPresent = product.rmlist?.length > 0 || product.processes?.length > 0
            if (!reqPresent) allProductsAreKnown = false
        }
    })

    return !allProductsAreKnown;
}

export const checkRequirements = (item) => {
    // This code assumes there are products available
    // As the inq will not be On Boarded without products.

    var requirementPresent = false;

    item.products?.forEach((product) => {
        const requirements = [...(product.rmlist || []), ...(product.processes || [])];
        if (requirements.length > 0) requirementPresent = true;
    })

    return requirementPresent;
}

export const CATEGORIES = {
    [OPEN]: {
        name: 'New Inquiry',
        color: 'primary.main',
        btnText: 'On Board',
        disableBtn: (item) => !(item.products?.length > 0),
        nextStatus: QUOTATION_PENDING,
        disableQuote: true
    },
    [QUOTATION_PENDING]: {
        name: 'Quotation Needed',
        color: 'secondary.main',
        btnText: 'Generate Quotation',
        disableBtn: checkProductOrRM,
        nextStatus: QUOTATION_READY,
        enableAddReq: true
    },
    [QUOTATION_READY]: {
        name: 'Quotation Ready',
        color: 'warning.main',
        btnText: 'Quotation Sent',
        nextStatus: QUOTED
    },
    [QUOTED]: {
        name: 'Quoted',
        color: 'warning.main',
        btnText: 'Converted',
        nextStatus: CONVERTED
    },
    [CONVERTED]: {
        name: 'Converted',
        color: 'success.main',
        btnText: 'Add Design in Menu',
        disableBtn: (item) => true,
        nextStatus: DESIGN,
        showInOrder: true,
        enableAddReq: true
    },
    [DESIGN]: {
        name: "In Store",
        color: 'warning.main',
        btnText: "Dispatched",
        nextStatus: DISPATCH,
        showInOrder: true,
    },
    [DISPATCH]: {
        name: 'Dispatch',
        color: 'success.main',
        btnText: 'Dispatched',
        nextStatus: CLOSED,
        disableEdit: true,
        showInOrder: true,
    },
    [CLOSED]: {
        name: 'Closed',
        color: 'error.main',
        btnText: 'All Done',
        disableBtn: (item) => true,
        disableEdit: true
    },
    [REVISE_QUOTATION]: {
        name: 'Revise Quotation',
        color: 'warning.main',
        btnText: 'Quotation Ready',
        disableBtn: checkProductOrRM,
        nextStatus: QUOTATION_READY,
        enableAddReq: true
    },
};

export const createGetQuotationId = (startId = 0) => {
    let currentQuotationId = startId;

    return () => {
        currentQuotationId += 1;
        return `Q-${currentQuotationId.toString().padStart(4, '0')}`;
    };
};

export const getInitialInputProps = (props) => {
    var controlProps = {
        required: props.data.item.required,
        placeholder: props.data.item.displayName
    }

    switch (props.data.item.type) {
        case SchemaTypes.String:
            controlProps.type = SchemaTypes.String;
            break;
        case SchemaTypes.Number:
            controlProps.type = SchemaTypes.Number;
            break;
        case SchemaTypes.DATE:
            controlProps.type = SchemaTypes.DATE;
            break;
        case SchemaTypes.radio:
            controlProps.type = SchemaTypes.radio;
            break;
        case SchemaTypes.file:
            controlProps.type = SchemaTypes.file;
            break;
        case SchemaTypes.DROP_DOWN:
            controlProps.type = SchemaTypes.DROP_DOWN;
            break;
        case SchemaTypes.checkbox:
            controlProps.type = SchemaTypes.checkbox;
            break;
        case SchemaTypes.headline:
            controlProps.type = SchemaTypes.headline;
            break;
        case SchemaTypes.IMAGE:
            controlProps.type = SchemaTypes.IMAGE;
            break;
        case SchemaTypes.USER_LEVEL_DROPDOWN:
            controlProps.type = SchemaTypes.USER_LEVEL_DROPDOWN;
            break;
        case SchemaTypes.TextArea:
            controlProps.type = SchemaTypes.TextArea
            break;
        case SchemaTypes.KN_PAN:
        case SchemaTypes.KN_PIN:
        case SchemaTypes.HSNCODE:
        case SchemaTypes.GSTRATE:
        case SchemaTypes.QUANTITY:
        case SchemaTypes.SALERATE:
        case SchemaTypes.KN_GSTIN:
        case SchemaTypes.ALPHA_NUM:
        case SchemaTypes.DESIGNATION:
        case SchemaTypes.CITY:
        case SchemaTypes.ITEMCODE:
        case SchemaTypes.PINCODE:
        case SchemaTypes.URL:
        case SchemaTypes.IFSC_CODE:
            controlProps.pattern = known_Custom_Types[props.data.item.type];
            break;
        default:
            break;
    }

    if (props.currentValue) {
        controlProps.value = props.currentValue
    } else {
        controlProps.value = "";
    }

    if (props.disabled) {
        controlProps.disabled = props.disabled;
    }

    if (props.data.item.maxLength) {
        controlProps.maxLength = props.data.item.maxLength;
    }

    if (props.data.item.min) {
        controlProps.min = props.data.item.min
    }

    if (props.data.item.accept) {
        controlProps.accept = props.data.item.accept
    }
    return controlProps;
}

export const DecodeServerError = (error) => {
    console.log(error);

    var messageRegex = /Message: (.+)/;
    var extractedMessage = null
    try {
        var match = error.match(messageRegex);
        extractedMessage = match ? match[1] : null;
    } catch (e) {
        extractedMessage = "SomeThing Went Wrong !!"
    }
    return extractedMessage;
}

export const createServerError = (message) => {
    return Promise.reject("Server error: 401 Message: " + message);
}

export const createServerErrorMsg = (message) => `Server error: 401 Message: ${message}`

export function ShowNumber(amount, fDigits = 0, isCurrency = false) {
    var formatOptions = {
        minimumFractionDigits: fDigits,
        maximumFractionDigits: fDigits,
    };

    if (isCurrency) {
        formatOptions.style = "currency";
        formatOptions.currency = "INR"
    }

    return new Intl.NumberFormat(
        "en-IN",
        formatOptions).format(Math.round(amount * 100) / 100);
}

export function getRoundUptoTwoPlaces(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function getRoundUptoThreePlaces(num) {
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
}

export const getTotalUnitsForReq = (reqProduct, fgQty) => {
    const req = reqProduct.fgRate ? (reqProduct.fgRate * fgQty) : reqProduct.units
    return parseFloat(req)
}

export const getFgRate = (reqProduct, fgQty) => {
    // This is riskey as ther could be situations where the rate is
    // in multiple digits. But we can argue to change the unit in that
    // case. e.g. If 0.001 LTR of RM is required, it is better to change
    // the unit to ML and set requirement to 10 ml.

    // Decimal point calculations are never precise in computers

    const fgRate = reqProduct.fgRate ? reqProduct.fgRate : (reqProduct.units / fgQty);
    return getRoundUptoTwoPlaces(parseFloat(fgRate));
}

export const SMALL_SCREEN = 'isSmallScreen';
export const MEDIUM_SCREEN = 'isMediumScreen';
export const LARGE_SCREEN = 'isLargeScreen';
export const EXTRA_LARGE_SCREEN = 'isExtraLargeScreen';

export const useScreenSize = () => {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isExtraLargeScreen = useMediaQuery(theme.breakpoints.between('lg', 'xl'));

    if (isSmallScreen) {
        return SMALL_SCREEN;
    } else if (isMediumScreen) {
        return MEDIUM_SCREEN;
    } else if (isLargeScreen) {
        return LARGE_SCREEN;
    } else if (isExtraLargeScreen) {
        return EXTRA_LARGE_SCREEN;
    } else {
        return 'Not Defined';
    }
}
export function getCategoryOptions(categoryObject) {
    return categoryObject.map((category) => ({
        value: category,
        label: category,
    }));
}

export const getLocalDateString = (utcDateString) => {
    const utcDate = new Date(utcDateString);
    return utcDate.toLocaleDateString("en-IN");
}

export const getDateInputValue = (date = new Date()) => {
    return new Date(date).toISOString().substring(0, 10);
}

export const fileMetaDataObject = (tag, ImageData, khID = undefined) => {
    return {
        ImageMetaData: {
            'Content-Type': ImageData.Img.type,
            tag: khID ? tag + khID : tag,
        },
        ImageData: ImageData.Img,
    }
}

export const StoreFileToSession = async (data, SessionId) => {
    var responsedata = await fetch(data.url);
    var FileObject = await responsedata.blob();
    const reader = new FileReader();
    reader.onload = () => {
        const base64Data = reader.result;
        try {
            sessionStorage.setItem(
                SessionId, JSON.stringify({
                    url: base64Data,
                    ContentType: data[CONTENT_TYPE]
                })
            );
        } catch (e) {
            console.log(e);
            //we Ignoring the Error Bacause Capacity of Session is Exceed we
            // session store the File as the tab is open therefore there is no need to
            //stop the execution of application
        }
    };
    reader.readAsDataURL(FileObject);
}

export async function validateImageDimensions(file, width, height) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject('File is not an image');
            return;
        }
        const img = new Image();

        img.onload = function () {
            if (img.naturalWidth === width && img.naturalHeight === height) {
                resolve(true);
            } else {
                resolve(false);
            }
        };

        img.onerror = function () {
            reject('Error loading image');
        };
        img.src = URL.createObjectURL(file);
    });
}

export function getDateDifferance(lastUpdate, date2 = new Date()) {
    const date1 = new Date(lastUpdate);

    const differenceInTime = date2.getTime() - date1.getTime();
    return Math.round(differenceInTime / (1000 * 3600 * 24));
}

export function addDaysToToday(days, today = new Date()) {
    var result = new Date(today.getTime());
    result.setDate(result.getDate() + days);
    return result;
}

export const isOlderByValue = (createdAt = new Date(), value) => {
    const createdAtDate = new Date(createdAt);
    const thresholdDate = new Date(createdAt);
    thresholdDate.setMonth(createdAtDate.getMonth() + value);
    return thresholdDate < new Date();
};

export const getValueInPercentOfTotal = (value, total) => {
    return Math.round(Math.round(100 * value) / total)
}

export function extractNumber(str) {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : NO_DATA;
}

export function getCategoryKeyByName(categoryName) {
    for (const [key, value] of Object.entries(CATEGORIES)) {
        if (value.name === categoryName) {
            return key;
        }
    }
    return null;
}

export const callTo = (phoneNumber) => {
    return window.open(`tel:${phoneNumber}`)
}

export const addContryCode = (code, phoneNumber) => {
    if (phoneNumber?.length <= 2) {
        return phoneNumber;
    }
    return phoneNumber?.startsWith(code) ? phoneNumber : (code + "" + phoneNumber);
}

export function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

//   This function ensures that when data is displayed in rows, any incomplete
//   row is completed with skeletons, and if there are remaining items that
//   don't fill a new row, it adds enough skeletons to fill that row too.

//   For example, if we are displaying data in rows of 4 items each:
//  If we have 18 items, that means we can fill 4 complete rows (4 * 4 = 16)
//  There will be 2 items in the next row.
//  To complete this row, we need 2 skeletons.
//  Additionally, if the requirement is to fill an entire row whenever it is partially filled,
//  then another 4 skeletons might be needed for the next row.

const getSkeletonCount = (count, dataLength = 0) => {
    const mod = dataLength % count;
    return (count - mod) + count
}

export function getDataWithSkeleton(data = [], showSkeleton, count = 1) {
    const returnData = [];
    const SkeletonCount = getSkeletonCount(count, data.length);
    const skeletons = [];

    for (let i = 0; i < SkeletonCount; i++) {
        skeletons.push({ showSkeleton: true });
    }

    if (showSkeleton) {
        returnData.push(skeletons);
    }

    return returnData;
}

const replaceDoubledEntries = (groupArray, payload) => {
    const existingObject = groupArray.find(
        obj => payload.uniqueIdProp(obj) === payload.uniqueIdProp(payload.value)
    );

    existingObject ? Object.assign(existingObject, payload.value) : groupArray.push(payload.value);
}

export const ADD_PROPS_TYPE = "Add_Property";
export const REMOVE_PROPS_TYPE = "Remove_Property";
export const REMOVE_ITEM_FILEDATA = "Remove_Item_FileDatas";
export const REMOVE_PROPS = "Remove_All_Property";
export const ADD_GROUP_PROPS = "Add_Group_Property";
export const REMOVE_GROUP_PROPS = "Remove_Group_Property";
export const UPDATE_GROUP_PROPS_TYPE = "Update_Group_Property";

export const formReducer = (state, action) => {
    var currentState = deepCopyObject(state);

    switch (action.type) {
        case ADD_PROPS_TYPE:
            currentState[action.payload.name] = action.payload.value;
            if (currentState[action.payload.name] === '') delete currentState[action.payload.name];
            break;
        case ADD_GROUP_PROPS:
            if (Object.keys(action.payload.value).length === 0) break;
            if (!currentState[action.payload.name]) {
                currentState[action.payload.name] = [];
            }
            currentState.isGroupEdited = true;
            if (action.payload.uniqueIdProp) {
                replaceDoubledEntries(currentState[action.payload.name], action.payload);
                break;
            }
            currentState[action.payload.name].push(action.payload.value);
            break;
        case REMOVE_GROUP_PROPS:
            currentState.isGroupEdited = true;
            currentState[action.name].splice(action.index, 1);
            break;
        case REMOVE_PROPS_TYPE:
            delete currentState[action.payload];
            break;
        case UPDATE_GROUP_PROPS_TYPE:
            currentState.isGroupEdited = true;
            const currentObject = currentState[action.payload.groupName][action.payload.index];
            currentObject[action.payload.name] = action.payload.value;
            break;
        case REMOVE_PROPS:
            currentState = {}
            break;
        default:

    }
    if (action.afterDispatch) {
        currentState = action.afterDispatch(currentState, action.payload, action.propType, action.propList)
    }

    return currentState;
};

export const FileReducer = (file, action) => {
    var newFiles = [...file];

    switch (action.type) {
        case SchemaTypes.IMAGE:
        case SchemaTypes.file:
            newFiles.push(action.payload.e);
            break;
        case REMOVE_ITEM_FILEDATA:
            let indexToRemove = newFiles.findIndex(element => element.name === action.element);
            if (indexToRemove !== -1) {
                newFiles.splice(indexToRemove, 1);
            }
            break;
        default:
    }
    return newFiles;
}

const updateInqiryObj = (currentProduct, property) => {
    currentProduct[property] = currentProduct.product[property]
}

const getUpdatedProductSchema = (product) => {
    product.product = {
        id: product.product.id,
        name: product.product.name,
        saleRate: product.product.saleRate,
        GSTRate: product.product.GSTRate,
        productHSNcode: product.product.productHSNcode,
        productItemcode: product.product.productItemcode,
        unit: product.product.unit,
        type: product.product.type,
        productState: product.product.productState,
        fgRate: product.product.fgRate
    }
}

export const updateProductListObjects = (state, property) => {
    if (!state[property]) return;
    state[property].map(current => getUpdatedProductSchema(current));
}

export const getInquiryObject = (state) => {
    if (state.CustomerDropDown) {
        delete state.CustomerDropDown
    }

    if (state.vendorDropDown) {
        delete state.vendorDropDown
    }

    if (state.enquirySource?.id) {
        state.sourceOfLead = state.enquirySource.name;
        state.sourceOfLeadId = state.enquirySource.id
        delete state.enquirySource;
    }

    if (state.DiscountSlabDropdown) {
        state.discount = state.DiscountSlabDropdown.discountRate;
        state.discountPlan = state.DiscountSlabDropdown.name;
        state.discountPlanID = state.DiscountSlabDropdown.id;
        delete state.DiscountSlabDropdown
    }

    if (state.products) {
        state.products.map(current => {

            if (current.product[RMLIST]) {
                updateInqiryObj(current, RMLIST);
            }

            if (current.product[PROCESSESS]) {
                updateInqiryObj(current, PROCESSESS);
            }

            if (current.product[QC_LIST_GROUP_NAME]) {
                updateInqiryObj(current, QC_LIST_GROUP_NAME)
            }

            if (current.product[INSPECTION_REPORT_LIST]) {
                updateInqiryObj(current, INSPECTION_REPORT_LIST)
            }

            getUpdatedProductSchema(current);

            // this is the ID for the working data for this inquiry and
            // this product.
            current.workingID = current.workingID ? current.workingID : uuidv4();

            return current;
        })
    }
    delete state.isGroupEdited;

    return state;
}

export const getInquiryCurrentData = (item) => {

    if (item.customerName) {

        if (item.tag === PO_TAG) {
            item.vendorDropDown = getDropdownValue(item.customerName).value;
        }
        else {
            item.CustomerDropDown = getDropdownValue(item.customerName).value;
        }

        delete item.customerId
    }

    if (item.sourceOfLead && item.sourceOfLeadId) {
        item.enquirySource = {
            name: item.sourceOfLead,
            id: item.sourceOfLeadId
        }
        delete item.sourceOfLeadId
        delete item.sourceOfLead;
    }

    if (item.discountPlanID && item.discountPlan) {
        item.DiscountSlabDropdown = {
            name: item.discountPlan,
            discountRate: item.discount,
            id: item.discountPlanID
        }
        delete item.discount
        delete item.discountPlan;
        delete item.discountPlanID;
    }

    return item;
}

export const getDiscountCurrentData = (state) => {
    if (state.discountPlanID && state.discountPlan) {
        state.DiscountSlabDropdown = {
            name: state.discountPlan,
            discountRate: state.discount,
            id: state.discountPlanID
        }
        delete state.discount
        delete state.discountPlan;
        delete state.discountPlanID;
    }
    return state;
}

export const getDropdownValue = (incomingValue, propName) => {

    if (typeof incomingValue === 'string') {
        const res = { name: propName }
        incomingValue?.trim() !== "" ?
            res.value = { name: incomingValue } :
            res.value = null
        return res;
    }

    return { name: propName, value: incomingValue }
}

const updateListValues = (list, property, value) => list.map(element => {
    if (element.item?.name === property) element.item.disabled = value;
    return element
})

export const getBankDetails = (currentFirm) => {
    return [
        { label: "Bank Name", text: currentFirm.bankName },
        { label: "A/c Number", text: currentFirm.accountNo },
        { label: "IFS Code", text: currentFirm.ifscCode },
    ]
};

export const getTermsAndConditions = (item) => {
    const terms = [
        { label: "Payment", text: item.paymentTerms },
        { label: "Transport", text: item.transportTerms },
    ];
    if (item.otherTnC) {
        terms.push({ label: "Others", text: item.otherTnC });
    }

    return terms;
};

export const inwordRMPostDispatch = (currentState, incoming, type, propList) => {
    if (currentState.product) {
        updateListValues(propList, 'units', false)
        updateListValues(propList, 'rate', false);

        if (!currentState.units) currentState.units = 0;
    }
    else if (propList) {
        delete currentState.rate;
        updateListValues(propList, 'units', true)
        updateListValues(propList, 'rate', true)
    }

    return currentState;
}

export const discountPostDispatch = (currentState, incoming, type, propList) => {
    if (currentState.DiscountSlabDropdown && currentState.DiscountSlabDropdown.id === FIXED_AMOUNT_ID) {
        updateListValues(propList, "discountPrice", false)
        delete currentState.discount
    } else if (currentState.DiscountSlabDropdown) {
        updateListValues(propList, "discountPrice", true)
        currentState.discount = currentState.DiscountSlabDropdown.discountRate
        delete currentState.discountPrice
    }
    if (currentState.DiscountSlabDropdown) {
        currentState.discount = currentState.DiscountSlabDropdown.discountRate;
        currentState.discountPlan = currentState.DiscountSlabDropdown.name;
        currentState.discountPlanID = currentState.DiscountSlabDropdown.id;
    }
    return currentState;
}


export const proceessPostDispatch = (currentState, incoming, type, propList) => {

    if (currentState[PRODUCT_STATE] === INTERNAL_PROCESS) {
        updateListValues(propList, HSN_CODE_PROP, true)
        updateListValues(propList, SALE_RATE, true)
        updateListValues(propList, GST_RATE, true)
        return currentState
    }

    updateListValues(propList, HSN_CODE_PROP, false)
    updateListValues(propList, SALE_RATE, false)
    updateListValues(propList, GST_RATE, false)

    updateListValues(propList, 'fgRate', false)

    if (!currentState.fgRate) currentState.fgRate = 1;

    if (currentState.product) {
        currentState.saleRate = currentState.product.saleRate;
    }
    return currentState
}

const updateStateFromParty = (currentState, incoming, propName) => {
    if (incoming.value) {
        if (incoming.value.email) {
            currentState.contactEmail = incoming.value.email;
        }

        currentState.customerName = incoming.value.name;

        if (incoming.value.id) {
            currentState.customerId = incoming.value.id;
        }

        if (incoming.value.billingAddress) {
            currentState.billingAddress = incoming.value.billingAddress;
        }

        if (incoming.value.shippingAddress) {
            currentState.shippingAddress = incoming.value.shippingAddress;
        }

        if (incoming.value.city) {
            currentState.city = incoming.value.city;
        }

        if (incoming.value.contactPerson) {
            currentState.contactPerson = incoming.value.contactPerson;
        }

        if (incoming.value.phoneNumber) {
            currentState.contactPhone = incoming.value.phoneNumber;
        }

        if (incoming.value.gstin) {
            currentState.gstin = incoming.value.gstin;
        }

        if (incoming.value.panNumber) {
            currentState.panNumber = incoming.value.panNumber;
        }

        if (incoming.value.discountPlanID) {
            currentState.DiscountSlabDropdown = {
                discountRate: incoming.value.discountRate,
                name: incoming.value.discountPlan,
                id: incoming.value.discountPlanID
            };
        }

        currentState[propName] = getDropdownValue(incoming.value.name).value;

    } else {
        delete currentState.customerName;
        delete currentState.customerId;
        delete currentState.contactPerson;
        delete currentState.contactEmail;
        delete currentState.contactPhone;
        delete currentState.city;
        delete currentState.gstin;
        delete currentState.panNumber;
        delete currentState.CustomerDropDown;
        delete currentState.vendorDropDown;
    }
}

export const InquiryPostDispatch = (currentState, incoming, type, propList) => {
    switch (type) {
        case SchemaTypes.VENDORDROPDOWN:
            updateStateFromParty(currentState, incoming, "vendorDropDown");
            break;
        case SchemaTypes.CUSTOMERDROPDOWN:
            updateStateFromParty(currentState, incoming, "CustomerDropDown");
            break;
        case SchemaTypes.PRODUCTDROPDOWN:
            if (incoming.value === null) { delete currentState.units }
            break;
        case SchemaTypes.PARTYDROPDOWN:
            if (!incoming.value) break;
            updateStateFromParty(currentState, incoming, "partyDropDown");
            currentState.partyID = incoming.value.id;
            currentState.partyEmail = incoming.value.email;
            currentState.partyPhone = incoming.value.phoneNumber;
            currentState.partyName = incoming.value.name;
            break;
        default:
            break;
    }

    if (currentState.product) {
        updateListValues(propList, 'units', false)
        updateListValues(propList, 'productdescription', false);
        updateListValues(propList, 'saleRate', false);

        if (!currentState.units) currentState.units = 1;
    }
    else if (propList) {
        delete currentState.rate;
        updateListValues(propList, 'units', true)
        updateListValues(propList, 'productdescription', true)
    }

    return currentState;
}

export const getInquiryStatusArray = Object.keys(CATEGORIES).map((status, index) => ({
    id: index + 1,
    status: status,
    showCommentBox: true,
    label: CATEGORIES[status].name,
    message: `State updated to ${CATEGORIES[status].name}`
}));

export const checkValue = (value) => {
    if (value === undefined || value === "" || value === null) {
        return NO_DATA
    }
    return value
}

export const checkValueNumber = (value) => {
    if (value === undefined || value === "" || value === null) {
        return NO_DATA
    }
    return ShowNumber(value, 2)
}

export const getPageCalculation = (selectedFormat, items, page) => {
    const pageSize = selectedFormat.pageSize
        ? selectedFormat.pageSize
        : items.length;

    const cursur = pageSize * page;
    const toCursur = pageSize * (page + 1);

    const itemsToShow = items.slice(cursur, toCursur);
    const isLast = toCursur >= items.length;

    return { itemsToShow, isLast }
}

export const getProductTransactionArray = (
    item,
    resourceID,
    fromAccount,
    toAccount = INQUIRY_STORE_ACCOUNT_ID,
    creditBatches,
    debitBatch) => [
        {
            resourceID: resourceID,
            accountID: fromAccount,
            batches: debitBatch,
            units: -item.units * 1,
        },
        {
            resourceID: resourceID,
            accountID: toAccount,
            batches: creditBatches,
            units: item.units * 1,
        }
    ];


export const getBatch = (object, getDebit = false) => {
    let multiple = getDebit ? -1 : 1;
    return { id: object.id, units: object.units * multiple }
}

export function getProductVoucher(productList = [], inquiryID, id = null, transactions, verified = false) {
    const getTransactions = () => {
        const transactions = []
        productList.forEach(item => {
            let batchObject = { id: inquiryID, units: item.units };
            let debitBatch = [getBatch(batchObject, true)];
            let creditBatch = [batchObject]

            var transactionsArray = getProductTransactionArray(item, item.productID, inquiryID, undefined, creditBatch, debitBatch);

            var fromAccountExtraProp = { ...transactionsArray[0], inquiryID: inquiryID };
            var toAccountExtraProp = {
                ...transactionsArray[1],
                inquiryID: inquiryID,
                productName: item.productName,
                productdescription: item.productdescription,
                saleRate: getSaleRate(item),
                unit: item.unit,
                GSTRate: item.GSTRate,
                productHSNcode: item.productHSNcode,
                productItemcode: item.productItemcode,
            };

            transactions.push(fromAccountExtraProp, toAccountExtraProp)
        })
        return transactions
    }

    return {
        id: id ? id : uuidv4(),
        type: INQUIRY_PRODUCTS,
        date: new Date().valueOf(),
        verified: verified,
        inquiryID: inquiryID,
        transactions: transactions ? transactions : getTransactions()
    }
}

export const getTransactions = (fromAccount, toAccount, resources) => {
    const transactions = [];

    Object.entries(resources).forEach(([resourceID, batches]) => {
        const units = Object.values(batches).reduce((acc, batch) => acc + batch, 0);

        if (units !== 0) {
            // From Transaction
            const fromTransaction = {
                accountID: fromAccount,
                resourceID: resourceID,
                units: -1 * units,
                batches: Object.entries(batches).map(
                    ([batchID, units]) => ({ id: batchID, units: -1 * units }))
            }

            const toAccountObject = {
                accountID: toAccount,
                resourceID: resourceID,
                units: units,
                batches: Object.entries(batches).map(([batchID, units]) => ({ id: batchID, units }))
            }

            transactions.push(fromTransaction, toAccountObject);
        }
    });

    return transactions;
}

export const getVoucher = (
    fromAccount,
    toAccount,
    resources,
    voucherType,
    verified = true) => {

    const voucher = {
        id: uuidv4(),
        type: voucherType,
        date: new Date().valueOf(),
        verified: verified,
        transactions: getTransactions(fromAccount, toAccount, resources)
    }

    return voucher;
}

export const quotationTableValues = [
    {
        content: "Item Code",
        key: "productItemcode",
        noWrap: true,
        sizes: { md: 1 }
    },
    {
        content: "Item Name",
        key: "productName",
        sizes: { md: 1.5 },
        color: { xs: PRIMARY_COLOR, md: 'inherit' }
    },
    {
        content: "HNS/SAC",
        key: "productHSNcode",
        sizes: { md: 1 }
    },
    {
        content: "Qty",
        key: "units",
        sizes: { md: 1 },
    },
    {
        content: "Unit",
        key: "unit",
        sizes: { md: 1 },
    },
    {
        content: "Price/Unit",
        //TODO : Take Product.saleRate
        key: "saleRate",
        sizes: { md: 1.5 },
        format: (value) => ShowNumber(value, 2, true),
        textAlign: 'center'
    },

    {
        content: "Taxable",
        key: "taxableAmount",
        sizes: { md: 1.5 },
        format: (value) => ShowNumber(value, 2, true),
        noWrap: true,
        textAlign: 'center'
    },
    {
        content: "GST (%)",
        key: "gstRate",
        format: (value) => value.igst ? `${value.rate}%` : `${value.rate}% - ${value.rate}%`,
        noWrap: true,
        sizes: { md: 1.5 },
        textAlign: 'center'
    },
    {
        content: "Amount",
        key: "totalAmount",
        format: (value) => ShowNumber(value, 2, true),
        noWrap: true,
        sizes: { md: 2 },
        textAlign: 'center'
    }
];

export const defaultFormatTableValues = [
    {
        content: "SR No",
        key: "srno",
        sizes: { basis: 0.5 }
    },
    {
        content: "Item Code",
        key: "productItemcode",
        sizes: { basis: 2 }
    },
    {
        content: "Item Name",
        key: "name",
        sizes: { basis: 3.5 },
    },
    {
        content: "HSN/SAC",
        key: "productHSNcode",
        sizes: { basis: 1 }
    },
    {
        content: "Qty",
        key: "units",
        sizes: { basis: 1 },
        format: (value) => ShowNumber(value, false),
    },
    {
        content: "Price/Unit",
        key: "saleRate",
        sizes: { basis: 1 },
        format: (value) => ShowNumber(value, 2, false),
        style: { textAlign: 'right', paddingRight: '1mm' }
    },
    {
        content: "Taxable",
        key: "taxableAmount",
        sizes: { basis: 1.5 },
        format: (value) => ShowNumber(value, 2, false),
        style: { textAlign: 'right', paddingRight: '1mm' }
    },
    {
        content: "Amount",
        key: "totalAmount",
        format: (value) => ShowNumber(value, 2, false),
        style: { textAlign: 'right', paddingRight: '1mm' },
        sizes: { basis: 1.5 },
    }
];

export const challanFormatTableValues = [
    {
        content: "SR No.",
        key: "serialNo",
        sizes: { basis: 1 }
    },
    {
        content: "Item Code",
        key: "productItemcode",
        sizes: { basis: 2 }
    },
    {
        content: "Item Name",
        key: "name",
        sizes: { basis: 5 },
    },
    {
        content: "HSN/SAC",
        key: "productHSNcode",
        sizes: { basis: 1 }
    },
    {
        content: "Qty",
        key: "units",
        sizes: { basis: 1.5 },
        format: (value) => ShowNumber(value, false),
    },
    {
        content: "Unit",
        key: "unit",
        sizes: { basis: 1.5 },
    },
];

export const NewquotationTableValues = [
    {
        content: "Item",
        sizes: { basis: 4 },
    },
    {
        content: "HSN Code",
        sizes: { basis: 2 },
    },
    {
        content: "Quantity",
        sizes: { basis: 2 },
    },
    {
        content: "Rate",
        sizes: { basis: 2 },
    },
    {
        content: "Taxable",
        sizes: { basis: 2 },
    },
];

export const BOMTableValues = [
    {
        content: "Product Code",
        sizes: { basis: 1.5 },
    },
    {
        content: "Rm/Process Name",
        sizes: { basis: 4 },
    },
    {
        content: "Quantity",
        sizes: { basis: 1.5 },
    },
    {
        content: "Rate",
        sizes: { basis: 2 },
    },
    {
        content: "Taxable",
        sizes: { basis: 3 },
    },
];


export const quotationRmTableValues = [
    {
        content: "Item Code",
        key: "productItemcode",
        noWrap: true,
        sizes: { md: 1 }
    },
    {
        content: "Rm/Process Code",
        key: "materialItemcode",
        sizes: { md: 2 },
        color: { xs: PRIMARY_COLOR, md: 'inherit' }
    },
    {
        content: "Rm/Process Name",
        key: "name",
        sizes: { md: 2 },
        color: { xs: PRIMARY_COLOR, md: 'inherit' }
    },
    {
        content: "HSN/SAC",
        key: "productHSNcode",
        sizes: { md: 1 }
    },
    {
        content: "Quantity",
        key: "units",
        sizes: { md: 1 }
    },
    {
        content: "Price/Unit",
        key: "saleRate",
        sizes: { md: 1.5 }, format: (value) => `₹${value}`,
        textAlign: 'center'
    },
    {
        content: "Taxable",
        key: "taxableAmount",
        sizes: { md: 1.5 }, format: (value) => `₹${value?.toFixed(2)}`,
        noWrap: true,
        textAlign: 'center'
    },
    {
        content: "Amount",
        key: "totalAmount", format: (value) => `₹${value?.toFixed(2)}`,
        noWrap: true, sizes: { md: 2 },
        textAlign: 'center'
    }
];


export const getProductHeadings = (enableAdd, editableSalerate) => {
    const labelHead = { label: enableAdd ? 'Raw Material' : 'Actions', lg: 2, xs: 12 };

    if (editableSalerate) return [
        { label: 'Product Name', lg: 2, xs: 12 },
        { label: 'Item code', lg: 2, xs: 12 },
        { label: 'Qty', lg: 1, xs: 12 },
        { label: 'Sale Rate', lg: 2, xs: 12 },
        { label: 'Description', lg: 3, xs: 12 },
        labelHead
    ];

    return [
        { label: 'Product Name', lg: 3, xs: 12 },
        { label: 'Item code', lg: 2, xs: 12 },
        { label: 'Qty', lg: 2, xs: 12 },
        { label: 'Description', lg: 3, xs: 12 },
        labelHead
    ];
};

export const getProductHeadingWithoutAction = (editableSalerate) => {
    if (editableSalerate) return [
        { label: 'Product Name', lg: 2, xs: 12 },
        { label: 'Item code', lg: 3, xs: 12 },
        { label: 'Qty', lg: 2, xs: 12 },
        { label: 'Sale Rate', lg: 2, xs: 12 },
        { label: 'Description', lg: 3, xs: 12 },
    ]

    return [
        { label: 'Product Name', lg: 2, xs: 12 },
        { label: 'Item code', lg: 3, xs: 12 },
        { label: 'Qty', lg: 3, xs: 12 },
        { label: 'Description', lg: 4, xs: 12 },
    ]
}

export const qualityCheckHeading = [
    { label: 'Product Code', lg: 2, xs: 12 },
    { label: 'Product Name', lg: 2, xs: 12 },
    { label: 'Qty', lg: 2, xs: 12 },
    { label: 'Status', lg: 2, xs: 12 },
    { label: 'Actions', lg: 4, xs: 12 }
];

export const inValidatePattern = (pattern, helperText, inputValue) => {
    var error = false
    if (pattern) {
        error = !new RegExp(pattern).test(inputValue);
    }

    if (inputValue === "") {
        error = false;
    }

    return error ? helperText || 'Enter valid Input' : '';
}

export const orderDetails = [
    { label: 'Quotation Id', lg: 1.5, md: 1.5, sm: 4, xs: 6 },
    { label: 'PO Number', lg: 1.5, md: 1.5, sm: 4, xs: 6 },
    { label: 'Company Name', lg: 2, md: 2, sm: 6, xs: 12 },
    { label: 'Products', lg: 3, md: 3, sm: 6, xs: 12 },
    { label: 'Expected Delivery', lg: 1.5, md: 1.5, sm: 4, xs: 6 },
    { label: 'Status', lg: 1.5, md: 1.5, sm: 4, xs: 6 },
    { label: 'Actions', lg: 1, md: 1, sm: 4, xs: 6 }
];





export const getRequirementVoucherObject = (RequirementObject, InquiryObject, fromAccountId, toAccountId) => {
    let object = getRequirementObjectPerRawMaterialAndProcess(
        RequirementObject,
        InquiryObject
    )
    let transactions = []
    let RawMaterialAndProcessPerProduct = object.RawMaterialAndProcessPerProduct

    Object.keys(RawMaterialAndProcessPerProduct).forEach(resourceID => {
        let value = RawMaterialAndProcessPerProduct[resourceID]
        transactions.push(
            ...getProductTransactionArray(
                value,
                resourceID,
                fromAccountId,
                toAccountId,
                value.batches,
                value.batches.map(
                    item => getBatch(item, true)
                )
            )
        )
    })

    let voucherObject = getProductVoucher(
        [],
        InquiryObject.id,
        InquiryObject.inquiryRequirementVoucherId,
        transactions,
        true,
    )

    return { voucherObject: voucherObject, batchObjects: object.RawMaterialAndProcessBatches };
}

export const getRequirementObjectPerRawMaterialAndProcess = (RequirementObject, InquiryObject) => {
    let RawMaterialAndProcessBatches = []
    let RawMaterialAndProcessPerProduct = []

    Object.entries(RequirementObject).forEach(([inquiryProductId, array]) => {
        //array => could be the mix of the process and raw material
        array.forEach((element) => {
            if (!RawMaterialAndProcessPerProduct[element.productID]) {
                RawMaterialAndProcessPerProduct[element.productID] = {
                    batches: [{ id: inquiryProductId, units: element.units }],
                    units: element.units,
                    inquiryID: InquiryObject.id
                }
            } else {
                let totalCurrentRawMaterialUnits = RawMaterialAndProcessPerProduct[element.productID].units * 1 + element.units * 1;
                RawMaterialAndProcessPerProduct[element.productID].units = totalCurrentRawMaterialUnits;
                RawMaterialAndProcessPerProduct[element.productID].batches.push({ id: inquiryProductId, units: element.units })
            }
            let rawMaterialId = element.productID;
            element.rawMaterialId = rawMaterialId;
            let currentProductDropDown = element.ProductDropDown;
            delete element.productID;
            delete element.ProductDropDown;

            RawMaterialAndProcessBatches.push({
                ...element,
                type: currentProductDropDown.type,
                name: InquiryObject.customerName ? InquiryObject.customerName : NEW_CUSTOMER,
                inquiryId: InquiryObject.id,
                finishedProductId: inquiryProductId,
            })
        })
    });
    return { RawMaterialAndProcessBatches: RawMaterialAndProcessBatches, RawMaterialAndProcessPerProduct: RawMaterialAndProcessPerProduct }
}

export const PO_Products = [
    { label: "Order No", md: 1 },
    { label: "PO No", md: 1 },
    { label: "Company Name", md: 1.5 },
    { label: "Products", md: 2 },
    { label: "Expected Delivery", md: 1.5 },
    { label: "Process Applied", md: 2.5 },
    { label: "Status", md: 1 },
    { label: "Actions", md: 1.5 },
];

export const STOCK_PRODUCTS = [
    { label: "Requisition No", md: 1.5 },
    { label: "PO No", md: 1 },
    { label: "Company Name", md: 1.5 },
    { label: "Products", md: 2 },
    { label: "Expected Delivery", md: 1.5 },
    { label: "Actions", md: 4 },
];

export const productionTableDetails = [
    {
        label: "Item Code",
        key: "product.productItemcode",
        md: 1.5,
        textAlign: "center",
    },
    {
        label: "Product Name",
        key: "product.name",
        md: 1.5,
        textAlign: "center",
    },
    {
        label: "Quantity",
        key: "units",
        md: 1,
        textAlign: "center",
    },
    {
        label: "Description",
        key: "productdescription",
        md: 3,
        textAlign: "center",
    },
    {
        label: "Process",
        key: "processName",
        md: 1.5,
        textAlign: "center",
    },
    {
        label: "Design Path",
        key: "designPath",
        md: 1,
        textAlign: "center",
    },
    {
        label: "Status",
        key: "status",
        md: 1.5,
        textAlign: "center",
    },
    {
        label: "Action",
        md: 0,
        textAlign: "center",
    },
];

export function differentiateArrays(previousArray, currentArray) {
    const deleted = [];
    const created = [];
    const previousMap = new Map(previousArray.map(item => [item.id, item]));

    currentArray.forEach(element => {
        const previousElement = previousMap.get(element.id);
        const isNewElement = !element.id;

        if (isNewElement ||
            (previousElement && (getSaleRate(previousElement) !== getSaleRate(element) || previousElement.units !== element.units))) {
            created.push(element); // Updated or newly created
        }

        if (previousElement) {
            previousMap.delete(element.id); // Remove the element from the previous map
        }
    });

    previousMap.forEach(deletedItem => deleted.push(deletedItem.id));

    // Check if all previous products have been deleted
    const allDeleted = (deleted.length === previousArray.length) && created.length === 0;
    const hasEdited = created.length !== 0;

    return { deleted, created, allDeleted, hasEdited };
}

export function getUpdatedProp(listObject, updateValue) {
    const newObject = deepCopyObject(listObject);
    return { ...newObject, ...updateValue }
}

export const handlePartyPostDispatch = (currentState, incoming, type, propList) => {
    if (type === SchemaTypes.CUSTOMERDROPDOWN && incoming.value) {
        currentState.name = incoming.value.name;
    }

    if (type === SchemaTypes.DISCOUNT_SLAB_DROPDOWN && incoming.value) {
        currentState.discountRate = incoming.value.discountRate;
        currentState.discountPlan = incoming.value.name;
        currentState.discountPlanID = incoming.value.id;
        currentState.DiscountSlabDropdown = incoming.value;
    }

    if (type === SchemaTypes.checkbox && incoming.name === 'checkSameAddress') {
        if (incoming.value === true) {
            currentState.billingAddress = currentState.shippingAddress;
            updateListValues(propList, BILLING_ADDRESS, true);
        } else {
            updateListValues(propList, BILLING_ADDRESS, false);
        }
    }

    if (type === SchemaTypes.TextArea && incoming.name === SHIPPING_ADDRESS) {
        currentState.shippingAddress = incoming.value;
        if (currentState.checkSameAddress === true) {
            currentState.billingAddress = incoming.value;
        }
    }

    return currentState;
}

export function replaceSpecialChars(inputText) {
    let modifiedText = '';
    for (let i = 0; i < inputText.length; i++) {
        var char = inputText[i];
        if (char === ' ') {
            modifiedText += '__';
        } else if (/^[^A-Za-z0-9]+$/.test(char)) {
            const hexValue = char.charCodeAt(0).toString(16);
            modifiedText += '_' + hexValue + '_';
        } else {
            modifiedText += char;
        }
    }
    return modifiedText;
}


export const groupMaterial = (data) => {
    let groups = {}
    for (let i = 0; i < data.length; i++) {
        let element = data[i]
        if (element?.ProductDropDown?.type) {
            if (!groups[replaceSpecialChars(element?.ProductDropDown?.type)]) {
                groups[replaceSpecialChars(element.ProductDropDown.type)] = []
            }
            groups[replaceSpecialChars(element?.ProductDropDown?.type)].push(element);
        }
    }
    return groups;
}

export function updateArrays(previous, current) {
    let result = previous;
    if (current.length > 0) {
        let rawTypeElement = [];
        let processTypeElement = []

        previous.forEach(element => {
            if (element.ProductDropDown.type === PRODUCT_TYPE_RAW) {
                rawTypeElement.push(element)
            }
            if (element.ProductDropDown.type === PRODUCT_TYPE_PROCESS) {
                processTypeElement.push(element)
            }
        })
        let typeOfCurrent = current[0].ProductDropDown.type;
        if (typeOfCurrent === PRODUCT_TYPE_PROCESS) {
            result = [...rawTypeElement, ...current];
        } else {
            result = [...processTypeElement, ...current];
        }
    }
    return result;
}

export function getProductFiltered(batches) {
    let returnObject = {}
    let previousBatches = [];
    for (let i = 0; i < batches.length; i++) {
        let rawMaterial = batches[i];

        if (rawMaterial.type !== PRODUCT_TYPE_FINISHED && rawMaterial.finishedProductId) {
            if (!returnObject[rawMaterial.finishedProductId]) returnObject[rawMaterial.finishedProductId] = [];
            returnObject[rawMaterial.finishedProductId].push({
                productName: rawMaterial.productName,
                units: Math.abs(rawMaterial.units),
                saleRate: getSaleRate(rawMaterial),
                unit: rawMaterial.unit,
                GSTRate: rawMaterial.GSTRate,
                productHSNcode: rawMaterial.productHSNcode,
                productItemcode: rawMaterial.productItemcode,
                productID: rawMaterial.rawMaterialId,
                productdescription: rawMaterial?.productdescription,
                id: rawMaterial.id,
                ProductDropDown: {
                    type: rawMaterial.type
                }
                //that is batchid this is taken for checking that the batch is already exist or not
            })
            previousBatches.push(rawMaterial);
        }
    }
    return { returnObject: returnObject, previousBatches: previousBatches };

}

const getBalanceDifference = (e) => e.units - e.balance

export const getRequirementArray = (item, productType) => {
    let array = []
    if (productType === PRODUCT_TYPE_RAW) {
        array = item[RMLIST] ? item[RMLIST] : []
    }

    if (productType === PRODUCT_TYPE_PROCESS) {
        array = item[PROCESSESS] ? item[PROCESSESS] : []
        array?.sort((a, b) => {
            let aDifference = getBalanceDifference(a);
            let bDifference = getBalanceDifference(b);
            if (aDifference === 0 && bDifference !== 0) {
                return 1;  // Move elements with difference equal to 0 to the bottom
            }
            if (aDifference !== 0 && bDifference === 0) {
                return -1; // Keep non-zero elements at the top
            }
            return 0; // If both are non-zero or both are zero, keep their order unchanged
        });
    }
    return array
}

export const getStockValue = (header, element, available, key) => {
    let returnValue = ""

    switch (header.label) {
        case "Raw Material":
        case "Process":
            returnValue = element.product.name;
            break;
        case "Price/Unit":
            returnValue = ShowNumber(getSaleRate(element.product), 2, true);
            break;
        case "Released Stock":
            let value = available[key] ? Math.abs(available[key]) : undefined
            returnValue = checkValue(value)
            break;
        case "Req. Quantity":
            returnValue = element.units - (available[key] || 0);
            break;
        default:
            break;
    }
    return returnValue;
}


export const comparePath = (currentUrl, compareUrl) => {
    if (!currentUrl) return false
    return currentUrl.toLowerCase() === compareUrl.toLowerCase()
}

export const getProductionValue = (header, element, available, key) => {
    let returnValue = ""
    switch (header.label) {
        case "Process":
            returnValue = element.product.name;
            break;
        case "Price/Unit":
            returnValue = ShowNumber(getSaleRate(element.product), 2, true);
            break;
        case "Req. Quantity":
            returnValue = element.units;
            break;
        default:
            break;
    }
    return returnValue;
}

const calculateRmThroughFinishedGood = (rawMaterial, product) => {
    if (!product.completedFinishedGoods) return 0
    return (rawMaterial.units / product.units) * (product.completedFinishedGoods)
}

export const calculateFinishedGoodFromRM = (productTotalUnits, rmBalance, rmUnits) => {
    return Math.round((rmBalance * productTotalUnits) / rmUnits)
}

export const returnUniqueResource = (productType, products, partialCheck = true) => {
    let obj = {}
    let passToNextStep = false

    let totalDifference = 1
    for (let j = 0; j < products.length; j++) {
        let product = products[j];
        let productID = product.product.id;
        let array = product[productType];
        if (!hasRawMaterial(product, PROCESSESS)) continue;// that is for combination of the finished Good and
        // product dont has the raw mateiral or process vice versa
        for (let i = 0; i < array?.length; i++) {
            let element = array[i]
            let difference = element.units - element.balance;

            if (product.completedFinishedGoods) passToNextStep = true

            let calculatedRawMaterial = calculateRmThroughFinishedGood(element, product)

            if (!partialCheck) {
                totalDifference = 0
                calculatedRawMaterial = difference;
            }

            if (!obj[element.product.id]) {
                if (calculatedRawMaterial > 0) {
                    obj[element.product.id] = {
                        units: calculatedRawMaterial,
                        batches: [{ id: productID, units: calculatedRawMaterial }]
                    }
                }
            } else {
                if (calculatedRawMaterial > 0) {
                    obj[element.product.id].units += (calculatedRawMaterial);
                    obj[element.product.id].batches.push({ id: productID, units: calculatedRawMaterial })
                }
            }
        }
    }
    return { obj: obj, totalDifference: passToNextStep ? 0 : totalDifference };
}

export const returnUniqueResourceProcess = (productType, products) => {
    let obj = {}
    let passToNextStep = false

    products.map(product => {
        let productID = product.product.id;
        let array = product[productType];
        if (product.completedFinishedGoods) passToNextStep = true
        for (let i = 0; i < array?.length; i++) {
            let element = array[i]
            let calculatedProcess = calculateRmThroughFinishedGood(element, product)

            if (!obj[element.product.id]) {
                if (calculatedProcess > 0) {
                    obj[element.product.id] = {
                        units: calculatedProcess * 1,
                        batches: [{ id: productID, units: calculatedProcess * 1 }]
                    }
                }
            } else {
                if (calculatedProcess > 0) {
                    obj[element.product.id].units += (calculatedProcess * 1);
                    obj[element.product.id].batches.push({ id: productID, units: calculatedProcess * 1 })
                }
            }
        }
        return product;
    })

    return { obj: obj, totalDifference: passToNextStep ? 0 : 1 };
}


export const getProductIDResourceID = (productID, resourceID) => {
    return productID + "" + resourceID;
}

export const CheckBalanceToInquiry = (array, balanceObject, productID) => {
    let checkNegativeBalance = false;
    array?.forEach(async (element) => {
        element.balance = balanceObject[getProductIDResourceID(productID, element.product.id)] || 0
        let difference = element.units * 1 - element.balance * 1;
        if (!checkNegativeBalance && difference < 0) {
            checkNegativeBalance = true;
        }
    })
    return checkNegativeBalance;
}

export const addBalancePerInquiryProduct = (currentInquiry, balanceObject, productType) => {
    currentInquiry.checkRmHold = false;
    currentInquiry.checkProcessHold = false;

    currentInquiry?.products?.forEach((product) => {
        let checkRmHold = CheckBalanceToInquiry(product[RMLIST], balanceObject, product.product.id)
        let checkProcessHold = CheckBalanceToInquiry(product[PROCESSESS], balanceObject, product.product.id)
        if (productType === PRODUCT_TYPE_FINISHED) {
            product.balance = balanceObject[getProductIDResourceID(currentInquiry.id, product.product.id)] || 0
        }
        if (!currentInquiry.checkRmHold) {
            currentInquiry.checkRmHold = checkRmHold;
        }
        if (!currentInquiry.checkProcessHold) {
            currentInquiry.checkProcessHold = checkProcessHold;
        }

    })
    return currentInquiry;
}

export const checkAdmin = (authAccessLevels = []) => {
    return authAccessLevels.some(item => item.id === ADMIN_USER_LEVEL_ID);
}

export const canEditSaleRate = (currentFirm) => {
    return checkAdmin(currentFirm.currentAccess) || currentFirm.editSaleRate;
}

export const checkAccessLevel = (authAccessLevels = [], levels = []) => {
    return authAccessLevels.some(item => levels.includes(item.id));
}

const getRequirementBalance = (rm) => rm.units - (rm.balance || 0)

const getStoreBalance = (object, id) => object[id] ? object[id] : 0;

export const CheckforRelease = (item, storeBalanceObject, productType) => {
    let result = {
        checkforZero: false,
        checkForEmptyStore: false
    }

    let property = productType === PRODUCT_TYPE_PROCESS ? PROCESSESS : RMLIST;

    for (let i = 0; i < item?.products?.length; i++) {
        let element = item.products[i]

        for (let j = 0; j < element[property]?.length; j++) {

            let rm = element[property][j]

            let requiredQuantity = getRequirementBalance(rm)
            if (!result.checkforZero && requiredQuantity > 0) {
                result.checkforZero = true;
            }

            let storeQuantity = getStoreBalance(storeBalanceObject, rm?.product?.id)
            if (!result.checkForEmptyStore && requiredQuantity > storeQuantity) {
                result.checkForEmptyStore = true;
            }
        }
    }
    return result;
}

export const defaultFilter = (data, uid, accessLevel = []) => {
    if (checkAdmin(accessLevel)) return data;

    if (checkAccessLevel(accessLevel, [SALES_MANAGER_USER_LEVEL_ID])) return data.filter(item => item.assignee?.id === uid);

    if (!checkAccessLevel(accessLevel, userLevels.map(level => level.id))) return [];

    return data.filter(item => item.assignee);
}

export const checkInquiryStatusAndProductType = (inquiry) => {
    let hasCustomProduct = false;

    const isPendingOrReviseQuotation =
        inquiry.status === QUOTATION_PENDING || inquiry.status === REVISE_QUOTATION;

    for (let i = 0; i < inquiry.products.length; i++) {
        let product = inquiry.products[i];

        if (product.product.type === PRODUCT_TYPE_CUSTOM) {
            hasCustomProduct = true;
            break;
        }
    }

    return {
        hasCustomProduct,
        isPendingOrReviseQuotation
    };
};

export const InqFilterForManageRM = (inquiries) => {
    return inquiries.filter((inq) => {
        //if the inquiries contiain at least one custom product then bellow condition will be true
        //but if it does not have the custom product then there is not any point of showing that
        //inquiry in that state
        const { hasCustomProduct, isPendingOrReviseQuotation } = checkInquiryStatusAndProductType(inq)
        return isPendingOrReviseQuotation && hasCustomProduct
    })
}

export const InqFilterForQuotation = (inquiries) =>
    inquiries.filter((inq) => {
        // we have to show the inquiries which has only the finished good product
        const { hasCustomProduct, isPendingOrReviseQuotation } = checkInquiryStatusAndProductType(inq)
        return (inq.status === QUOTATION_READY || inq.status === QUOTED) || (isPendingOrReviseQuotation && !hasCustomProduct)
    }
    )

export const InqFilterForOrder = (inquiries) =>
    inquiries.filter((inq) => CATEGORIES[inq.status].showInOrder === true)

export const disableAddReq = (item) => {
    if (!CATEGORIES[item.status]?.enableAddReq) return true;
    if (!item.products) return true;
    if (item.products.length === 0) return true;
    const details = checkInquiryStatusAndProductType(item)
    return !details.hasCustomProduct;
}

export const disableQuote = (item) => {
    const expectedStatus = [QUOTATION_READY, QUOTED, REVISE_QUOTATION, QUOTATION_PENDING]
    if (!expectedStatus.includes(item.status)) return true;
    return checkProductOrRM(item);
}

export const disableForRevise = (item) => {
    const expectedStatus = [QUOTED]
    if (!expectedStatus.includes(item.status)) return true;
    const details = checkInquiryStatusAndProductType(item)
    return !details.hasCustomProduct;
}

export const disableInvoice = (item) => {
    const expectedStatus = [DISPATCH]
    if (!expectedStatus.includes(item.status)) return true;
    return checkProductOrRM(item);
}

export const disableBOM = (item) => {
    const expectedStatus = [QUOTATION_READY, QUOTED, REVISE_QUOTATION, QUOTATION_PENDING]
    if (!expectedStatus.includes(item.status)) return true;
    if (!item.quotationId) return true;
    return !checkRequirements(item);
}

export const updateProductsWithRates = (products, rawMaterials) => {
    const totalRate = rawMaterials.reduce((sum, material) => {
        const units = material.units || 1;
        const rate = material.rate || 0;
        return sum + (units * rate);
    }, 0);

    return products.map(product => {
        const hasSaleRate = product.product?.saleRate !== undefined;
        const hasGSTRate = product.product?.GSTRate !== undefined;

        if (hasSaleRate) {
            return product;
        }

        product.product.saleRate = totalRate / (product.units || 1);
        product.product.GSTRate = hasGSTRate ? product.product.GSTRate : 18;

        return product;
    });
};

export const productConfig = {
    [PRODUCT_TYPE_RAW]: {
        heading: "Manage Material",
        subText: "Material",
        formTitle: "Add Material",
        successMessage: "Material Added Successfully",
        addButtonText: "Add Material",
        displayName: "Material Name",
        required: false,
        autoPrefix: "RM"
    },
    [PRODUCT_TYPE_PROCESS]: {
        heading: "Manage Process",
        subText: "Process",
        formTitle: "Add Process",
        successMessage: "Process Added Successfully",
        addButtonText: "Add Process",
        displayName: "Process Name",
        required: false,
        autoPrefix: "PROC"
    },
    [PRODUCT_TYPE_FINISHED]: {
        heading: "Manage Product",
        subText: "Product",
        formTitle: "Add Product",
        successMessage: "Product Added Successfully",
        addButtonText: "Add Product",
        displayName: "Product Name",
        required: true,
        autoPrefix: "FG"
    },
    [PRODUCT_TYPE_SEMIFINISHED]: {
        heading: "Manage SFG Product",
        subText: "SF Product",
        formTitle: "Add SF Product",
        successMessage: "Product Added Successfully",
        addButtonText: "Add SF Product",
        displayName: "Product Name",
        required: true,
        autoPrefix: "SFG"
    },
    [PRODUCT_TYPE_CUSTOM]: {
        heading: "Manage Custom Product",
        subText: "Custom Product",
        formTitle: "Update Custom Product",
        successMessage: "Product Saved Successfully",
        addButtonText: "Save Product",
        required: true,
        autoPrefix: "CUST"
    }
};


export const getResourceObject = (balance) => {
    let balanceObject = {}
    for (let i = 0; i < balance?.length; i++) {
        let element = balance[i];
        balanceObject[element.resource.id] = element.units;
    }
    return balanceObject;
}

export const checkValidPhoneNumber = (data) => {
    let value = data.getAttribute('value');
    let phoneObj = parsePhoneNumberFromString(value)
    return phoneObj ? isValidPhoneNumber(value, phoneObj.countryCallingCode) : false;
}

export const callBackToAddproperty = (data) => {
    let type = data.getAttribute('type');
    try {
        switch (type) {
            case SchemaTypes.TEL:
                return checkValidPhoneNumber(data)
            default:
                return data.checkValidity();
        }
    } catch (e) {
        return false
        // that is for if the we incounter any crash that time we have to make the validation failed by
        //by returning the false
    }
}

export const checkValidity = (document, constrain) => {
    const requiredElement = document.querySelectorAll(constrain);
    let isValid = true;
    requiredElement.forEach((element) => {
        let everyThingOk = callBackToAddproperty(element)
        if (everyThingOk) {
            element.classList.add("is-valid");
            element.classList.remove('is-invalid');
        } else {
            if (isValid) isValid = false
            element.classList.add("is-invalid");
            element.classList.remove('is-valid');

        }
    });
    return isValid;
}

export const numberToWords = (num) => {
    const a = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
        'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const b = [
        '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];
    const c = ['', 'Thousand', 'Lakh', 'Crore'];

    const convertWholePart = (num) => {
        if (num === 0) return 'Zero';
        let words = [];

        const getBelowHundred = (n) => {
            return n < 20
                ? a[n]
                : b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
        };

        const getWords = (n, index) => {
            let str = '';
            if (n > 99) {
                str += a[Math.floor(n / 100)] + ' Hundred';
                n %= 100;
                if (n > 0) str += ' and ';
            }
            if (n > 0) {
                str += getBelowHundred(n);
            }
            return str ? str + (index > 0 ? ' ' + c[index] : '') : '';
        };

        if (num >= 10000000) {
            words.push(getWords(Math.floor(num / 10000000), 3));
            num %= 10000000;
        }
        if (num >= 100000) {
            words.push(getWords(Math.floor(num / 100000), 2));
            num %= 100000;
        }
        if (num >= 1000) {
            words.push(getWords(Math.floor(num / 1000), 1));
            num %= 1000;
        }
        if (num > 0) {
            words.push(getWords(num, 0));
        }

        return words.join(' ').trim();
    };

    const wholePartInWords = convertWholePart(parseInt(num)) + ' Rupees only';

    return wholePartInWords;
};


export const isIGST = (firm, party) => {
    if (!firm.gstin) return false;
    if (!party.gstin) return false;

    const firmGST = firm.gstin?.substring(0, 2);
    const partyGST = party.gstin?.substring(0, 2);

    return firmGST !== partyGST
}

export const getStockTable = (enableAction = false) => {
    let result = [
        { label: 'Raw Material', lg: 4, xs: 12 },
        { label: 'Released Stock', lg: 2, xs: 12 },
        { label: 'Req. Quantity', lg: 2, xs: 12 },
    ]
    if (enableAction) result.push({ label: 'Actions', lg: 2, xs: 12 })
    return result;
}

const disableProperties = (result, propertyKeys) => {
    propertyKeys.forEach((key, index) => {
        result[index + 2].item = getUpdatedProp(propertyList[key], { disabled: true });
    });
};

export const updatePropertyListProduct = (array, productType) => {
    let result = array;

    if (productType === PRODUCT_TYPE_PROCESS || PRODUCT_TYPE_SEMIFINISHED) {
        disableProperties(result, ['productHsnCode', 'ProductgstRate']);

        result.splice(result.length - 1, 0, {
            item: propertyList.productState,
            attributes: {
                lg: 3
            },
            manageState: true
        });
        return result;
    }
    return result;
}

export const sortByObjectKey = (item, data) => {
    return Object.keys(item)
        .sort((a, b) => a - b)
        .reduce((acc, key) => {
            if (data.batches[key].units <= 0) return {};
            acc[key] = data.batches[key];
            return acc;
        }, {});
}

export function getDistibutedBatches(required, storeBalance) {

    const result = { ...required };

    // store balane has the ramaining balance for each rawmaterial
    //i.e. how much bach can provide from itself
    storeBalance.forEach(item => {

        //each item is a rawmaterial...
        //sorted by date so we can achive FIFO.
        const sortedBatches = sortByObjectKey(item.batches, item);

        const debit = [];
        let requiredUnits = result[item.resourceID]?.units || 0;
        //total required Units for current materials

        if (result[item.resourceID]) {
            Object.entries(sortedBatches).forEach(([id, units]) => {

                //remaining units for bach in store
                let remainingDebit = units;

                result[item.resourceID].batches.forEach(batch => {

                    //batch.units are required units for batch
                    if (remainingDebit > 0 && batch.units > 0 && requiredUnits > 0) {

                        //debitedUnits units to be debit
                        const debitedUnits = Math.min(batch.units, remainingDebit, requiredUnits);
                        debit.push({ id: id, units: debitedUnits });

                        remainingDebit -= debitedUnits;
                        requiredUnits -= debitedUnits;
                    }
                });
            });
        }
        result[item.resourceID].debit = debit;
    });

    return result;
}

export function openGmail(recipient, subject, body) {
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
}

export const getCommentForCustomer = (id, days) => `followUp is Updated for Customer ${id} for ${days} days`

export const saveHistory = (history, message, severity) => {
    return [
        ...history,
        {
            message,
            severity,
            id: Date.now(),
        },
    ];
};

export const createUPILink = ({ upiID, accountName, note, amount }) => {

    var upi = {
        pa: upiID,
        cu: "INR"
    }

    if (amount) upi.am = amount;
    if (note) upi.tn = note;
    if (accountName) upi.pn = accountName;

    const upiLink = new URLSearchParams(upi).toString();

    return `upi://pay?${upiLink}`;
}

export const checkIfPresent = (data, searchString, getSearchableValue) => {
    var valueToSearchIn = getSearchableValue(data).toLowerCase();
    var valueToSearch = searchString.toLowerCase();

    return valueToSearchIn.includes(valueToSearch);
}

export const getCheckboxOptions = () => {
    return [
        { label: 'After Tagging', value: 'qualityA' },
        { label: 'After Fullfill Welding', value: 'qualityB' },
        { label: 'Full Assembly Before Powder Coating', value: 'qualityC' },
        { label: 'Full Assembly After Powder Coating', value: 'qualityD' },
    ];
};

export const RawHeading = [
    { label: RAW_MATERIAL_TITLE, lg: 3, xs: 12 },
    { label: SALE_RATE_HEAD, lg: 3, xs: 12 },
    { label: QTY, lg: 3, xs: 12 },
    { label: ACTION, lg: 3, xs: 12 }

]
export const ProcessHeading = [
    { label: PROCESS, lg: 3, xs: 12 },
    { label: SALE_RATE_HEAD, lg: 3, xs: 12 },
    { label: QTY, lg: 3, xs: 12 },
    { label: ACTION, lg: 3, xs: 12 }
]
export const QcHeading = [
    { label: QCNAME, lg: 4, xs: 12 },
    { label: DIMENTION, lg: 4, xs: 12 },
    { label: ACTION, lg: 4, xs: 12 }
]

export const InpectionHeading = [
    { label: PARAMETER, lg: 3, xs: 12 },
    { label: DIMENTION, lg: 3, xs: 12 },
    { label: TOLERANCE, lg: 3, xs: 12 },
    { label: ACTION, lg: 3, xs: 12 }
]

export const InpectionReportTableHeading = [
    { label: 'Parameter', lg: 1, md: 4 },
    { label: 'Dimension', lg: 1, md: 4 },
    { label: 'Tolerance', lg: 1, md: 4 },
];

export const checkInquiryHasProcesses = (inquiry) => {
    const hasProcesses = inquiry.products?.some((product) => {
        return product.processes?.length > 0;
    });

    return Boolean(hasProcesses);
};
export const customSaleRate = (products) => {
    if (!Array.isArray(products)) return;

    const getTotalTaxableAmount = (itemsArray) => {
        return itemsArray.reduce((sum, item) => {
            const saleRate = getSaleRate(item) || 0;
            const units = item.units || 0;
            return sum + (saleRate * units);
        }, 0);
    };
    //check if custom product has type
    products.forEach((productItem) => {
        const { product, processes, rmlist } = productItem;

        if (product && !product.type) {
            const processTaxableAmount = getTotalTaxableAmount(processes || []);
            const rawMaterialTaxableAmount = getTotalTaxableAmount(rmlist || []);

            productItem.saleRate = processTaxableAmount + rawMaterialTaxableAmount;
        }
    });
};

export const hasRawMaterial = (item, property = RMLIST) => item[property] && item[property].length !== 0;

export const defaultGroupByonCall = (data, currentDate) => {
    var group = Object.groupBy(data, ({ followUpDate, status, assignee, tag }) => {
        var daysToFollowUp = getDateDifferance(followUpDate, currentDate);

        if (!followUpDate) return Unknown;
        if (tag === INQUIRY_REJECT_TAG) return INQ_REJECTED;
        if (tag === PO_TAG) return PURCHASE_ORDER_NAME;
        if (!assignee) return INQ_UNASSGNED;

        if (daysToFollowUp > 0) return INQ_OVERDUE;
        if (daysToFollowUp === 0) return INQ_TODAY;
        if (status === OPEN) return INQ_OPEN;

        return INQ_ONTRACK;
    })
    const unknownGroup = group[Unknown] ? group[Unknown].slice(0, 10) : [];
    group[Unknown] = unknownGroup;
    return group;
}

export const getGroupedLeads = (leads, currentDate) => {

    leads = defaultGroupByonCall(leads, currentDate);

    const statusCard = [
        {
            name: Unknown,
            tagColor: STATUS_OPTIONS[Unknown],
            data: leads[Unknown],
        },
        {
            name: INQ_UNASSGNED,
            tagColor: STATUS_OPTIONS[INQ_UNASSGNED],
            data: leads[INQ_UNASSGNED],
        },
        {
            name: INQ_OVERDUE,
            tagColor: STATUS_OPTIONS[INQ_OVERDUE],
            data: leads[INQ_OVERDUE],
        },
        {
            name: INQ_TODAY,
            tagColor: STATUS_OPTIONS[INQ_TODAY],
            data: leads[INQ_TODAY],
        },
        {
            name: INQ_OPEN,
            tagColor: STATUS_OPTIONS[INQ_OPEN],
            data: leads[INQ_OPEN],
        },
        {
            name: INQ_ONTRACK,
            tagColor: STATUS_OPTIONS[INQ_ONTRACK],
            data: leads[INQ_ONTRACK],
        },
        {
            name: INQ_CLOSED,
            tagColor: STATUS_OPTIONS[INQ_CLOSED],
            data: leads[INQ_CLOSED],
        },
        {
            name: INQ_REJECTED,
            tagColor: STATUS_OPTIONS[INQ_REJECTED],
            data: leads[INQ_REJECTED],
        },
        {
            name: PURCHASE_ORDER_NAME,
            tagColor: COLOR_TEAL,
            data: leads[PURCHASE_ORDER_NAME],
        }
    ]

    return statusCard;

}

export const filterStatusAsPerInquiry = (array, inquiry) => {
    let result = [];
    if (inquiry.customerId) return array;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.status === CONVERTED) return result;
        result.push(element)
    }
    return array
}

export const formatDateTime = (date) => {
    const formattedDate = new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(date);

    return { formattedDate, formattedTime };
};

export const AssignGoodsHeading = [
    { label: 'Product Name', lg: 2, xs: 12 },
    { label: 'Req. Quantity:', lg: 2, xs: 12 },
    { label: 'Released Quantity:', lg: 2, xs: 12 },
    { label: 'Remaining Quantity', lg: 2, xs: 12 },
    { label: 'Description', lg: 4, xs: 12 },
]

export const smallScreenTotalsArray = (totalQuantity, totalTaxableAmount, totalTax, totalAmountAfterTax) => [
    { label: 'Total Quantity', value: totalQuantity },
    { label: 'Total Taxable Amount', value: ShowNumber(totalTaxableAmount, 2, true) },
    { label: 'Total Tax', value: ShowNumber(totalTax, 2, true) },
    { label: 'Total Amount After Tax', value: ShowNumber(totalAmountAfterTax, 2, true) }
];

export const quotationDefaultArray = ({ totalQuantity, totalTaxableAmount, totalTax, totalAmountAfterTax, commonFontWeight }) => {
    return [
        { xs: 2, md: 1, content: '' },
        { xs: 2, md: 1.5, content: '' },
        { xs: 2, md: 1, content: 'Total', fontWeight: commonFontWeight },
        { xs: 4, md: 1, content: `${totalQuantity}`, fontWeight: commonFontWeight },
        { xs: 2, md: 1, content: '' },
        { xs: 4, md: 1.5, content: '' },
        { xs: 4, md: 1.5, content: ShowNumber(totalTaxableAmount, 2, true), fontWeight: commonFontWeight, textAlign: 'center' },
        { xs: 2, md: 1.5, content: ShowNumber(totalTax, 2, true), fontWeight: commonFontWeight, textAlign: 'center' },
        { xs: 4, md: 1.5, content: ShowNumber(totalAmountAfterTax, 2, true), fontWeight: commonFontWeight, textAlign: 'right' },
    ];
};

export const bomDefaultArray = ({ totalQuantity, totalTaxableAmount, totalAmountAfterTax, commonFontWeight }) => {
    return [
        { xs: 2, md: 1, content: '' },
        { xs: 2, md: 2, content: '' },
        { xs: 4, md: 2, content: '' },
        { xs: 2, md: 1, content: 'Total', fontWeight: commonFontWeight },
        { xs: 2, md: 1, content: `${totalQuantity}`, fontWeight: commonFontWeight },
        { xs: 4, md: 1.5, content: '' },
        { xs: 4, md: 1.5, content: ShowNumber(totalTaxableAmount, 2, true), fontWeight: commonFontWeight, textAlign: 'center' },
        { xs: 4, md: 2, content: ShowNumber(totalAmountAfterTax, 2, true), fontWeight: commonFontWeight, textAlign: 'center' }
    ];
};

export const quotationNewArray = ({ totalQuantity, totalTaxableAmount, commonFontWeight }) => {
    return [
        { xs: 2, md: 1, content: '' },
        { xs: 2, md: 2, content: 'Total', fontWeight: commonFontWeight },
        { xs: 2, md: 0.5, content: '' },
        { xs: 4, md: 1, content: '' },
        { xs: 2, md: 1, content: `${totalQuantity}`, fontWeight: commonFontWeight },
        { xs: 4, md: 1.5, content: '' },
        { xs: 4, md: 1.5, content: '' },
        { xs: 2, md: 0, content: '' },
        { xs: 4, md: 2.3, content: ShowNumber(totalTaxableAmount, 2, true), fontWeight: commonFontWeight, textAlign: 'right' },
    ];
};

export const ProductTaxDefaultHeading = [
    { label: "Tax Type", md: 4 },
    { label: "Taxable Amount", md: 4 },
    { label: "Tax Amount", md: 4 },
];

export const ProductTaxNewHeading = [
    { label: "HSN Code", md: 2 },
    { label: "Rate", md: 2 },
    { label: "Taxable Value", md: 2 },
    { label: "CGST", md: 2 },
    { label: "SGST", md: 2 },
    { label: "Total Tax", md: 2 },
];

export const defaultFormatTaxHeading = [
    { content: "Tax Type", sizes: { xs: 12, md: 4 } },
    { content: "Taxable Amount", sizes: { xs: 12, md: 4 } },
    { content: "Tax Amount", sizes: { xs: 12, md: 4 } },
];

export const CGST_HSN_TAX_HEADER = [
    { content: "HSN", columnSize: 2 },
    { content: "Rate", columnSize: 1 },
    { content: "Quantity", columnSize: 1 },
    { content: "Taxable Value", columnSize: 2.5 },
    { content: "CGST", columnSize: 1.5 },
    { content: "SGST", columnSize: 1.5 },
    { content: "Total Tax", columnSize: 2.5 },
];

export const IGST_HSN_TAX_HEADER = [
    { content: "HSN", columnSize: 2 },
    { content: "Rate", columnSize: 1 },
    { content: "Quantity", columnSize: 1 },
    { content: "Taxable Value", columnSize: 2.5 },
    { content: "IGST", columnSize: 3 },
    { content: "Total Tax", columnSize: 2.5 },
];

export const removeBatchPrefix = (batchString) => {
    return batchString.replace(INW_STK_PREFIX, "");
}

//this function will sort the batches wich have INW_STK_PREFIX preffix
// it will ignore others i.e. batch id as inqiry id
export function filterAndSortBatchObject(obj = {}) {
    return Object.keys(obj)
        .filter(key => key.startsWith(INW_STK_PREFIX))
        .sort()
        .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {});
}

export const parshallyInquiryVoucher = (data) => {
    const voucher = data.voucher;
    if (voucher.id === PROFORMA_INVOICE_ID) {
        return data.inquiry;
    }

    const inquiryToUpdate = deepCopyObject(data.inquiry);
    inquiryToUpdate.invoiceId = voucher.id;
    inquiryToUpdate.invoiceDate = voucher.date;

    const newProducts = [];

    inquiryToUpdate.products.forEach((product) => {

        const voucherProduct =
            voucher.products.find((vProduct) => vProduct.workingID === product.workingID);

        if (voucherProduct) {
            product.units = voucherProduct.units

            if (voucherProduct.invoiceRate) {
                product.saleRate = voucherProduct.invoiceRate
            }

            newProducts.push(product);
        }
    })

    inquiryToUpdate.products = newProducts;
    return inquiryToUpdate
}

export const getDate = (date) => date ? date * 1 : new Date().valueOf()

export const inwordIdWithDate = (index) => {
    let currentTime = new Date().getTime();

    // If there are more than one item in the order
    // two batches gets same batch ID as the code
    // as there may not be more diff than ms.

    // We add one second per item .. so the second item
    // will add 2 sec to the time component.
    // This way we still keep the order and make sure that
    // same items dont have same batchID.

    currentTime += (index * 1000);
    return `${INW_STK_PREFIX}${currentTime.toString()}`
}

export const getPartyINRBatchObject = (name, date, invoiceID) => {
    return {
        name: name,
        entityPublicAccess: true,
        id: new Date(date).getTime().toString(),
        invoiceID: invoiceID
    }
}

export const getPOString = (item) => {
    let postring = NOT_AVAILABLE;

    if (item.poNumber) {
        postring = item.poNumber;

        if (item.poDate) {
            postring += " (Dt: " + getLocalDateString(item.poDate) + ")"
        }
    }

    return postring;
}