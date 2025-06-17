import { createContext } from "react";

export const OriginContext = createContext()

export default function OriginContextProvider({ children }) {
    // This constant is used for choukashi.com to show the bare minimum version.
    const limitFunctionality = false;

    return (
        <OriginContext.Provider value={{ limitFunctionality }}>
            {children}
        </OriginContext.Provider>
    )
}