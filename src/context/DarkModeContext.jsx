import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkmode, setDarkmode] = useState(() => {
        return localStorage.getItem("darkmode") === "true";
    });

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkmode);
    }, [darkmode]);

    const toggleTheme = () => {
        setDarkmode(!darkmode);
        localStorage.setItem("darkMode", !darkmode);
    };

    return (
        <DarkModeContext.Provider value= {{ darkmode, toggleTheme }}>
            {children}
        </DarkModeContext.Provider>
    );
};