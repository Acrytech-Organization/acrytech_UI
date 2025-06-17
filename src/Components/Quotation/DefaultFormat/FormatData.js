import { deepCopyObject } from "../../../Helpers/helpers";
import { defaultFormatLayout, fomatComponents, outChallanLayout, poFormatLayout } from "../CommonComp/commonFormatData";
import ChallanItemsFormat from "./ChallanItemsFormat";
import ItemsFormat from "./ItemsFormat";
import TaxTable from "./TaxTable";
const defaultGetComponent = ({ label, currentFirm, context, page }) => {
    let componentToReturn = null;

    switch (label) {
        case "Items":
            componentToReturn = <ItemsFormat context={context} page={page} />
            break;

        case "Tax":
            componentToReturn = <TaxTable context={context} />
            break;

        case "ChallanItems":
            componentToReturn = <ChallanItemsFormat context={context} page={page} />
            break;

        default:
            componentToReturn = fomatComponents(label, currentFirm, context, page);
            break;
    }

    return componentToReturn;
}

// For BOM we need to change the item table
const bomLayout = deepCopyObject(defaultFormatLayout);

const itemRowIndex = bomLayout.findIndex((row) =>
    ["Items"].some((label) =>
        row.some((item) => item.label === label)
    )
);

if (itemRowIndex !== -1) {
    const index = bomLayout[itemRowIndex].findIndex((entry) => entry.label === "Items");
    if (index !== -1) bomLayout[itemRowIndex][index].label = "BOMItems"
}

export const defaultFormat = {
    maxInPage: 11,
    pageSize: 16,
    quoteLayout: defaultFormatLayout,
    invoiceLayout: defaultFormatLayout,
    bomLayout: bomLayout,
    outChallanLayout: outChallanLayout,
    poLayout: poFormatLayout,
    getComponent: defaultGetComponent,
}