import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const postData = async (endpoint, data) => {
    try {
        const res = await axios.post(`${API_BASE_URL}api/${endpoint}/`, data);
        return res.data;
    } catch (error) {
        console.error("❌ Error en postData:", error);
        // lanzamos el mensaje de error del backend o un mensaje genérico
        throw new Error(
             JSON.stringify(error.response?.data) || "Error inesperado en la autenticación"
        );
    }
}