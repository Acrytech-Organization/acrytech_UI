import { createContext, useState } from "react";

export const MenuContext = createContext({});

export default function MenuContextProvider({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <MenuContext.Provider
            value={{
                mobileOpen,
                handleDrawerClose,
                handleDrawerTransitionEnd,
                handleDrawerToggle
            }}>
            {children}
        </MenuContext.Provider>
    );
}