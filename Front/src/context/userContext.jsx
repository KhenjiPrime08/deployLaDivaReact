import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        

        if(token){
            try {
                const decoded = jwtDecode(token);
                setUser(decoded); //usuario con la informacion del token
                setIsAdmin(decoded.rol === "admin");
            } catch (error) {
                console.error("Error al decodificar el usuario en userContext", error);
                setUser(null);
                setIsAdmin(false);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, isAdmin, setUser, setIsAdmin }}>
            {children}
        </UserContext.Provider>
    )


}