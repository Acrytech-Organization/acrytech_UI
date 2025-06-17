import FormatLogo from "./FormatLogo";
import DocumentHeading from "./DocumentHeading";
import GenericDivider from "../../GenericComponents/Layout/GenericDivide";
import FromComponent from "./FromComponent";
import ToComponent from "./ToComponent";
import DetailsComponent from "./DetailsComponent";
import TotalComponent from "./TotalComponent";
import TotalInWords from "./TotalInWords";
import BankComponent from "./BankComponent";
import TermsComponent from "./TermsComponent";
import ReceiverSignature from "./ReceiverSignature";
import SignatureComp from "./SignatureComp";
import BOMItems from "./BOMItems";
import PartyAddress from "./PartyAddress";

export const defaultFormatLayout = [
    [
        {
            label: "Logo",
            layout: {
                xs: 2,
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
            label: "Billing",
        },
        {
            label: "Shipping",
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
            label: "Tax",
            layout: {
                xs: 8,
            },
        },
        {
            label: "Total",
            layout: {
                xs: 4,
            },
            style: {
                paddingLeft: "3mm",
            }
        },
    ],
    [
        {
            label: "Words",
            style: {
                paddingVertical: "3mm",
            }
        },
    ],
    [
        {
            label: "Bank",
            layout: {
                xs: 4,
            },
            style: {
                fontSize: 7,
            }
        },
        {
            label: "Terms",
            layout: {
                xs: 3,
            },
        },
        {
            label: "Receiver",
            layout: {
                xs: 2.5,
            },
            style: {
                fontSize: 7,
                textAlign: "center",
            },
        },
        {
            label: "Sign",
            layout: {
                xs: 2.5,
            },
            style: {
                fontSize: 7,
                textAlign: "center",
            },
        },
    ],
];

export const outChallanLayout = [
    [
        {
            label: "Logo",
            layout: {
                xs: 2,
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
            label: "Billing",
        },
        {
            label: "Shipping",
        },
    ],
    [
        {
            label: "ChallanItems",
            style: {
                paddingVertical: "3mm",
            }
        },
    ],
    [
        {
            label: "Receiver",
            style: {
                fontSize: 7,
                textAlign: "center",
            },
        },
        {
            label: "Sign",
            style: {
                fontSize: 7,
                textAlign: "center",
            },
        },
    ],
];

export const poFormatLayout = [
    [
        {
            label: "Logo",
            layout: {
                xs: 2,
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
            label: "Tax",
            layout: {
                xs: 8,
            },
        },
        {
            label: "Total",
            layout: {
                xs: 4,
            },
            style: {
                paddingLeft: "3mm",
            }
        },
    ],
    [
        {
            label: "Words",
            style: {
                paddingVertical: "3mm",
            }
        },
    ],
    [
        {
            label: "Terms",
            layout: {
                xs: 5,
            },
        },
        {
            label: "Receiver",
            layout: {
                xs: 3.5,
            },
            style: {
                fontSize: 7,
                textAlign: "center",
            },
        },
        {
            label: "Sign",
            layout: {
                xs: 3.5,
            },
            style: {
                fontSize: 7,
                textAlign: "center",
            },
        },
    ],
];

export const fomatComponents = (label, currentFirm, context, page) => {
    let componentToReturn = null;

    switch (label) {
        case "Logo":
            componentToReturn = <FormatLogo currentFirm={currentFirm} />;
            break;

        case "Heading":
            componentToReturn = <DocumentHeading context={context} />;
            break;

        case "Divider":
            componentToReturn = <GenericDivider />
            break;

        case "From":
            componentToReturn = <FromComponent currentFirm={currentFirm} />;
            break;

        case "To":
            componentToReturn = <ToComponent context={context} />;
            break;

        case "Details":
            componentToReturn = <DetailsComponent context={context} page={page} />;
            break;

        case "Total":
            componentToReturn = <TotalComponent context={context} />;
            break;

        case "Words":
            componentToReturn = <TotalInWords context={context} />;
            break;

        case "Bank":
            componentToReturn = <BankComponent context={context} currentFirm={currentFirm} />;
            break;

        case "Terms":
            componentToReturn = <TermsComponent context={context} />;
            break;

        case "Receiver":
            componentToReturn = <ReceiverSignature context={context} />;
            break;

        case "Sign":
            componentToReturn = <SignatureComp currentFirm={currentFirm} />;
            break;

        case "Empty":
            componentToReturn = <></>;
            break;

        case "BOMItems":
            componentToReturn = <BOMItems context={context} />;
            break;

        case "Billing":
            componentToReturn = <PartyAddress
                page={page}
                title={"Billing Address"}
                address={context?.cData?.billingAddress} />;
            break;

        case "Shipping":
            componentToReturn = <PartyAddress
                page={page}
                title={"Shipping Address"}
                address={context?.cData?.shippingAddress} />;
            break;

        default:
            break;
    }

    return componentToReturn;
}