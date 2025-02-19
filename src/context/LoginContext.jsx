import { createContext, useEffect, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [logged, setLogged] = useState(true); //Primeramente no esta logged

    const isLogged = () => {
        return localStorage.getItem("logged") === "true";
    };
    
    useEffect(() => {
        setLogged(isLogged()); // Cuando carga la app, revisa si está logueado
    }, []);

    useEffect(() =>{
        if(token){
            //Llamar a la api para obtener el usuario pillariamos los datos y los metemos abajo
            setUser({name:"Elia", role:"Admin"})
        }
    }, [token])

    const login = async (email, password) => {
        try {

            const response = await fetch(/*URL DE LOGIN http:/localhost:8080/api/auth/login....   , la coma es importante*/ {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            if(!response.ok) throw new Error("Credenciales incorrectas");

            const data = await response.json();
            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser({name:"Elia", role: data.role}) //poner usuario.name en el nombre
        }catch (error){
            console.error("Error de login: ", error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.setItem("logged", "false"); // Cambiamos a false
        setUser(null);
        setToken(null);
    };

    return (
        <LoginContext.Provider value={{ user, token, login, logout, isLogged, logged}} >
            {children}
        </LoginContext.Provider>
    );

};

export default LoginContext