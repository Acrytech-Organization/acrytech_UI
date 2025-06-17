import { Route, Routes } from "react-router-dom";
import CreateFirmForm from '../Firm/CreateFirmForm';
import CreateCustomerForm from "../Party/CreateCustomerForm"
import Users from "../User/User";
import GenericLayout from "../GenericComponents/Layout/GenericLayout";
import PageNotFound from "../Errors/PageNotFound";
import { UserRoles } from "../UserRoles/UserRoles";
import Joinfirm from "../Firm/JoinFirm";
import JoinFirmMessage from "../Firm/JoinFirmMessage";
import { EditUserRole } from "../UserRoles/EditUserRoles";
import FirmListSelected from "../Dashboard/FirmListSelected";
import { EditParty } from "../Party/EditParty";
import InquirySources from "../Sources/InquirySources";
import { BulkPartyCreation } from "../GenericComponents/XlsxFileReader/BulkPartyCreation";
import { BulkProductCreation } from "../GenericComponents/XlsxFileReader/BulkProductCreation";
import {
    MANAGE_CUSTOMERS,
    NEW_LEAD,
    CREATEFIRM,
    CREATEPARTY,
    REQUIREMENT,
    JOINFIRM,
    NEW_USERS,
    NEW_PRODUCTS,
    NEW_USERROLES,
    JOINFIRMMSG,
    EDITUSERROLE,
    EDITPARTY,
    EDITPRODUCT,
    NEW_INQUIRY_SOURCE,
    INQUIRY_STATE,
    CREATE_NEW_INQUIRY,
    FIRMS_CHECK,
    HOME,
    CREATEPRODUCT,
    CREATEUSERROLE,
    CREATEINQUIRYSOURCE,
    EDIT_INQUIRY,
    FIX_BREAKING_CHANGE,
    ADD_VALUES_TO_FIRM,
    EDITINQUIRYSOURCE,
    REJECTED_INQUIRY,
    GENERATE_QUOTATION,
    CLOSED_INQUIRY,
    GENERATE_REQUIREMENT,
    QUOTATION,
    NEW_PRODUCTION,
    NEW_ORDER,
    CREATE_NEW_ORDER,
    EDITORDER,
    REPORTS,
    PRODUCT_TYPE_FINISHED,
    NEW_PRODUCTS_RAW,
    PRODUCT_TYPE_PROCESS,
    NEW_PRODUCTS_PROCESS,
    PRODUCT_TYPE_RAW,
    CUSTOM_FIRMS,
    INWORD_RM_STOCK,
    NEW_DISCOUNT,
    CREATE_DISCOUNT,
    STOCK_MANAGEMENT,
    CREATE_USER,
    CONVERTED,
    QUOTED,
    ONBOARDING,
    ADD_DESIGN_FILE,
    NEW_QUALITY_CHECK,
    OPEN_INQUIRIES,
    OPEN,
    STOCK_STMT,
    MANAGE_VENDORS,
    CREATEVENDOR,
    VIEWPRODUCTION,
    DESIGN,
    MARK_QUALITY,
    GENERATE_INVOICE,
    REASSIGN_INQUIRY,
    DELIVERY_AND_INVOICE_MANAGEMENT,
    INQUIRY_DETAIL,
    CUSTOMER_FOLLOWUP,
    CREATE_IN_CHALLAN,
    CREATE_OUT_CHALLAN,
    INWORD_CHALLAN,
    OUTWORD_CHALLAN,
    DISPLAY_CHALLAN,
    NEW_INWORD_CHALLAN,
    NEW_OUTWORD_CHALLAN,
    EDIT_FIRM,
    ADD_BANK,
    NOTIFICATION_PAGE,
    reassignInquiryDetails,
    BANK_DETAIL,
    EDIT_BANK_ACCOUNT,
    INVOICES,
    UPDATE_ON_PRODUCT,
    CREATE_INTERNAL_ORDER,
    SET_QUOTE_TERMS,
    WA_ALL_MESSAGE,
    VIEW_INSPECTION,
    CLEAN_UP,
    STOCK,
    PRODUCTION,
    INWORD_FG_STOCK,
    USE_TERMS,
    USE_PRIVACY,
    USE_REFUND,
    QUALITY,
    GENERATE_BOM,
    CUSTOMER_INFO,
    DISPATCH,
    CREATE_IN_SF_CHALLAN,
    CREATE_OUT_INVOICE,
    MANAGE_LABOURS,
    ADDINVOICE,
    CREATELABOUR,
    ADDLABOURHR,
    CREATE_OUT_SF_CHALLAN,
    MAKE_PAYMENT,
    INQUIRY_REPORT,
    EDITPORDER,
    PURCHASE_ORDER,
    poOrderRouteDetails,
    CREATEPO,
    BULK_PRODUCT_UPLOAD,
    VIEW_PO,
    CHANGE_DOC_SERIES,
    ALL_INQUIRIES,
    PROD_REPORTS,
    MONTH_REPORTS,
    PLAN_DETAILS,
} from "../../Helpers/ConstantProperties";
import CreateProduct from "../Product/CreateProduct";
import CreateUserRole from "../UserRoles/CreateUserRole";
import CreateInquirySource from "../Sources/CreateInquirySource";
import { EditInquiry } from "../Inquiry/EditInquiry";
import { ManageProduct } from "../Product/ManageProduct";
import FixBreakingChange from "../Firm/FixBreakingChange";
import EditFirm from "../Firm/EditFirm";
import { EditInquirySource } from "../Sources/EditInquirySource";
import GenerateRequirement from "../Requirement/GenerateRequirement";
import CreateOrder from "../Order/CreateOrder";
import CreateOpenInquiry from "../Inquiry/CreateOpenInquiry";
import { EditOrderComponent } from "../Order/EditOrderComponent";
import Reports from "../Reports/Report";
import CreateDefaultFirms from "../Firm/CreateDefaultFirms";
import Discount from "../Discount/Discount";
import CreateDiscount from "../Discount/CreateDiscount";
import CreateUser from "../User/CreateUser";
import { DashBoardController } from "../Dashboard/DashBoardController";
import { CLOSED_INQUIRY_TAG, INQUIRY_REJECT_TAG, PO_TAG } from "../../Helpers/ExtraProperties";
import StockBalance from "../Product/StockBalance";
import Customers from "../Party/Customers";
import Vendors from "../Party/Vendors";
import CreateVendorForm from "../Party/CreateVendorForm";
import ProductionDetails from "../Production/ProductionDetails";
import InwordRMStock from "../Product/InwordRMStock";
import { InqFilterForManageRM, InqFilterForOrder, InqFilterForQuotation } from "../../Helpers/helpers";
import InquiryList from "../Dashboard/InquiryList";
import MarkQuality from "../Qualikty Check/MarkQuality";
import InvoicePage from "../TaxInvoice/InvoicePage";
import { inquiryRouteDetails, orderRouteDetails } from "../../Helpers/ConstantProperties";
import { InquiryInformation } from "../Inquiry/InquiryInformation";
import { CustomerDashboard } from "../Customer/CustomerDashboard";
import CreateChallan from "../Challan/CreateChallan";
import DisplayChallan from "../Challan/DisplayChallan";
import Challan from "../Challan/Challan";
import Invoices from "../TaxInvoice/Invoices";
import AddBankAccount from "../Bank/AddBankAccount";
import BankAccounts from "../Bank/BankAccounts";
import { EditBankAccount } from "../Bank/EditBankAccount";
import NotificationPage from "../Nav/NotificationPage";
import { CreateInternalOrder } from "../Order/CreateInternalOrder";
import SetQuoteTerms from "../Quotation/SetQuoteTerms";
import Terms from "../GenericComponents/Footer/terms";
import PrivacyPolicy from "../GenericComponents/Footer/privacy";
import RefundPolicy from "../GenericComponents/Footer/refund";
import AllWAChat from "../Messages/AllWAChat";
import CreateInspectionReport from "../InspectionReport/CreateInpectionReport";
import { CleanUp } from "../AssignFinishGood/CleanUpProduct";
import InwordFGStock from "../Product/InwordFGStock";
import { PartyTabs } from "../Party/PartyTabs";
import InquiryOutInv from "../Challan/InquiryOutInv";
import InqInChallan from "../Challan/inqInChallan";
import BOMController from "../Quotation/BOMController";
import InquiryExpensesCost from "../Dashboard/inquiryExpencesCost";
import QuotationController from "../Quotation/QuotationController";
import Labours from "../Party/Labours";
import CreateLabourForm from "../Party/CreateLabourForm";
import InquiryLabourCost from "../Dashboard/inquiryLabourCost";
import { MakePayment } from "./MakePayment";
import InqOutChallan from "../Challan/inqOutChallan";
import InquiryReport from "../Dashboard/InquiryReport";
import EditPO from "../Party/EditPO";
import CreatePurchaseOrder from "../Party/CreatePurchaseOrder";
import GeneratePo from "../Stock/GeneratePo";
import ChangeDocSeries from "../Firm/ChangeDocSeriese";
import Home from "../Home/Home";
import TempFixService from "../Accounts/TempFixService";
import DailyProduction from "../Reports/Production/DailyProduction";
import MonthlyReport from "../Reports/INR/MonthlyReport";
import InquiryStock from "../Dashboard/InquiryStock";
import GetExcelReport from "../TaxInvoice/GetExcelReport";

function Routers() {
    return (
        <Routes>
            <Route
                path={FIRMS_CHECK}
                element={
                    <GenericLayout
                        Component={<FirmListSelected />}
                        needsFirmSelected={false}
                    />
                }
            />
            <Route
                path={MANAGE_CUSTOMERS}
                element={
                    <GenericLayout
                        Component={<Customers />}
                    />
                }
            />
            <Route
                path={MANAGE_VENDORS}
                element={
                    <GenericLayout
                        Component={<Vendors />}
                    />
                }
            />

            <Route
                path={MANAGE_LABOURS}
                element={
                    <GenericLayout
                        Component={<Labours />}
                    />
                }
            />

            <Route
                path={CREATELABOUR}
                element={
                    <GenericLayout
                        Component={<CreateLabourForm />}
                    />
                }
            />

            <Route
                path={NEW_LEAD}
                element={
                    <GenericLayout
                        Component={<DashBoardController />}
                    />
                }
            />

            <Route
                path={HOME}
                element={
                    <GenericLayout
                        Component={<Home />}
                    />
                }
            />

            <Route
                path={ALL_INQUIRIES}
                element={
                    <GenericLayout
                        Component={<InquiryList routeDetails={inquiryRouteDetails} />}
                    />
                }
            />
            <Route
                path={CREATEFIRM}
                element={
                    <GenericLayout
                        Component={<CreateFirmForm />}
                        needsFirmSelected={false}
                    />
                }
            />
            <Route
                path={CREATEPARTY}
                element={
                    <GenericLayout
                        Component={<CreateCustomerForm />}
                    />
                }
            />
            <Route
                path={CREATEVENDOR}
                element={
                    <GenericLayout
                        Component={<CreateVendorForm />}
                    />
                }
            />
            <Route
                path={STOCK_STMT}
                element={
                    <GenericLayout Component={<StockBalance />} />
                }
            />
            <Route
                path={INWORD_RM_STOCK}
                element={
                    <GenericLayout Component={<InwordRMStock />} />
                }
            />

            <Route
                path={INWORD_FG_STOCK}
                element={
                    <GenericLayout Component={<InwordFGStock />} />
                }
            />

            <Route
                path={JOINFIRM}
                element={
                    <GenericLayout
                        Component={<Joinfirm />}
                        needsFirmSelected={false}
                    />
                }
            />
            <Route
                path={NOTIFICATION_PAGE}
                element={
                    <GenericLayout
                        Component={<NotificationPage />}
                    />
                }
            />
            <Route
                path={NEW_USERS}
                element={
                    <GenericLayout
                        Component={<Users />}
                    />
                }
            />
            <Route
                path="*"
                element={
                    <PageNotFound />
                }
            />

            <Route
                path={CREATEPRODUCT}
                element={
                    <GenericLayout
                        Component={<CreateProduct />}
                    />
                }
            />

            <Route
                path={NEW_USERROLES}
                element={
                    <GenericLayout
                        Component={<UserRoles />}
                    />
                }
            />

            <Route
                path={CREATEUSERROLE}
                element={
                    <GenericLayout
                        Component={<CreateUserRole />}
                    />
                }
            />

            <Route
                path={JOINFIRMMSG}
                element={
                    <GenericLayout
                        Component={<JoinFirmMessage />}
                        needsFirmSelected={false}
                    />
                }
            />

            <Route
                path={EDITUSERROLE}
                element={
                    <GenericLayout
                        Component={<EditUserRole />}
                    />
                }
            />

            <Route
                path={EDITPARTY}
                element={
                    <GenericLayout
                        Component={<EditParty />}
                    />
                }
            />

            <Route
                path={EDITPRODUCT}
                element={
                    <GenericLayout
                        Component={<CreateProduct />}
                    />
                }
            />
            <Route
                path={NEW_INQUIRY_SOURCE}
                element={
                    <GenericLayout
                        Component={
                            <InquirySources />}
                    />
                }
            />

            <Route
                path={CREATEINQUIRYSOURCE}
                element={
                    <GenericLayout
                        Component={
                            <CreateInquirySource />}
                    />
                }
            />

            <Route
                path={INQUIRY_STATE}
                element={
                    <GenericLayout
                        Component={<DashBoardController />}
                    />
                }
            />

            <Route
                path={CREATE_NEW_INQUIRY}
                element={
                    <GenericLayout
                        Component={<CreateOpenInquiry />}
                    />
                }
            />

            <Route
                path={EDIT_INQUIRY}
                element={
                    <GenericLayout
                        Component={<EditInquiry />}
                    />
                }
            />

            <Route
                path={VIEWPRODUCTION}
                element={
                    <GenericLayout
                        Component={<ProductionDetails />}
                    />
                }
            />


            <Route
                path={NEW_PRODUCTS}
                element={
                    <GenericLayout
                        Component={<ManageProduct productType={PRODUCT_TYPE_FINISHED} />}
                    />
                }
            />

            <Route
                path={NEW_PRODUCTS_RAW}
                element={
                    <GenericLayout
                        Component={<ManageProduct productType={PRODUCT_TYPE_RAW} navigateTo={NEW_PRODUCTS_RAW} />}
                    />
                }
            />

            <Route
                path={NEW_PRODUCTS_PROCESS}
                element={
                    <GenericLayout
                        Component={<ManageProduct productType={PRODUCT_TYPE_PROCESS} navigateTo={NEW_PRODUCTS_PROCESS} />}
                    />
                }
            />


            <Route
                path={"/BulkPartyCreation"}
                element={
                    <GenericLayout
                        Component={<BulkPartyCreation />}
                    />
                }
            />

            <Route
                path={BULK_PRODUCT_UPLOAD}
                element={
                    <GenericLayout
                        Component={<BulkProductCreation />}
                    />
                }
            />

            <Route
                path={FIX_BREAKING_CHANGE}
                element={
                    <GenericLayout
                        Component={<FixBreakingChange />}
                    />
                }
            />

            <Route
                path={ADD_VALUES_TO_FIRM}
                element={
                    <GenericLayout
                        Component={<EditFirm />}
                    />
                }
            />


            <Route
                path={CHANGE_DOC_SERIES}
                element={
                    <GenericLayout
                        Component={<ChangeDocSeries />}
                    />
                }
            />



            <Route
                path={EDIT_FIRM}
                element={
                    <GenericLayout
                        Component={<EditFirm showDefault={true} />}
                    />
                }
            />

            <Route
                path={EDITINQUIRYSOURCE}
                element={
                    <GenericLayout
                        Component={<EditInquirySource />}
                    />
                }
            />

            <Route
                path={GENERATE_QUOTATION}
                element={
                    <GenericLayout
                        Component={<QuotationController />}
                    />
                }
            />

            <Route
                path={GENERATE_BOM}
                element={
                    <GenericLayout
                        Component={<BOMController />}
                    />
                }
            />

            <Route
                path={REJECTED_INQUIRY}
                element={
                    <GenericLayout
                        Component={<InquiryList filterObject={{ tag: INQUIRY_REJECT_TAG }} />}
                    />
                }
            />

            <Route
                path={CREATEPO}
                element={
                    <GenericLayout
                        Component={<CreatePurchaseOrder />}
                    />
                }
            />

            <Route
                path={VIEW_PO}
                element={
                    <GenericLayout
                        Component={<GeneratePo />}
                    />
                }
            />

            <Route
                path={PURCHASE_ORDER}
                element={
                    <GenericLayout
                        Component={<InquiryList routeDetails={poOrderRouteDetails}
                            filterObject={{ tag: PO_TAG }} />}
                    />
                }
            />

            <Route
                path={CLOSED_INQUIRY}
                element={
                    <GenericLayout
                        Component={<InquiryList filterObject={{ tag: CLOSED_INQUIRY_TAG }} />}
                    />
                }
            />

            <Route
                path={INQUIRY_REPORT}
                element={
                    <GenericLayout
                        Component={<InquiryReport />}
                    />
                }
            />

            <Route
                path={REQUIREMENT}
                element={
                    <GenericLayout
                        Component={<InquiryList
                            filterFunction={InqFilterForManageRM}
                            customQueryKey={[UPDATE_ON_PRODUCT, ONBOARDING]} />}
                    />
                }
            />

            <Route
                path={GENERATE_REQUIREMENT}
                element={
                    <GenericLayout
                        Component={<GenerateRequirement />}
                    />
                }
            />

            <Route
                path={ADDLABOURHR}
                element={
                    <GenericLayout
                        Component={<InquiryLabourCost />}
                    />
                }
            />

            <Route
                path={ADDINVOICE}
                element={
                    <GenericLayout
                        Component={<InquiryExpensesCost />}
                    />
                }
            />

            <Route
                path={SET_QUOTE_TERMS}
                element={
                    <GenericLayout
                        Component={<SetQuoteTerms />}
                    />
                }
            />

            <Route
                path={QUOTATION}
                element={
                    <GenericLayout
                        Component={<InquiryList
                            filterFunction={InqFilterForQuotation}
                            customQueryKey={[QUOTED]}
                            routeDetails={{ path: QUOTATION }} />}
                    />
                }
            />

            <Route
                path={NEW_PRODUCTION}
                element={
                    <GenericLayout
                        Component={
                            <InquiryList
                                filterObject={{ status: CONVERTED, prodNeeded: true }}
                                customQueryKey={[PRODUCTION]} />}
                    />
                }
            />

            <Route
                path={STOCK_MANAGEMENT}
                element={
                    <GenericLayout
                        Component={
                            <InquiryList
                                filterObject={{ status: CONVERTED, storeNeeded: true }}
                                customQueryKey={[STOCK]} />}
                    />
                }
            />

            <Route
                path={NEW_ORDER}
                element={
                    <GenericLayout
                        Component={
                            <InquiryList
                                routeDetails={orderRouteDetails}
                                filterFunction={InqFilterForOrder}
                                customQueryKey={[CONVERTED]}
                            />
                        }
                    />
                }
            />

            <Route
                path={ADD_DESIGN_FILE}
                element={
                    <GenericLayout
                        Component={
                            <InquiryList
                                filterObject={{ status: CONVERTED, designNeeded: true }}
                                customQueryKey={[DESIGN]} />}
                    />
                }
            />

            <Route
                path={NEW_QUALITY_CHECK}
                element={
                    <GenericLayout
                        Component={<InquiryList
                            filterObject={{ status: CONVERTED, qcNeeded: true }}
                            customQueryKey={[QUALITY]} />}
                    />
                }
            />

            <Route
                path={DELIVERY_AND_INVOICE_MANAGEMENT}
                element={
                    <GenericLayout
                        Component={<InquiryList
                            filterObject={{ status: CONVERTED, readyToDispatch: true }}
                            customQueryKey={[DISPATCH]} />}
                    />
                }
            />

            <Route
                path={MARK_QUALITY}
                element={
                    <GenericLayout
                        Component={<MarkQuality />}
                    />
                }
            />

            <Route
                path={OPEN_INQUIRIES}
                element={
                    <GenericLayout
                        Component={
                            <InquiryList
                                routeDetails={{ ...inquiryRouteDetails, path: OPEN_INQUIRIES }}
                                filterObject={{ status: OPEN }}
                                customQueryKey={[OPEN]} />}
                    />
                }
            />

            <Route
                path={CREATE_NEW_ORDER}
                element={
                    <GenericLayout
                        Component={<CreateOrder />}
                    />
                }
            />

            <Route
                path={EDITORDER}
                element={
                    <GenericLayout
                        Component={<EditOrderComponent />}
                    />
                }
            />

            <Route
                path={MONTH_REPORTS}
                element={
                    <GenericLayout
                        Component={<MonthlyReport />}
                    />
                }
            />

            <Route
                path={PROD_REPORTS}
                element={
                    <GenericLayout
                        Component={<DailyProduction />}
                    />
                }
            />

            <Route
                path={REPORTS}
                element={
                    <GenericLayout
                        Component={<Reports />}
                    />
                }
            />

            <Route
                path={CUSTOM_FIRMS}
                element={
                    <GenericLayout
                        Component={<CreateDefaultFirms />}
                        needsFirmSelected={false}
                    />
                }
            />
            <Route
                path={ADD_BANK}
                element={
                    <GenericLayout
                        Component={<AddBankAccount />}
                    />
                }
            />

            <Route
                path={BANK_DETAIL}
                element={
                    <GenericLayout
                        Component={<BankAccounts />}
                    />
                }
            />

            <Route
                path={EDIT_BANK_ACCOUNT}
                element={
                    <GenericLayout
                        Component={<EditBankAccount />}
                    />
                }
            />

            <Route
                path={NEW_DISCOUNT}
                element={
                    <GenericLayout
                        Component={< Discount />}
                    />
                }
            />

            <Route
                path={CREATE_DISCOUNT}
                element={
                    <GenericLayout
                        Component={< CreateDiscount />}
                    />
                }
            />

            <Route
                path={GENERATE_INVOICE}
                element={
                    <GenericLayout
                        Component={<InvoicePage />}
                    />
                }
            />

            <Route
                path={INVOICES}
                element={
                    <GenericLayout
                        Component={<Invoices />}
                    />
                }
            />

            <Route
                path={CREATE_USER}
                element={
                    <GenericLayout
                        Component={< CreateUser />}
                        needsFirmSelected={false}
                    />
                }
            />

            <Route
                path={WA_ALL_MESSAGE}
                element={
                    <GenericLayout
                        Component={<AllWAChat />}
                    />
                }
            />

            <Route
                path={REASSIGN_INQUIRY}
                element={
                    <GenericLayout
                        Component={<InquiryList routeDetails={reassignInquiryDetails} />}
                    />
                }
            />

            <Route
                path={INQUIRY_DETAIL}
                element={
                    <GenericLayout
                        Component={<InquiryInformation />}
                    />
                }
            />

            <Route
                path={PLAN_DETAILS}
                element={
                    <GenericLayout
                        Component={<InquiryStock />}
                    />
                }
            />

            <Route
                path={CUSTOMER_INFO}
                element={
                    <GenericLayout
                        Component={<PartyTabs />}
                    />
                }
            />

            <Route
                path={CUSTOMER_FOLLOWUP}
                element={
                    <GenericLayout
                        Component={<CustomerDashboard />}
                    />
                }
            />

            <Route
                path={CREATE_IN_CHALLAN}
                element={
                    <GenericLayout
                        Component={<CreateChallan type={INWORD_CHALLAN} />}
                    />
                }
            />

            <Route
                path={CREATE_OUT_CHALLAN}
                element={
                    <GenericLayout
                        Component={<CreateChallan type={OUTWORD_CHALLAN} />}
                    />
                }
            />

            <Route
                path={CREATE_OUT_INVOICE}
                element={
                    <GenericLayout
                        Component={<InquiryOutInv />}
                    />
                }
            />

            <Route
                path={CREATE_OUT_SF_CHALLAN}
                element={
                    <GenericLayout
                        Component={<InqOutChallan />}
                    />
                }
            />

            <Route
                path={CREATE_IN_SF_CHALLAN}
                element={
                    <GenericLayout
                        Component={<InqInChallan />}
                    />
                }
            />

            <Route
                path={DISPLAY_CHALLAN}
                element={
                    <GenericLayout
                        Component={<DisplayChallan />}
                    />
                }
            />

            <Route
                path={USE_TERMS}
                element={
                    <GenericLayout
                        Component={<Terms />}
                        needsFirmSelected={false}
                    />
                }
            />

            <Route
                path={USE_PRIVACY}
                element={
                    <GenericLayout
                        Component={<PrivacyPolicy />}
                        needsFirmSelected={false}
                    />
                }
            />

            <Route
                path={USE_REFUND}
                element={
                    <GenericLayout
                        Component={<RefundPolicy />}
                        needsFirmSelected={false}
                    />
                }
            />

            <Route
                path={NEW_INWORD_CHALLAN}
                element={
                    <GenericLayout
                        Component={<Challan type={INWORD_CHALLAN} natigateTo={CREATE_IN_CHALLAN} />}
                    />
                }
            />

            <Route
                path={NEW_OUTWORD_CHALLAN}
                element={
                    <GenericLayout
                        Component={<Challan type={OUTWORD_CHALLAN} natigateTo={CREATE_OUT_CHALLAN} />}
                    />
                }
            />

            <Route
                path={CLEAN_UP}
                element={
                    <GenericLayout
                        Component={
                            <CleanUp />
                        }
                    />
                }
            />

            <Route
                path={CREATE_INTERNAL_ORDER}
                element={
                    <GenericLayout
                        Component={<CreateInternalOrder />}
                    />
                }
            />

            <Route
                path={"/InvoiceToExcel"}
                element={
                    <GenericLayout
                        Component={<GetExcelReport />}
                    />
                }
            />

            <Route
                path={VIEW_INSPECTION}
                element={
                    <GenericLayout
                        Component={<CreateInspectionReport />}
                    />
                }
            />
            <Route
                path={MAKE_PAYMENT}
                element={
                    <GenericLayout
                        Component={<MakePayment />}
                    />
                }
            />

            <Route
                path={EDITPORDER}
                element={
                    <GenericLayout
                        Component={<EditPO />}
                    />
                }
            />

            <Route
                path={"/serviceFix"}
                element={
                    <GenericLayout
                        Component={<TempFixService />}
                    />
                }
            />

        </Routes>
    );
}

export default Routers;
