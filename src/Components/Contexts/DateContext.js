import { createContext, useState } from "react";

export const DateContext = createContext()

export default function DateContextProvider({ children }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <DateContext.Provider value={{ currentDate, setCurrentDate }}>
            {children}
        </DateContext.Provider>
    )
}