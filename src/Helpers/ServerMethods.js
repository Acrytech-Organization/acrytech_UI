import {
    Khatavani,
    Accounts,
    Balance,
    Files,
    ResourceGroups,
    Resources,
    Transactions,
    UserRoles,
    Users,
    Vouchers,
    UploadData,
    Batch,
    Serialized,
    Messages,
    WAID,
    PAYMENT,
    Markers,
    Packages
} from "khatavani-client";
import { BANK_ACCOUNT_TAG, CLOSED_INQUIRY_TAG, CONTACT, INQUIRY_TAG, INWORD_VOUCHER_TYPE, PARTY_TAG, PRODUCT_TAG } from "./ExtraProperties";
import { STATE_UPDATE_RESOURCE_ID, CLOSED, COMMON_BATCH, CUSTOMER, INPROGRESS_INQUIRY_RESOURCE_ID, INQUIRY, INQUIRY_SOURCE, INQUIRY_VOUCHER_TYPE, OPEN, VENDOR, AccountsToCreate, DELETE_FIELD, CONVERTED, DISCOUNT_SLAB_TAG, INQUIRY_STORE_ACCOUNT_ID, RMLIST, userLevels, STORE_MANAGER_USER_LEVEL_ID, PRODUCTION_MANAGER_USER_LEVEL_ID, QUOTATION_READY, ResourcesToCreate, PRODUCT_TYPE_RAW, PRODUCT_TYPE_PROCESS, PROCESSESS, REFERANCE_ID, REFERANCE, PRODUCT_TYPE_CUSTOM, NUMBERS, PRODUCT_TYPE_FINISHED, QC_STORE_ACCOUNT_ID, STORE_VOUCHER, IGNORED_ID, QC_MANAGER_USER_LEVEL_ID, TAX_INVOICE, LABOURS, INR_RESOURCE_ID, LABOUR_VOUCHER_TYPE, EXTERNAL_VOUCHER_TYPE, ACCOUNT_USER_LEVEL_ID } from "./ConstantProperties";
import { CONTENT_TYPE, StoreFileToSession, addBalancePerInquiryProduct, addDaysToToday, createServerErrorMsg, differentiateArrays, fileMetaDataObject, getDistibutedBatches, getProductFiltered, getProductIDResourceID, getProductTransactionArray, getProductVoucher, getRequirementVoucherObject, getResourceObject, inwordIdWithDate, returnUniqueResource, returnUniqueResourceProcess } from "./helpers";
import { v4 as uuidv4 } from 'uuid';
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { updateRequiredPropsForOrder } from "./customHelper";
import { defaultPrefixes } from "../Components/Firm/ChangeDocSeriese";
import { auth } from "../firebaseHelper/firebaseConfigForServer";

export const getToken = async () => {
    return await auth.currentUser?.getIdToken();
}

const serviceEndpoints = {
    KhatavaniEndpoint: Khatavani(),

    UsersEndpoint: Users(),

    ResourcesEndpoint: Resources(),

    AccountsEndpoint: Accounts(),

    VouchersEndpoint: Vouchers(),

    TransactionsEndpoint: Transactions(),

    ResourceGroupsEndpoint: ResourceGroups(),

    UserRolesEndpoint: UserRoles(),

    BalanceEndpoint: Balance(),

    FileEndpoint: Files(),

    BatchEndpoint: Batch(),

    SerializedEndpoint: Serialized(),

    MessageEndpoint: Messages(),

    WAIDEndpoint: WAID(),

    PaymentEndpoint: PAYMENT(),

    MarkerEndpoint: Markers(),

    PackagesEndpoint: Packages()
}

export class serverMethods {

    async getRechargePackages(khID) {
        return await serviceEndpoints.PackagesEndpoint.get(await getToken(), khID)
    }

    async getWaID(khID) {
        return await serviceEndpoints.WAIDEndpoint.get(await getToken(), khID);
    }

    async getUsers(khID, body, options) {
        return await serviceEndpoints.UsersEndpoint.get(await getToken(), khID, body, options)
    }

    async createUser(khID, body) {
        if (isValidPhoneNumber(body.phoneNumber || '')) body.phoneNumber = parsePhoneNumber(body.phoneNumber).formatInternational()
        return await serviceEndpoints.UsersEndpoint.create(await getToken(), khID, body)
    }

    async updateUser(khID, body, id) {
        return await serviceEndpoints.UsersEndpoint.patch(await getToken(), khID, body, id)
    }

    async deleteUser(khID, id) {
        return await serviceEndpoints.UsersEndpoint.delete(await getToken(), khID, id)
    }

    async getFirm() {
        return await serviceEndpoints.KhatavaniEndpoint.get(await getToken())
    }

    async createFirm(firmObject, file = []) {
        let accounts = [...AccountsToCreate];

        // firmObject.resources = INQUIRY_STATUS_RESOURCES;
        if (firmObject.accounts) accounts.push(...firmObject.accounts)
        firmObject.accounts = accounts;
        firmObject.userLevels = userLevels;
        firmObject.resources = ResourcesToCreate
        firmObject.prefixes = defaultPrefixes

        var result = await serviceEndpoints.KhatavaniEndpoint.create(await getToken(), firmObject.khID, firmObject)
        var fileStore = [];

        file.forEach(element => {
            let fileObject = fileMetaDataObject(element.name, element.value.Store, firmObject.khID);
            fileStore.push(fileObject);
        })

        await UploadData(fileStore, await getToken(), result.id, null, true);

        return result
    }

    async editFirm(firmObject, khID) {
        return await serviceEndpoints.KhatavaniEndpoint.put(await getToken(), null, firmObject, khID);
    }

    async inquiryRefranceVoucher(khID, inquiryID, inquirySourceId, customerId) {
        const VoucherType = INQUIRY_VOUCHER_TYPE;
        const resourceID = INPROGRESS_INQUIRY_RESOURCE_ID;
        var transactions = [{
            accountID: inquiryID,
            resourceID: resourceID,
            batches: [{ id: COMMON_BATCH, units: -1 }],
            units: -1
        }];

        if (customerId && inquirySourceId) {
            transactions = [{
                accountID: inquiryID,
                resourceID: resourceID,
                batches: [{ id: COMMON_BATCH, units: -2 }],
                units: -2
            }]
        }

        if (customerId) {
            transactions.push({
                accountID: customerId,
                resourceID: resourceID,
                batches: [{ id: inquiryID, units: +1 }],
                units: +1
            })
        }

        if (inquirySourceId) {
            transactions.push({
                accountID: inquirySourceId,
                resourceID: resourceID,
                batches: [{ id: inquiryID, units: +1 }],
                units: +1
            })
        }

        const voucherObject = {
            date: new Date().valueOf(),
            type: VoucherType,
            transactions: transactions
        }

        return await serviceEndpoints.VouchersEndpoint.create(await getToken(), khID, voucherObject);
    }

    async updateAccount(khID, body, accountId) {
        return await serviceEndpoints.AccountsEndpoint.put(await getToken(), khID, body, accountId);
    }

    async createParty(khID, partyObject) {
        partyObject.tag = PARTY_TAG;
        partyObject.inrCapable = true
        partyObject.effectAccess = [
            ACCOUNT_USER_LEVEL_ID,
            STORE_MANAGER_USER_LEVEL_ID,
            PRODUCTION_MANAGER_USER_LEVEL_ID
        ];
        return await serviceEndpoints.AccountsEndpoint.create(await getToken(), khID, partyObject)
    }

    async updateParty(khID, updatedObject, id) {
        return await serviceEndpoints.AccountsEndpoint.put(
            await getToken(),
            khID,
            updatedObject,
            id
        )
    }

    async deleteParty(khID, id) {
        return await serviceEndpoints.AccountsEndpoint.delete(await getToken(), khID, id);
    }

    async getUserRoles(khID, body, options, pageParam) {
        return await serviceEndpoints.UserRolesEndpoint.get(await getToken(), khID, body, options, pageParam);
    }

    async createUserRole(khID, userRoleObject) {
        return await serviceEndpoints.UserRolesEndpoint.create(await getToken(), khID, userRoleObject)
    }

    async updateUserRole(khID, state, id) {
        return serviceEndpoints.UserRolesEndpoint.put(await getToken(), khID, state, id)
    }

    async deleteUserRole(khID, id) {
        return await serviceEndpoints.UserRolesEndpoint.delete(await getToken(), khID, id);
    }

    async getParties(khID, body, options, pageParam) {
        const partyOptions = options ? options : {}
        partyOptions.tag = PARTY_TAG;
        return await serviceEndpoints.AccountsEndpoint.get(await getToken(), khID, body, partyOptions, pageParam);
    }

    async createCustomProducts(khID, Products) {
        return await Promise.all(
            Products?.map(async (product) => {
                if (!product.product.type) {
                    const newProduct = {
                        id: product.product.id,
                        name: product.product.name,
                        type: PRODUCT_TYPE_CUSTOM,
                        unit: NUMBERS,
                        tag: PRODUCT_TAG,
                        saleRate: product.saleRate || 0,
                    }
                    await this.createProduct(khID, newProduct);
                    product.product = newProduct;
                }
                return product;
            })
        );
    }

    async createProduct(khID, body, editProduct = false) {
        body.tag = PRODUCT_TAG;

        if ((!editProduct) && body.productItemcode) {
            let options = { productItemcode: body.productItemcode, type: body.type }
            if (body.tag) options.tag = body.tag

            let result = await this.getProducts(khID, null, options);

            if (result?.length > 0) {
                return Promise.reject(
                    createServerErrorMsg(
                        `The provided Product ${body.name} with Product Item Code ${body.productItemcode} already exists.`
                    )
                )
            }
        }

        body.entityPublicAccess = true;
        body.effectAccess = [STORE_MANAGER_USER_LEVEL_ID, PRODUCTION_MANAGER_USER_LEVEL_ID, QC_MANAGER_USER_LEVEL_ID, ACCOUNT_USER_LEVEL_ID]
        return await serviceEndpoints.ResourcesEndpoint.create(
            await getToken(),
            khID,
            body);
    }

    async getProducts(khID, body, options, pageParam) {
        const partOptions = options ? options : {}
        partOptions.tag = PRODUCT_TAG;
        return await serviceEndpoints.ResourcesEndpoint.get(await getToken(), khID, body, partOptions, pageParam);
    }

    async getOneProduct(khID, productID) {
        return await serviceEndpoints.ResourcesEndpoint.getOne(await getToken(), khID, productID);
    }

    async getAllProducts(khID, body, options) {
        const partOptions = options ? options : {}
        partOptions.tag = PRODUCT_TAG;
        return await serviceEndpoints.ResourcesEndpoint.getAll(await getToken(), khID, body, partOptions);
    }

    async inwordProductToStore(khID, state, products) {
        const today = new Date();

        const batches = []
        const transaction = []

        products.forEach((product, index) => {
            batches.push({
                id: inwordIdWithDate(index),
                name: state.vendorDropDown.name,
                rate: product.rate,
                entityPublicAccess: true
            })

            transaction.push({
                accountID: state.vendorDropDown.id,
                resourceID: product.product.id,
                units: product.units * -1,
                rate: product.rate,
                batches: [{ id: state.refid, units: product.units * -1 }]
            })

            transaction.push({
                accountID: INQUIRY_STORE_ACCOUNT_ID,
                resourceID: product.product.id,
                units: product.units,
                batches: [{ index: index, units: product.units }]
            })
        })

        const voucher = {
            date: today.getTime(),
            verified: true,
            refranceId: state.refid,
            type: INWORD_VOUCHER_TYPE,
            batches: batches,
            transactions: transaction
        }

        return await serviceEndpoints.VouchersEndpoint.create(await getToken(), khID, voucher);
    }

    async getAllLeads(khID, body, options, withBalance = false, productType) {
        options.sort = "createdAt";
        options.desending = true

        let data = await serviceEndpoints.AccountsEndpoint.getAll(await getToken(), khID, body, options);

        if (withBalance) {
            return await this.getBalanceWithResource(khID, data, productType)
        }
        return data;
    }

    async getOneLead(khID, id) {
        return await serviceEndpoints.AccountsEndpoint.getOne(await getToken(), khID, id);
    }

    async deleteProducts(khID, id) {
        return await serviceEndpoints.ResourcesEndpoint.delete(await getToken(), khID, id);
    }

    async updateProduct(khID, state, id) {
        return serviceEndpoints.ResourcesEndpoint.put(await getToken(), khID, state, id)
    }

    async getCustomers(khID, body, options, pageParam) {
        const customerOptions = options ? options : {}
        customerOptions.tag = PARTY_TAG;
        customerOptions.type = CUSTOMER;
        return await serviceEndpoints.AccountsEndpoint.get(await getToken(), khID, body, customerOptions, pageParam);
    }

    async getAllCustomers(khID, body, options) {
        const customerOptions = options ? options : {}
        customerOptions.tag = PARTY_TAG;
        customerOptions.type = CUSTOMER;
        return await serviceEndpoints.AccountsEndpoint.getAll(await getToken(), khID, body, customerOptions);
    }

    async getVendors(khID, body, options, pageParam) {
        const customerOptions = options ? options : {}
        customerOptions.tag = PARTY_TAG;
        customerOptions.type = VENDOR;
        return await serviceEndpoints.AccountsEndpoint.get(await getToken(), khID, body, customerOptions, pageParam);
    }

    async getLabours(khID, body, options, pageParam) {
        const customerOptions = options ? options : {}
        customerOptions.tag = PARTY_TAG;
        customerOptions.type = LABOURS;
        return await serviceEndpoints.AccountsEndpoint.get(await getToken(), khID, body, customerOptions, pageParam);
    }

    //Inquiry
    async createInquiry(khID, InquiryObject, onDate = new Date()) {
        InquiryObject.tag = INQUIRY_TAG
        InquiryObject.name = INQUIRY
        InquiryObject.status = InquiryObject.status ? InquiryObject.status : OPEN
        InquiryObject.lastUpdated = onDate
        InquiryObject.followUpDate = addDaysToToday(2, onDate);

        InquiryObject.entityPublicAccess = true;
        InquiryObject.effectAccess = userLevels.map(level => level.id);

        const response = await serviceEndpoints.AccountsEndpoint.create(
            await getToken(),
            khID,
            InquiryObject
        );

        return response;
    }

    async createProductWithRawMaterialAndProcess(khID, InquiryObject, RequirementObject, previousBatches) {
        let deleteVoucherId = InquiryObject.inquiryRequirementVoucherId;

        InquiryObject.inquiryRequirementVoucherId = uuidv4();
        delete InquiryObject.products;

        let object = getRequirementVoucherObject(RequirementObject, InquiryObject, InquiryObject.id, INQUIRY_STORE_ACCOUNT_ID)

        let differentBatcheObjects = differentiateArrays(previousBatches, object.batchObjects)

        for (let i = 0; i < differentBatcheObjects.created.length; i++) {
            await this.createBatche(khID, differentBatcheObjects.created[i]);
        }

        for (let i = 0; i < differentBatcheObjects.deleted.length; i++) {
            await this.deleteBatches(khID, differentBatcheObjects.deleted[i]);
        }

        const voucher = await this.updateProductVoucher(khID, object.voucherObject, deleteVoucherId);

        return await serviceEndpoints.AccountsEndpoint.patch(
            await getToken(),
            khID,
            { inquiryRequirementVoucherId: voucher.id },
            InquiryObject.id);
    }

    async getResourceBalance(khID, option, pageParam) {
        return await serviceEndpoints.BalanceEndpoint.get(
            await getToken(),
            khID,
            null,
            option,
            pageParam
        )
    }

    async updateInquiry(khID, InquiryObject, id) {
        return await serviceEndpoints.AccountsEndpoint.put(
            await getToken(),
            khID,
            InquiryObject,
            id
        )
    }

    async getInquirySources(khID, body, options, pageParam) {
        const inquirySourcesOptions = options ? options : {}
        inquirySourcesOptions.tag = INQUIRY_SOURCE;
        return await serviceEndpoints.AccountsEndpoint.get(await getToken(), khID, body, inquirySourcesOptions, pageParam);
    }

    async createInquirySources(khID, body) {
        body.tag = INQUIRY_SOURCE;
        body.entityPublicAccess = true;
        return await serviceEndpoints.AccountsEndpoint.create(await getToken(), khID, body);
    }

    async deleteInquirySource(khID, id) {
        return await serviceEndpoints.AccountsEndpoint.delete(await getToken(), khID, id);
    }

    async updateInquirySource(khID, state, id) {
        return serviceEndpoints.AccountsEndpoint.put(await getToken(), khID, state, id)
    }

    //Files
    async getFile(SessionId, khID, options) {
        if (sessionStorage.getItem(SessionId)) {
            let currentSession = JSON.parse(
                sessionStorage.getItem(SessionId)
            );
            return currentSession;
        }
        var data = await serviceEndpoints.FileEndpoint.get(await getToken(),
            khID,
            null,
            options
        );
        StoreFileToSession(data, SessionId);
        return {
            ContentType: data[CONTENT_TYPE],
            url: data.url
        };
    }

    async getLeadHistory(khID, inquiryID, startDate) {
        const options = {
            accountID: inquiryID,
            resourceID: STATE_UPDATE_RESOURCE_ID,
            fromDate: startDate,
            toDate: new Date().valueOf()
        }

        return await serviceEndpoints.TransactionsEndpoint.getAll(await getToken(), khID, null, options)
    }

    async getLabourCostForToday(khID, inquiry) {
        const options = {
            accountID: inquiry.id,
            resourceID: INR_RESOURCE_ID,
            type: LABOUR_VOUCHER_TYPE,
            fromDate: inquiry.createdAt,
            toDate: new Date().valueOf()
        }

        return await serviceEndpoints.TransactionsEndpoint.getAll(await getToken(), khID, null, options)
    }

    async getExpenseCostForToday(khID, inquiry) {
        const options = {
            accountID: inquiry.id,
            resourceID: INR_RESOURCE_ID,
            type: EXTERNAL_VOUCHER_TYPE,
            fromDate: inquiry.createdAt,
            toDate: new Date().valueOf()
        }

        return await serviceEndpoints.TransactionsEndpoint.getAll(await getToken(), khID, null, options)
    }

    async getINRStatement(khID, inquiry) {
        const options = {
            accountID: inquiry.id,
            resourceID: INR_RESOURCE_ID,
            fromDate: inquiry.createdAt,
            toDate: new Date().valueOf()
        }

        return await serviceEndpoints.TransactionsEndpoint.getAll(await getToken(), khID, null, options)
    }

    async updateLeadStatus(
        khID,
        updateProp,
        inquiryID,
        note,
        onDate = new Date(),
        item,
        currentFirm
    ) {
        updateProp.lastUpdated = onDate;

        if (item && updateProp.status === CONVERTED) {
            if (!item.customerId) {
                return Promise.reject(createServerErrorMsg("Please Create Or Attach Customer To Inquiry"))
            }

            updateRequiredPropsForOrder(updateProp, item);
        }

        if (updateProp.status === QUOTATION_READY) {
            var nextId = await this.getSeriesNumber(
                khID,
                {
                    prefix: currentFirm.prefixes.quotation,
                }
            );

            updateProp.quotationId = nextId.id
            updateProp.quotationDate = new Date().getTime();

            const ammendedNote = "New Quotation ID is " + nextId.id
            note = note ? note + " " + ammendedNote : ammendedNote;
        }

        var options = {
            keepRecord: true
        };

        if (updateProp.status === CLOSED) updateProp.tag = CLOSED_INQUIRY_TAG

        if (note) options.transactionNote = note;

        return await serviceEndpoints.AccountsEndpoint.patch(await getToken(), khID, updateProp, inquiryID, options);
    }

    async getContacts(khID, body, options, pageParam) {
        const contactOptions = options ? options : {}
        contactOptions.tag = CONTACT;
        return await serviceEndpoints.AccountsEndpoint.get(await getToken(), khID, body, contactOptions, pageParam)
    }

    async createContact(khID, body) {
        body.tag = CONTACT;
        body.effectAccess = [STORE_MANAGER_USER_LEVEL_ID, PRODUCTION_MANAGER_USER_LEVEL_ID];
        return await serviceEndpoints.AccountsEndpoint.create(
            await getToken(),
            khID,
            body);
    }

    async creteProductVoucher(khID, voucherObject) {
        return await serviceEndpoints.VouchersEndpoint.create(await getToken(), khID, voucherObject);
    }

    async patchVoucher(khID, voucherObject, id) {
        return await serviceEndpoints.VouchersEndpoint.patch(await getToken(), khID, voucherObject, id);
    }

    async updateProductVoucher(khID, voucherObject, voucherId) {

        if (voucherId) {
            await serviceEndpoints.VouchersEndpoint.delete(await getToken(), khID, voucherId);
        }

        if (voucherObject.transactions?.length === 0) return { id: DELETE_FIELD }

        return await serviceEndpoints.VouchersEndpoint.create(await getToken(), khID, voucherObject);
    }

    async getProductWithBatches(khID, accountID) {

        let batches = await this.getBatches(khID, {
            inquiryId: accountID
        })

        return getProductFiltered(batches)
    }

    async getInquiryProducts(khID, inquiryId) {
        let batches = await this.getBatches(khID, {
            inquiryId: inquiryId,
            tag: PRODUCT_TAG,
        })
        return batches;
    }

    async createOrder(khID, OrderObject, onDate) {
        OrderObject.sourceOfLead = REFERANCE;
        OrderObject.sourceOfLeadId = REFERANCE_ID;
        OrderObject.status = CONVERTED;

        updateRequiredPropsForOrder(OrderObject, OrderObject);
        return await this.createInquiry(khID, OrderObject, onDate)
    }

    async updateOrder(khID, OrderObject, id) {
        return await this.updateInquiry(khID, OrderObject, id)
    }

    //batches
    async createBatche(khID, body) {
        return await serviceEndpoints.BatchEndpoint.create(await getToken(), khID, body)
    }

    async getBatches(khID, options) {
        return await serviceEndpoints.BatchEndpoint.getAll(await getToken(), khID, null, options)
    }

    async deleteBatches(khID, id) {
        return await serviceEndpoints.BatchEndpoint.delete(await getToken(), khID, id)
    }

    async patchBatches(khID, id, update) {
        return await serviceEndpoints.BatchEndpoint.patch(await getToken(), khID, update, id)
    }

    async getDiscountSlab(khID, options = {}) {
        options.tag = DISCOUNT_SLAB_TAG
        return this.getBatches(khID, options);
    }

    async createDiscountSlab(khID, options = {}) {
        options.tag = DISCOUNT_SLAB_TAG
        return this.createBatche(khID, options);
    }

    async deleteDiscountSlab(khID, id) {
        return this.deleteBatches(khID, id);
    }

    async getMapedBatchBalancePerRawMaterial(khID, material, productType) {
        if (productType === PROCESSESS) {
            return Object.entries(material).reduce((acc, [key, value]) => {
                value.debit = value.batches;
                acc[key] = value;
                return acc;
            }, {});
        }

        const promises = Object.keys(material).map(async (key) => {
            return await this.getResourceBalance(
                khID,
                {
                    resourceID: key,
                    accountID: INQUIRY_STORE_ACCOUNT_ID,
                    date: Date.now(),
                    tag: PRODUCT_TAG
                }
            );
        });

        const stockBalance = await Promise.all(promises);
        // stockBalance has the ramaining balance of rawmaterial into the store
        //where the batches are object with key date and units are remaining units per batch

        return getDistibutedBatches(material, stockBalance.flatMap(item => item))
        // sortAndGiveBaches gives the updated materials.obj with extra key debit batches
        //wich has to be debited from store
        // debited is array of batch with id date and units are reamining required - instore
        // this adjust from next batch
    }

    //allocate Raw Material
    async ReleaseMaterial(khID, data, productType = RMLIST) {
        let partialChecking = data.checked
        if (partialChecking) delete data.checked;
        let materials = {}
        if (productType === RMLIST) {
            materials = returnUniqueResource(productType, data.products, partialChecking)
        } else if (productType === PROCESSESS) {
            materials = returnUniqueResourceProcess(productType, data.products)
        }

        const sortAndGiveBaches = await this.getMapedBatchBalancePerRawMaterial(khID, materials.obj, productType)
        // sortAndGiveBaches gives the updated materials.obj with extra key debit batches
        //wich has to be debited from store
        // debited is array of batch with id date and units are reamining required - instore
        // this adjust from next batch

        let transactions = []

        for (const [key, value] of Object.entries(sortAndGiveBaches)) {
            transactions.push(
                ...getProductTransactionArray(
                    value,
                    key,
                    INQUIRY_STORE_ACCOUNT_ID,
                    data.id,
                    value.batches,
                    value.debit.map(element => (
                        {
                            ...element,
                            units: element.units * -1
                        }))
                )
            )
        }

        if (productType === PROCESSESS) {
            for (const value of Object.values(data.products)) {
                var debit = [];
                var credit = [];
                var total = 0;
                let units = value.completedFinishedGoods * 1;
                debit.push({ id: data.id, units: units * -1 })
                credit.push({ id: data.id, units: units })
                total += units * 1;
                if (value.completedFinishedGoods) {
                    transactions.push(
                        {
                            resourceID: value.product.id,
                            accountID: data.id,
                            batches: debit,
                            units: total * -1,
                        },
                        {
                            resourceID: value.product.id,
                            accountID: QC_STORE_ACCOUNT_ID,
                            batches: credit,
                            units: total * 1,
                        },
                    )
                }
            }
        }

        if (transactions.length === 0) {
            let errorText = productType === RMLIST ? PRODUCT_TYPE_RAW : PRODUCT_TYPE_PROCESS;
            return Promise.reject(`Server error: 400 Message: Please Do Select or Enter At Least One ${errorText}`);
        }

        let voucherObject = getProductVoucher(
            [],
            data.id,
            undefined,
            transactions,
            true,
        )

        let result = await this.creteProductVoucher(khID, voucherObject);
        return { id: result.id, totalDifference: materials.totalDifference }
    }

    async getBalancePerInquiry(khID, options) {
        let balanceObject = {}
        let balance = await this.getResourceBalance(khID, options)
        balance.forEach(element => {
            Object.entries(element.batches).forEach(([key, value]) => {
                balanceObject[getProductIDResourceID(key, element.resource.id)] = value * 1
            })
        })
        return balanceObject;
    }

    async getBalanceWithResource(khID, data, productType = RMLIST) {

        for (let i = 0; i < data.length; i++) {

            let balanceObject = await this.getBalancePerInquiry(khID, {
                accountID: data[i].id,
                date: Date.now(),
                tag: PRODUCT_TAG
            })
            addBalancePerInquiryProduct(data[i], balanceObject, productType)

        }
        return data;
    }

    async getInquiryStoreBalance(khID, options) {
        let storeBalancePerProduct = await this.getResourceBalance(khID, options)
        return getResourceObject(storeBalancePerProduct)
    }

    async getBalancePerInquiryAndStore(khID, inquiryOptions) {
        let storeOptions = {
            accountID: INQUIRY_STORE_ACCOUNT_ID,
            date: Date.now(),
            tag: PRODUCT_TAG,
        }
        let storeBalance = await this.getInquiryStoreBalance(khID, storeOptions)
        let inquryBalance = await this.getBalancePerInquiry(khID, inquiryOptions);
        return { balancePerInquiry: inquryBalance, storeBalancePerProduct: storeBalance };
    }

    async getSeriesNumber(khID, options) {
        return await serviceEndpoints.SerializedEndpoint.get(await getToken(), khID, null, options)
    }

    async updateCustomer(khID, updateProp, id, note, onDate) {
        return await this.updateLeadStatus(khID, updateProp, id, note, onDate)
    }

    async createChallan(khID, refid, type, products = [], fromAccount, toAccount, date = new Date().getTime(), extraProps) {

        const transaction = []

        for (let i = 0; i < products.length; i++) {

            const item = products[i];

            var creditBatch = [{ id: COMMON_BATCH, units: item.units }];
            var debitBatch = [{ id: COMMON_BATCH, units: item.units * -1 }];

            if (type === STORE_VOUCHER || extraProps?.inquiryId) {
                creditBatch = [{ id: extraProps.inquiryId, units: item.units }];
                debitBatch = [{ id: extraProps.inquiryId, units: item.units * -1 }];
            }

            transaction.push(
                ...getProductTransactionArray(
                    item,
                    item.product.id,
                    fromAccount,
                    toAccount,
                    creditBatch,
                    debitBatch
                )
            );
        }

        const voucher = {
            date: date,
            verified: true,
            refranceId: refid,
            type: type,
            transactions: transaction,
            ...extraProps
        }

        return await this.creteProductVoucher(khID, voucher);
    }

    async getChallans(khID, body = null, options) {
        options.sort = "createdAt";
        options.desending = true

        return await serviceEndpoints.VouchersEndpoint.get(await getToken(), khID, body, options);
    }

    async getInvoices(
        khID,
        pageParam,
        inquiryID = null,
        customerId = null,
        countOnly = false) {

        const options = {
            type: TAX_INVOICE,
            sort: "createdAt",
            desending: true
        }

        if (customerId) options.customerId = customerId;

        if (inquiryID) options.inquiryId = inquiryID;

        if (countOnly) options.countOnly = true

        return await serviceEndpoints.VouchersEndpoint.get(await getToken(), khID, null, options, pageParam);
    }

    async getInvoicesInDateRange(
        khID,
        startDate,
        endDate) {

        const options = {
            type: TAX_INVOICE,
            sort: "createdAt",
            desending: true,
            fromDate: startDate,
            toDate: endDate
        }

        return await serviceEndpoints.VouchersEndpoint.getAll(await getToken(), khID, null, options);
    }

    async getAllVouchersOfType(khID, type) {

        const options = {
            type: type,
            sort: "createdAt",
            desending: true
        }

        return await serviceEndpoints.VouchersEndpoint.getAll(
            await getToken(),
            khID,
            null,
            options);
    }

    async getVoucher(khID, id) {
        const voucher = await serviceEndpoints.VouchersEndpoint.getOne(await getToken(), khID, id);

        const transactions =
            await serviceEndpoints.TransactionsEndpoint.getAll(
                await getToken(), khID, null, { vid: voucher.id });

        voucher.products = transactions
            .filter(trx => trx.accountID === INQUIRY_STORE_ACCOUNT_ID)
            .map(trx => ({
                id: trx.resourceID,
                units: Math.abs(trx.units),
                invoiceRate: trx.invoiceRate,
            }));

        return voucher;
    }

    async deleteChallans(khID, voucherId) {
        return await serviceEndpoints.VouchersEndpoint.delete(await getToken(), khID, voucherId);
    }

    async deleteAccount(khid, id) {
        return await serviceEndpoints.AccountsEndpoint.delete(await getToken(), khid, id);
    }

    async createBankAccount(khID, bankObject) {
        bankObject.tag = BANK_ACCOUNT_TAG;
        return await serviceEndpoints.AccountsEndpoint.create(await getToken(), khID, bankObject);
    }

    async getBankAccount(khID, body, options, pageParam) {
        const bankOptions = options ? options : {};
        bankOptions.tag = BANK_ACCOUNT_TAG;
        return await serviceEndpoints.AccountsEndpoint.get(await getToken(), khID, body, bankOptions, pageParam);
    }

    getProductBalanceOfAccount = async (khID, acc) => {
        let result = []
        const finishedProductObj = {
            accountID: acc,
            date: Date.now(),
            type: PRODUCT_TYPE_FINISHED,
            tag: PRODUCT_TAG
        }
        let finishedProductBalance = await this.getResourceBalance(
            khID,
            finishedProductObj
        );
        let customProductBalance = await this.getResourceBalance(
            khID,
            {
                ...finishedProductObj,
                type: PRODUCT_TYPE_CUSTOM,
            }
        );
        if (finishedProductBalance?.length > 0) result.push(...finishedProductBalance)
        if (customProductBalance?.length > 0) result.push(...customProductBalance)
        return result
    }

    getWhatsAppMessages = async (khID, wa_id) => {
        return await serviceEndpoints.MessageEndpoint.getAll(await getToken(), khID, null, { wa_id: wa_id })
    }

    sendMessage = async (khID, wa_id, text) => {
        const body = {
            wa_id: wa_id,
            text: text,
            channel: "WA"
        }

        return await serviceEndpoints.MessageEndpoint.create(await getToken(), khID, body)
    }

    async patchBalance(khID, body) {
        return await serviceEndpoints.BalanceEndpoint.patch(await getToken(), khID, body, IGNORED_ID);
    }

    async deleteInvoices(khID, voucherId, reason) {
        const options = {
            keepVoucher: true,
            reason: reason
        }

        return await serviceEndpoints.VouchersEndpoint.delete(await getToken(), khID, voucherId, options);
    }

    async getAllVouchers(khID, options) {
        return await serviceEndpoints.VouchersEndpoint.get(await getToken(), khID, null, options);
    }

    async createPaymentOrder(khID, body) {
        return await serviceEndpoints.PaymentEndpoint.create(await getToken(), khID, body)
    }

    async checkVerification(khID, body, id) {
        return await serviceEndpoints.PaymentEndpoint.patch(await getToken(), khID, body, id);
    }

    async MakePurchaseOrder(khID, purchaseObject) {
        return await serviceEndpoints.AccountsEndpoint.create(
            await getToken(),
            khID,
            purchaseObject
        );
    }

    async getMarkersForGroup(khID, markerGroup) {
        return await serviceEndpoints.MarkerEndpoint.get(
            await getToken(),
            khID,
            null,
            {
                tag: markerGroup,
                sort: "units",
                desending: true
            }
        )
    }

    async getMarkers(khID, markerID) {
        return await serviceEndpoints.MarkerEndpoint.getOne(
            await getToken(),
            khID,
            markerID,
        )
    }

    async createMarkers(khID, markerObject) {
        const marker = await this.getMarkers(khID, markerObject.id);

        if (marker) {
            markerObject.units = markerObject.units + marker.units;

            return await serviceEndpoints.MarkerEndpoint.patch(
                await getToken(),
                khID,
                markerObject,
                markerObject.id
            );
        }

        return await serviceEndpoints.MarkerEndpoint.create(
            await getToken(),
            khID,
            markerObject
        );
    }
}