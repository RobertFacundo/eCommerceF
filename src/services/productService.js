import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async ()=>{
    try{
        const response = await axios.get(`${API_URL}api/products`);
        console.log(response, ' log del service')
        
        return response.data;
    }catch (error){
        throw new Error('Products could not be loaded')
    }
} 