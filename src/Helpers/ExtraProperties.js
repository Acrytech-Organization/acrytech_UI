import {
    MANAGE_CUSTOMERS,
    NEW_PRODUCTS,
    NEW_INQUIRY_SOURCE,
    NUMBERS,
    NEW_ORDER,
    QUOTATION,
    PRODUCT_TYPE_FINISHED,
    NEW_PRODUCTS_RAW,
    NEW_PRODUCTS_PROCESS,
    NEW_PRODUCTION,
    REPORTS,
    NEW_DISCOUNT,
    STOCK_MANAGEMENT,
    PRODUCT_TYPE_RAW,
    PRODUCT_TYPE_PROCESS,
    NEW_USERS,
    REQUIREMENT,
    ADD_DESIGN_FILE,
    ADD_PROPERTY_GROUP_COLOR,
    OPEN_INQUIRIES,
    STOCK_STMT,
    MANAGE_VENDORS,
    SALES_MANAGER_USER_LEVEL_ID,
    STORE_MANAGER_USER_LEVEL_ID,
    PRODUCTION_MANAGER_USER_LEVEL_ID,
    OPERATOR_USER_LEVEL_ID,
    NEW_QUALITY_CHECK,
    INTERNAL_PROCESS,
    EXTERNAL_PROCESS,
    PRODUCT_STATE,
    REASSIGN_INQUIRY,
    DELIVERY_AND_INVOICE_MANAGEMENT,
    CUSTOMER_FOLLOWUP,
    NEW_INWORD_CHALLAN,
    NEW_OUTWORD_CHALLAN,
    ADD_VALUES_TO_FIRM,
    BANK_DETAIL,
    DESIGN_MANAGER_USER_LEVEL_ID,
    QC_MANAGER_USER_LEVEL_ID,
    CREATE_INTERNAL_ORDER,
    INVOICES,
    MANAGE_LABOURS,
    USE_TERMS,
    USE_PRIVACY,
    USE_REFUND,
    CLOSED_INQUIRY,
    PURCHASE_ORDER,
    BULK_PRODUCT_UPLOAD,
    ACCOUNT_USER_LEVEL_ID,
} from './ConstantProperties';
import { deepCopyObject, getUpdatedProp } from './helpers';
export const JPEG_CONTENT_TYPE = 'image/jpeg';
export const PNG_CONTENT_TYPE = "image/png";
export const MaxImageSizeMB = 1;
export const INPUT_TYPE_NONE = "none";
export const INPUT_TYPE_NUM = "numeric"
export const INPUT_TYPE_EMAIL = "email";
export const INPUT_TYPE_TEL = "tel";

export const PARTY_CUSTOMER_TYPE = "Customer"
export const PARTY_VENDOR_TYPE = "Vendor"

export const INWORD_VOUCHER_TYPE = "STOCK INWORD"

//tag must be in lowerCase
export const PARTY_TAG = 'party';
export const LEAD_TAG = 'lead'
export const BANK_ACCOUNT_TAG = 'bank accounts';
export const PRODUCT_TAG = 'product';
export const INQUIRY_TAG = "inquiry";
export const PO_TAG = "potag";
export const CLOSED_INQUIRY_TAG = "closedinquiry";
export const INQUIRY_REJECT_TAG = "inquiryreject";
export const ACCOUNTANT_USER_LEVEL = 'Accountant';
export const BANK_ACCOUNT = "bank";
export const CUSTOMER_USER_LEVEL = 'Customer';
export const USER_LEVEL = 'User';
export const ADMIN_USER_LEVEL = 'Admin';
export const INDIA_COUNTRY_CODE = "91";
export const DEVELOPMENT_ENV = 'development';
export const CONTACT = 'Contact';
export const OTHER = "Other";
export const NO_DATA = "Not Available"

export const AllImageTypes = [JPEG_CONTENT_TYPE, PNG_CONTENT_TYPE];
export const MULTIPLE_Role = "Multiple Role"

export const HSN_CODE_PROP = "productHSNcode";
export const SALE_RATE = "saleRate";
export const GST_RATE = "GSTRate";
export const SHOW_GST_DROPDOWN = 'showGSTDropdown';

export const PRODUCTSGROUP = "products";
export const PRODUCTGROUPID = "productID"

export const RM_GROUP_NAME = "rmlist"
export const PROCESS_GROUP_NAME = "processes"
export const QC_LIST_GROUP_NAME = 'qclist';
export const INSPECTION_REPORT_GROUP_NAME = "inspectionReport"

export const menuItems = [
    {
        text: 'New Inquiries',
        path: OPEN_INQUIRIES,
        accessByLevel: [SALES_MANAGER_USER_LEVEL_ID],
        showInLimit: true
    },
    {
        text: 'Manage Requirements',
        path: REQUIREMENT,
        accessByLevel: [PRODUCTION_MANAGER_USER_LEVEL_ID]
    },
    {
        text: 'Quotation',
        path: QUOTATION,
        accessByLevel: [SALES_MANAGER_USER_LEVEL_ID],
        showInLimit: true
    },
    {
        text: 'Order',
        path: NEW_ORDER,
        accessByLevel: [
            SALES_MANAGER_USER_LEVEL_ID,
            STORE_MANAGER_USER_LEVEL_ID,
            PRODUCTION_MANAGER_USER_LEVEL_ID,
            OPERATOR_USER_LEVEL_ID,
            DESIGN_MANAGER_USER_LEVEL_ID,
        ],
        showInLimit: true
    },
    {
        text: 'Design',
        path: ADD_DESIGN_FILE,
        accessByLevel: [
            PRODUCTION_MANAGER_USER_LEVEL_ID,
            DESIGN_MANAGER_USER_LEVEL_ID
        ]
    },
    {
        text: 'Stock Management',
        path: STOCK_MANAGEMENT,
        accessByLevel: [STORE_MANAGER_USER_LEVEL_ID],
        showInLimit: true
    },
    {
        text: 'Production',
        path: NEW_PRODUCTION,
        accessByLevel: [PRODUCTION_MANAGER_USER_LEVEL_ID, OPERATOR_USER_LEVEL_ID]
    },
    {
        text: 'Quality Check',
        path: NEW_QUALITY_CHECK,
        accessByLevel: [QC_MANAGER_USER_LEVEL_ID]
    },
    {
        text: 'Delivery & Invoice Management',
        path: DELIVERY_AND_INVOICE_MANAGEMENT,
        accessByLevel: [STORE_MANAGER_USER_LEVEL_ID, ACCOUNT_USER_LEVEL_ID],
        showInLimit: true
    },
    {
        text: 'Invoices',
        path: INVOICES,
        accessByLevel: [SALES_MANAGER_USER_LEVEL_ID, ACCOUNT_USER_LEVEL_ID],
        showInLimit: true
    },
    {
        text: 'Inword Challan',
        path: NEW_INWORD_CHALLAN,
        accessByLevel: [STORE_MANAGER_USER_LEVEL_ID, ACCOUNT_USER_LEVEL_ID],
    },
    {
        text: 'Outword Challan',
        path: NEW_OUTWORD_CHALLAN,
        accessByLevel: [STORE_MANAGER_USER_LEVEL_ID, ACCOUNT_USER_LEVEL_ID],
    },
    {
        text: 'Report',
        path: REPORTS,
        showInLimit: true,
        accessByLevel: [ACCOUNT_USER_LEVEL_ID],
    },
    {
        text: 'Closed Inquiries',
        path: CLOSED_INQUIRY,
        showInLimit: true
    },
    {
        text: 'Customers FollowUp',
        path: CUSTOMER_FOLLOWUP
    },
    {
        text: 'Bank Detail',
        path: BANK_DETAIL,
        accessByLevel: [ACCOUNT_USER_LEVEL_ID],
    },
    {
        text: 'Purchse Order',
        path: PURCHASE_ORDER,
        accessByLevel: [STORE_MANAGER_USER_LEVEL_ID, ACCOUNTANT_USER_LEVEL],
        showInLimit: false,
    },
    {
        text: 'Manage Stock',
        path: STOCK_STMT,
        accessByLevel: [STORE_MANAGER_USER_LEVEL_ID],
        showInLimit: true
    },
    {
        text: 'Manage Customers',
        path: MANAGE_CUSTOMERS,
        accessByLevel: [SALES_MANAGER_USER_LEVEL_ID],
        showInLimit: true
    },
    {
        text: 'Manage Vendors',
        path: MANAGE_VENDORS,
        accessByLevel: [STORE_MANAGER_USER_LEVEL_ID],
        showInLimit: true
    },
    {
        text: 'Manage Labours',
        path: MANAGE_LABOURS,
        accessByLevel: [PRODUCTION_MANAGER_USER_LEVEL_ID],
        showInLimit: false
    },
    {
        text: 'Manage Finish Products',
        path: NEW_PRODUCTS,
        accessByLevel: [STORE_MANAGER_USER_LEVEL_ID, ACCOUNT_USER_LEVEL_ID],
        showInLimit: true
    },
    {
        text: 'Manage Raw Material',
        path: NEW_PRODUCTS_RAW,
        accessByLevel: [STORE_MANAGER_USER_LEVEL_ID]
    },
    {
        text: 'Manage Processes',
        path: NEW_PRODUCTS_PROCESS,
        accessByLevel: [PRODUCTION_MANAGER_USER_LEVEL_ID]
    },
    {
        text: 'Inquiry Sources',
        path: NEW_INQUIRY_SOURCE,
        showInLimit: true
    },
    {
        text: 'Manage Discount',
        path: NEW_DISCOUNT,
        showInLimit: true
    },
    {
        text: 'Users',
        path: NEW_USERS,
        showInLimit: true
    },
    {
        text: 'Reassign Inquiry',
        path: REASSIGN_INQUIRY,
        showInLimit: true
    },
    {
        text: 'Internal Order',
        path: CREATE_INTERNAL_ORDER,
    },
    {
        text: 'Product Upload',
        path: BULK_PRODUCT_UPLOAD,
    },
    {
        text: 'Terms of Use',
        path: USE_TERMS,
        showInLimit: true
    },
    {
        text: 'Privacy Policy',
        path: USE_PRIVACY,
        showInLimit: true
    },
    {
        text: 'Refund Policy',
        path: USE_REFUND,
        showInLimit: true
    },
]

export const requirementRawMaterialHeading = [
    { label: 'Name', lg: 3, xs: 12 },
    { label: 'Quantity', lg: 3, xs: 12 },
    { label: 'Price/Unit', lg: 3, xs: 12 },
    { label: 'Actions', lg: 3, xs: 12 }
]

export const SchemaTypes = {
    Number: "Number",
    String: "String",
    UUID: "UUID",
    KN_PAN: "KN_PAN",
    KN_PIN: "KN_PIN",
    KN_GSTIN: "KN_GSTIN",
    DATE: "date",
    radio: "radio",
    file: "file",
    EMAIL: "email",
    IMAGE: "image",
    NETWORK_IMAGE: "networkImage",
    ADHAR_CARD: "aadharCard",
    DROP_DOWN: "dropdown",
    headline: "Headline",
    PASSWORD: "password",
    Password: "password",
    STD_DROPDOWN: "standarddropdown",
    checkbox: "checkbox",
    DIV_DROPDOWN: "divisiondropdown",
    PHONE_NUMBER: "PHONE_NUMBER",
    IFSC_CODE: "IFSC_CODE",
    ESTD: "ESTD",
    UDISE: "UDISE",
    USER_LEVEL_DROPDOWN: "userleveldropdown",
    RADIO_BUTTON: "radiobutton",
    TextArea: "TextArea",
    HSNCODE: "HSNCODE",
    STATICDROPDOWN: 'StaticDropDown',
    PRODUCTDROPDOWN: 'ProductDropDown',
    RMDROPDOWN: 'RMDropDown',
    BANKDROPDOWN: 'BankDropDown',
    CUSTOMERDROPDOWN: "CustomerDropDown",
    VENDORDROPDOWN: "VendorDropDown",
    LABOURDROPDOWN: "LABOURDROPDOWN",
    PARTYDROPDOWN: "PartyDropDown",
    INQUIRYSOURCEDROPDOWN: "InquirySourceDropdown",
    PINCODE: "PINCODE",
    ALPHA_NUM: "ALPHA_NUM",
    GSTRATE: "GSTRATE",
    QUANTITY: "QUANTITY",
    SALERATE: "SALERATE",
    CITY: "CITY",
    ITEMCODE: "ITEMCODE",
    DISCOUNT_SLAB_DROPDOWN: "DISCOUNT_SLAB_DROPDOWN",
    CHECK_BOX: 'CHECK_BOX',
    URL: 'URL',
    LABELED_TEXT: 'LABELED_TEXT',
    TEL: 'tel',
    DATEPICKER: "DATEPICKER",
}

const units = [
    NUMBERS,
    "Set",
    "mtr",
    "Pair",
    "Box",
    "Rolled",
    "Sqrt",
    "Kg",
];

const QuotationFormat = [
    "Default Format",
    "Format 1",
]

const ProductTypes = [
    INTERNAL_PROCESS,
    EXTERNAL_PROCESS
];

export const known_Custom_Types = {
    KN_PAN: "^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$",
    KN_PIN: "^[1-9]{1}[0-9]{5}$",
    KN_GSTIN: "^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{1}[1-9a-zA-Z]{1})([zZ]{1})([0-9a-zA-Z]{1})$",
    date: "d{2}-d{2}-d{4}",
    PINCODE: "^\\d{6}$",
    ADHAR_CARD_FIRST: "[2-9]{1}[0-9]{3}",
    ADHAR_CARD_SECOND: "[0-9]{4}",
    ADHAR_CARD_THIRD: "[0-9]{4}",
    PHONE_NUMBER: "^\\+?\\s?\\(?\\d{1,4}\\)?[\\s.-]?\\d{1,4}[\\s.-]?\\d{1,4}[\\s.-]?\\d{1,9}$",
    IFSC_CODE: "^[A-Za-z]{4}[a-zA-Z0-9]{7}$",
    ALPHA_NUM: "^(?!\\d+$)[A-Za-z0-9]+$",
    QUANTITY: "^(?!0{2,}(\\.0{1,2})?$)(0|[1-9][0-9]{0,6})(\\.[0-9]{1,3})?$",
    SALERATE: "^(?!0{2,}(\\.0{1,2})?$)(0|[1-9][0-9]{0,6})(\\.[0-9]{1,3})?$",
    HSNCODE: "^[0-9]{4,8}$",
    GSTRATE: "^([0-9]|[1-9][0-9]|[0-9][0-9]*\\.[0-9]{0,2})$",
    CITY: "^[A-Za-z\\s\\-]+$",
    ITEMCODE: "^[a-zA-Z0-9 .]+(?:-[a-zA-Z0-9 .]+)*$",
    VEHICLENO: "^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$",
    // eslint-disable-next-line no-useless-escape
    URL: "^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]+)?(\/\S*)?$"
}

export const baseComments = [
    {
        id: 1,
        message: "Called , but couldn't connect,call again tommorrow",
        days: 1
    },
    {
        id: 2,
        message: "Customer was busy , ask to call again",
        days: 1
    },
    {
        id: 3,
        message: "Customer needs few more days to move forward",
        days: 2
    },
    {
        id: 4,
        message: "Message sent via Whats App/Email,follow-up in few days",
        days: 2
    },
    {
        id: 5,
        message: OTHER,
        days: 1,
        showCommentBox: true // that is for showing for all values expect the other value
    }
]

export const rejectComments = [
    {
        id: 1,
        message: "Rate is Not Correct",
    },
    {
        id: 2,
        message: "Payment Term is Not Correct",
    },
    {
        id: 3,
        message: "No Reply",
    },
    {
        id: 4,
        message: "Spam Inquiry",
    },
    {
        id: 5,
        message: "Wrong Contact",
    },
    {
        id: 6,
        message: OTHER,
        showCommentBox: true
    }
]

export const InquiryRejectionObj = {
    name: 'Rejected',
    color: 'primary.main',
    btnText: 'Rejected',
}

export const propertyList = {
    Full_NAME: {
        displayName: "Your Name",
        name: "Full_Name",
        type: SchemaTypes.String,
        required: true
    },
    PhoneNumber: {
        displayName: "Phone Number",
        name: "phoneNumber",
        type: SchemaTypes.PHONE_NUMBER,
        required: true
    },
    Password: {
        displayName: "Your Password",
        name: 'password',
        type: SchemaTypes.Password,
        required: true
    },
    userPassword: {
        displayName: "Password",
        name: "password",
        type: SchemaTypes.PASSWORD,
        required: true,
        helperText: "Please enter the Password"
    },
    userPhoneNumber: {
        displayName: "Phone No.",
        name: "phoneNumber",
        type: SchemaTypes.PHONE_NUMBER,
        required: true,
        helperText: "Please enter the valid Mobile Number."
    },
    firmName: {
        displayName: 'Firm Name',
        name: 'name',
        type: SchemaTypes.String,
        required: true,
        helperText: "Please enter the Firm Name",
    },
    firmId: {
        displayName: 'Firm ID',
        name: 'khID',
        type: SchemaTypes.ALPHA_NUM,
        helperText: "Please enter the Firm ID in Alpha Numeric Format."
    },
    firmPanNumber: {
        displayName: 'PAN',
        name: 'panNumber',
        type: SchemaTypes.KN_PAN,
        required: true,
        helperText: "Please enter the Firm ID in PAN card format (e.g., ABCDE1234F)."
    },
    Address: {
        displayName: 'Address',
        name: 'address',
        type: SchemaTypes.String,
        required: true,
        helperText: "Please enter the Your current Address ."
    },
    City: {
        displayName: 'City',
        name: 'city',
        type: SchemaTypes.CITY,
        required: true,
        helperText: "Please enter city name"
    },
    Pincode: {
        displayName: 'Pincode',
        name: 'pincode',
        type: SchemaTypes.PINCODE,
        required: true,
        helperText: "Please enter a 6-digit PIN code."
    },
    GSTIN: {
        displayName: 'GSTIN',
        name: 'gstin',
        type: SchemaTypes.KN_GSTIN,
        required: false,
        helperText: "Please enter the GSTIN in format (e.g. 11AAAAA1111A1Z1/A)."
    },
    userRole: {
        displayName: "User Role",
        name: "name",
        type: SchemaTypes.String,
        required: true,
        helperText: "Please enter the User Role"
    },
    userLevelDropdown: {
        name: "userLevel",
        type: SchemaTypes.USER_LEVEL_DROPDOWN,
        required: false,
        helperText: "Please enter the User Role"
    },
    partyName: {
        displayName: 'Party Name',
        name: 'name',
        type: SchemaTypes.String,
        required: true,
        helperText: "Please enter the Party Name"
    },
    partyEmail: {
        displayName: 'Party Email',
        name: 'email',
        type: SchemaTypes.EMAIL,
        required: false,
        helperText: "Please enter the valid Email ID"
    },
    partyNumber: {
        displayName: 'Mobile Number',
        name: 'phoneNumber',
        type: SchemaTypes.PHONE_NUMBER,
        required: true,
        helperText: "Please enter the valid Mobile Number"
    },
    partyContactName: {
        displayName: 'Contact Person',
        name: 'contactPerson',
        type: SchemaTypes.String,
        required: false,
        helperText: "Please enter the Contact Person Name"
    },
    partyGstNumber: {
        displayName: 'GSTIN',
        name: 'gstin',
        type: SchemaTypes.KN_GSTIN,
        required: false,
        helperText: "Please enter the GSTIN in format (e.g. 11AAAAA1111A1Z1/A)."
    },
    partyPANNumber: {
        displayName: 'PAN',
        name: 'panNumber',
        type: SchemaTypes.KN_PAN,
        required: false,
        helperText: "Please enter the PAN Number in format (e.g., ABCDE1234F)."
    },
    partyType: {
        displayName: 'Type',
        name: 'type',
        type: SchemaTypes.STATICDROPDOWN,
        required: true,
        dropDownList: [PARTY_VENDOR_TYPE, PARTY_CUSTOMER_TYPE],
        className: "mb-4"
    },
    shippingAddress: {
        displayName: 'Shipping Address',
        name: 'shippingAddress',
        type: SchemaTypes.TextArea,
        required: true,
        helperText: "Please enter the Shipping Address"
    },
    billingAddress: {
        displayName: 'Billing Address',
        name: 'billingAddress',
        type: SchemaTypes.TextArea,
        required: true,
        helperText: "Please enter the Billing Address"
    },
    checkSameAddress: {
        displayName: 'Billing address is Same as shipping address',
        name: 'checkSameAddress',
        type: SchemaTypes.checkbox,
        required: false,
        helperText: 'Check if Shipping and Billing Address are same'
    },

    name: {
        displayName: 'Name',
        name: 'name',
        type: SchemaTypes.String,
        required: true,
        helperText: 'Please enter the Person Name',
    },

    role: {
        displayName: 'Department',
        name: 'role',
        type: SchemaTypes.String,
        required: true,
        helperText: 'Please enter the Department'
    },

    phoneNumber: {
        displayName: 'Mobile Number',
        name: 'phoneNumber',
        type: SchemaTypes.PHONE_NUMBER,
        required: true,
        helperText: 'Please enter the valid Mobile Number'
    },

    email: {
        displayName: 'Email',
        name: 'email',
        type: SchemaTypes.EMAIL,
        required: true,
        helperText: 'Please enter valid Email ID'
    },

    ContactGender: {
        displayName: 'Gender',
        name: 'ContactGender',
        type: SchemaTypes.STATICDROPDOWN,
        required: true,
        helperText: 'Please Select Gender',
        dropDownList: ['Male', 'Female', 'Other'],
        className: "mb-4",
    },

    productName: {
        displayName: "Name",
        name: "name",
        type: SchemaTypes.String,
        required: true,
        helperText: 'Please enter Name'
    },
    productUnit: {
        displayName: "Unit",
        name: "unit",
        type: SchemaTypes.STATICDROPDOWN,
        required: true,
        helperText: "Please Select the Unit",
        dropDownList: units,
        className: "mb-4"
    },
    productState: {
        displayName: "Process Type",
        name: PRODUCT_STATE,
        type: SchemaTypes.STATICDROPDOWN,
        helperText: "Please Select the ProcessType ",
        dropDownList: ProductTypes,
        className: "mb-4"
    },
    productHsnCode: {
        displayName: "HSN Code",
        name: HSN_CODE_PROP,
        type: SchemaTypes.HSNCODE,
        required: true,
        helperText: "please enter the HSN Code with 4 to 8 digits."
    },
    productItemCode: {
        displayName: "Item Code",
        name: "productItemcode",
        type: SchemaTypes.ITEMCODE,
        required: true,
        helperText: "please enter the Item Code"
    },
    documentRefID: {
        displayName: "Referance Document",
        name: "refid",
        type: SchemaTypes.ITEMCODE,
        required: true,
        helperText: "please enter the Document ID"
    },
    ProductgstRate: {
        displayName: "GST Rate",
        name: GST_RATE,
        type: SchemaTypes.GSTRATE,
        required: true,
        helperText: 'Please enter the product GST rate (e.g. 0, 2.5, 3, 18).'
    },
    productSaleRate: {
        displayName: "Sale Rate",
        name: "saleRate",
        type: SchemaTypes.SALERATE,
        required: true,
        helperText: 'Please enter the product Sales Rate',
    },
    productType: {
        displayName: 'Product Type',
        name: 'type',
        required: true,
        type: SchemaTypes.String,
        disabled: true
    },
    sourceName: {
        displayName: "Enter Source Name",
        name: "name",
        type: SchemaTypes.String,
        required: true,
        helperText: 'Please enter the Name'
    },
    ContactName: {
        displayName: 'Contact Person',
        name: 'contactPerson',
        required: false,
        type: SchemaTypes.String,
        helperText: 'Please enter the Customer Name'
    },
    ContactNumber: {
        displayName: 'Mobile Number',
        name: 'contactPhone',
        required: true,
        type: SchemaTypes.PHONE_NUMBER,
        helperText: 'Please enter the valid Mobile Number',
    },
    ContactEmail: {
        displayName: 'Contact Email',
        name: 'contactEmail',
        required: false,
        type: SchemaTypes.EMAIL,
        helperText: 'Please enter the Customer Email ID '
    },
    ProductDropDown: {
        displayName: 'Product Inquiry ',
        name: 'product',
        required: false,
        type: SchemaTypes.PRODUCTDROPDOWN,
        helperText: 'Please Select the Item',
        Producttype: PRODUCT_TYPE_FINISHED
    },
    DefaultBankDropDown: {
        displayName: 'Select Default Bank ',
        name: 'bankAccount',
        required: false,
        type: SchemaTypes.BANKDROPDOWN,
        helperText: 'Please Select the default Bank',
    },
    RawMaterialDropdown: {
        displayName: 'Raw Material ',
        name: 'product',
        type: SchemaTypes.RMDROPDOWN,
        helperText: 'Please Select the Raw Material',
        Producttype: PRODUCT_TYPE_RAW,
        required: true
    },
    ProcessDropdown: {
        displayName: 'Processes',
        name: 'product',
        type: SchemaTypes.PRODUCTDROPDOWN,
        helperText: 'Please Select the Process',
        Producttype: PRODUCT_TYPE_PROCESS,
        required: true
    },
    RMORProcessPrice: {
        displayName: "Price/Units",
        name: 'rate',
        disabled: true,
        type: SchemaTypes.Number,
        helperText: 'Sale Rate',
        required: true
    },
    CustomerDropDown: {
        displayName: 'Company Name',
        name: 'CustomerDropDown',
        required: false,
        type: SchemaTypes.CUSTOMERDROPDOWN,
        helperText: 'Please Select the Customer',
    },
    VendorDropDown: {
        displayName: 'Vendor',
        name: 'vendorDropDown',
        required: true,
        type: SchemaTypes.VENDORDROPDOWN,
        helperText: 'Please Select the Vendor',
    },
    LabourDropDown: {
        displayName: 'Select Labour ',
        name: 'labourDropDown',
        required: true,
        type: SchemaTypes.LABOURDROPDOWN,
        helperText: 'Please Select the Labour',
    },
    PartyDropDown: {
        displayName: 'Party DropDown ',
        name: 'partyDropDown',
        required: true,
        type: SchemaTypes.PARTYDROPDOWN,
        helperText: 'Please Select the Party',
    },
    EnquirySourceDropdown: {
        displayName: 'Source Of Enquiry',
        name: 'enquirySource',
        required: false,
        type: SchemaTypes.INQUIRYSOURCEDROPDOWN,
        helperText: 'select enquirySource'
    },
    quantity: {
        displayName: 'Quantity',
        name: 'units',
        required: true,
        type: SchemaTypes.QUANTITY,
        helperText: 'Quantity needed',
        disabled: true
    },
    fgRate: {
        displayName: 'Quantity',
        name: 'fgRate',
        required: true,
        type: SchemaTypes.Number,
        helperText: 'Quantity needed',
        disabled: true
    },
    FirmImage: {
        displayName: 'Firm LogoUrl',
        name: 'logoUrl',
        required: false,
        type: SchemaTypes.NETWORK_IMAGE,
        helperText: 'Please enter the Image Url',
    },
    description: {
        displayName: 'Description',
        name: 'description',
        required: false,
        type: SchemaTypes.String,
        helperText: 'Please Write the description',
    },
    ProductDescription: {
        displayName: 'Product Description',
        name: 'productdescription',
        required: false,
        type: SchemaTypes.String,
        helperText: 'Please Write the product description',
        disabled: true
    },
    gstDropdown: {
        displayName: 'GSTRate',
        name: 'GSTRate',
        type: SchemaTypes.STATICDROPDOWN,
        required: true,
        dropDownList: [],
        className: "mb-4",
    },
    addDesign: {
        displayName: 'Enter the Drive URL Link',
        name: 'designUrl',
        type: SchemaTypes.URL,
        required: true,
        helperText: 'Please Enter Your Drive Link Here...!',
    },
    addExpectedDate: {
        displayName: 'Expected Closure Date',
        name: 'expectedCloseDate',
        type: SchemaTypes.DATEPICKER,
        required: true,
        helperText: 'Please Enter the expected date of closure',
    },
    PoNumber: {
        displayName: 'PO Number',
        name: 'poNumber',
        helperText: 'Please Enter the PO Number',
    },
    PoDate: {
        displayName: 'PO Date',
        name: 'poDate',
        type: SchemaTypes.DATEPICKER,
        helperText: 'Please Enter the PO Number',
    },
    PoAmount: {
        displayName: 'PO Amount (With Tax)',
        name: 'poTotalAmount',
        type: SchemaTypes.Number,
        helperText: 'Please Enter the total PO Amount',
    },
    discountRate: {
        displayName: 'Discount Rate',
        name: 'discountRate',
        type: SchemaTypes.Number,
        required: true,
        helperText: 'Please Enter valid Discount',
    },
    DiscountSlabDropdown: {
        displayName: 'Discount Plan',
        name: 'DiscountSlabDropdown',
        required: true,
        type: SchemaTypes.DISCOUNT_SLAB_DROPDOWN,
        helperText: 'select Discount Plan'
    },
    discountPrice: {
        displayName: 'Discount Price',
        name: 'discountPrice',
        type: SchemaTypes.String,
        required: false,
        helperText: 'Please enter an One Time Discount ammount',
    },
    birthDate: {
        displayName: 'Birth Date',
        name: 'birthDate',
        required: true,
        type: SchemaTypes.DATE,
        helperText: 'Date is Not Valid'
    },
    paymentTerms: {
        displayName: "Payment",
        name: "paymentTerms",
        type: SchemaTypes.STATICDROPDOWN,
        required: false,
        helperText: "Please select your payment mode",
        dropDownList: ["Advanced", "30 days", "45 days", "60 days", "90 days"],
    },
    transportTerms: {
        displayName: "Transport",
        name: "transportTerms",
        type: SchemaTypes.STATICDROPDOWN,
        required: false,
        helperText: "Select the Transport",
        dropDownList: ["Your Scope", "Our Scope"],
    },
    otherTnC: {
        displayName: "Others",
        name: "otherTnC",
        type: SchemaTypes.String,
        required: false,
        helperText: "Please add other conditions here, if any",
    },
    projectName: {
        displayName: "Project Name",
        name: "projectName",
        type: SchemaTypes.String,
        required: false,
        helperText: "Enter Project Name ",
    },
    vehicalNo: {
        displayName: "Vehical No",
        name: "vehicalNo",
        type: SchemaTypes.String,
        required: true,
        helperText: "Vehical No is required",
    },
    driverName: {
        displayName: "Driver Name",
        name: "driverName",
        type: SchemaTypes.String,
        required: true,
        helperText: "Please Enter Driver Name",
    },
    eWayBill: {
        displayName: "E-way Bill",
        name: "eWaybill",
        type: SchemaTypes.String,
        required: false,
        helperText: "Please Enter Eway Bill No",
    },
    Date: {
        displayName: 'Date',
        name: 'date',
        type: SchemaTypes.LABELED_TEXT,
        propType: SchemaTypes.DATE
    },
    ChallanID: {
        displayName: 'CHALLAN ID',
        name: 'challanID',
        type: SchemaTypes.LABELED_TEXT,
    },
    lockInquiry: {
        displayName: 'Lock Inquiries',
        name: 'lockInquiry',
        type: SchemaTypes.checkbox
    },
    AutoRemoveRemaining: {
        displayName: 'Auto Remove Inquiries',
        name: 'autoCloseOrders',
        type: SchemaTypes.checkbox
    },
    editSaleRate: {
        displayName: 'Edit Sale Rate',
        name: 'editSaleRate',
        type: SchemaTypes.checkbox
    },
    defaultGST: {
        displayName: 'Set Default GST',
        name: 'defaultGST',
        type: SchemaTypes.String
    },
    defaultvalues: {
        displayName: 'Add Default Values',
        name: 'defaultvalues',
        type: SchemaTypes.LABELED_TEXT,
        propType: SchemaTypes.URL,
        route: ADD_VALUES_TO_FIRM
    },
    QcMaterialname: {
        displayName: 'Qc Name',
        name: 'QcMaterialname',
        type: SchemaTypes.String,
    },
    QcDimention: {
        displayName: 'Qc Dimention',
        name: 'QcDimention',
        type: SchemaTypes.String,
    },
    inspectionParameter: {
        displayName: 'Inspection Parameter',
        name: 'inspectionParameter',
        type: SchemaTypes.String,
        required: true,
        helperText: 'Please enter the inspection parameter',
    },
    inspectionDiamention: {
        displayName: 'Inspection Diamention',
        name: 'inspectionDiamention',
        type: SchemaTypes.String,
        required: true,
        helperText: 'Please enter the inspection diamention',
    },
    inspectionTolerance: {
        displayName: 'Inpection Tolerance',
        name: 'inspectionTolerance',
        type: SchemaTypes.String,
        required: true,
        helperText: 'Please enter the inspection tolerance',
    },
    useFormat: {
        displayName: "Quotation Format",
        name: "useFormat",
        type: SchemaTypes.STATICDROPDOWN,
        required: true,
        helperText: "Please Select the Format",
        dropDownList: QuotationFormat,
    },
    shiftHrs: {
        displayName: "Total Hrs in shift",
        name: "shiftHrs",
        type: SchemaTypes.Number,
        required: true,
        helperText: "Please enter the information",
    },
    perHrRate: {
        displayName: "Rate per Hr",
        name: "perHrRate",
        type: SchemaTypes.Number,
        required: true,
        helperText: "Please enter the information",
    },
}

export const InquiryForm = {
    Rate: {
        item: getUpdatedProp(propertyList.productSaleRate, { disabled: true }),
        attributes: {
            lg: 2
        }
    },
    ProductDropDown: {
        item: propertyList.ProductDropDown,
        attributes: {
            lg: 3
        },
        enableNewAdd: true,
        manageState: true
    },
    RawMaterialDropDown: {
        item: propertyList.RawMaterialDropdown,
        attributes: {
            lg: 3
        },
        manageState: true
    },
    ProcessDropdown: {
        item: propertyList.ProcessDropdown,
        attributes: {
            lg: 4
        },
        manageState: true
    },
    RMORProcessPrice: {
        item: propertyList.RMORProcessPrice,
        attributes: {
            lg: 4
        },
    },
    ContactName: {
        item: propertyList.ContactName,
        attributes: {
            lg: 4
        }
    },
    ContactEmail: {
        item: propertyList.ContactEmail,
        inputMode: INPUT_TYPE_EMAIL,
        attributes: {
            lg: 4
        }
    },
    ContactNumber: {
        item: propertyList.ContactNumber,
        inputMode: INPUT_TYPE_TEL,
        attributes: {
            lg: 4
        },

    },
    quantity: {
        item: propertyList.quantity,
        inputMode: INPUT_TYPE_NUM,
        attributes: {
            lg: 2
        },
    },
    CustomerDropDown: {
        item: propertyList.CustomerDropDown,
        attributes: {
            lg: 4
        },
        manageState: true
    },
    EnquirySourceDropdown: {
        item: propertyList.EnquirySourceDropdown,
        attributes: {
            lg: 4
        }
    },
    City: {
        item: propertyList.City,
        attributes: {
            lg: 4
        }
    },
    Description: {
        item: propertyList.description,
        attributes: {
            lg: 12
        },
        extraProps: {
            multiline: true,
            rows: 2
        }
    },
    ProductDescription: {
        item: propertyList.ProductDescription,
        attributes: {
            lg: 4
        }
    },
    DiscountPlanDropDown: {
        item: propertyList.DiscountSlabDropdown,
        attributes: {
            lg: 2.5
        }
    },
}

export const propertyGroups = {
    rm_grp: {
        groupName: "products",
        uniqueIdProp: (object) => object.product?.id,
        group: [
            InquiryForm.RawMaterialDropDown,
            InquiryForm.quantity,
            InquiryForm.Rate,
            InquiryForm.ProductDescription,
        ],

        attributes: {
            backgroundColor: ADD_PROPERTY_GROUP_COLOR
        },
    },
    product_grp: {
        groupName: "products",
        group: [
            InquiryForm.ProductDropDown,
            InquiryForm.quantity,
            InquiryForm.Rate,
            InquiryForm.ProductDescription,
        ],

        attributes: {
            backgroundColor: ADD_PROPERTY_GROUP_COLOR
        },
    },
    level_group: {
        groupName: "levels",
        uniqueIdProp: (object) => object.id,
        group: [
            {
                item: propertyList.userLevelDropdown,
                attributes: {
                    sm: 10
                },
                manageState: true
            },
        ]
    },
    gst_group: {
        groupName: "gstList",
        uniqueIdProp: (object) => object.gstin,
        group: [
            {
                item: getUpdatedProp(propertyList.GSTIN, { type: SchemaTypes.Number }),
                attributes: {
                    sm: 10, lg: 10
                }
            },
        ]
    },
}

export const getUpdatedProductGroup = (enableSaleRate, group) => {
    const grpProp = deepCopyObject(group);

    //need to do this bacause deepcopy ignores methods
    //so we have to add it here
    if (!(enableSaleRate)) {
        grpProp.group = [
            getUpdatedProp(group.group[0], { attributes: { lg: 4 } }),
            getUpdatedProp(InquiryForm.quantity, { attributes: { lg: 3 } }),
            getUpdatedProp(InquiryForm.ProductDescription, { attributes: { lg: 4 } }),
        ]
    }

    return grpProp;
}

export const getPropsWithProductList =
    (proplist, enableSaleRate, group = propertyGroups.product_grp) => {
        return [...proplist, getUpdatedProductGroup(enableSaleRate, group)];
    }

export const rmPropertyGroup = {
    groupName: RM_GROUP_NAME,
    uniqueIdProp: (object) => object.product?.id,
    group: [
        InquiryForm.RawMaterialDropDown,
        InquiryForm.Rate,
        {
            item: propertyList.fgRate,
            inputMode: INPUT_TYPE_NUM,
            attributes: {
                lg: 2
            },
        },
    ],
    manageState: true
}

export const inwordFgPropertyGroup = {
    groupName: PRODUCTSGROUP,
    uniqueIdProp: (object) => object.product?.id,
    group: [
        InquiryForm.ProductDropDown,
        InquiryForm.quantity,
        InquiryForm.RMORProcessPrice,
    ],
    manageState: true
}


export const qcPropertyGroup = {
    groupName: QC_LIST_GROUP_NAME,
    group: [
        {
            item: propertyList.QcMaterialname,
            attributes: {
                lg: 3
            }
        },
        {
            item: propertyList.QcDimention,
            attributes: {
                lg: 3
            }
        }
    ],

    manageState: true
}

export const inspectionPropertyGroup = {
    groupName: INSPECTION_REPORT_GROUP_NAME,
    group: [
        {
            item: propertyList.inspectionParameter,
            attributes: {
                lg: 4
            }
        },
        {
            item: propertyList.inspectionDiamention,
            attributes: {
                lg: 2
            }
        },
        {
            item: propertyList.inspectionTolerance,
            attributes: {
                lg: 2
            }
        },
    ],

    manageState: true
}

export const processPropertyGroup = {
    groupName: PROCESS_GROUP_NAME,
    uniqueIdProp: (object) => object.product?.id,
    group: [
        InquiryForm.ProcessDropdown,
        InquiryForm.Rate,
        // InquiryForm.RMORProcessPrice,
        {
            item: propertyList.fgRate,
            inputMode: INPUT_TYPE_NUM,
            attributes: {
                lg: 2
            },
        },
    ],
    manageState: true
}

export const InwordRMPropList = [
    {
        item: propertyList.VendorDropDown,
        attributes: {
            lg: 8
        }
    },
    {
        item: propertyList.documentRefID,
        attributes: {
            lg: 4
        }
    },
    {
        groupName: RM_GROUP_NAME,
        uniqueIdProp: (object) => object.product?.id,
        group: [
            {
                item: propertyList.RawMaterialDropdown,
                attributes: {
                    lg: 4
                },
                manageState: true
            },
            {
                item: propertyList.RMORProcessPrice,
                attributes: {
                    lg: 4
                },
            },
            {
                item: propertyList.quantity,
                inputMode: INPUT_TYPE_NUM,
                attributes: {
                    lg: 2
                },
            },
        ],
        manageState: true
    }
]

export const InwordFGPropList = [
    {
        item: propertyList.VendorDropDown,
        attributes: {
            lg: 8
        }
    },
    {
        item: propertyList.documentRefID,
        attributes: {
            lg: 4
        }
    },
    inwordFgPropertyGroup
]

export const InquiryProps = [
    {
        ...InquiryForm.CustomerDropDown,
    },
    {
        ...InquiryForm.EnquirySourceDropdown,
    },
    {
        ...InquiryForm.City,
    },
    {
        ...InquiryForm.ContactName,
    },
    {
        ...InquiryForm.ContactNumber,
    },
    {
        ...InquiryForm.ContactEmail,
    },
    {
        ...InquiryForm.Description,
    }
]


export const productProps = [
    {
        item: propertyList.productItemCode,
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
        item: propertyList.productHsnCode,
        inputMode: INPUT_TYPE_NUM,
        attributes: {
            lg: 3
        }
    },
    {
        item: propertyList.ProductgstRate,
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

export const productPropsForSFG = [
    {
        item: propertyList.productName,
        attributes: {
            lg: 6
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

export const userRolesProp = [
    { item: propertyList.userRole }
]

export const updateUserLevel = [
    { item: propertyList.userLevelDropdown }
]

export const addDesignProp = [
    { item: propertyList.addDesign }
]

export const addExpectedDate = [
    { item: propertyList.addExpectedDate }
]

export const addPoNumber = [
    { item: propertyList.PoNumber },
    { item: propertyList.PoDate, attributes: { md: 6 } },
    { item: propertyList.PoAmount, attributes: { md: 6 } }
]

export const getPartyList = (enableDiscount) => {
    const discountOject = {
        item: propertyList.DiscountSlabDropdown,
        attributes: {
            lg: 3
        },
        manageState: true
    };
    var partyList = [
        {
            item: getUpdatedProp(propertyList.CustomerDropDown, {
                displayName: 'Party Name',
                disableList: true,
                required: true
            }),
            manageState: true,
            attributes: {
                lg: enableDiscount ? 9 : 12
            }
        },
        {
            item: propertyList.partyContactName,
            attributes: {
                lg: 4,
                className: 'bg-secondary-subtle'
            }
        },
        {
            item: propertyList.partyNumber,
            inputMode: INPUT_TYPE_TEL,
            attributes: {
                lg: 4,
                className: 'bg-secondary-subtle'
            }
        },
        {
            item: propertyList.partyEmail,
            inputMode: INPUT_TYPE_EMAIL,
            attributes: {
                lg: 4,
                className: 'bg-secondary-subtle'
            }
        },
        {
            item: propertyList.partyGstNumber,
            attributes: {
                lg: 3
            }
        },
        {
            item: propertyList.partyPANNumber,
            attributes: {
                lg: 3
            }
        },
        {
            item: propertyList.City,
            attributes: {
                lg: 3
            }
        },
        {
            item: propertyList.Pincode,
            inputMode: INPUT_TYPE_NUM,
            attributes: {
                lg: 3
            }
        },
        {
            item: propertyList.checkSameAddress,
            attributes: {
                lg: 12
            },
            manageState: true,
        },
        {
            item: propertyList.shippingAddress,
            extraProps: {
                multiline: true,
                rows: 2
            },
            attributes: {
                lg: 6
            },
            manageState: true
        },
        {
            item: propertyList.billingAddress,
            extraProps: {
                multiline: true,
                rows: 2
            },
            attributes: {
                lg: 6
            }
        },
    ]
    if (enableDiscount) partyList.splice(1, 0, discountOject);
    return partyList
};

export const labourCostToInqProp = [
    {
        item: propertyList.LabourDropDown,
        attributes: {
            xs: 12,
            md: 4
        }
    },
    {
        item: propertyList.shiftHrs,
        attributes: {
            xs: 12,
            md: 2
        }
    },
    {
        item: propertyList.description,
        attributes: {
            xs: 12,
            md: 6
        },
        extraProps: {
            multiline: true,
            rows: 2
        },
    }
]

export const getLabourList = () => {
    const partyList = [
        {
            item: propertyList.partyName,
            attributes: {
                lg: 8
            }
        },
        {
            item: propertyList.partyNumber,
            inputMode: INPUT_TYPE_TEL,
            attributes: {
                lg: 4
            }
        },
        {
            item: propertyList.City,
            attributes: {
                lg: 4
            }
        },
        {
            item: propertyList.shiftHrs,
            attributes: {
                lg: 4
            }
        },
        {
            item: propertyList.perHrRate,
            attributes: {
                lg: 4
            }
        },
    ]
    return partyList
}

export const getVendorPartyList = () => {
    const partyList = [
        {
            item: propertyList.partyName,
            attributes: {
                lg: 12
            }
        },
        {
            item: propertyList.partyContactName,
            attributes: {
                lg: 4
            }
        },
        {
            item: propertyList.partyNumber,
            inputMode: INPUT_TYPE_TEL,
            attributes: {
                lg: 4
            }
        },
        {
            item: propertyList.partyEmail,
            inputMode: INPUT_TYPE_EMAIL,
            attributes: {
                lg: 4
            }
        },
        {
            item: propertyList.partyGstNumber,
            attributes: {
                lg: 3
            }
        },
        {
            item: propertyList.partyPANNumber,
            attributes: {
                lg: 3
            }
        },
        {
            item: propertyList.City,
            attributes: {
                lg: 3
            }
        },
        {
            item: propertyList.Pincode,
            inputMode: INPUT_TYPE_NUM,
            attributes: {
                lg: 3
            }
        },
        {
            item: propertyList.billingAddress,
            extraProps: {
                multiline: true,
                rows: 2
            },
            attributes: {
                lg: 12
            }
        },
    ]
    return partyList
}

export const CreatePurchseOrderProps = [
    {
        item: getUpdatedProp(propertyList.PoNumber, { disabled: true }),
        attributes: {
            lg: 4
        }
    },
    {
        item: getUpdatedProp(propertyList.VendorDropDown),
        attributes: {
            lg: 8
        },
        manageState: true
    },
    {
        item: propertyList.ContactName,
        attributes: {
            lg: 4,
            className: 'bg-secondary-subtle'
        }
    },
    {
        item: propertyList.ContactNumber,
        inputMode: INPUT_TYPE_TEL,
        attributes: {
            lg: 4,
            className: 'bg-secondary-subtle'
        }
    },
    {
        item: propertyList.ContactEmail,
        inputMode: INPUT_TYPE_EMAIL,
        attributes: {
            lg: 4,
            className: 'bg-secondary-subtle'
        }
    },
    {
        item: propertyList.description,
        attributes: {
            lg: 12
        },
        extraProps: {
            multiline: true,
            rows: 2
        }
    }
]

export const CreateOrderProps = [
    {
        item: propertyList.PoNumber,
        attributes: {
            lg: 3
        }
    },
    {
        item: propertyList.PoDate,
        attributes: {
            lg: 3
        }
    },
    {
        item: getUpdatedProp(propertyList.CustomerDropDown, { required: true, disableFreeSolo: true }),
        attributes: {
            lg: 6
        },
        manageState: true
    },
    {
        item: propertyList.ContactName,
        attributes: {
            lg: 4,
            className: 'bg-secondary-subtle'
        }
    },
    {
        item: propertyList.ContactNumber,
        inputMode: INPUT_TYPE_TEL,
        attributes: {
            lg: 4,
            className: 'bg-secondary-subtle'
        }
    },
    {
        item: propertyList.ContactEmail,
        inputMode: INPUT_TYPE_EMAIL,
        attributes: {
            lg: 4,
            className: 'bg-secondary-subtle'
        }
    },
    {
        item: propertyList.description,
        attributes: {
            lg: 12
        },
        extraProps: {
            multiline: true,
            rows: 2
        }
    }
]

export const CreateContact = [
    {
        item: propertyList.CustomerDropDown,
        attributes: {
            lg: 8
        }
    },
    {
        item: propertyList.City,
        attributes: {
            lg: 4
        }
    },
    {
        item: propertyList.name,
        attributes: {
            lg: 8,
            className: 'bg-secondary-subtle'
        }
    },
    {
        item: propertyList.role,
        attributes: {
            lg: 4,
            className: 'bg-secondary-subtle'
        }
    },
    {
        item: propertyList.phoneNumber,
        inputMode: INPUT_TYPE_TEL,
        attributes: {
            lg: 6,
            className: 'bg-secondary-subtle'
        }
    },
    {
        item: propertyList.email,
        inputMode: INPUT_TYPE_EMAIL,
        attributes: {
            lg: 6,
            className: 'bg-secondary-subtle'
        }
    },
    {
        item: propertyList.ContactGender,
        mode: INPUT_TYPE_NONE,
        attributes: {
            lg: 6,
            className: 'bg-secondary-subtle'
        }
    },
]

export const createFirm = [
    {
        item: propertyList.firmName,
        attributes: {
            lg: 12
        }
    },
    {
        item: propertyList.firmId,
        attributes: {
            lg: 6
        },
        inputFieldClass: " text-uppercase ",
        manageState: true
    },
    {
        item: propertyList.firmPanNumber,
        attributes: {
            lg: 6
        },
        inputFieldClass: " text-uppercase ",
        manageState: true
    },
    {
        item: propertyList.GSTIN,
        attributes: {
            lg: 6
        },
        inputFieldClass: " text-uppercase ",
        manageState: true
    },
    {
        item: propertyList.phoneNumber,
        attributes: {
            lg: 6
        },
    },
    {
        item: propertyList.email,
        attributes: {
            lg: 6
        },
    },
    {
        item: propertyList.Address,
        attributes: {
            lg: 12
        },
        extraProps: {
            multiline: true,
            rows: 2
        }
    },
    {
        item: propertyList.City,
        attributes: {
            lg: 6
        }
    },
    {
        item: propertyList.Pincode,
        inputMode: INPUT_TYPE_NUM,
        attributes: {
            lg: 6
        }
    },
    {
        item: propertyList.FirmImage
    },
]

export const editFirm = [
    ...createFirm,
    {
        item: propertyList.defaultvalues,
        attributes: {
            lg: 12
        }
    },
]

export const firmDefaultValues = [
    {
        item: propertyList.AutoRemoveRemaining,
        attributes: {
            md: 6
        }
    }, {
        item: propertyList.lockInquiry,
        attributes: {
            md: 6
        }
    }, {
        item: propertyList.editSaleRate,
        attributes: {
            md: 6
        }
    }, {
        item: propertyList.useFormat,
        manageState: true,
        attributes: {
            md: 6
        }
    },
    {
        item: getUpdatedProp(propertyList.productHsnCode, { required: false }),
        attributes: {
            md: 6
        }
    }, {
        item: propertyList.defaultGST,
        attributes: {
            md: 6
        }
    },
    {
        item: propertyList.DefaultBankDropDown,
        manageState: true,
        attributes: {
            md: 6
        }
    },
    propertyGroups.gst_group,
]

export const joinFirm = [
    {
        item: propertyList.firmId
    }
]

export const emailAndPassword = [
    {
        item: propertyList.userPhoneNumber,
        className: "col-12",
        inputMode: INPUT_TYPE_TEL,
    },
    {
        item: propertyList.userPassword,
        className: "col-12"
    }
]

export const userRegister = [
    {
        item: propertyList.PhoneNumber,
        inputMode: INPUT_TYPE_TEL,
        className: "col-12 justify-content-center"

    },
    {
        item: propertyList.Full_NAME,
        className: "col-12 justify-content-center"
    },
    {
        item: propertyList.Password,
        className: "col-12 justify-content-center"
    }
]

export const inquirySource = [
    { item: propertyList.sourceName }
]

export const discountSlabPropList = [
    {
        item: getUpdatedProp(propertyList.name, { displayName: 'Discount Slab Name' }),
        attributes: {
            lg: 6
        }
    }, {
        item: propertyList.discountRate,
        inputMode: INPUT_TYPE_NUM,
        attributes: {
            lg: 6
        }
    }, {
        item: propertyList.description,
        attributes: {
            lg: 12
        },
        extraProps: {
            multiline: true,
            rows: 2
        }
    },
]

export const createUser = [
    {
        item: getUpdatedProp(propertyList.firmId, { displayName: 'Company Id' }),
        attributes: {
            lg: 4
        },
    },
    {
        item: getUpdatedProp(propertyList.name, { name: 'displayName', displayName: 'Employee Name' }),
        attributes: {
            lg: 8
        },
    },
    {
        item: getUpdatedProp(propertyList.phoneNumber, { displayName: 'Contact No.', helperText: 'Enter Valid Contact No' }),
        attributes: {
            lg: 4
        },
    },
    {
        item: propertyList.email,
        attributes: {
            lg: 4
        },
    },
    {
        item: propertyList.birthDate,
        attributes: {
            lg: 4
        }
    },
    {
        item: propertyList.Address,
        attributes: {
            lg: 6
        }
    },
    {
        item: propertyList.City,
        attributes: {
            lg: 3
        }
    },
    {
        item: propertyList.Pincode,
        attributes: {
            lg: 3
        }
    },
]

export const updateUser = [
    {
        item: getUpdatedProp(propertyList.birthDate, { displayName: 'Joining Date', name: 'joiningDate' }),
        attributes: {
            lg: 4
        },
    },
]

export const customDiscountPlan = {
    DiscountSlabDropdown: {
        item: propertyList.DiscountSlabDropdown,
        attributes: {
            lg: 6
        },
        manageState: true
    },
    discountPrice: {
        item: propertyList.discountPrice,
        inputMode: INPUT_TYPE_NUM,
        attributes: {
            lg: 6
        },
    },
}

export const discountProps = [
    {
        ...customDiscountPlan.DiscountSlabDropdown
    },
    {
        ...customDiscountPlan.discountPrice
    }
]


export const updateUserList = [
    {
        attributes: {
            md: 8
        },
        list: [...createUser, ...updateUser]
    },
    {
        attributes: {
            md: 4
        },
        list: [propertyGroups.level_group]
    }
]

export const TermsArray = [
    {
        item: propertyList.paymentTerms,
        attributes: {
            lg: 6
        },
    },
    {
        item: propertyList.transportTerms,
        attributes: {
            lg: 6
        },
    },
    {
        item: propertyList.otherTnC,
        attributes: {
            lg: 12
        },
    },
]

export const bankPropertyList = {
    BankName: {
        displayName: "Bank Name",
        name: "name",
        type: SchemaTypes.String,
        required: true,
        helperText: 'Please enter the Bank Name'
    },

    branch: {
        displayName: "Branch",
        name: "bankbranch",
        type: SchemaTypes.String,
        required: true,
        helperText: 'Please enter the Branch Name'
    },

    account: {
        displayName: "Account #",
        name: "bankaccount",
        type: SchemaTypes.Number,
        required: true,
        helperText: 'Please enter the Bank Account Number'
    },

    ifsc: {
        displayName: "IFSC",
        name: "ifsc",
        type: SchemaTypes.IFSC_CODE,
        required: true,
        helperText: 'Please enter the Bank Ifsc code'
    },
    UPI: {
        displayName: "UPI ID",
        name: "upiID",
        type: SchemaTypes.String,
        helperText: 'Please enter the Bank upi id',
        required: true
    },
}

export const bankAccountProp = [
    {
        item: bankPropertyList.BankName,
        attributes: {
            lg: 6
        },
    }, {
        item: bankPropertyList.branch,
        attributes: {
            lg: 6
        },
    }, {
        item: bankPropertyList.account,
        inputMode: INPUT_TYPE_NUM,
        attributes: {
            lg: 6
        },
    }, {
        item: bankPropertyList.ifsc,
        attributes: {
            lg: 6
        },
        inputFieldClass: " text-uppercase ",
    },
    {
        item: bankPropertyList.UPI,
        attributes: {
            lg: 6
        },
    }
]

export const getChallanPropList = (disableProps) => {
    const disablePros = (prop) => disableProps ? getUpdatedProp(prop, { type: SchemaTypes.LABELED_TEXT }) : prop;

    const CreateChallanPropList = [
        {
            item: propertyList.ChallanID,
            attributes: {
                lg: 6
            },
            direction: 'row'
        },
        {
            item: propertyList.Date,
            attributes: {
                lg: 6
            },
            direction: 'row',
            headTextAlign: 'end',
            bodyTextAlign: 'center'
        },
        {
            item: disablePros(getUpdatedProp(propertyList.PartyDropDown, { displayName: 'Party Name', required: true })),
            attributes: {
                lg: 4
            },
            manageState: true
        },
        {
            item: disablePros(propertyList.projectName),
            attributes: {
                lg: 4
            },
        },
        {
            item: disablePros(propertyList.PoNumber),
            attributes: {
                lg: 4
            },
        },
        {
            item: propertyList.vehicalNo,
            attributes: {
                lg: 4
            },
        },
        {
            item: propertyList.driverName,
            attributes: {
                lg: 4
            },
        },
        {
            item: propertyList.eWayBill,
            attributes: {
                lg: 4
            },
        }
    ]

    return CreateChallanPropList
}