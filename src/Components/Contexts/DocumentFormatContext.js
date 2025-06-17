import { createContext, useContext } from "react";
import { FirmContext } from "./FirmContext";
import { FORMAT_ONE } from "../../Helpers/ConstantProperties";
import { newFormat } from "../Quotation/NewFormat/NewFormatData";
import { defaultFormat } from "../Quotation/DefaultFormat/FormatData";

export const DocumentFormatContext = createContext({});

export default function DocumentFormatContextProvider({ children }) {

    const { currentFirm } = useContext(FirmContext);
    const dropDownValue = currentFirm.useFormat;

    const getSelectedFormat = () => {
        switch (dropDownValue) {
            case FORMAT_ONE:
                return newFormat;
            default:
                return defaultFormat;
        }
    }

    return (
        <DocumentFormatContext.Provider value={{ selectedFormat: getSelectedFormat() }}>
            {children}
        </DocumentFormatContext.Provider>
    );
}