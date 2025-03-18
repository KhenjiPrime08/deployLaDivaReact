import axios from "axios";
import API_URL from "../config/config";

export const crearCita = async (servicio, fecha, hora) => {
    const token = localStorage.getItem("token");
  
    const response = await axios.post(`${API_URL}/citas`, { servicio, fecha, hora }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    return response.data;
};
  
