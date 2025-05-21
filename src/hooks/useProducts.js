import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export function useProducts(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const loadProducts = async ()=>{
            try{
                const data = await getProducts();
                setProducts(data);
            }catch (error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return {products, loading, error};
}