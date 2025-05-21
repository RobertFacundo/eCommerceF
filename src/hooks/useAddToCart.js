import React from "react";
import { addProductToCart } from "../services/cartService";
import { useAuthContext } from "../contexts/AuthContext";


export function useAddToCart() {
    const { setCart} = useAuthContext();

    const token = localStorage.getItem('token')

    if(!token){
        throw new Error('token not found')
    }

    console.log(token, 'token del useAddToCart')

    const add = async (productId, quantity = 1) => {
        try {
            const updatedCart = await addProductToCart(token, productId, quantity);
            setCart(updatedCart);
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            throw error;
        }
    };

    return { add };
}