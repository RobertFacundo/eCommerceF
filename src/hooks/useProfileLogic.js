import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { clearCart, removeProductFromCart } from "../services/cartService";

export const useProfileLogic = () => {
    const { user, cart, token, setCart } = useAuthContext();
    const navigate = useNavigate();

    console.log(user, 'log de profile')
    console.log(cart, 'log del profile')
    console.log(token, 'log del profile T')

    const handleClearCart = useCallback(async () => {
        try {
            const updatedCart = await clearCart(token);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Failed to clear Cart', error);
        }
    }, [token, setCart]);

    const handleRemoveProduct = useCallback(async (productId) => {
        try {
            const updatedCart = await removeProductFromCart(token, productId);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Failed to remove products', error);
        }
    }, [token, setCart]);

    const goToCheckOut = useCallback(() => {
        navigate('/CheckOut');
    }, [navigate])

    return {
        user,
        cart,
        handleClearCart,
        handleRemoveProduct,
        goToCheckOut
    };
};