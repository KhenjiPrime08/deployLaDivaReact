import API_URL from "../config/config";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/usuario/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password} ),
    });

    
    if (!response.ok) throw new Error("Credenciales incorrectas");

    const datos = await response.json();
    console.log("Token recibido:", datos.token); // Verifica si llega el token

   
    localStorage.setItem("token", datos.token); // Guarda el token
    window.dispatchEvent(new Event("loginStatusChanged"));


    return datos; // Retorna el token y el usuario

  } catch (error) {
    console.error("Error en login: ", error.message);
    throw error;
  }

};

export const register = async (nombre, email, password) => {
    try {
      const response = await fetch(`${API_URL}/usuario/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({nombre, email, password}),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario");
      }
  
      return data;
    } catch (error) {
      console.error("Error en register: ", error.message);
      throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("loginStatusChanged"));
}

export const editarPerfil  = async (id, nombre, email, password) => {
  
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token disponible");

  try{
    const response = await fetch(`${API_URL}/usuario/editar/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",
                 Authorization: token},
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await response.json();

    if(!response.ok){
      throw new Error(data.error || "Error al editar perfil");
    }

    return data;

  }catch(error){
    console.error("Error en editarPerfil: ", error.message);
    throw error;
  }
}