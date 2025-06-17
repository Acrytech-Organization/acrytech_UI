import { deepCopyObject } from "../../../Helpers/helpers";
import { fomatComponents } from "../CommonComp/commonFormatData";
import NewItemFormat from "./NewItemFormat";
import TaxHSNTable from "./TaxHSNTable";

const formatLayOutData = [
    [
        {
            label: "Logo",
            layout: {
                xs: 2
            },
        },
        {
            label: "Heading",
            layout: {
                xs: 10,
            },
        },
    ],
    [
        {
            label: "Divider",
            style: {
                paddingVertical: "3mm",
            }
        }
    ],
    [
        {
            label: "From",
        },
        {
            label: "To",
        },
        {
            label: "Details",
        },
    ],
    [
        {
            label: "Items",
            style: {
                paddingVertical: "3mm",
            }
        },
    ],
    [
        {
            showOnLast: true,
            label: "Tax",
        }
    ],
    [
        {
            showOnLast: true,
            label: "Bank",
            layout: {
                xs: 5
            },
            style: {
                paddingVertical: "3mm",
                fontSize: 8,
            }
        },
        {
            showOnLast: true,
            label: "Empty",
            layout: {
                xs: 3
            },
        },
        {
            showOnLast: true,
            label: "Total",
            layout: {
                xs: 4
            },
            style: {
                paddingRight: "3mm",
                paddingBottom: "3mm",
                alignSelf: "flex-end"
            }
        }
    ],
    [
        {
            showOnLast: true,
            label: "Terms",
            layout: {
                xs: 4
            },
        },
        {
            showOnLast: true,
            label: "Receiver",
            layout: {
                xs: 4
            },
            style: {
                fontSize: 8,
                textAlign: "center",
            },
        },
        {
            showOnLast: true,
            label: "Sign",
            layout: {
                xs: 4
            },
            style: {
                fontSize: 8,
                textAlign: "center",
            },
        }
    ]
]

const poFormatData = [
    [
        {
            label: "Logo",
            layout: {
                xs: 2
            },
        },
        {
            label: "Heading",
            layout: {
                xs: 10,
            },
        },
    ],
    [
        {
            label: "Divider",
            style: {
                paddingVertical: "3mm",
            }
        }
    ],
    [
        {
            label: "From",
        },
        {
            label: "To",
        },
        {
            label: "Details",
        },
    ],
    [
        {
            label: "Items",
            style: {
                paddingVertical: "3mm",
            }
        },
    ],
    [
        {
            showOnLast: true,
            label: "Tax",
            layout: {
                xs: 8
            },
            style: {
                paddingRight: "3mm",
                paddingBottom: "3mm",
                alignSelf: "flex-start"
            }
        },
        {
            showOnLast: true,
            label: "Total",
            layout: {
                xs: 4
            },
            style: {
                paddingRight: "3mm",
                paddingBottom: "3mm",
                alignSelf: "flex-end"
            }
        }
    ],
    [
        {
            showOnLast: true,
            label: "Terms",
            layout: {
                xs: 4
            },
        },
        {
            showOnLast: true,
            label: "Receiver",
            layout: {
                xs: 4
            },
            style: {
                fontSize: 8,
                textAlign: "center",
            },
        },
        {
            showOnLast: true,
            label: "Sign",
            layout: {
                xs: 4
            },
            style: {
                fontSize: 8,
                textAlign: "center",
            },
        }
    ]
]


const defaultGetComponent = ({ label, currentFirm, context, page }) => {
    let componentToReturn = null;

    switch (label) {
        case "Items":
            componentToReturn = <NewItemFormat context={context} page={page} />
            break;

        case "Tax":
            componentToReturn = <TaxHSNTable context={context} />
            break;

        default:
            componentToReturn = fomatComponents(label, currentFirm, context, page)
            break;
    }

    return componentToReturn;
}

// For BOM we need to change the item table
const bomLayout = deepCopyObject(formatLayOutData);

const itemRowIndex = bomLayout.findIndex((row) =>
    ["Items"].some((label) =>
        row.some((item) => item.label === label)
    )
);

if (itemRowIndex !== -1) {
    const index = bomLayout[itemRowIndex].findIndex((entry) => entry.label === "Items");
    if (index !== -1) bomLayout[itemRowIndex][index].label = "BOMItems"
}

export const newFormat = {
    maxInPage: 11,
    pageSize: 22,
    quoteLayout: formatLayOutData,
    invoiceLayout: formatLayOutData,
    bomLayout: bomLayout,
    poLayout: poFormatData,
    getComponent: defaultGetComponent,
}