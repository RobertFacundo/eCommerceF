import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useCheckOutHandler } from "./useCheckOutHandler";

export const useCheckOutForm = () => {
    const { cart, setCart } = useAuthContext();
    const { handleCheckOut } = useCheckOutHandler(cart, setCart);
    const [shippingData, setShippingData] = useState({ name: '', addres: '' })
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        const updatedCart = localStorage.getItem('cart')
        setCart(JSON.parse(updatedCart))
    }, []);

    const handleChange = (e) => {
        setShippingData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCheckOut(shippingData, paymentMethod);
    };

    return {
        cart,
        shippingData,
        paymentMethod,
        handleChange,
        handleSubmit,
        setPaymentMethod,
    }
}