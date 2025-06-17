import { CUSTOMER, DISPATCH, EXTERNAL_PROCESS, IGNORED_ID, INQUIRY_SOURCE, INQUIRY_STORE_ACCOUNT_ID, INTERNAL_PROCESS, INWORD_CHALLAN, OUTWORD_CHALLAN, PRODUCT_TYPE_PROCESS, QC_STORE_ACCOUNT_ID, VENDOR } from "./ConstantProperties";
import { ACCOUNTANT_USER_LEVEL, BANK_ACCOUNT_TAG, CONTACT, CUSTOMER_USER_LEVEL, PARTY_TAG, PRODUCT_TAG } from "./ExtraProperties";
import { getProductFiltered } from "./helpers";

// eslint-disable-next-line
function getPagedData(array, pageParam) {
    const pageSize = 50;
    var start = pageSize * pageParam;
    var end = start + pageSize;

    return array.slice(start, end > array.length ? array.length : end);
}

function filterArray(array, options = {}) {
    return array.filter(item => {
        return Object.entries(options).every(([key, value]) => value === undefined || item[key] === value);
    });
}


export class mockMethods {

    //upload
    async Upload(fileStore, khID, id, Public) {
        return { id: "15153bc7-c9dc-466f-a773-422f1b6f3d45" }
    }

    async getWaID(khID) {
        return [
            { id: '918951060336', updatedAt: 1733827560462 },
            { id: '917517610628', updatedAt: 1732186075788 },
            { id: '918010490130', updatedAt: 1731946224627 },
            { id: '919289012884', updatedAt: 1731997755972 },
            { id: '918888858555', updatedAt: 1731999070202 },
            { id: '919503949621', updatedAt: 1732034918776 },
            { id: '919901075952', updatedAt: 1732880267964 },
            { id: '919326237454', updatedAt: 1732072782486 },
            { id: '919096524135', updatedAt: 1732084799036 },
            { id: '919518961538', updatedAt: 1732074858301 },
            { id: '917498250511', updatedAt: 1733542948284 },
            { id: '919850893433', updatedAt: 1732171847422 },
            { id: '918693025417', updatedAt: 1732180619264 },
            { id: '919765949219', updatedAt: 1732192499675 },
            { id: '919833654766', updatedAt: 1732249086210 },
            { id: '919049662707', updatedAt: 1732249095144 },
            { id: '918013515778', updatedAt: 1732249121518 },
            { id: '919987488034', updatedAt: 1732865158003 },
            { id: '918767025512', updatedAt: 1732290867569 },
            { id: '919135171313', updatedAt: 1732331732508 },
            { id: '917230003500', updatedAt: 1732331821384 },
            { id: '917738435849', updatedAt: 1732421775506 },
            { id: '918857882057', updatedAt: 1732425335389 },
            { id: '919029909471', updatedAt: 1732425371547 },
            { id: '917813832851', updatedAt: 1732428805401 },
            { id: '917410022112', updatedAt: 1732456531286 },
            { id: '917057708500', updatedAt: 1732513261087 },
            { id: '919545962064', updatedAt: 1732513293921 },
            { id: '918788096306', updatedAt: 1732513314172 },
            { id: '919967577043', updatedAt: 1732593097767 },
            { id: '919082864482', updatedAt: 1732593108333 },
            { id: '917378615453', updatedAt: 1732593116855 },
            { id: '919021512218', updatedAt: 1732608216975 },
            { id: '919766090404', updatedAt: 1732694021091 },
            { id: '918668902697', updatedAt: 1732676845417 },
            { id: '919850217131', updatedAt: 1732676919248 },
            { id: '919764807476', updatedAt: 1732676951789 },
            { id: '917061586103', updatedAt: 1732693726280 },
            { id: '917741889911', updatedAt: 1732807608428 },
            { id: '919960522555', updatedAt: 1732699600157 },
            { id: '919552269769', updatedAt: 1732766876827 },
            { id: '918099199991', updatedAt: 1732769235043 },
            { id: '919422690099', updatedAt: 1732766941263 },
            { id: '919022898836', updatedAt: 1732767094504 },
            { id: '917304473530', updatedAt: 1732767913197 },
            { id: '919985213034', updatedAt: 1732777559060 },
            { id: '918390609794', updatedAt: 1732785146023 },
            { id: '919930012940', updatedAt: 1732801834841 },
            { id: '919850839982', updatedAt: 1732802730016 },
            { id: '917888204757', updatedAt: 1732854846638 },
            { id: '919887876512', updatedAt: 1732854856805 },
            { id: '918275567840', updatedAt: 1733843324806 },
            { id: '917709559220', updatedAt: 1732939657401 },
            { id: '919987721329', updatedAt: 1732939663206 },
            { id: '919096660809', updatedAt: 1732939691678 },
            { id: '919819475566', updatedAt: 1732939685518 },
            { id: '918000845982', updatedAt: 1732939707835 },
            { id: '919920501906', updatedAt: 1733408869735 },
            { id: '917045691906', updatedAt: 1732961161053 },
            { id: '917025382279', updatedAt: 1733018164456 },
            { id: '919284582765', updatedAt: 1733113004022 },
            { id: '919010418917', updatedAt: 1733115448176 },
            { id: '919511816962', updatedAt: 1733122985064 },
            { id: '919112828188', updatedAt: 1733122992004 },
            { id: '919823209601', updatedAt: 1733201272444 },
            { id: '919114515253', updatedAt: 1733201283000 },
            { id: '919689366192', updatedAt: 1733201291704 },
            { id: '919112731935', updatedAt: 1733213522134 },
            { id: '917218990099', updatedAt: 1733284848150 },
            { id: '918554989132', updatedAt: 1733284858089 },
            { id: '919422010662', updatedAt: 1733284867453 },
            { id: '919960554842', updatedAt: 1733284884832 },
            { id: '917620672925', updatedAt: 1733310431073 },
            { id: '919860941053', updatedAt: 1733308468217 },
            { id: '919422483227', updatedAt: 1733309268086 },
            { id: '918459727569', updatedAt: 1733377537233 },
            { id: '918779335788', updatedAt: 1733399363707 },
            { id: '918951062336', updatedAt: 1733473068208 },
            { id: '919619445657', updatedAt: 1733458579424 },
            { id: '917774846387', updatedAt: 1733458597422 },
            { id: '918248804268', updatedAt: 1733458631330 },
            { id: '919067999584', updatedAt: 1733549126487 },
            { id: '918149719676', updatedAt: 1733572185946 },
            { id: '919607711010', updatedAt: 1733631064549 },
            { id: '919657210173', updatedAt: 1733631073754 },
            { id: '918605072014', updatedAt: 1733665234376 },
            { id: '918830082094', updatedAt: 1733713511824 },
            { id: '918252748939', updatedAt: 1733713521317 },
            { id: '919822754478', updatedAt: 1733731835108 },
            { id: '917507814970', updatedAt: 1733742389678 },
            { id: '918799923000', updatedAt: 1733745365885 },
            { id: '918411030655', updatedAt: 1733770490359 },
            { id: '919130522002', updatedAt: 1733804471922 },
            { id: '919511755557', updatedAt: 1733888951480 },
            { id: '918668976702', updatedAt: 1733888955204 },
            { id: '919762915470', updatedAt: 1733888963863 },
            { id: '918329826114', updatedAt: 1733888981437 },
            { id: '918286667404', updatedAt: 1733888978163 },
            { id: '919869656525', updatedAt: 1733889004094 },
            { id: '919994106739', updatedAt: 1733889017910 },
            { id: '919595594594', updatedAt: 1733896904847 },
            { id: '917892818443', updatedAt: 1733897720830 }
        ];
    }

    async getUsers(khID) {
        const userArray = [
            { "id": 1, "displayName": "Eva De Andreis", "level": ["Account"], "levelID": ["Account"], "approved": "true", "email": "ede0@bloglines.com", "gender": "Female", "ip_address": "128.191.98.70" },
            { "id": 2, "displayName": "Aindrea Ion", "level": ["Moderator"], "levelID": ["Moderator"], "approved": "true", "email": "aion1@vk.com", "gender": "Female", "ip_address": "61.113.82.140" },
            { "id": 3, "displayName": "Madel Giannazzo", "level": ["Operator"], "levelID": ["Operator"], "approved": "true", "email": "mgiannazzo2@wordpress.org", "gender": "Female", "ip_address": "238.217.33.28" },
            { "id": 4, "displayName": "Danica Chapier", "level": ["Operator"], "levelID": ["Operator"], "approved": "true", "email": "dchapier3@fema.gov", "gender": "Female", "ip_address": "248.213.184.233" },
            { "id": 5, "displayName": "Ringo Lintot", "level": ["Operator"], "levelID": ["Operator"], "approved": "true", "email": "rlintot4@wordpress.com", "gender": "Male", "ip_address": "243.218.169.202" },
            { "id": 6, "displayName": "Rollo Zanioletti", "level": ["Operator"], "levelID": ["Operator"], "approved": "true", "email": "rzanioletti5@blogtalkradio.com", "gender": "Male", "ip_address": "125.213.228.82" }]
        return userArray;
    }

    async createUser(khID, body) {
        return { id: "15153bc7-c9dc-466f-a773-422f1b6f3d45" }
    }

    async updateUser(khID, body, id) {
        return { id: id }
    }

    async getParties(khID, body, options, pageParam) {
        return getPagedData(partyArray, pageParam);
    }

    async updateParty(khID, updatedObject, id) {
        return { id: id }
    }

    async deleteParty(khID, id) {
        return { id: id }
    }


    async getFirm() {
        return [{
            autoApprove: false,
            id: "info",
            khID: "LLLLL4444L",
            name: "Opankys",
            ownedBy: "abc",
            email: "abc@abc.com",
            contactNumber: "+91 11111 11111",
            public: true,
            logoUrl: "https://www.acrytechsolutions.in/images/logo.webp",
            bankName: 'BANK OF INDIA',
            accountNo: '4578985665544545',
            ifscCode: 'BKID0001308',
            currentAccess: [
                {
                    createdByServer: true,
                    id: "AdminLevelID",
                    name: "Admin",
                    ownedBy: "abc"
                }
            ],
        }]
    }

    async createFirm(firmObject, file) {
        const mockFirm = { name: firmObject.name, id: firmObject.khID, };
        return mockFirm;
    }

    async editFirm(firmObject, khID) {
        return { id: "57720718-8c41-4f87-b128-a84464d9c9ac" };
    }

    async createParty(pageParam) {
        const mockParty = { name: pageParam.name, id: pageParam.khID, };
        return mockParty;
    }

    async getProducts(khID, body, options, pageParam) {
        const productArray = [
            { "id": 1, "name": "Steel Rod", "productState": INTERNAL_PROCESS, "productHSNcode": "721499", "GSTRate": "18", "saleRate": "500", "unit": "KG", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 2, "name": "Copper Wire", "productState": EXTERNAL_PROCESS, "productHSNcode": "740819", "GSTRate": "12", "saleRate": "800", "unit": "KG", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 3, "name": "Aluminum Sheet", "productHSNcode": "760611", "GSTRate": "18", "saleRate": "900", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 4, "name": "Plastic Granules", "productHSNcode": "390110", "GSTRate": "5", "saleRate": "600", "unit": "KG", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 5, "name": "Silicon Chips", "productHSNcode": "854231", "GSTRate": "18", "saleRate": "1500", "unit": "Nos", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 6, "name": "Iron Nails", "productHSNcode": "731700", "GSTRate": "12", "saleRate": "200", "unit": "KG", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 7, "name": "Wood Planks", "productHSNcode": "440711", "GSTRate": "12", "saleRate": "1200", "unit": "Nos", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 8, "name": "Glass Panels", "productHSNcode": "700719", "GSTRate": "18", "saleRate": "2500", "unit": "Nos", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 9, "name": "Ceramic Tiles", "productHSNcode": "690721", "GSTRate": "28", "saleRate": "1000", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 10, "name": "Rubber Tubes", "productHSNcode": "400921", "GSTRate": "18", "saleRate": "400", "unit": "KG", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 11, "name": "Brass Fittings", "productHSNcode": "741220", "GSTRate": "18", "saleRate": "1400", "unit": "Nos", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 12, "name": "Fiber Optic Cables", "productHSNcode": "854470", "GSTRate": "18", "saleRate": "3200", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 13, "name": "LED Bulbs", "productHSNcode": "853950", "GSTRate": "12", "saleRate": "250", "unit": "Nos", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 14, "name": "PVC Pipes", "productHSNcode": "391732", "GSTRate": "18", "saleRate": "350", "unit": "KG", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 15, "name": "Concrete Blocks", "productHSNcode": "681011", "GSTRate": "5", "saleRate": "450", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 16, "name": "Steel Beams", "productHSNcode": "721631", "GSTRate": "18", "saleRate": "550", "unit": "KG", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 17, "name": "Copper Sheets", "productHSNcode": "740919", "GSTRate": "12", "saleRate": "750", "unit": "KG", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 18, "name": "Aluminum Foil", "productHSNcode": "760719", "GSTRate": "18", "saleRate": "950", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 19, "name": "Plastic Pipes", "productHSNcode": "391721", "GSTRate": "5", "saleRate": "650", "unit": "KG", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 20, "name": "Silicon Wafers", "productHSNcode": "381800", "GSTRate": "18", "saleRate": "1800", "unit": "Nos", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 21, "name": "Iron Sheets", "productHSNcode": "720851", "GSTRate": "12", "saleRate": "150", "unit": "KG", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 22, "name": "Wood Veneers", "productHSNcode": "440810", "GSTRate": "18", "saleRate": "100", "unit": "Nos", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 23, "name": "Glass Bottles", "productHSNcode": "701090", "GSTRate": "28", "saleRate": "200", "unit": "Nos", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 24, "name": "Ceramic Plates", "productHSNcode": "691110", "GSTRate": "5", "saleRate": "300", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 25, "name": "Rubber Seals", "productHSNcode": "401693", "GSTRate": "18", "saleRate": "250", "unit": "KG", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 26, "name": "Brass Rods", "productHSNcode": "741021", "GSTRate": "18", "saleRate": "200", "unit": "KG", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 27, "name": "Fiber Sheets", "productHSNcode": "681299", "GSTRate": "18", "saleRate": "350", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 28, "name": "LED Panels", "productHSNcode": "853120", "GSTRate": "12", "saleRate": "400", "unit": "Nos", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 29, "name": "PVC Fittings", "productHSNcode": "391740", "GSTRate": "18", "saleRate": "450", "unit": "KG", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 30, "name": "Concrete Mix", "productHSNcode": "382450", "GSTRate": "5", "saleRate": "550", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 31, "name": "Steel Plates", "productHSNcode": "721631", "GSTRate": "18", "saleRate": "650", "unit": "KG", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 32, "name": "Copper Tubes", "productHSNcode": "741110", "GSTRate": "12", "saleRate": "750", "unit": "KG", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 33, "name": "Aluminum Rods", "productHSNcode": "760421", "GSTRate": "18", "saleRate": "850", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 34, "name": "Plastic Sheets", "productHSNcode": "392010", "GSTRate": "5", "saleRate": "950", "unit": "KG", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 35, "name": "Silicon Powder", "productHSNcode": "283210", "GSTRate": "18", "saleRate": "1050", "unit": "Nos", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 36, "name": "Iron Rods", "productHSNcode": "721410", "GSTRate": "12", "saleRate": "1150", "unit": "KG", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 37, "name": "Wood Logs", "productHSNcode": "440320", "GSTRate": "12", "saleRate": "1250", "unit": "Nos", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 38, "name": "Glass Sheets", "productHSNcode": "700521", "GSTRate": "28", "saleRate": "1350", "unit": "Nos", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 39, "name": "Ceramic Bricks", "productHSNcode": "690410", "GSTRate": "5", "saleRate": "1450", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 40, "name": "Rubber Mats", "productHSNcode": "401691", "GSTRate": "18", "saleRate": "1550", "unit": "KG", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 41, "name": "Brass Sheets", "productHSNcode": "740929", "GSTRate": "18", "saleRate": "1650", "unit": "KG", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 42, "name": "Fiber Rods", "productHSNcode": "681510", "GSTRate": "18", "saleRate": "1750", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 43, "name": "LED Tubes", "productHSNcode": "854190", "GSTRate": "12", "saleRate": "1850", "unit": "Nos", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 44, "name": "PVC Sheets", "productHSNcode": "392020", "GSTRate": "18", "saleRate": "1950", "unit": "KG", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 45, "name": "Concrete Pipes", "productHSNcode": "681011", "GSTRate": "5", "saleRate": "2050", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 46, "name": "Steel Pipes", "productHSNcode": "730630", "GSTRate": "18", "saleRate": "2150", "unit": "KG", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 47, "name": "Copper Rods", "productHSNcode": "741012", "GSTRate": "12", "saleRate": "2250", "unit": "KG", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 48, "name": "Aluminum Tubes", "productHSNcode": "760421", "GSTRate": "18", "saleRate": "2350", "unit": "Nos", "type": "Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 49, "name": "Plastic Granules", "productHSNcode": "390210", "GSTRate": "5", "saleRate": "2450", "unit": "KG", "type": PRODUCT_TYPE_PROCESS, "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 50, "name": "Silicon Chips", "productHSNcode": "854231", "GSTRate": "18", "saleRate": "2550", "unit": "Nos", "type": "Semi-Finish", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 51, "name": "Stainless Steel Sink", "productHSNcode": "7324", "GSTRate": "18", "saleRate": "5000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 52, "name": "LED TV", "productHSNcode": "852872", "GSTRate": "18", "saleRate": "30000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 53, "name": "Smartphone", "productHSNcode": "85171290", "GSTRate": "12", "saleRate": "20000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 54, "name": "Laptop", "productHSNcode": "84713010", "GSTRate": "18", "saleRate": "40000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 55, "name": "Bluetooth Speaker", "productHSNcode": "85182900", "GSTRate": "18", "saleRate": "2500", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 56, "name": "Refrigerator", "productHSNcode": "84182100", "GSTRate": "18", "saleRate": "25000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 57, "name": "Washing Machine", "productHSNcode": "84502010", "GSTRate": "18", "saleRate": "20000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 58, "name": "Air Conditioner", "productHSNcode": "84151010", "GSTRate": "18", "saleRate": "40000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 59, "name": "Microwave Oven", "productHSNcode": "85166090", "GSTRate": "18", "saleRate": "8000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 60, "name": "Vacuum Cleaner", "productHSNcode": "85081100", "GSTRate": "18", "saleRate": "5000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 61, "name": "Blender", "productHSNcode": "85094010", "GSTRate": "18", "saleRate": "1500", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 62, "name": "Toaster", "productHSNcode": "85167200", "GSTRate": "18", "saleRate": "1000", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 63, "name": "Electric Kettle", "productHSNcode": "85167100", "GSTRate": "18", "saleRate": "800", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 64, "name": "Food Processor", "productHSNcode": "85094010", "GSTRate": "18", "saleRate": "3500", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 65, "name": "Coffee Maker", "productHSNcode": "85167100", "GSTRate": "18", "saleRate": "2000", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 66, "name": "Rice Cooker", "productHSNcode": "85166090", "GSTRate": "18", "saleRate": "2500", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 67, "name": "Juicer", "productHSNcode": "85094010", "GSTRate": "18", "saleRate": "1500", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 68, "name": "Hair Dryer", "productHSNcode": "85163200", "GSTRate": "18", "saleRate": "1000", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 69, "name": "Electric Iron", "productHSNcode": "85164000", "GSTRate": "18", "saleRate": "1500", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 70, "name": "Water Heater", "productHSNcode": "85161000", "GSTRate": "18", "saleRate": "4000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 71, "name": "Television", "productHSNcode": "852872", "GSTRate": "18", "saleRate": "30000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 72, "name": "Air Purifier", "productHSNcode": "84213990", "GSTRate": "18", "saleRate": "10000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 73, "name": "Water Purifier", "productHSNcode": "84212190", "GSTRate": "18", "saleRate": "5000", "unit": "Nos", "type": "Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 74, "name": "Hair Straightener", "productHSNcode": "85163200", "GSTRate": "18", "saleRate": "2000", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 75, "name": "Hair Curler", "productHSNcode": "85163200", "GSTRate": "18", "saleRate": "2000", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },
            { "id": 76, "name": "Portable Speaker", "productHSNcode": "85182900", "GSTRate": "18", "saleRate": "2000", "unit": "Nos", "type": "Semi-Finished", "tag": PRODUCT_TAG, entityPublicAccess: true },

        ];
        return getPagedData(productArray, pageParam);

    }

    async inwordProductToStore(khID, state) {
        return { id: "test" }
    }

    async getAllLeads(khID, body, filterObject, withBalance) {
        const data = [{
            "products": [
                {
                    "units": 2,
                    "productdescription": "Comprehensive CRM software package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "CRM Suite",
                        "unit": "Bundles",
                        "saleRate": 500,
                        "GSTRate": 18,
                        "productItemcode": 1001,
                        "productHSNcode": "847111",
                        "materials": [
                            {
                                "materialName": "CRM Mat A",
                                "pricePerUnit": 250,
                                "rmQty": 10,
                                "id": "rm-001"
                            },
                            {
                                "materialName": "CRM Mat B",
                                "pricePerUnit": 150,
                                "rmQty": 5,
                                "id": "rm-002"
                            },
                            {
                                "materialName": "CRM Mat C",
                                "pricePerUnit": 100,
                                "rmQty": 7,
                                "id": "rm-003"
                            }
                        ]
                    }
                },
                {
                    "units": 1,
                    "productdescription": "Extended support package for CRM Suite.",
                    "product": {
                        "id": "745b906a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "Support Add-on",
                        "unit": "Number",
                        "saleRate": 200,
                        "GSTRate": 18,
                        "productItemcode": 1002,
                        "productHSNcode": "847321",
                        "materials": [
                            {
                                "materialName": "Support Mat A",
                                "pricePerUnit": 150,
                                "rmQty": 5,
                                "id": "rm-004"
                            },
                            {
                                "materialName": "Support Mat B",
                                "pricePerUnit": 100,
                                "rmQty": 4,
                                "id": "rm-005"
                            },
                            {
                                "materialName": "Support Mat C",
                                "pricePerUnit": 75,
                                "rmQty": 3,
                                "id": "rm-006"
                            }
                        ]
                    }
                },
                {
                    "units": 3,
                    "productdescription": "Complete marketing tools package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54945c4cbd42",
                        "name": "Marketing Suite",
                        "unit": "Packages",
                        "saleRate": 800,
                        "GSTRate": 18,
                        "productItemcode": 1003,
                        "productHSNcode": "847122",
                        "materials": []
                    }
                },
                {
                    "units": 1,
                    "productdescription": "Advanced analytics package for CRM Suite.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54cghj496d42",
                        "name": "Analytics Add-on",
                        "unit": "Number",
                        "saleRate": 300,
                        "GSTRate": 18,
                        "productItemcode": 1004,
                        "productHSNcode": "847333",
                        "materials": []
                    }
                }
            ], "id": "72b6206a-cbb8-4c08-bf32-54985b96bd42", "contactPerson": "Les Desforges", "customerName": "Rhyzio", "contactEmail": "ldesforges0@is.gd", "contactPhone": "+62-272-640-4027", "sourceOfLead": "WhatsApp", "lastUpdated": "2024-07-01T19:34:21Z", "status": DISPATCH, "followUpDate": "2024-07-01T12:38:23Z", "city": "New York", "voucherId": "4b5f9e87-9f2d-4d67-a8b6-1c6d8d92bc23", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac", "hasProduct": true
        },
        {
            "products": [
                {
                    "units": 2,
                    "productdescription": "Comprehensive CRM software package.",
                    "inspectionReport": [
                        {
                            "inspectionParameter": "Width",
                            "inspectionDiamention": "4 x 4",
                            "inspectionTolerance": "4 x 4"
                        },
                        {
                            "inspectionParameter": "Height",
                            "inspectionDiamention": "4 x 4",
                            "inspectionTolerance": "4 x 4"
                        },
                        {
                            "inspectionParameter": "Thickness",
                            "inspectionDiamention": "4 x 4",
                            "inspectionTolerance": "4 x 4"
                        },
                    ],
                    "reports": [
                        {
                            "reportId": "P1R1",
                            "Width": "P1R1 width",
                            "Height": "P1R1 height",
                            "Thickness": "P1R1 value",
                        },
                        {
                            "reportId": "P1R2",
                            "Width": "P1R2 width",
                            "Height": "P1R2 value",
                            "Thickness": "P1R2 thickness",
                        },
                        {
                            "reportId": "P1R3",
                            "Width": "P1R3 value",
                            "Height": "P1R3 value",
                            "Thickness": "P1R3 value",
                        },
                        {
                            "reportId": "P1R4",
                            "Width": "P1R4 value",
                            "Height": "P1R4 value",
                            "Thickness": "P1R4 value",
                        },
                        {
                            "reportId": "P1R5",
                            "Width": "P1R5 value",
                            "Height": "P1R5 value",
                            "Thickness": "P1R5 value",
                        },
                        {
                            "reportId": "P1R5",
                            "Width": "P1R5 value",
                            "Height": "P1R5 value",
                            "Thickness": "P1R5 value",
                        },
                    ],
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "CRM Suite",
                        "unit": "Bundles",
                        "saleRate": 500,
                        "GSTRate": 18,
                        "productItemcode": 1001,
                        "productHSNcode": "847111",
                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "CRM Mat A",
                                "saleRate": 1,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 4,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 23,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 4,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 43,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 3,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 54,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 5,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 63,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 1,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 53,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 23,
                        }
                    ]
                },
                {
                    "units": 1,
                    "productdescription": "Extended support package for CRM Suite.",
                    "product": {
                        "id": "745b906a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "Support Add-on",
                        "unit": "Number",
                        "saleRate": 200,
                        "GSTRate": 18,
                        "productItemcode": 1002,
                        "productHSNcode": "847321",
                        "inspectionReport": [
                            {
                                "inspectionParameter": "Inspection one",
                                "inspectionDiamention": "4 x 4",
                                "inspectionTolerance": "4 x 4"
                            },
                            {
                                "inspectionParameter": "Inspection two",
                                "inspectionDiamention": "4 x 4",
                                "inspectionTolerance": "4 x 4"
                            },
                            {
                                "inspectionParameter": "Inspection three",
                                "inspectionDiamention": "4 x 4",
                                "inspectionTolerance": "4 x 4"
                            },
                        ]
                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "CRM Mat A",
                                "saleRate": 3,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 34,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 43,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 43,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 23,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 43,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 20,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 2,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 23,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 23
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 43,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 7,
                        }
                    ]
                },
            ], "id": "57720718-8c41-4f87-b128-a84464d9c9ac", checkProcessHold: true, checkRmHold: true, "contactPerson": "Micheil Elsmore", "customerName": "Miboo", "contactEmail": "melsmore1@4shared.com", "contactPhone": "+33-846-289-8640", "sourceOfLead": "Referance", "lastUpdated": "2024-06-26T00:15:16Z", "status": "design", "followUpDate": "2024-06-25T14:25:35Z", "city": "Los Angeles", "voucherId": "b8a3d8e4-239f-4b6b-abc9-3d7e8bfa1f9d", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac", "hasProduct": true, "wa_id": "fdafe"
        },
        {
            "products": [
                {
                    "units": 2,
                    "productdescription": "Comprehensive CRM software package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "CRM Suite",
                        "unit": "Bundles",
                        "saleRate": 500,
                        "GSTRate": 18,
                        "productItemcode": 1001,
                        "productHSNcode": "847111",
                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-005",
                                "name": "CRM Mat A",
                                "saleRate": 1,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 13330,
                            "balance": 4,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 23,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 4,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 43,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 3,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 54,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 5,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 63,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 55,
                            "balance": 1,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 53,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 79,
                            "balance": 23,
                        }
                    ]
                },
                {
                    "units": 1,
                    "productdescription": "Extended support package for CRM Suite.",
                    "product": {
                        "id": "745b906a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "Support Add-on",
                        "unit": "Number",
                        "saleRate": 200,
                        "GSTRate": 18,
                        "productItemcode": 1002,
                        "productHSNcode": "847321",

                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "CRM Mat A",
                                "saleRate": 3,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 64,
                            "balance": 34,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 43,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 45,
                            "balance": 43,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 23,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 55,
                            "balance": 43,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 20,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 102,
                            "balance": 43,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 23,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 53,
                            "balance": 23,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 23,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 3,
                        }
                    ]
                },
            ], "id": "57720718-8c41-4f32-b128-a84464d9c9ac", checkProcessHold: false, checkRmHold: false, "contactPerson": "Micheil Elsmore", "customerName": "Miboo", "contactEmail": "melsmore1@4shared.com", "contactPhone": "+33-846-289-8640", "sourceOfLead": "Referance", "lastUpdated": "2024-06-26T00:15:16Z", "status": "design", "followUpDate": "2024-06-25T14:25:35Z", "city": "Los Angeles", "voucherId": "b8a3d8e4-239f-4b6b-abc9-3d7e8bfa1f9d", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac", "hasProduct": true
        },
        {
            "products": [
                {
                    "units": 2,
                    "productdescription": "Comprehensive CRM software package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "CRM Suite",
                        "unit": "Bundles",
                        "saleRate": 500,
                        "GSTRate": 18,
                        "productItemcode": 1001,
                        "productHSNcode": "847111",
                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "CRM Mat A",
                                "saleRate": 500,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 10,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 200,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 5,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 300,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 7,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 400,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 10
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 100,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 5
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 700,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 7
                        }
                    ]
                },
                {
                    "units": 1,
                    "productdescription": "Extended support package for CRM Suite.",
                    "product": {
                        "id": "745b906a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "Support Add-on",
                        "unit": "Number",
                        "saleRate": 200,
                        "GSTRate": 18,
                        "productItemcode": 1002,
                        "productHSNcode": "847321",
                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "CRM Mat A",
                                "saleRate": 500,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 10,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 200,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 5,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 300,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 7,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 400,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 10
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 100,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 5
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 700,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 7
                        }
                    ]
                },
                {
                    "units": 3,
                    "productdescription": "Complete marketing tools package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54945c4cbd42",
                        "name": "Marketing Suite",
                        "unit": "Packages",
                        "saleRate": 800,
                        "GSTRate": 18,
                        "productItemcode": 1003,
                        "productHSNcode": "847122",
                        "materials": []
                    }
                },
                {
                    "units": 1,
                    "productdescription": "Advanced analytics package for CRM Suite.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54cghj496d42",
                        "name": "Analytics Add-on",
                        "unit": "Number",
                        "saleRate": 300,
                        "GSTRate": 18,
                        "productItemcode": 1004,
                        "productHSNcode": "847333",
                        "materials": []
                    }
                }
            ], "id": "e24dbb01-fd35-4533-b4a6-84c149e73544", "contactPerson": "Trev Gargett", "customerName": "Skynoodle", "contactEmail": "tgargett4@imgur.com", "contactPhone": "+51-741-992-0059", "sourceOfLead": "Verbal", "lastUpdated": "2024-07-02T06:03:19Z", "status": "production", "followUpDate": "2024-06-25T12:43:42Z", "city": "Phoenix", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac"
        },
        {
            "products": [
                {
                    "units": 2,
                    "productdescription": "Comprehensive CRM software package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "CRM Suite",
                        "unit": "Bundles",
                        "saleRate": 500,
                        "GSTRate": 18,
                        "productItemcode": 1001,
                        "productHSNcode": "847111",
                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "CRM Mat A",
                                "saleRate": 500,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 4,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 200,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 4,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 300,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 3,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 400,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 5,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 100,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 1,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 700,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 23,
                        }
                    ]
                },
                {
                    "units": 1,
                    "productdescription": "Extended support package for CRM Suite.",
                    "product": {
                        "id": "745b906a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "Support Add-on",
                        "unit": "Number",
                        "saleRate": 200,
                        "GSTRate": 18,
                        "productItemcode": 1002,
                        "productHSNcode": "847321",

                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "CRM Mat A",
                                "saleRate": 500,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 34,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 200,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 43,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 300,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 43,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 400,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 2,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 100,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 23,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 700,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 7,
                        }
                    ]
                },
            ], "id": "57720718-8c41-4f87-b128-a84464d239c9ac", checkProcessHold: true, checkRmHold: true, "contactPerson": "Micheil Elsmore", "customerName": "Miboo", "contactEmail": "melsmore1@4shared.com", "contactPhone": "+33-846-289-8640", "sourceOfLead": "Referance", "lastUpdated": "2024-06-26T00:15:16Z", "status": "production", "followUpDate": "2024-06-25T14:25:35Z", "city": "Los Angeles", "voucherId": "b8a3d8e4-239f-4b6b-abc9-3d7e8bfa1f9d", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac", "hasProduct": true
        },
        {
            "products": [
                {
                    "units": 2,
                    "productdescription": "Comprehensive CRM software package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "CRM Suite",
                        "unit": "Bundles",
                        "saleRate": 500,
                        "GSTRate": 18,
                        "productItemcode": 1001,
                        "productHSNcode": "847111",
                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-005",
                                "name": "CRM Mat A",
                                "saleRate": 500,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 13330,
                            "balance": 4,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 200,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 4,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 300,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 3,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 400,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 5,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 100,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 55,
                            "balance": 1,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 700,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 79,
                            "balance": 23,
                        }
                    ]
                },
                {
                    "units": 1,
                    "productdescription": "Extended support package for CRM Suite.",
                    "product": {
                        "id": "745b906a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "Support Add-on",
                        "unit": "Number",
                        "saleRate": 200,
                        "GSTRate": 18,
                        "productItemcode": 1002,
                        "productHSNcode": "847321",

                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "CRM Mat A",
                                "saleRate": 500,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 64,
                            "balance": 34,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 200,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 45,
                            "balance": 43,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 300,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 55,
                            "balance": 43,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 400,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 102,
                            "balance": 43,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 100,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 53,
                            "balance": 23,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 700,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 3,
                        }
                    ]
                },
            ], "id": "57720718-8c41-4f32-b128-a8446434d9c9ac", checkProcessHold: false, checkRmHold: false, "contactPerson": "Micheil Elsmore", "customerName": "Miboo", "contactEmail": "melsmore1@4shared.com", "contactPhone": "+33-846-289-8640", "sourceOfLead": "Referance", "lastUpdated": "2024-06-26T00:15:16Z", "status": "production", "followUpDate": "2024-06-25T14:25:35Z", "city": "Los Angeles", "voucherId": "b8a3d8e4-239f-4b6b-abc9-3d7e8bfa1f9d", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac", "hasProduct": true
        },
        {
            "products": [
                {
                    "units": 2,
                    "productdescription": "Comprehensive CRM software package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "CRM Suite",
                        "unit": "Bundles",
                        "saleRate": 500,
                        "GSTRate": 18,
                        "productItemcode": 1001,
                        "productHSNcode": "847111",
                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "CRM Mat A",
                                "saleRate": 500,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 10,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 200,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 5,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 300,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 7,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 400,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 10
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 100,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 5
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 700,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 7
                        }
                    ]
                },
                {
                    "units": 1,
                    "productdescription": "Extended support package for CRM Suite.",
                    "product": {
                        "id": "745b906a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "Support Add-on",
                        "unit": "Number",
                        "saleRate": 200,
                        "GSTRate": 18,
                        "productItemcode": 1002,
                        "productHSNcode": "847321",
                    },
                    "rmlist": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "CRM Mat A",
                                "saleRate": 500,
                                "GSTRate": 18,
                                "productItemcode": 5334,
                                "productHSNcode": 378920,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 10,
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "CRM Mat B",
                                "saleRate": 200,
                                "GSTRate": 18,
                                "productItemcode": 3234,
                                "productHSNcode": 754675,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 5,
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "CRM Mat C",
                                "saleRate": 300,
                                "GSTRate": 18,
                                "productItemcode": 9829,
                                "productHSNcode": 377393,
                                "type": "Raw Material",
                                "unit": "Number",
                            },
                            "units": 7,
                        }
                    ],
                    "processes": [
                        {
                            "product": {
                                "id": "rm-001",
                                "name": "Process Mat A",
                                "saleRate": 400,
                                "GSTRate": 18,
                                "productItemcode": 9277,
                                "productHSNcode": 199272,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 10,
                            "balance": 10
                        },
                        {
                            "product": {
                                "id": "rm-0021",
                                "name": "Process Mat B",
                                "saleRate": 100,
                                "GSTRate": 18,
                                "productItemcode": 3823,
                                "productHSNcode": 900382,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 5,
                            "balance": 5
                        },
                        {
                            "product": {
                                "id": "rm-003",
                                "name": "Process Mat C",
                                "saleRate": 700,
                                "GSTRate": 18,
                                "productItemcode": 8939,
                                "productHSNcode": 357723,
                                "type": "Work Process",
                                "unit": "Number",
                            },
                            "units": 7,
                            "balance": 7
                        }
                    ]
                },
                {
                    "units": 3,
                    "productdescription": "Complete marketing tools package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54945c4cbd42",
                        "name": "Marketing Suite",
                        "unit": "Packages",
                        "saleRate": 800,
                        "GSTRate": 18,
                        "productItemcode": 1003,
                        "productHSNcode": "847122",
                        "materials": []
                    }
                },
                {
                    "units": 1,
                    "productdescription": "Advanced analytics package for CRM Suite.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54cghj496d42",
                        "name": "Analytics Add-on",
                        "unit": "Number",
                        "saleRate": 300,
                        "GSTRate": 18,
                        "productItemcode": 1004,
                        "productHSNcode": "847333",
                        "materials": []
                    }
                }
            ], "id": "e24dbb01-fd35-4533-b44fa6-84c149e73544", "contactPerson": "Trev Gargett", "customerName": "Skynoodle", "contactEmail": "tgargett4@imgur.com", "contactPhone": "+51-741-992-0059", "sourceOfLead": "Verbal", "lastUpdated": "2024-07-02T06:03:19Z", "status": "production", "followUpDate": "2024-06-25T12:43:42Z", "city": "Phoenix", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac"
        },
        {
            "products": [
                {
                    "units": 2,
                    "productdescription": "Comprehensive CRM software package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "CRM Suite",
                        "unit": "Bundles",
                        "saleRate": 500,
                        "GSTRate": 18,
                        "productItemcode": 1001,
                        "productHSNcode": "847111",
                        "materials": [
                            {
                                "materialName": "CRM Mat A",
                                "pricePerUnit": 250,
                                "rmQty": 10,
                                "id": "rm-001"
                            },
                            {
                                "materialName": "CRM Mat B",
                                "pricePerUnit": 150,
                                "rmQty": 5,
                                "id": "rm-002"
                            },
                            {
                                "materialName": "CRM Mat C",
                                "pricePerUnit": 100,
                                "rmQty": 7,
                                "id": "rm-003"
                            }
                        ]
                    }
                },
                {
                    "units": 1,
                    "productdescription": "Extended support package for CRM Suite.",
                    "product": {
                        "id": "745b906a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "Support Add-on",
                        "unit": "Number",
                        "saleRate": 200,
                        "GSTRate": 18,
                        "productItemcode": 1002,
                        "productHSNcode": "847321",
                        "materials": [
                            {
                                "materialName": "Support Mat A",
                                "pricePerUnit": 150,
                                "rmQty": 5,
                                "id": "rm-004"
                            },
                            {
                                "materialName": "Support Mat B",
                                "pricePerUnit": 100,
                                "rmQty": 4,
                                "id": "rm-005"
                            },
                            {
                                "materialName": "Support Mat C",
                                "pricePerUnit": 75,
                                "rmQty": 3,
                                "id": "rm-006"
                            }
                        ]
                    }
                },
                {
                    "units": 3,
                    "productdescription": "Complete marketing tools package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54945c4cbd42",
                        "name": "Marketing Suite",
                        "unit": "Packages",
                        "saleRate": 800,
                        "GSTRate": 18,
                        "productItemcode": 1003,
                        "productHSNcode": "847122",
                        "materials": []
                    }
                },
                {
                    "units": 1,
                    "productdescription": "Advanced analytics package for CRM Suite.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54cghj496d42",
                        "name": "Analytics Add-on",
                        "unit": "Number",
                        "saleRate": 300,
                        "GSTRate": 18,
                        "productItemcode": 1004,
                        "productHSNcode": "847333",
                        "materials": []
                    }
                }
            ], "id": "916171f1-4114-4ea7-827b-6d63c55826a6", "contactPerson": "Curran Mayall", "customerName": "Demivee", "contactEmail": "cmayall5@nymag.com", "contactPhone": "+57-131-720-3724", "sourceOfLead": "Referance", "lastUpdated": "2024-06-28T20:02:20Z", "status": "dispatch", "followUpDate": "2024-06-30T16:16:49Z", "city": "Philadelphia", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac"
        },
        {
            "products": [
                {
                    "units": 2,
                    "productdescription": "Comprehensive CRM software package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "CRM Suite",
                        "unit": "Bundles",
                        "saleRate": 500,
                        "GSTRate": 18,
                        "productItemcode": 1001,
                        "productHSNcode": "847111",
                    },
                    "rmlist": [
                        {
                            "product": { "id": "rm-0013", "name": "CRM Mat A" },
                            "rate": 250,
                            "units": 10,
                            "balance": 0
                        },
                        {
                            "product": { "id": "rm-0021", "name": "CRM Mat B" },
                            "rate": 150,
                            "units": 5,
                            "balance": 0
                        },
                        {
                            "product": { "id": "rm-003", "name": "CRM Mat C" },
                            "rate": 100,
                            "units": 7,
                            "balance": 0
                        }
                    ],
                    "processes": [
                        {
                            "product": { "id": "rm-0013", "name": "Process Mat A" },
                            "rate": 250,
                            "units": 10,
                            "balance": 0
                        },
                        {
                            "product": { "id": "rm-0021", "name": "Process Mat B" },
                            "rate": 150,
                            "units": 5,
                            "balance": 0
                        },
                        {
                            "product": { "id": "rm-003", "name": "Process Mat C" },
                            "rate": 100,
                            "units": 7,
                            "balance": 0
                        }
                    ]
                },
                {
                    "units": 1,
                    "productdescription": "Extended support package for CRM Suite.",
                    "product": {
                        "id": "745b906a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "Support Add-on",
                        "unit": "Number",
                        "saleRate": 200,
                        "GSTRate": 18,
                        "productItemcode": 1002,
                        "productHSNcode": "847321",

                    },
                    "rmlist": [
                        {
                            "product": { "id": "rm-0013", "name": "CRM Mat A" },
                            "rate": 250,
                            "units": 10,
                            "balance": 0
                        },
                        {
                            "product": { "id": "rm-0021", "name": "CRM Mat B" },
                            "rate": 150,
                            "units": 5,
                            "balance": 0
                        },
                        {
                            "product": { "id": "rm-003", "name": "CRM Mat C" },
                            "rate": 100,
                            "units": 7,
                            "balance": 0
                        }
                    ],
                    "processes": [
                        {
                            "product": { "id": "rm-0013", "name": "Process Mat A", saleRate: "34" },
                            "units": 10,
                            "balance": 0
                        },
                        {
                            "product": { "id": "rm-0021", "name": "Process Mat B", saleRate: "34" },
                            "rate": 150,
                            "units": 5,
                            "balance": 0
                        },
                        {
                            "product": { "id": "rm-003", "name": "Process Mat C", saleRate: "34" },
                            "rate": 100,
                            "units": 7,
                            "balance": 0
                        }
                    ]
                },
            ], "id": "57720718-8c41-4f87-b128-a84464d9c9ac", checkProcessHold: false, checkRmHold: false, "contactPerson": "Micheil Elsmore", "customerName": "Miboo", "contactEmail": "melsmore1@4shared.com", "contactPhone": "+33-846-289-8640", "sourceOfLead": "Referance", "lastUpdated": "2024-06-26T00:15:16Z", "status": "design", "followUpDate": "2024-06-25T14:25:35Z", "city": "Los Angeles", "voucherId": "b8a3d8e4-239f-4b6b-abc9-3d7e8bfa1f9d", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac", "hasProduct": true
        },
        {
            "products": [
                {
                    "units": 2,
                    "productdescription": "Comprehensive CRM software package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "CRM Suite",
                        "unit": "Bundles",
                        "saleRate": 500,
                        "GSTRate": 18,
                        "productItemcode": 1001,
                        "productHSNcode": "847111",
                    },
                    "rmlist": [
                        {
                            "product": { "id": "rm-001", "name": "CRM Mat A", saleRate: "34" },
                            "rate": 250,
                            "units": 10,
                            "balance": 25
                        },
                        {
                            "product": { "id": "rm-0021", "name": "CRM Mat B", saleRate: "34" },
                            "rate": 150,
                            "units": 5,
                            "balance": 26
                        },
                        {
                            "product": { "id": "rm-003", "name": "CRM Mat C", saleRate: "34" },
                            "rate": 100,
                            "units": 7,
                            "balance": 45
                        }
                    ],
                    "processes": [
                        {
                            "product": { "id": "rm-001", "name": "Process Mat A", saleRate: "34" },
                            "rate": 250,
                            "units": 10,
                            "balance": 45
                        },
                        {
                            "product": { "id": "rm-0021", "name": "Process Mat B", saleRate: "34" },
                            "rate": 150,
                            "units": 5,
                            "balance": 65
                        },
                        {
                            "product": { "id": "rm-003", "name": "Process Mat C", saleRate: "34" },
                            "rate": 100,
                            "units": 7,
                            "balance": 23
                        }
                    ]
                },
                {
                    "units": 1,
                    "productdescription": "Extended support package for CRM Suite.",
                    "product": {
                        "id": "745b906a-4c08-cbb8-bf32-54985b96bd42",
                        "name": "Support Add-on",
                        "unit": "Number",
                        "saleRate": 200,
                        "GSTRate": 18,
                        "productItemcode": 1002,
                        "productHSNcode": "847321",

                    },
                    "rmlist": [
                        {
                            "product": { "id": "rm-001", "name": "CRM Mat A", "saleRate": "34" },
                            "rate": 250,
                            "units": 10,
                            "balance": 23
                        },
                        {
                            "product": { "id": "rm-0021", "name": "CRM Mat B", "saleRate": "34" },
                            "rate": 150,
                            "units": 5,
                            "balance": 43
                        },
                        {
                            "product": { "id": "rm-003", "name": "CRM Mat C", "saleRate": "34" },
                            "rate": 100,
                            "units": 7,
                            "balance": 43
                        }
                    ],
                    "processes": [
                        {
                            "product": { "id": "rm-001", "name": "Process Mat A", "saleRate": "34" },
                            "rate": 250,
                            "units": 10,
                            "balance": 45
                        },
                        {
                            "product": { "id": "rm-0021", "name": "Process Mat B", "saleRate": "34" },
                            "rate": 150,
                            "units": 5,
                            "balance": 65
                        },
                        {
                            "product": { "id": "rm-003", "name": "Process Mat C", "saleRate": "34" },
                            "rate": 100,
                            "units": 7,
                            "balance": 56
                        }
                    ]
                },
                {
                    "units": 3,
                    "productdescription": "Complete marketing tools package.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54945c4cbd42",
                        "name": "Marketing Suite",
                        "unit": "Packages",
                        "saleRate": 800,
                        "GSTRate": 18,
                        "productItemcode": 1003,
                        "productHSNcode": "847122",
                    },
                    "rmlist": [
                        {
                            "product": { "id": "rm-001", "name": "CRM Mat A", "saleRate": "34" },
                            "rate": 250,
                            "units": 10,
                            "balance": 23
                        },
                        {
                            "product": { "id": "rm-0021", "name": "CRM Mat B", "saleRate": "34" },
                            "rate": 150,
                            "units": 5,
                            "balance": 43
                        },
                        {
                            "product": { "id": "rm-003", "name": "CRM Mat C", "saleRate": "34" },
                            "rate": 100,
                            "units": 7,
                            "balance": 43
                        }
                    ],
                    "processes": [
                        {
                            "product": { "id": "rm-001", "name": "Process Mat A", "saleRate": "34" },
                            "rate": 250,
                            "units": 10,
                            "balance": 45
                        },
                        {
                            "product": { "id": "rm-0021", "name": "Process Mat B", "saleRate": "34" },
                            "rate": 150,
                            "units": 5,
                            "balance": 65
                        },
                        {
                            "product": { "id": "rm-003", "name": "Process Mat C", "saleRate": "34" },
                            "rate": 100,
                            "units": 7,
                            "balance": 56
                        }
                    ]
                },
                {
                    "units": 1,
                    "productdescription": "Advanced analytics package for CRM Suite.",
                    "product": {
                        "id": "72b6206a-4c08-cbb8-bf32-54cghj496d42",
                        "name": "Analytics Add-on",
                        "unit": "Number",
                        "saleRate": 300,
                        "GSTRate": 18,
                        "productItemcode": 1004,
                        "productHSNcode": "847333",
                    },
                    "rmlist": [
                        {
                            "product": { "id": "rm-001", "name": "CRM Mat A", "saleRate": "34" },
                            "rate": 250,
                            "units": 10,
                            "balance": 233
                        },
                        {
                            "product": { "id": "rm-0021", "name": "CRM Mat B", "saleRate": "34" },
                            "rate": 150,
                            "units": 5,
                            "balance": 435
                        },
                        {
                            "product": { "id": "rm-003", "name": "CRM Mat C", "saleRate": "34" },
                            "rate": 100,
                            "units": 7,
                            "balance": 432
                        }
                    ],
                    "processes": [
                        {
                            "product": { "id": "rm-001", "name": "Process Mat A", "saleRate": "34" },
                            "rate": 250,
                            "units": 10,
                            "balance": 454
                        },
                        {
                            "product": { "id": "rm-0021", "name": "Process Mat B", "saleRate": "34" },
                            "rate": 150,
                            "units": 5,
                            "balance": 653
                        },
                        {
                            "product": { "id": "rm-003", "name": "Process Mat C", "saleRate": "34" },
                            "rate": 100,
                            "units": 7,
                            "balance": 563
                        }
                    ]
                }
            ], "id": "57720718-8c41-4f87-b128-a84500d9c9ac", checkProcessHold: true, checkRmHold: true, "contactPerson": "Micheil Elsmore", "customerName": "Miboo", "contactEmail": "melsmore1@4shared.com", "contactPhone": "+33-846-289-8640", "sourceOfLead": "Referance", "lastUpdated": "2024-06-26T00:15:16Z", "status": "design", "followUpDate": "2024-06-25T14:25:35Z", "city": "Los Angeles", "voucherId": "b8a3d8e4-239f-4b6b-abc9-3d7e8bfa1f9d", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac", "hasProduct": true
        },
        { "id": "8f2e5510-5f63-47a8-ac6c-a2020d6601b2", "products": [], "contactPerson": "Fair Sleany", "customerName": "Yakijo", "contactEmail": "fsleany6@is.gd", "contactPhone": "+7-997-165-3285", "sourceOfLead": "Indiamart", "lastUpdated": "2024-06-29T21:46:11Z", "status": "quoted", "followUpDate": "2024-06-27T13:39:47Z", "city": "San Antonio", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "001fabc5-2ca8-4bd5-b330-d6cbce88a0ea", "products": [], "contactPerson": "Oralle Lemmen", "customerName": "Fiveclub", "contactEmail": "olemmen7@google.cn", "contactPhone": "+234-283-188-3327", "sourceOfLead": "WhatsApp", "lastUpdated": "2024-06-26T16:16:16Z", "status": "production", "followUpDate": "2024-06-27T16:24:37Z", "city": "San Diego", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "dca25939-8d17-40c2-a2f9-88e81d14adb5", "products": [], "contactPerson": "Suzy Maylor", "customerName": "Twimm", "contactEmail": "smaylor8@newyorker.com", "contactPhone": "+86-317-527-6348", "sourceOfLead": "Referance", "lastUpdated": "2024-07-02T07:21:07Z", "status": "converted", "followUpDate": "2024-06-30T19:43:34Z", "city": "Dallas", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "e08a6b35-9d15-4d90-a80b-18a6de8c49cf", "products": [], "contactPerson": "Paulette Spileman", "customerName": "Fivebridge", "contactEmail": "pspileman9@msu.edu", "contactPhone": "+687-931-809-5313", "sourceOfLead": "Indiamart", "lastUpdated": "2024-06-25T16:43:19Z", "status": "quotation Needed", quotationDate: "1727604916462", "quotationId": "343434", "followUpDate": "2024-06-27T08:18:16Z", "city": "San Jose", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "310414c1-f032-45ed-bd11-d8792d7e15a4", "products": [], "contactPerson": "Briano Blackster", "customerName": "Trudeo", "contactEmail": "bblackstera@usatoday.com", "contactPhone": "+86-671-673-9203", "sourceOfLead": "Referance", "lastUpdated": "2024-06-27T10:29:43Z", "status": "quoted", "followUpDate": "2024-07-02T12:56:08Z", "city": "Austin", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "720f1f4d-e9fe-48d2-8db1-e440ea520d3c", "products": [], "contactPerson": "Hardy Stonuary", "customerName": "Quatz", "contactEmail": "hstonuaryb@networkadvertising.org", "contactPhone": "+86-470-299-7494", "sourceOfLead": "Email", "lastUpdated": "2024-06-30T15:39:39Z", "status": "quotation Needed", quotationDate: "1727604916462", "followUpDate": "2024-06-30T18:32:56Z", "city": "Jacksonville", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "69870892-bd89-4d49-9f9f-7f520e4e2f53", "products": [], "contactPerson": "Arleyne Gruszczak", "customerName": "Ainyx", "contactEmail": "agruszczakc@sitemeter.com", "contactPhone": "+62-461-522-5917", "sourceOfLead": "Email", "lastUpdated": "2024-06-30T16:57:58Z", "status": "open", "followUpDate": "2024-06-25T11:14:33Z", "city": "Fort Worth", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "03bfef63-8496-4301-9b71-65aba7510b8c", "products": [], "contactPerson": "Levi Grahlman", "customerName": "Topiczoom", "contactEmail": "lgrahlmand@wsj.com", "contactPhone": "+46-803-235-6616", "sourceOfLead": "Email", "lastUpdated": "2024-07-02T00:34:13Z", "status": "production", "followUpDate": "2024-06-30T04:31:47Z", "city": "Columbus", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "155e801c-abbf-4775-bbfc-d87f5023e321", "products": [], "contactPerson": "Fields Clowney", "customerName": "Jayo", "contactEmail": "fclowneye@clickbank.net", "contactPhone": "+51-621-117-8641", "sourceOfLead": "Email", "lastUpdated": "2024-06-29T22:54:56Z", "status": "quoted", "followUpDate": "2024-06-27T06:35:44Z", "city": "Charlotte", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "53d38bbf-367d-4734-9156-5c8ddc3baca8", "products": [], "contactPerson": "Robby DelaField", "customerName": "Fliptune", "contactEmail": "rdelafieldf@census.gov", "contactPhone": "+7-471-504-8853", "sourceOfLead": "Verbal", "lastUpdated": "2024-06-25T03:08:58Z", "status": "converted", "followUpDate": "2024-06-30T21:55:16Z", "city": "San Francisco", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "cd87bf51-6602-4480-bf42-bb338d33b476", "products": [], "contactPerson": "Ermanno Clougher", "customerName": "Ntags", "contactEmail": "eclougherg@github.com", "contactPhone": "+690-192-657-3406", "sourceOfLead": "WhatsApp", "lastUpdated": "2024-06-26T08:43:44Z", "status": "closed", "followUpDate": "2024-06-27T11:25:07Z", "city": "Indianapolis", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "d2ac322b-d407-42b6-9a7f-011f910b57a6", "products": [], "contactPerson": "Kendal Laraway", "customerName": "Devbug", "contactEmail": "klarawayh@hibu.com", "contactPhone": "+62-713-420-6686", "sourceOfLead": "Verbal", "lastUpdated": "2024-07-01T01:17:11Z", "status": "quotation Needed", quotationDate: "1727604916462", "followUpDate": "2024-06-27T20:12:43Z", "city": "Seattle", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "2e3a5eb7-7dce-4ae4-a777-07f53f3ba4f8", "products": [], "contactPerson": "Antonio Mariet", "customerName": "Browseblab", "contactEmail": "amarieti@umich.edu", "contactPhone": "+54-457-661-6137", "sourceOfLead": "Email", "lastUpdated": "2024-06-26T01:16:35Z", "status": "quotation Needed", quotationDate: "1727604916462", "followUpDate": "2024-06-25T05:25:21Z", "city": "Denver", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "a4c3c872-271f-4f57-b673-162ff87eb750", "products": [], "contactPerson": "Baxy Strowlger", "customerName": "Eare", "contactEmail": "bstrowlgerj@techcrunch.com", "contactPhone": "+355-298-637-5886", "sourceOfLead": "Verbal", "lastUpdated": "2024-07-01T09:43:51Z", "status": "production", "followUpDate": "2024-07-01T09:02:04Z", "city": "Washington D.C.", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "5badd6ff-eaa9-47ff-809f-730ea2a22583", "products": [], "contactPerson": "Lemar Deuss", "customerName": "Photobug", "contactEmail": "ldeussk@intel.com", "contactPhone": "+33-948-113-8538", "sourceOfLead": "Indiamart", "lastUpdated": "2024-06-26T21:33:15Z", "status": "dispatch", "followUpDate": "2024-06-30T22:53:00Z", "city": "Boston", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "a9189d96-a509-4ffb-8c2a-e4ae869c0922", "products": [], "contactPerson": "Willamina Castagnaro", "customerName": "Fanoodle", "contactEmail": "wcastagnarol@scribd.com", "contactPhone": "+81-662-185-2151", "sourceOfLead": "Email", "lastUpdated": "2024-07-02T08:57:20Z", "status": "closed", "followUpDate": "2024-06-26T15:05:24Z", "city": "El Paso", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "ca14b5a5-8d0f-4ee1-a83c-ef8c32c54f58", "products": [], "contactPerson": "Obie Dorney", "customerName": "Jetwire", "contactEmail": "odorneym@cornell.edu", "contactPhone": "+86-560-891-1716", "sourceOfLead": "Verbal", "lastUpdated": "2024-07-01T20:25:29Z", "status": "dispatch", "followUpDate": "2024-07-01T23:13:18Z", "city": "Nashville", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "86f7ce67-452b-491e-a62a-d6fa00f1adb2", "products": [], "contactPerson": "Winfred Durning", "customerName": "Kaymbo", "contactEmail": "wdurningn@walmart.com", "contactPhone": "+86-372-262-3367", "sourceOfLead": "Referance", "lastUpdated": "2024-06-28T23:52:35Z", "status": "production", "followUpDate": "2024-06-29T11:22:16Z", "city": "Detroit", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "09002637-c2d2-4c9b-a530-e841e8d0f2e1", "products": [], "contactPerson": "Tasia Bumphries", "customerName": "Tagpad", "contactEmail": "tbumphrieso@people.com.cn", "contactPhone": "+371-407-157-4333", "sourceOfLead": "Referance", "lastUpdated": "2024-06-30T09:20:09Z", "status": "dispatch", "followUpDate": "2024-06-25T04:16:04Z", "city": "Oklahoma City", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "136b91b8-0e2d-44c1-986f-0326bce4f895", "products": [], "contactPerson": "Cristi Pasby", "customerName": "Skilith", "contactEmail": "cpasbyp@storify.com", "contactPhone": "+55-411-960-9035", "sourceOfLead": "Verbal", "lastUpdated": "2024-07-02T19:19:01Z", "status": "converted", "followUpDate": "2024-06-30T09:16:48Z", "city": "Portland", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "50edc917-dd24-4db8-8b43-e26b81402dec", "products": [], "contactPerson": "Goddard Hudless", "customerName": "Shuffledrive", "contactEmail": "ghudlessq@youtu.be", "contactPhone": "+46-877-101-1864", "sourceOfLead": "WhatsApp", "lastUpdated": "2024-06-26T19:59:14Z", "status": "open", "followUpDate": "2024-06-28T13:36:08Z", "city": "Las Vegas", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "f5fdb7f2-b6eb-4dd2-b412-59a9acfc6335", "products": [], "contactPerson": "Bendix Posvner", "customerName": "Viva", "contactEmail": "bposvnerr@craigslist.org", "contactPhone": "+55-409-805-5335", "sourceOfLead": "Verbal", "lastUpdated": "2024-06-27T03:57:03Z", "status": "converted", "followUpDate": "2024-07-01T08:49:39Z", "city": "Memphis", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "5d69c3e0-7c97-472a-8836-e0e48fe5d924", "products": [], "contactPerson": "Loy Glennard", "customerName": "Plambee", "contactEmail": "lglennards@prlog.org", "contactPhone": "+351-708-398-8205", "sourceOfLead": "Referance", "lastUpdated": "2024-07-02T21:41:51Z", "status": "quoted", "followUpDate": "2024-07-01T11:13:36Z", "city": "Louisville", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "151fb0f1-a351-4027-8393-8f28bed26dd1", "products": [], "contactPerson": "Pavel Geyton", "customerName": "Youspan", "contactEmail": "pgeytont@nsw.gov.au", "contactPhone": "+86-919-184-0005", "sourceOfLead": "WhatsApp", "lastUpdated": "2024-06-25T18:40:24Z", "status": "quoted", "followUpDate": "2024-06-26T11:37:25Z", "city": "Baltimore", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "a48719bc-3685-416d-b832-ed6126e7befb", "products": [], "contactPerson": "Blondelle Dunseath", "customerName": "Realfire", "contactEmail": "bdunseathu@unesco.org", "contactPhone": "+86-760-765-7087", "sourceOfLead": "Verbal", "lastUpdated": "2024-06-30T18:21:28Z", "status": "dispatch", "followUpDate": "2024-06-30T02:52:31Z", "city": "Milwaukee", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "19039c8a-c785-41cd-8f54-3a34d7403214", "products": [], "contactPerson": "Jordan Harbert", "customerName": "Babbleset", "contactEmail": "jharbertv@lulu.com", "contactPhone": "+386-856-323-4231", "sourceOfLead": "Email", "lastUpdated": "2024-07-02T22:18:35Z", "status": "open", "followUpDate": "2024-06-25T10:47:08Z", "city": "Albuquerque", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "3c589e9e-6089-46d5-8490-6bbff3320837", "products": [], "contactPerson": "Maye Moorhouse", "customerName": "Quimba", "contactEmail": "mmoorhousew@google.cn", "contactPhone": "+977-932-745-3080", "sourceOfLead": "Verbal", "lastUpdated": "2024-06-29T12:11:28Z", "status": "quoted", "followUpDate": "2024-06-25T03:59:08Z", "city": "Tucson", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "4340a186-70e7-4f3f-a425-a2875349e505", "products": [], "contactPerson": "Renell Bailles", "customerName": "Thoughtstorm", "contactEmail": "rbaillesx@omniture.com", "contactPhone": "+7-596-206-3795", "sourceOfLead": "Verbal", "lastUpdated": "2024-06-26T22:42:01Z", "status": "production", "followUpDate": "2024-06-30T13:42:04Z", "city": "Fresno", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "867602b7-994d-4ddb-863f-a7393a0e434a", "products": [], "contactPerson": "Trixie Brame", "customerName": "Topicware", "contactEmail": "tbramey@aboutads.info", "contactPhone": "+380-581-943-3291", "sourceOfLead": "WhatsApp", "lastUpdated": "2024-07-01T12:55:23Z", "status": "open", "followUpDate": "2024-06-28T13:57:30Z", "city": "Sacramento", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "0e385100-756e-4c68-b274-1a89be417cf8", "products": [], "contactPerson": "Maxie Rapin", "customerName": "Kayveo", "contactEmail": "mrapinz@slideshare.net", "contactPhone": "+63-265-449-7481", "sourceOfLead": "WhatsApp", "lastUpdated": "2024-07-01T17:07:46Z", "status": "quoted", "followUpDate": "2024-07-01T16:16:55Z", "city": "Kansas City", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "da7b7c43-d738-4cc4-9414-17d7cbc82746", "products": [], "contactPerson": "Della Mulholland", "customerName": "Photobug", "contactEmail": "dmulholland10@exblog.jp", "contactPhone": "+20-986-433-2963", "sourceOfLead": "WhatsApp", "lastUpdated": "2024-06-30T11:19:31Z", "status": "converted", "followUpDate": "2024-06-28T05:25:47Z", "city": "Long Beach", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "737cbc3b-9742-4f89-b754-8d450a1e6280", "products": [], "contactPerson": "Rowena Kopmann", "customerName": "Jayo", "contactEmail": "rkopmann11@ibm.com", "contactPhone": "+1-128-178-8074", "sourceOfLead": "Email", "lastUpdated": "2024-07-02T11:41:03Z", "status": "open", "followUpDate": "2024-06-30T23:10:26Z", "city": "Mesa", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "48bb7392-f408-4c35-8aab-0921a723a491", "products": [], "contactPerson": "Der Cannon", "customerName": "Latz", "contactEmail": "dcannon12@nydailynews.com", "contactPhone": "+57-534-565-2516", "sourceOfLead": "Indiamart", "lastUpdated": "2024-06-28T19:13:19Z", "status": "open", "followUpDate": "2024-06-28T10:00:33Z", "city": "Atlanta", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "2eacb725-f836-409f-884a-b9566ffb1336", "products": [], "contactPerson": "Betsy Wetheril", "customerName": "Skaboo", "contactEmail": "bwetheril13@mozilla.org", "contactPhone": "+62-745-579-2621", "sourceOfLead": "Referance", "lastUpdated": "2024-06-25T19:15:34Z", "status": "dispatch", "followUpDate": "2024-06-26T14:46:13Z", "city": "Colorado Springs", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "1cb86d3d-7df4-48f5-ad4a-68aa36e4dab0", "products": [], "contactPerson": "Ronalda Chupin", "customerName": "Skiptube", "contactEmail": "rchupin14@hc360.com", "contactPhone": "+63-852-709-4458", "sourceOfLead": "Email", "lastUpdated": "2024-06-26T05:30:02Z", "status": "closed", "followUpDate": "2024-06-29T16:46:14Z", "city": "Virginia Beach", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "e8692788-8087-4973-90ad-3423a6ed9d86", "products": [], "contactPerson": "Prue Sworder", "customerName": "Riffpedia", "contactEmail": "psworder15@time.com", "contactPhone": "+86-561-181-7536", "sourceOfLead": "Verbal", "lastUpdated": "2024-06-26T06:40:56Z", "status": "converted", "followUpDate": "2024-06-28T07:14:33Z", "city": "Raleigh", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "3aecf119-2a48-4ba0-b8f1-259b5f72bf45", "products": [], "contactPerson": "Jania Bradshaw", "customerName": "Thoughtstorm", "contactEmail": "jbradshaw16@marriott.com", "contactPhone": "+7-444-882-9235", "sourceOfLead": "Referance", "lastUpdated": "2024-06-30T08:34:36Z", "status": "converted", "followUpDate": "2024-06-29T03:05:57Z", "city": "Omaha", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "4c65df65-98b7-4b0c-8c50-5fe8b932653a", "products": [], "contactPerson": "Fenelia Holliar", "customerName": "Aivee", "contactEmail": "fholliar17@twitter.com", "contactPhone": "+48-498-323-6590", "sourceOfLead": "Indiamart", "lastUpdated": "2024-06-28T20:59:59Z", "status": "quotation Needed", quotationDate: "1727604916462", "followUpDate": "2024-06-26T19:34:38Z", "city": "Miami", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "59493732-e06c-4e39-b151-e8f81fa7fd73", "products": [], "contactPerson": "Philip Yesipov", "customerName": "Oodoo", "contactEmail": "pyesipov18@shop-pro.jp", "contactPhone": "+45-216-260-1434", "sourceOfLead": "Referance", "lastUpdated": "2024-06-25T04:29:46Z", "status": "open", "followUpDate": "2024-06-28T14:35:29Z", "city": "Oakland", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "7277eb0d-4b53-4097-9c7b-842fc61e9519", "products": [], "contactPerson": "Jeffrey Aldersey", "customerName": "InnoZ", "contactEmail": "jaldersey19@kickstarter.com", "contactPhone": "+66-934-383-4102", "sourceOfLead": "Email", "lastUpdated": "2024-06-28T09:12:48Z", "status": "closed", "followUpDate": "2024-06-30T04:48:25Z", "city": "Minneapolis", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "9c7146db-486e-48a0-8ac7-1968645de576", "products": [], "contactPerson": "Darryl Yellowlea", "customerName": "Mydeo", "contactEmail": "dyellowlea1a@tumblr.com", "contactPhone": "+256-564-408-7906", "sourceOfLead": "WhatsApp", "lastUpdated": "2024-07-01T19:33:36Z", "status": "closed", "followUpDate": "2024-07-02T15:11:22Z", "city": "Tulsa", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "76c13be8-c21b-4007-93f1-6c6e70dc7404", "products": [], "contactPerson": "Denver McGaugey", "customerName": "Wordify", "contactEmail": "dmcgaugey1b@admin.ch", "contactPhone": "+7-970-511-9256", "sourceOfLead": "WhatsApp", "lastUpdated": "2024-06-26T02:05:14Z", "status": "quoted", "followUpDate": "2024-06-27T03:28:43Z", "city": "Wichita", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "91b25af5-d7a9-4635-863c-8ac65db6ee9c", "products": [], "contactPerson": "Fiann Callister", "customerName": "Vinte", "contactEmail": "fcallister1c@dot.gov", "contactPhone": "+420-991-843-6168", "sourceOfLead": "Referance", "lastUpdated": "2024-06-26T15:12:05Z", "status": "quoted", "followUpDate": "2024-07-02T01:35:46Z", "city": "New Orleans", "inquiryRequirementVoucherId": "57720718-8c41-4f87-b128-a84464d9c9ac" },
        { "id": "117809e6-fb25-4fae-a663-60fccc9c10bc", "products": [], "contactPerson": "Florella Camerello", "customerName": "Divavu", "contactEmail": "fcamerello1d@stumbleupon.com", "contactPhone": "+380-931-217-4387", "sourceOfLead": "Verbal", "lastUpdated": "2024-06-29T09:25:41Z", "status": "open", "followUpDate": "2024-07-02T04:14:01Z", "city": "Cleveland" }]

        if (filterObject?.status)
            return data.filter((item) => item.status === filterObject.status);
        return data
    }

    async createCustomProducts(khID, products) {
        return [{ id: "15153bc7-c9dc-466f-a773-422f1b6f3d45" }];
    }

    async createProduct(khID, body) {
        return { id: "15153bc7-c9dc-466f-a773-422f1b6f3d45" };
    }

    async deleteProducts(khID, id) {
        return { id: id };
    }

    async updateProduct(khID, state, id) {
        return { id: id };
    }

    async getUserRoles(khID, body, options, pageParam) {
        const userRoles = [
            {
                "name": "test1",
                "ownedBy": "bBlJWtpht412DJ3JTHuBsCxt6s3w",
                "id": "16893579-c15c-4910-953f-71b912b43f7a"
            },
            {
                "name": "test2",
                "ownedBy": "bBlJWtpht412DJ3JTHuBsCxt6s3w",
                "id": "224e7a6a-b35a-418b-bfc6-8acf8d0e9610"
            },
            {
                "name": "test3",
                "ownedBy": "bBlJWtpht412DJ3JTHuBsCxt6s3w",
                "id": "22c1f7ea-045b-431b-bf59-937f2a6527dc"
            },
            {
                "name": "test4",
                "ownedBy": "bBlJWtpht412DJ3JTHuBsCxt6s3w",
                "id": "2e657738-5924-4dda-9883-fa098bc409c6"
            },
            {
                "name": "test5",
                "ownedBy": "bBlJWtpht412DJ3JTHuBsCxt6s3w",
                "id": "2ffb94d0-dbed-4d1c-b5e8-4510c1bf0aa5"
            },
            {
                "name": "test6",
                "ownedBy": "bBlJWtpht412DJ3JTHuBsCxt6s3w",
                "id": "3106d054-5e89-4cd1-9518-b1036a40b421"
            },
        ]
        return userRoles;
    }

    async createUserRole(khID, userRoleObject) {
        return { id: "15153bc7-c9dc-466f-a773-422f1b6f3d45" }
    }

    async deleteUserRole(khID, id) {
        return { id: id }

    }

    async updateUserRole(khid, state, id) {
        return { id: id }
    }

    async getCustomers(khID, body, options, pageParam) {
        const customerOptions = options ? options : {}
        customerOptions.tag = PARTY_TAG;
        customerOptions.type = CUSTOMER;
        const customerArray = filterArray(partyArray, customerOptions)
        return getPagedData(customerArray, pageParam);
    }

    async getVendors(khID, body, options, pageParam) {
        const vendorOptions = options ? options : {}
        vendorOptions.tag = PARTY_TAG;
        vendorOptions.type = VENDOR;
        const vendorArray = filterArray(partyArray, vendorOptions)
        return getPagedData(vendorArray, pageParam);
    }

    //Inquiry
    async createInquiry(khID, InquiryObject) {
        return { id: "15153bc7-c9dc-466f-a773-422f1b6f3d45" }
    }
    async createOrder(khID, InquiryObject) {
        return { id: "e1a7d2f8-4b9d-4b9b-9dfb-8b2c5a67b123" }
    }

    async updateInquiry(khID, InquiryObject, id) {
        return { id: id }
    }

    async getInquirySources(khID, body, options, pageParam) {
        const InquirySources = [
            { id: "1", name: "Alice Johnson", tag: INQUIRY_SOURCE },
            { id: "2", name: "Bob Smith", tag: INQUIRY_SOURCE },
            { id: "3", name: "Charlie Brown", tag: INQUIRY_SOURCE },
            { id: "4", name: "Diana Prince", tag: INQUIRY_SOURCE },
        ]
        return InquirySources;
    }

    async createInquirySources(khID, body) {
        body.tag = INQUIRY_SOURCE
        return { id: "15153bc7-c9dc-466f-a773-422f1b6f3d45" };
    }

    async deleteInquirySource(khID, id) {
        return { id: id }
    }

    async updateInquirySource(khID, state, id) {
        return { id: id }
    }

    async getLeadHistory(khID, body, options, pageParam) {
        const transactions = [
            {
                "accountID": "550e8400-e29b-41d4-a716-446655440000",
                "date": "2024-06-26",
                "id": "550e8400-e29b-41d4-a716-446655440001",
                "ownedBy": "550e8400-e29b-41d4-a716-446655440002",
                "customerId": "550e8400-e29b-41d4-a716-446655440003",
                "lastUpdatedByName": "John Doe",
                "followUp": "2024-07-01",
                "lastUpdated": "2024-06-25",
                "lastUpdatedBy": "550e8400-e29b-41d4-a716-446655440004",
                "status": "opportunity",
                "note": "Status changed to opportunity on 2024-06-25"
            },
            {
                "accountID": "550e8400-e29b-41d4-a716-446655440000",
                "date": "2024-06-20",
                "id": "550e8400-e29b-41d4-a716-446655440005",
                "ownedBy": "550e8400-e29b-41d4-a716-446655440002",
                "customerId": "550e8400-e29b-41d4-a716-446655440006",
                "lastUpdatedByName": "Jane Smith",
                "followUp": "2024-06-30",
                "lastUpdated": "2024-06-24",
                "lastUpdatedBy": "550e8400-e29b-41d4-a716-446655440007",
                "status": "quotation Needed",
                "note": "Status changed to quotation Needed on 2024-06-24"
            },
            {
                "accountID": "650e8400-e29b-41d4-a716-446655440008",
                "date": "2024-05-15",
                "id": "650e8400-e29b-41d4-a716-446655440009",
                "ownedBy": "650e8400-e29b-41d4-a716-446655440010",
                "customerId": "650e8400-e29b-41d4-a716-446655440011",
                "lastUpdatedByName": "Alice Johnson",
                "followUp": "2024-06-01",
                "lastUpdated": "2024-05-30",
                "lastUpdatedBy": "650e8400-e29b-41d4-a716-446655440012",
                "status": "quoted",
                "note": "Status changed to quoted on 2024-05-30"
            },
            {
                "accountID": "650e8400-e29b-41d4-a716-446655440008",
                "date": "2024-05-20",
                "id": "650e8400-e29b-41d4-a716-446655440013",
                "ownedBy": "650e8400-e29b-41d4-a716-446655440010",
                "customerId": "650e8400-e29b-41d4-a716-446655440014",
                "lastUpdatedByName": "Bob Brown",
                "followUp": "2024-06-05",
                "lastUpdated": "2024-05-25",
                "lastUpdatedBy": "650e8400-e29b-41d4-a716-446655440015",
                "status": "opportunity",
                "note": "Status changed to opportunity on 2024-05-25"
            },
            {
                "accountID": "750e8400-e29b-41d4-a716-446655440016",
                "date": "2024-06-01",
                "id": "750e8400-e29b-41d4-a716-446655440017",
                "ownedBy": "750e8400-e29b-41d4-a716-446655440018",
                "customerId": "750e8400-e29b-41d4-a716-446655440019",
                "lastUpdatedByName": "Charlie Davis",
                "followUp": "2024-06-15",
                "lastUpdated": "2024-06-10",
                "lastUpdatedBy": "750e8400-e29b-41d4-a716-446655440020",
                "status": "quotation Needed",
                "note": "Status changed to quotation Needed on 2024-06-10"
            },
            {
                "accountID": "750e8400-e29b-41d4-a716-446655440016",
                "date": "2024-06-10",
                "id": "750e8400-e29b-41d4-a716-446655440021",
                "ownedBy": "750e8400-e29b-41d4-a716-446655440018",
                "customerId": "750e8400-e29b-41d4-a716-446655440022",
                "lastUpdatedByName": "Diana Evans",
                "followUp": "2024-06-20",
                "lastUpdated": "2024-06-15",
                "lastUpdatedBy": "750e8400-e29b-41d4-a716-446655440023",
                "status": "quoted",
                "note": "Status changed to quoted on 2024-06-15"
            },
            {
                "accountID": "750e8400-e29b-41d4-a716-446655440016",
                "date": "2024-06-10",
                "id": "750e8400-e29b-41d4-a716-446655440021",
                "ownedBy": "750e8400-e29b-41d4-a716-446655440018",
                "customerId": "750e8400-e29b-41d4-a716-446655440022",
                "lastUpdatedByName": "Diana Evans",
                "followUp": "2024-06-20",
                "lastUpdated": "2024-06-15",
                "lastUpdatedBy": "750e8400-e29b-41d4-a716-446655440023",
                "status": "quoted",
                "note": "Status changed to quoted on 2024-06-15"
            },
            {
                "accountID": "750e8400-e29b-41d4-a716-446655440016",
                "date": "2024-06-10",
                "id": "750e8400-e29b-41d4-a716-446655440021",
                "ownedBy": "750e8400-e29b-41d4-a716-446655440018",
                "customerId": "750e8400-e29b-41d4-a716-446655440022",
                "lastUpdatedByName": "Diana Evans",
                "followUp": "2024-06-20",
                "lastUpdated": "2024-06-15",
                "lastUpdatedBy": "750e8400-e29b-41d4-a716-446655440023",
                "status": "quoted",
                "note": "Status changed to quoted on 2024-06-15"
            },
            {
                "accountID": "750e8400-e29b-41d4-a716-446655440016",
                "date": "2024-06-10",
                "id": "750e8400-e29b-41d4-a716-446655440021",
                "ownedBy": "750e8400-e29b-41d4-a716-446655440018",
                "customerId": "750e8400-e29b-41d4-a716-446655440022",
                "lastUpdatedByName": "Diana Evans",
                "followUp": "2024-06-20",
                "lastUpdated": "2024-06-15",
                "lastUpdatedBy": "750e8400-e29b-41d4-a716-446655440023",
                "status": "quoted",
                "note": "Status changed to quoted on 2024-06-15"
            }
        ];


        return transactions;

    }

    async updateLeadStatus(khID, inquiryID, note, followUp) {
        return { id: inquiryID };
    }

    async getContacts(khID, body, options, pageParam) {
        const contacts = [
            { "name": "Alice Smith", "city": "New York", "phoneNumber": "123-456-7890", "email": "alice.smith@example.com", "tag": CONTACT, "companyId": "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8", "companyName": "TechCorp", "role": "Software Engineer" },
            { "name": "Bob Johnson", "city": "Los Angeles", "phoneNumber": "987-654-3210", "email": "bob.johnson@example.com", "tag": CONTACT, "companyId": "a9b8c7d6-e5f4-3210-h1g2-i3j4k5l6m7n8", "companyName": "Innovate Inc.", "role": "Product Manager" },
            { "name": "Carol Williams", "city": "Chicago", "phoneNumber": "555-123-4567", "email": "carol.williams@example.com", "tag": CONTACT, "companyId": "a1b2c3d4-e5f6-7890-g1h2-i9j8k7l6m5n4", "companyName": "Solutions Ltd.", "role": "Designer" },
            { "name": "David Brown", "city": "Houston", "phoneNumber": "444-555-6666", "email": "david.brown@example.com", "tag": CONTACT, "companyId": "b1c2d3e4-f5g6-7890-h1i2-j3k4l5m6n7o8", "companyName": "Enterprises Co.", "role": "Developer" },
            { "name": "Emma Davis", "city": "Phoenix", "phoneNumber": "333-222-1111", "email": "emma.davis@example.com", "tag": CONTACT, "companyId": "c1d2e3f4-g5h6-7890-i1j2-k3l4m5n6o7p8", "companyName": "WebWorks", "role": "Marketing Manager" },
            { "name": "Frank Miller", "city": "Philadelphia", "phoneNumber": "777-888-9999", "email": "frank.miller@example.com", "tag": CONTACT, "companyId": "d1e2f3g4-h5i6-7890-j1k2-l3m4n5o6p7q8", "companyName": "Tech Solutions", "role": "QA Engineer" },
            { "name": "Grace Wilson", "city": "San Antonio", "phoneNumber": "111-222-3333", "email": "grace.wilson@example.com", "tag": CONTACT, "companyId": "e1f2g3h4-i5j6-7890-k1l2-m3n4o5p6q7r8", "companyName": "DevShop", "role": "UI/UX Designer" },
            { "name": "Henry Moore", "city": "San Diego", "phoneNumber": "444-333-2222", "email": "henry.moore@example.com", "tag": CONTACT, "companyId": "f1g2h3i4-j5k6-7890-l1m2-n3o4p5q6r7s8", "companyName": "BuildRight", "role": "Backend Developer" },
            { "name": "Ivy Taylor", "city": "Dallas", "phoneNumber": "555-666-7777", "email": "ivy.taylor@example.com", "tag": CONTACT, "companyId": "g1h2i3j4-k5l6-7890-m1n2-o3p4q5r6s7t8", "companyName": "NextGen", "role": "HR Manager" },
            { "name": "Jack Anderson", "city": "San Jose", "phoneNumber": "888-999-0000", "email": "jack.anderson@example.com", "tag": CONTACT, "companyId": "h1i2j3k4-l5m6-7890-n1o2-p3q4r5s6t7u8", "companyName": "Techies", "role": "CTO" },
            { "name": "Kathy Thomas", "city": "Austin", "phoneNumber": "222-444-6666", "email": "kathy.thomas@example.com", "tag": CONTACT, "companyId": "i1j2k3l4-m5n6-7890-o1p2-q3r4s5t6u7v8", "companyName": "InnovateTech", "role": "Data Scientist" },
            { "name": "Leo Martin", "city": "Jacksonville", "phoneNumber": "111-333-5555", "email": "leo.martin@example.com", "tag": CONTACT, "companyId": "j1k2l3m4-n5o6-7890-p1q2-r3s4t5u6v7w8", "companyName": "FutureWorks", "role": "Project Manager" }
        ]


        return contacts
    }

    async inquiryRefranceVoucher(khID, inquiryID, inquirySourceId, customerId) {
        return { id: "15153bc7-c9dc-466f-a773-422f1v6f3a95" };
    }

    async updateAccount(khID, body, accountId) {
        return { id: accountId };
    }

    async getInquiryProducts(khID, inquiryId) {
        const data = {
            "72b6206a-cbb8-4c08-bf32-54985b96bd42": [
                {
                    'productID': "72b6206a-4c08-cbb8-bf32-54985b96bd42", "productName": "CNC Machines", "units": 2, "productdescription": "Precision automated cutting tools.", "unit": "Bundles", "saleRate": 500, "GSTRate": 18, "productItemcode": 1001, "productHSNcode": 847111, "materials": [
                        { "productName": "Aluminum Extrusions", "productItemcode": 2001, "productHSNcode": 384785, "GSTRate": 18, "saleRate": 500, "type": "Raw Material", "tag": "PRODUCT", "id": "6e827c8f-57e8-4c88-8b46-6e2f8a9d629a", "unit": "Numbers", "units": 10 },
                        { "productName": "Steel Sheets", "productItemcode": 2002, "productHSNcode": 847900, "GSTRate": 18, "saleRate": 500, "type": "Raw Material", "tag": "PRODUCT", "id": "ef58f2e3-b7d6-4a5c-b039-98d775244028", "unit": "Numbers", "units": 5 },
                        { "productName": "High-Grade Bearings", "productItemcode": 2003, "productHSNcode": 357333, "GSTRate": 18, "saleRate": 500, "type": "Raw Material", "tag": "PRODUCT", "id": "d4935f02-636e-4fd2-bb54-50b7604d1c8b", "unit": "Numbers", "units": 7 },
                        { "productName": "Assembly", "ProductItemcode": 5443, "productHSNcode": 480434, "GSTRate": 18, "saleRate": 300, "type": "Work Process", "tag": "PRODUCT", "id": "bc5d3f15-33ec-4c35-bd59-d5685c244a7b", "unit": "Hours", "units": 5 },
                        { "productName": "Precision Machining", "ProductItemcode": 9976, "productHSNcode": 944477, "GSTRate": 18, "saleRate": 100, "type": "Work Process", "tag": "PRODUCT", "id": "54d6b489-2b88-4bbd-9e4f-e8b8f3c62c7b", "unit": "Hours", "units": 2 }
                    ]
                },
                {
                    "productName": "Hydraulic Pumps", "units": 1, "productdescription": "Fluid power transfer units.", "unit": "Number", "saleRate": 200, "GSTRate": 18, "productItemcode": 1002, "productHSNcode": "847321", "materials": [
                        { "productName": "Cast Iron", "productItemcode": 2004, "productHSNcode": "847321", "GSTRate": 18, "saleRate": 200, "type": "Raw Material", "tag": "PRODUCT", "id": "d9f5d18e-fb0e-4f72-9b14-c2fa2b7f3b5e", "unit": "Numbers", "units": 5 },
                        { "productName": "High-Strength Steel", "productItemcode": 2005, "productHSNcode": "847321", "GSTRate": 18, "saleRate": 200, "type": "Raw Material", "tag": "PRODUCT", "id": "7e69e25c-6f79-473c-bd8e-38bfaefc8968", "unit": "Numbers", "units": 4 },
                        { "productName": "Hydraulic Seals", "productItemcode": 2006, "productHSNcode": "847321", "GSTRate": 18, "saleRate": 200, "type": "Raw Material", "tag": "PRODUCT", "id": "41f8d6f8-6d5e-45c3-9312-c41f0570e967", "unit": "Numbers", "units": 3 },
                        { "productName": "Precision Casting", "ProductItemcode": 2234, "productHSNcode": "847399", "GSTRate": 18, "saleRate": 50, "type": "Work Process", "tag": "PRODUCT", "id": "dc6b26a8-2a2d-4ed8-a8a4-c8e8c5b7cb47", "unit": "Hours", "units": 1 }
                    ]
                },
                { "productName": "Industrial Valves", "units": 3, "productdescription": "Regulate fluid flow control.", "unit": "Packages", "saleRate": 800, "GSTRate": 18, "productItemcode": 1003, "productHSNcode": 367864, "materials": [] },
                { "productName": "Electric Motors", "units": 1, "productdescription": "Convert electrical to mechanical energy.", "unit": "Number", "saleRate": 300, "GSTRate": 18, "productItemcode": 1004, "productHSNcode": 357943, "materials": [] }
            ],
            "57720718-8c41-4f87-b128-a84464d9c9ac": [
                { "productName": "CRM Suite", "units": 2, "productdescription": "Comprehensive CRM software package.", "unit": "Number", "saleRate": 500, "GSTRate": 18, "productItemcode": 1001, "productHSNcode": "847132", "materials": [{ "materialName": "CRM Mat D", "pricePerUnit": 275, "rmQty": 10, "productID": "rm-007" }, { "materialName": "CRM Mat E", "pricePerUnit": 200, "rmQty": 8, "productID": "rm-008" }, { "materialName": "CRM Mat F", "pricePerUnit": 125, "rmQty": 5, "productID": "rm-009" }] },
                { "productName": "Support Add-on", "units": 1, "productdescription": "Extended support package for CRM Suite.", "unit": "Bundles", "saleRate": 200, "GSTRate": 18, "productItemcode": 1002, "productHSNcode": "847343", "materials": [{ "materialName": "Support Mat D", "pricePerUnit": 175, "rmQty": 5, "productID": "rm-010" }, { "materialName": "Support Mat E", "pricePerUnit": 125, "rmQty": 3, "productID": "rm-011" }, { "materialName": "Support Mat F", "pricePerUnit": 90, "rmQty": 2, "productID": "rm-012" }] },
                { "productName": "Marketing Suite", "units": 3, "productdescription": "Complete marketing tools package.", "unit": "Packages", "saleRate": 800, "GSTRate": 18, "productItemcode": 1003, "productHSNcode": "847122", "materials": [] },
                { "productName": "Analytics Add-on", "units": 1, "productdescription": "Advanced analytics package for CRM Suite.", "unit": "Number", "saleRate": 300, "GSTRate": 18, "productItemcode": 1004, "productHSNcode": "847333", "materials": [] }
            ],
            "dabebb64-3c23-47ac-8213-05c97dfaa505": [
                { "productID": "57720718-8c41-4f87-b128-a84464d9c9ac", "productName": "CRM Suite", "units": 3, "productdescription": "Comprehensive CRM software package.", "unit": "Number", "saleRate": 500, "GSTRate": 18, "productItemcode": 1001, "productHSNcode": "847142", "materials": [{ "materialName": "CRM Mat G", "pricePerUnit": 250, "rmQty": 15 }, { "materialName": "CRM Mat H", "pricePerUnit": 180, "rmQty": 12 }, { "materialName": "CRM Mat I", "pricePerUnit": 130, "rmQty": 8 }] },
                { "productID": "57720718-8c41-4f87-b128-a84464d9c9ac", "productName": "Support Add-on", "units": 2, "productdescription": "Extended support package for CRM Suite.", "unit": "Bundles", "saleRate": 200, "GSTRate": 18, "productItemcode": 1002, "productHSNcode": "847324", "materials": [{ "materialName": "Support Mat G", "pricePerUnit": 175, "rmQty": 8 }, { "materialName": "Support Mat H", "pricePerUnit": 125, "rmQty": 6 }, { "materialName": "Support Mat I", "pricePerUnit": 90, "rmQty": 4 }] },
                { "productID": "57720718-8c41-4f87-b128-a84464d9c9ac", "productName": "Analytics Module", "units": 4, "productdescription": "Advanced analytics module for CRM.", "unit": "Modules", "saleRate": 300, "GSTRate": 18, "productItemcode": 1003, "productHSNcode": "847142", "materials": [{ "materialName": "Analytics Mat A", "pricePerUnit": 225, "rmQty": 12 }, { "materialName": "Analytics Mat B", "pricePerUnit": 175, "rmQty": 10 }, { "materialName": "Analytics Mat C", "pricePerUnit": 140, "rmQty": 8 }] },
                { "productID": "57720718-8c41-4f87-b128-a84464d9c9ac", "productName": "User Training", "units": 1, "productdescription": "Comprehensive training package for CRM users.", "unit": "Sessions", "saleRate": 1000, "GSTRate": 18, "productItemcode": 1004, "productHSNcode": "854313", "materials": [{ "materialName": "Training Mat A", "pricePerUnit": 500, "rmQty": 3 }, { "materialName": "Training Mat B", "pricePerUnit": 400, "rmQty": 2 }, { "materialName": "Training Mat C", "pricePerUnit": 350, "rmQty": 1 }] }
            ],
            "2af98eb8-3b49-485d-8bda-0e56bd786f09": [
                { "productName": "CRM Suite", "units": 1, "productdescription": "Comprehensive CRM software package.", "unit": "Bundles", "saleRate": 500, "GSTRate": 18, "productItemcode": 1001, "productHSNcode": "847165", "materials": [{ "productID": "rm-001", "materialName": "CRM Mat J", "pricePerUnit": 260, "rmQty": 10 }, { "productID": "rm-002", "materialName": "CRM Mat K", "pricePerUnit": 200, "rmQty": 8 }, { "productID": "rm-003", "materialName": "CRM Mat L", "pricePerUnit": 150, "rmQty": 5 }] },
                { "productName": "Support Add-on", "units": 1, "productdescription": "Extended support package for CRM Suite.", "unit": "Number", "saleRate": 200, "GSTRate": 18, "productItemcode": 1002, "productHSNcode": "847342", "materials": [{ "productID": "rm-004", "materialName": "Support Mat J", "pricePerUnit": 160, "rmQty": 5 }, { "productID": "rm-005", "materialName": "Support Mat K", "pricePerUnit": 120, "rmQty": 4 }, { "productID": "rm-006", "materialName": "Support Mat L", "pricePerUnit": 85, "rmQty": 3 }] },
                { "productName": "Analytics Module", "units": 2, "productdescription": "Advanced analytics module for CRM.", "unit": "Modules", "saleRate": 300, "GSTRate": 18, "productItemcode": 1003, "productHSNcode": "847165", "materials": [{ "productID": "rm-007", "materialName": "Analytics Mat D", "pricePerUnit": 220, "rmQty": 8 }, { "productID": "rm-008", "materialName": "Analytics Mat E", "pricePerUnit": 180, "rmQty": 6 }, { "productID": "rm-009", "materialName": "Analytics Mat F", "pricePerUnit": 140, "rmQty": 5 }] },
                { "productName": "User Training", "units": 1, "productdescription": "Comprehensive training package for CRM users.", "unit": "Sessions", "saleRate": 1000, "GSTRate": 18, "productItemcode": 1004, "productHSNcode": "854313", "materials": [{ "productID": "rm-010", "materialName": "Training Mat D", "pricePerUnit": 450, "rmQty": 3 }, { "productID": "rm-011", "materialName": "Training Mat E", "pricePerUnit": 350, "rmQty": 2 }, { "productID": "rm-012", "materialName": "Training Mat F", "pricePerUnit": 300, "rmQty": 1 }] },
                { "productName": "Advanced CRM", "units": 2, "productdescription": "Advanced version of CRM Suite with additional features.", "unit": "Bundles", "saleRate": 600, "GSTRate": 18, "productItemcode": 1005, "productHSNcode": "847165", "materials": [{ "productID": "rm-013", "materialName": "Advanced Mat A", "pricePerUnit": 280, "rmQty": 10 }, { "productID": "rm-014", "materialName": "Advanced Mat B", "pricePerUnit": 230, "rmQty": 8 }, { "productID": "rm-015", "materialName": "Advanced Mat C", "pricePerUnit": 200, "rmQty": 6 }] }
            ]
        };

        return data[inquiryId] ? data[inquiryId] : [];
    }

    async creteProductVoucher(khID, voucherObject) {
        return { id: "15153bc7-c9dc-466f-a773-422f1v6f3a95" };
    }

    async updateProductVoucher(khID, voucherObject) {
        return { id: "12493bc7-c9dc-466f-a773-422f1v6f4u24" };
    }


    async getRawMaterialPerInquiry(khID, inquiryID) {
        const rawMaterials = [
            {
                resourceID: "434c3e07-4de6-482b-9a77-20f2de963a22",
                accountID: "InquiryStoreId",
                units: 34,
                inquiryID: "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                productName: "Test Raw material 1",
                saleRate: 23,
                unit: "NUMBERS",
                GSTRate: 23,
                productHSNcode: 3232,
                productItemcode: 40000,
                vid: "6cda07d1-4d80-41ca-b737-25d2715e8066",
                date: 1725005312027,
                type: "Inquiry_products",
                resourceName: "Test Raw material 1",
                accountName: "Inquiry Store",
                verified: true,
                ownedBy: "6cfj5pAoO4eMWVJrkTKiplHcYjYY",
                lastUpdatedBy: "Orange Chicken",
                id: "1ad34ba7-1b9a-4162-9c0a-e4e5b333fad0"
            },
            {
                resourceID: "9b00731a-2a17-4cd2-8b5d-253739502c64",
                accountID: "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                units: -43,
                inquiryID: "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                vid: "6cda07d1-4d80-41ca-b737-25d2715e8066",
                date: 1725005312027,
                type: "Inquiry_products",
                resourceName: "Test Raw material 2",
                accountName: "Inquiry",
                verified: true,
                ownedBy: "6cfj5pAoO4eMWVJrkTKiplHcYjYY",
                lastUpdatedBy: "Orange Chicken",
                id: "315e7249-f56e-4ae3-9e80-63bf3f8fdb03"
            },
            {
                productID: "9b00731a-2a17-4cd2-8b5d-253739502c64",
                accountID: "InquiryStoreId",
                units: 43,
                inquiryID: "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                productName: "Test Raw material 2",
                saleRate: 34,
                unit: "NUMBERS",
                GSTRate: 34,
                productHSNcode: 3443,
                productItemcode: 4000,
                vid: "6cda07d1-4d80-41ca-b737-25d2715e8066",
                date: 1725005312027,
                type: "Inquiry_products",
                resourceName: "Test Raw material 2",
                accountName: "Inquiry Store",
                verified: true,
                ownedBy: "6cfj5pAoO4eMWVJrkTKiplHcYjYY",
                lastUpdatedBy: "Orange Chicken",
                id: "34403068-4479-46b7-af30-630c7909f92b"
            },
            {
                resourceID: "434c3e07-4de6-482b-9a77-20f2de963a22",
                accountID: "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                units: -34,
                inquiryID: "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                vid: "6cda07d1-4d80-41ca-b737-25d2715e8066",
                date: 1725005312027,
                type: "Inquiry_products",
                resourceName: "Test Raw material 1",
                accountName: "Inquiry",
                verified: true,
                ownedBy: "6cfj5pAoO4eMWVJrkTKiplHcYjYY",
                lastUpdatedBy: "Orange Chicken",
                id: "570dbfab-0cbc-4ab9-9923-ef4985b1fcb8"
            }
        ];

        return rawMaterials.map(item => item.inquiryID === inquiryID)
    }

    async getProcessPerInquiry(khID, voucherID) {
        return (
            [
                {
                    "resourceID": "434c3e07-4de6-482b-9a77-20f2de963a22",
                    "accountID": "InquiryStoreId",
                    "batches": {
                        "21bcef02-d5cc-4aba-8541-b868b385a9e9": 34
                    },
                    "units": 34,
                    "inquiryID": "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                    "productName": "process 1",
                    "saleRate": 23,
                    "unit": "NUMBERS",
                    "GSTRate": 23,
                    "productHSNcode": 3232,
                    "productItemcode": 40000,
                    "vid": "6cda07d1-4d80-41ca-b737-25d2715e8066",
                    "date": 1725005312027,
                    "type": "Inquiry_products",
                    "resourceName": "process 1",
                    "accountName": "Inquiry Store",
                    "verified": true,
                    "ownedBy": "6cfj5pAoO4eMWVJrkTKiplHcYjYY",
                    "lastUpdatedBy": "Orange Chicken",
                    "id": "1ad34ba7-1b9a-4162-9c0a-e4e5b333fad0"
                },
                {
                    "resourceID": "9b00731a-2a17-4cd2-8b5d-253739502c64",
                    "accountID": "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                    "batches": {
                        "21bcef02-d5cc-4aba-8541-b868b385a9e9": -43
                    },
                    "units": -43,
                    "inquiryID": "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                    "vid": "6cda07d1-4d80-41ca-b737-25d2715e8066",
                    "date": 1725005312027,
                    "type": "Inquiry_products",
                    "resourceName": "process 2",
                    "accountName": "Inquiry",
                    "verified": true,
                    "ownedBy": "6cfj5pAoO4eMWVJrkTKiplHcYjYY",
                    "lastUpdatedBy": "Orange Chicken",
                    "id": "315e7249-f56e-4ae3-9e80-63bf3f8fdb03"
                },
                {
                    "resourceID": "9b00731a-2a17-4cd2-8b5d-253739502c64",
                    "accountID": "InquiryStoreId",
                    "batches": {
                        "21bcef02-d5cc-4aba-8541-b868b385a9e9": 43
                    },
                    "units": 43,
                    "inquiryID": "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                    "productName": "process 2",
                    "saleRate": 34,
                    "unit": "NUMBERS",
                    "GSTRate": 34,
                    "productHSNcode": 3443,
                    "productItemcode": 4000,
                    "vid": "6cda07d1-4d80-41ca-b737-25d2715e8066",
                    "date": 1725005312027,
                    "type": "Inquiry_products",
                    "resourceName": "process 2",
                    "accountName": "Inquiry Store",
                    "verified": true,
                    "ownedBy": "6cfj5pAoO4eMWVJrkTKiplHcYjYY",
                    "lastUpdatedBy": "Orange Chicken",
                    "id": "34403068-4479-46b7-af30-630c7909f92b"
                },
                {
                    "resourceID": "434c3e07-4de6-482b-9a77-20f2de963a22",
                    "accountID": "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                    "batches": {
                        "21bcef02-d5cc-4aba-8541-b868b385a9e9": -34
                    },
                    "units": -34,
                    "inquiryID": "72b6206a-cbb8-4c08-bf32-54985b96bd42",
                    "vid": "6cda07d1-4d80-41ca-b737-25d2715e8066",
                    "date": 1725005312027,
                    "type": "Inquiry_products",
                    "resourceName": "process 1",
                    "accountName": "Inquiry",
                    "verified": true,
                    "ownedBy": "6cfj5pAoO4eMWVJrkTKiplHcYjYY",
                    "lastUpdatedBy": "Orange Chicken",
                    "id": "570dbfab-0cbc-4ab9-9923-ef4985b1fcb8"
                }
            ]

        )
    }

    async updateInquiryStatusOfStore(khID, updateStoreObject) {
        // it is the state which contain the raw material and process in the array
        return { "id": "570dbfab-0cbc-4ab9-9923-ef4985b1fcb8" }
    }

    async getDiscountSlab(khID, options = {}) {
        return [{
            name: 'Bronze', discountRate: 5, description: 'Only on Purchase',
        }, {
            name: 'Silver', discountRate: 5, description: 'Only on Purchase',
        }, {
            name: 'Gold', discountRate: 5, description: 'Only on Purchase',
        }];
    }

    async createDiscountSlab(khID, options = {}) {
        return { "id": "570dbfab-0cbc-4ab9-9923-ef4985b1fcb8" };
    }

    async deleteDiscountSlab(khID, id) {
        return { "id": id };
    }

    async getProductWithBatches(khID, inquiryId) {
        const batches = this.getRawMaterialPerInquiry(khID, inquiryId)
        return getProductFiltered(batches)
    }

    async createProductWithRawMaterialAndProcess(khID, InquiryObject, RequirementObject, previousBatches) {
        return { id: "r1wx88s8-nopq-4dab-r234-wxy2abc9vg30" }
    }

    async ReleaseMaterial(khID, data) {
        return { id: "r1wx88s8-nopq-4dab-r234-wxy2abc9vg30", totalDifference: 0 };
    }

    async getResourceBalance(khID, options) {
        let balance = [
            {
                accountID: INQUIRY_STORE_ACCOUNT_ID,
                resourceID: "rm-001",
                resource: { id: "rm-001", productItemcode: "rm-001", name: "RM 1" },
                units: -10,
            },
            {
                accountID: INQUIRY_STORE_ACCOUNT_ID,
                resourceID: "rm-0021",
                resource: { id: "rm-0021", productItemcode: "rm-021", name: "RM 21" },
                units: -15,
            },
            {
                accountID: INQUIRY_STORE_ACCOUNT_ID,
                resourceID: "rm-003",
                resource: { id: "rm-003", productItemcode: "rm-056", name: "RM 56" },
                units: -15,
            },
        ]
        return balance;
    }

    async getBalancePerInquiry(khID, options) {
        return {
            "72b6206a-4c08-cbb8-bf32-54985b96bd42rm-001": 34,
            "72b6206a-4c08-cbb8-bf32-54985b96bd42rm-0021": 34,
            "72b6206a-4c08-cbb8-bf32-54985b96bd42rm-003": 3,
            "72b6206a-4c08-cbb8-bf32-54cghj496d42rm-001": 43,
            "72b6206a-4c08-cbb8-bf32-54cghj496d42rm-0021": 34,
            "72b6206a-4c08-cbb8-bf32-54cghj496d42rm-003": 34,
            "745b906a-4c08-cbb8-bf32-54985b96bd42rm-001": 34,
            "745b906a-4c08-cbb8-bf32-54985b96bd42rm-0021": 34,
            "745b906a-4c08-cbb8-bf32-54985b96bd42rm-003": 43,
            "72b6206a-4c08-cbb8-bf32-54945c4cbd42rm-001": 34,
            "72b6206a-4c08-cbb8-bf32-54945c4cbd42rm-0021": 34,
            "72b6206a-4c08-cbb8-bf32-54945c4cbd42rm-003": 34,
            "72b6206a-4c08-cbb8-bf32-54985b96bd42rm-0013": 34,
            "72b6206a-4c08-cbb8-bf32-54cghj496d42rm-0013": 34,
            "745b906a-4c08-cbb8-bf32-54985b96bd42rm-0013": 34,
            "72b6206a-4c08-cbb8-bf32-54945c4cbd42rm-0013": 34,
        }
    }

    async getInquiryStoreBalance(khID, options) {
        return {
            "rm-001": 500,
            "rm-0021": 500,
            "rm-003": 400,
            "rm-0013": 555,
            "rm-005": 0,
        }
    }

    async getBalancePerInquiryAndStore(khID, options) {
        return {
            balancePerInquiry: await this.getBalancePerInquiry(khID, options),
            storeBalancePerProduct: await this.getInquiryStoreBalance(khID, options)
        };
    }

    async getSeriesNumber(khID, options) {
        return { id: "Q-1" }
    }

    async updateCustomer(khID, updateProp, id, note, onDate) {
        return { id: id }
    }

    async createChallan(khID, refId, type, products, fromAccount, toAccount) {
        return { id: refId }
    }

    async getAllCustomers(khID, body, options) {
        return await this.getCustomers(khID, body, options, 0)
    }

    async getChallans(khID, body = null, options) {
        return [
            {
                id: '72b4d8fa-4c08-c7a8-bf32-54986r57sd42rm-4s5',
                type: OUTWORD_CHALLAN,
                refranceId: 'C-1'
            },
            {
                id: '72b6206a-4c08-cbb8-bf32-54985al7sd42rm-4s5',
                type: INWORD_CHALLAN,
                refranceId: 'C-2'
            }
        ];
    }

    async deleteChallans(khID, voucherId) {
        return { id: voucherId };

    }

    async createBankAccount(khID, bankObject) {
        return { id: '72b4d8fa-4c08-c7a8-bf32-54986r57sd42rm-4s5' }
    }

    async getBankAccount(khID, body, options, pageParam) {
        return getPagedData(mockBankData, pageParam);
    }

    async deleteAccount(khID, id) {
        return { id: '72b4d8fa-4c08-c7a8-bf32-54986r57sd42rm-4s5' };
    }

    async getOneLead(khID, id) {
        const leads = await this.getAllLeads(khID, id);
        return leads.filter(item => item.id === id)[0];
    }

    async getProductBalanceOfAccount(khID, acc) {
        if (acc === QC_STORE_ACCOUNT_ID) {
            return [
                {
                    accountID: "QCStore",
                    batches: { "72b6206a-cbb8-4c08-bf32-54985b96bd42": 2 },
                    createdAt: 1729923932543,
                    date: 1729923897245,
                    id: "032b8291-37d7-4e54-8c76-3d3ac3eecce9",
                    lastUpdatedBy: "Panda Orange",
                    ownedBy: "oIr0pCfDFTAPnMA0RGx0nCVlbTcC",
                    resource: {
                        GSTRate: 12,
                        createdAt: 1729857228555,
                        effectAccess: ['Store_Manager_ID', 'Production_Manager_ID'],
                        entityPublicAccess: true,
                        id: "00ed19d0-a1b5-49d3-86f1-4bbbb9be6446",
                        lastUpdatedBy: "Panda Orange",
                        name: "FINISH PRODUCT 1",
                        ownedBy: "oIr0pCfDFTAPnMA0RGx0nCVlbTcC",
                        productHSNcode: 9545536,
                        productItemcode: "fp1",
                        saleRate: 14,
                        tag: "product",
                        type: "Finished Goods",
                        unit: "Nos"
                    },
                    resourceID: "00ed19d0-a1b5-49d3-86f1-4bbbb9be6446",
                    units: 2
                },
                {
                    accountID: "QCStore",
                    batches: { "72b6206a-cbb8-4c08-bf32-54985b96bd42": 1 },
                    createdAt: 1729923932543,
                    date: 1729923897245,
                    id: "032b8291-37d7-4e54-8c76-3d3ac3eecce9",
                    lastUpdatedBy: "Panda Orange",
                    ownedBy: "oIr0pCfDFTAPnMA0RGx0nCVlbTcC",
                    resource: {
                        GSTRate: 12,
                        createdAt: 1729857228555,
                        effectAccess: ['Store_Manager_ID', 'Production_Manager_ID'],
                        entityPublicAccess: true,
                        id: "72b6206a-4c08-cbb8-bf32-54cghj496d42",
                        lastUpdatedBy: "Panda Orange",
                        name: "FINISH PRODUCT 1",
                        ownedBy: "oIr0pCfDFTAPnMA0RGx0nCVlbTcC",
                        productHSNcode: 9545536,
                        productItemcode: "fp1",
                        saleRate: 14,
                        tag: "product",
                        type: "Finished Goods",
                        unit: "Nos"
                    },
                    resourceID: "72b6206a-4c08-cbb8-bf32-54cghj496d42",
                    units: 1
                }
            ]
        } else {
            return [
                {
                    accountID: "defaultStore",
                    batches: { "72b6206a-cbb8-4c08-bf32-54985b96bd42": 2 },
                    createdAt: 1729923932543,
                    date: 1729923897245,
                    id: "032b8291-37d7-4e54-8c76-3d3ac3eecce9",
                    lastUpdatedBy: "Panda Orange",
                    ownedBy: "oIr0pCfDFTAPnMA0RGx0nCVlbTcC",
                    resource: {
                        GSTRate: 12,
                        createdAt: 1729857228555,
                        effectAccess: ['Store_Manager_ID', 'Production_Manager_ID'],
                        entityPublicAccess: true,
                        id: "00ed19d0-a1b5-49d3-86f1-4bbbb9be6446",
                        lastUpdatedBy: "Panda Orange",
                        name: "FINISH PRODUCT 1",
                        ownedBy: "oIr0pCfDFTAPnMA0RGx0nCVlbTcC",
                        productHSNcode: 9545536,
                        productItemcode: "fp1",
                        saleRate: 14,
                        tag: "product",
                        type: "Finished Goods",
                        unit: "Nos"
                    },
                    resourceID: "00ed19d0-a1b5-49d3-86f1-4bbbb9be6446",
                    units: 2
                },
                {
                    accountID: "defaultStore",
                    batches: { "72b6206a-cbb8-4c08-bf32-54985b96bd42": 1 },
                    createdAt: 1729923932543,
                    date: 1729923897245,
                    id: "032b8291-37d7-4e54-8c76-3d3ac3eecce9",
                    lastUpdatedBy: "Panda Orange",
                    ownedBy: "oIr0pCfDFTAPnMA0RGx0nCVlbTcC",
                    resource: {
                        GSTRate: 12,
                        createdAt: 1729857228555,
                        effectAccess: ['Store_Manager_ID', 'Production_Manager_ID'],
                        entityPublicAccess: true,
                        id: "72b6206a-4c08-cbb8-bf32-54cghj496d42",
                        lastUpdatedBy: "Panda Orange",
                        name: "FINISH PRODUCT 1",
                        ownedBy: "oIr0pCfDFTAPnMA0RGx0nCVlbTcC",
                        productHSNcode: 9545536,
                        productItemcode: "fp1",
                        saleRate: 14,
                        tag: "product",
                        type: "Finished Goods",
                        unit: "Nos"
                    },
                    resourceID: "72b6206a-4c08-cbb8-bf32-54cghj496d42",
                    units: 1
                }
            ]
        }
    }

    sendMessage = async (khID, wa_id, text) => {
        return { id: "teste" }
    }

    getWhatsAppMessages = async (khID, wa_id) => {
        return [
            {
                id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAERgSMDdGQzgwMDlCOEE0RTdFNUJGAA==',
                channel: 'WA',
                to: '+91-7517610628',
                wa_id: '917517610628',
                timestamp: 1731924219795,
                type: 'text',
                text: { body: 'IndiaMart welcome message' },
                ownedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                createdAt: 1731924219795,
                lastUpdatedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                sent: '1731924231',
                delivered: '1731924232',
                read: '1731924263'
            },
            {
                context: {
                    from: '919822017911',
                    id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAERgSMDdGQzgwMDlCOEE0RTdFNUJGAA=='
                },
                from: '917517610628',
                id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAEhggMTVDRkQ5Mzk2QTk1QjFBNjU4QzYwMTJFNjA4RjY1RTMA',
                timestamp: '1731924359',
                text: { body: 'Connect with this number for better ui of pdf' },
                type: 'text',
                wa_id: '917517610628',
                channel: 'WA',
                ownedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                createdAt: 1731924360769,
                lastUpdatedBy: 'Customer WhatsApp'
            },
            {
                from: '917517610628',
                id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAEhggNTZFQzZGQzYwNzYyQTZCQ0YzMkVFMDBCNDhEMTdBQ0UA',
                timestamp: '1731924446',
                type: 'image',
                image: {
                    mime_type: 'image/jpeg',
                    sha256: 'BqItmPUqNouO1sF/XxLyZRr0kpg9c8RsSZfcZOoERBw=',
                    id: '866347252358481'
                },
                wa_id: '917517610628',
                channel: 'WA',
                ownedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                createdAt: 1731924448270,
                lastUpdatedBy: 'Customer WhatsApp'
            },
            {
                from: '917517610628',
                id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAEhggNzREQkYzODU5OERFNTkwQTM3OTIyOEY3MzRBMjEzQjIA',
                timestamp: '1731924445',
                type: 'image',
                image: {
                    mime_type: 'image/jpeg',
                    sha256: '3uNhjr/Rcfjn6NgyBMBP1xOtxwYVeN2SYUUaT+gq+Dc=',
                    id: '537510365822897'
                },
                wa_id: '917517610628',
                channel: 'WA',
                ownedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                createdAt: 1731924447657,
                lastUpdatedBy: 'Customer WhatsApp'
            },
            {
                context: {
                    from: '919822017911',
                    id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAERgSMDdGQzgwMDlCOEE0RTdFNUJGAA=='
                },
                from: '917517610628',
                id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAEhggQjhGRkYzRDk2OTMwMjk2QTFENjA2RTUzOEMxRjlCQTUA',
                timestamp: '1731924341',
                text: { body: 'Osm' },
                type: 'text',
                wa_id: '917517610628',
                channel: 'WA',
                ownedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                createdAt: 1731924342671,
                lastUpdatedBy: 'Customer WhatsApp'
            },
            {
                id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAERgSMDdGQzgwMDlCOEE0RTdFNUJGAA==',
                channel: 'WA',
                to: '+91-7517610628',
                wa_id: '917517610628',
                timestamp: 1731924219795,
                type: 'text',
                text: { body: 'IndiaMart welcome message' },
                ownedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                createdAt: 1731924219795,
                lastUpdatedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                sent: '1731924231',
                delivered: '1731924232',
                read: '1731924263'
            },
            {
                context: {
                    from: '919822017911',
                    id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAERgSMDdGQzgwMDlCOEE0RTdFNUJGAA=='
                },
                from: '917517610628',
                id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAEhggMTVDRkQ5Mzk2QTk1QjFBNjU4QzYwMTJFNjA4RjY1RTMA',
                timestamp: '1731924359',
                text: { body: 'Connect with this number for better ui of pdf' },
                type: 'text',
                wa_id: '917517610628',
                channel: 'WA',
                ownedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                createdAt: 1731924360769,
                lastUpdatedBy: 'Customer WhatsApp'
            },
            {
                from: '917517610628',
                id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAEhggNTZFQzZGQzYwNzYyQTZCQ0YzMkVFMDBCNDhEMTdBQ0UA',
                timestamp: '1731924446',
                type: 'image',
                image: {
                    mime_type: 'image/jpeg',
                    sha256: 'BqItmPUqNouO1sF/XxLyZRr0kpg9c8RsSZfcZOoERBw=',
                    id: '866347252358481'
                },
                wa_id: '917517610628',
                channel: 'WA',
                ownedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                createdAt: 1731924448270,
                lastUpdatedBy: 'Customer WhatsApp'
            },
            {
                from: '917517610628',
                id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAEhggNzREQkYzODU5OERFNTkwQTM3OTIyOEY3MzRBMjEzQjIA',
                timestamp: '1731924445',
                type: 'image',
                image: {
                    mime_type: 'image/jpeg',
                    sha256: '3uNhjr/Rcfjn6NgyBMBP1xOtxwYVeN2SYUUaT+gq+Dc=',
                    id: '537510365822897'
                },
                wa_id: '917517610628',
                channel: 'WA',
                ownedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                createdAt: 1731924447657,
                lastUpdatedBy: 'Customer WhatsApp'
            },
            {
                context: {
                    from: '919822017911',
                    id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAERgSMDdGQzgwMDlCOEE0RTdFNUJGAA=='
                },
                from: '917517610628',
                id: 'wamid.HBgMOTE3NTE3NjEwNjI4FQIAEhggQjhGRkYzRDk2OTMwMjk2QTFENjA2RTUzOEMxRjlCQTUA',
                timestamp: '1731924341',
                text: { body: 'Osm' },
                type: 'text',
                wa_id: '917517610628',
                channel: 'WA',
                ownedBy: 'i2QHQPH5NofT38zqck26ePmxRzD3',
                createdAt: 1731924342671,
                lastUpdatedBy: 'Customer WhatsApp'
            },
        ]
    }

    async patchBalance(khID, body) {
        return { id: IGNORED_ID };
    }
}


const partyArray = [
    { id: "3106d054-5e89-4cd1-9518-b103kio0b421", name: "Microsoft Corporation", city: "New York", phoneNumber: "123-456-7890", email: "abc@example.com", contactPerson: "John Doe", gstin: "12ABCDE3456F7GH", tag: PARTY_TAG, type: CUSTOMER, entityAccess: [ACCOUNTANT_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 5, contacts: ['Abc Xyz', 'Pqr Xyza', 'Pqr'] },
    { id: "e2b686b0-5e8d-4b13-b351-1c21bfc2e812", name: "Apple Inc.", city: "Los Angeles", phoneNumber: "456-789-0123", email: "xyz@example.com", contactPerson: "Jane Smith", gstin: "34FGHIJ5678K9LM", tag: PARTY_TAG, type: CUSTOMER, entityAccess: [CUSTOMER_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 3, contacts: ['Abc Xyz', 'Pqr Xyza'] },
    { id: "d3b691b1-1e9c-4b34-a456-2d31cfd2e913", name: "Amazon.com Inc.", city: "Chicago", phoneNumber: "789-012-3456", email: "lmn@example.com", contactPerson: "Alice Johnson", gstin: "56MNOPQ7890R1ST", tag: PARTY_TAG, type: VENDOR, entityAccess: [ACCOUNTANT_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 4, contacts: ['Abc Xyz', 'Xyza', 'Pqr Xyza'] },
    { id: "b4c792c2-2f9d-4b45-b567-3e41dfe3fa14", name: "Alphabet Inc. (Google)", city: "Houston", phoneNumber: "012-345-6789", email: "pqr@example.com", contactPerson: "Bob Smith", gstin: "78UVWXY9012Z3AB", tag: PARTY_TAG, type: CUSTOMER, entityAccess: [CUSTOMER_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 2, contacts: ['Pqr Xyza', 'Pqr', 'Pqr Xyza'] },
    { id: "c5d893d3-3fad-4b56-c678-4f51efe4fb15", name: "Facebook, Inc.", city: "Miami", phoneNumber: "345-678-9012", email: "rst@example.com", contactPerson: "Carol White", gstin: "90CDEFG1234H5IJ", tag: PARTY_TAG, type: CUSTOMER, entityAccess: [ACCOUNTANT_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 6, contacts: ['Abc', 'Pqr Xyza', 'Pqr Xyza'] },
    { id: "d6ea94e4-4fbd-4b67-d789-5g61fgh5gc16", name: "Tesla, Inc.", city: "San Francisco", phoneNumber: "678-901-2345", email: "def@example.com", contactPerson: "David Brown", gstin: "23DEFGH4567I8JK", tag: PARTY_TAG, type: CUSTOMER, entityAccess: [CUSTOMER_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 7, contacts: ['Xyz', 'Xyza', 'Pqr Xyza'] },
    { id: "e7fb95f5-5fcd-4b78-e890-6h71igh6hd17", name: "Walmart Inc.", city: "Seattle", phoneNumber: "901-234-5678", email: "ghi@example.com", contactPerson: "Eva Green", gstin: "45GHIJK6789L0MN", tag: PARTY_TAG, type: CUSTOMER, entityAccess: [ACCOUNTANT_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 8, contacts: ['Abc Xyz', 'Pqr Xyza', 'Pqr'] },
    { id: "f8gc96g6-6gde-4b89-f901-7i81jhi7ie18", name: "Johnson & Johnson", city: "Boston", phoneNumber: "234-567-8901", email: "jkl@example.com", contactPerson: "Frank Black", gstin: "67JKLM7891N2OP", tag: PARTY_TAG, type: CUSTOMER, entityAccess: [CUSTOMER_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 9, contacts: ['Abc Xyz', 'Xyza', 'Pqr Xyza'] },
    { id: "g9hd97h7-7hef-4c90-g012-8j91kjj8jf19", name: "JPMorgan Chase & Co.", city: "Dallas", phoneNumber: "567-890-1234", email: "mno@example.com", contactPerson: "Grace Blue", gstin: "89MNOPQ0123R4ST", tag: PARTY_TAG, type: VENDOR, entityAccess: [ACCOUNTANT_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 3, contacts: ['Abc', 'Xyza', 'Pqr', 'Pqr Xyza'] },
    { id: "h1ie98i8-8igf-4d01-h123-9k01lkj9kg20", name: "Berkshire Hathaway Inc.", city: "Philadelphia", phoneNumber: "890-123-4567", email: "uvw@example.com", contactPerson: "Henry Yellow", gstin: "01UVWXY2345Z6AB", tag: PARTY_TAG, type: CUSTOMER, entityAccess: [CUSTOMER_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 4, contacts: ['Pqr Xyza', 'Pqr', 'Pqr Xyza'] },
    { id: "i2jf99j9-9jhg-4d12-i234-ak12mlk0lh21", name: "Netflix, Inc.", city: "Los Angeles", phoneNumber: "123-456-7890", email: "xyz@example.com", contactPerson: "Ivy Red", gstin: "23XYZAB4567C8DE", tag: PARTY_TAG, type: VENDOR, entityAccess: [ACCOUNTANT_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 5, contacts: ['Abc Xyz', 'Pqr Xyza'] },
    { id: "j3kg00k0-akjh-4d23-j345-bl23nml1mi22", name: "Procter & Gamble Co.", city: "Miami", phoneNumber: "456-789-0123", email: "rst@example.com", contactPerson: "Jack Gray", gstin: "34RSTU5678V9WX", tag: PARTY_TAG, type: CUSTOMER, entityAccess: [CUSTOMER_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 6, contacts: ['Abc Xyz', 'Pqr Xyza', 'Pqr'] },
    { id: "k4lh11l1-blki-4d34-k456-cm34omn2nj23", name: "Visa Inc.", city: "Boston", phoneNumber: "789-012-3456", email: "jkl@example.com", contactPerson: "Kate Orange", gstin: "45KLMNO6789P0QR", tag: BANK_ACCOUNT_TAG, type: CUSTOMER, entityAccess: [CUSTOMER_USER_LEVEL], effectAccess: [ACCOUNTANT_USER_LEVEL], deals: 7, contacts: ['Abc', 'Pqr Xyza', 'Xyza'] },
    { id: "l5mn22m2-copq-4d45-l567-nop5zyx3pa24", name: "Intel Corporation", city: "Santa Clara", phoneNumber: "345-678-9012", email: "def@example.com", contactPerson: "Alex Green", gstin: "56CDEFG7890H1IJ", tag: "PARTY_TAG", type: "VENDOR", entityAccess: ["ACCOUNTANT_USER_LEVEL"], effectAccess: ["ACCOUNTANT_USER_LEVEL"], deals: 4, contacts: ["Abc Xyz", "Pqr Xyza"] },
    { id: "m6op33n3-dfgh-4d56-m789-opq7rst4qb25", name: "Sony Corporation", city: "Tokyo", phoneNumber: "678-901-2345", email: "ghi@example.com", contactPerson: "Michael Brown", gstin: "67DEFGH8901I2JK", tag: "PARTY_TAG", type: "VENDOR", entityAccess: ["ACCOUNTANT_USER_LEVEL"], effectAccess: ["ACCOUNTANT_USER_LEVEL"], deals: 3, contacts: ["Abc", "Xyza"] },
    { id: "n7pq44o4-ghij-4d67-n890-pqr8uvw5rc26", name: "Cisco Systems, Inc.", city: "San Jose", phoneNumber: "901-234-5678", email: "jkl@example.com", contactPerson: "Sophia Yellow", gstin: "78EFGHI9012J3KL", tag: "PARTY_TAG", type: "VENDOR", entityAccess: ["ACCOUNTANT_USER_LEVEL"], effectAccess: ["ACCOUNTANT_USER_LEVEL"], deals: 6, contacts: ["Pqr Xyza", "Xyza"] },
    { id: "o8rs55p5-hijk-4d78-o901-rst9xyz6sd27", name: "Oracle Corporation", city: "Redwood City", phoneNumber: "234-567-8901", email: "mno@example.com", contactPerson: "Daniel White", gstin: "89FGHIJ0123K4LM", tag: "PARTY_TAG", type: "CUSTOMER", entityAccess: ["ACCOUNTANT_USER_LEVEL"], effectAccess: ["ACCOUNTANT_USER_LEVEL"], deals: 7, contacts: ["Abc Xyz", "Pqr", "Pqr Xyza"] },
    { id: "p9tu66q6-ijkl-4d89-p012-tuv0abc7te28", name: "Adobe Inc.", city: "San Jose", phoneNumber: "890-123-4567", email: "uvw@example.com", contactPerson: "Olivia Black", gstin: "01GHIJK2345L6MN", tag: "PARTY_TAG", type: "VENDOR", entityAccess: ["ACCOUNTANT_USER_LEVEL"], effectAccess: ["ACCOUNTANT_USER_LEVEL"], deals: 5, contacts: ["Abc", "Pqr Xyza"] },
    { id: "q0vw77r7-mnop-4d90-q123-vwx1def8uf29", name: "NVIDIA Corporation", city: "Santa Clara", phoneNumber: "123-456-7890", email: "xyz@example.com", contactPerson: "Lucas Red", gstin: "12HIJKL3456M7NO", tag: "PARTY_TAG", type: "CUSTOMER", entityAccess: ["ACCOUNTANT_USER_LEVEL"], effectAccess: ["ACCOUNTANT_USER_LEVEL"], deals: 4, contacts: ["Abc Xyz", "Xyza", "Pqr Xyza"] },
    { id: "r1wx88s8-nopq-4dab-r234-wxy2abc9vg30", name: "Salesforce.com, Inc.", city: "San Francisco", phoneNumber: "456-789-0123", email: "rst@example.com", contactPerson: "Liam Gray", gstin: "34IJKLM5678N9OP", tag: "PARTY_TAG", type: "CUSTOMER", entityAccess: ["ACCOUNTANT_USER_LEVEL"], effectAccess: ["ACCOUNTANT_USER_LEVEL"], deals: 3, contacts: ["Abc Xyz", "Pqr Xyza"] },
]
const mockBankData = [
    {
        id: 1,
        name: "John Doe",
        bankbranch: "Downtown Branch",
        bankaccount: "123456789012",
        ifsc: "ABC0001234",
        upiID: "john.doe@bank"
    },
    {
        id: 2,
        name: "Jane Smith",
        bankbranch: "Central Branch",
        bankaccount: "987654321098",
        ifsc: "XYZ0005678",
        upiID: "jane.smith@bank"
    },
    {
        id: 3,
        name: "Alex Johnson",
        bankbranch: "West End Branch",
        bankaccount: "234567890123",
        ifsc: "LMN0002345",
        upiID: "alex.johnson@bank"
    },
    {
        id: 4,
        name: "Emily Davis",
        bankbranch: "Uptown Branch",
        bankaccount: "345678901234",
        ifsc: "PQR0006789",
        upiID: "emily.davis@bank"
    },
    {
        id: 5,
        name: "Michael Brown",
        bankbranch: "East Side Branch",
        bankaccount: "456789012345",
        ifsc: "DEF0004567",
        upiID: "michael.brown@bank"
    },
    {
        id: 6,
        name: "Sophia Wilson",
        bankbranch: "North Side Branch",
        bankaccount: "567890123456",
        ifsc: "GHI0003456",
        upiID: "sophia.wilson@bank"
    },
    {
        id: 7,
        name: "Daniel Moore",
        bankbranch: "City Center Branch",
        bankaccount: "678901234567",
        ifsc: "JKL0007890",
        upiID: "daniel.moore@bank"
    },
    {
        id: 8,
        name: "Olivia Taylor",
        bankbranch: "Riverside Branch",
        bankaccount: "789012345678",
        ifsc: "STU0001239",
        upiID: "olivia.taylor@bank"
    },
    {
        id: 9,
        name: "David Anderson",
        bankbranch: "South End Branch",
        bankaccount: "890123456789",
        ifsc: "VWX0003457",
        upiID: "david.anderson@bank"
    },
    {
        id: 10,
        name: "Emma Thomas",
        bankbranch: "Metro Branch",
        bankaccount: "901234567890",
        ifsc: "YZA0005671",
        upiID: "emma.thomas@bank"
    },
    {
        id: 11,
        name: "Liam Thompson",
        bankbranch: "Hilltop Branch",
        bankaccount: "109283746512",
        ifsc: "ABC1234567",
        upiID: "liam.thompson@bank"
    },
    {
        id: 12,
        name: "Isabella Harris",
        bankbranch: "Greenwood Branch",
        bankaccount: "208374651234",
        ifsc: "XYZ7654321",
        upiID: "isabella.harris@bank"
    },
];
