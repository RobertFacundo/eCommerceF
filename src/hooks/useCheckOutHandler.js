import { useNavigate } from "react-router-dom";
import { simulatePayment } from "../services/simulatePayment";
import { useAuthContext } from "../contexts/AuthContext";
import { clearCart } from "../services/cartService";

export const useCheckOutHandler = (cart, setCart) => {
    const navigate = useNavigate();
    const { token } = useAuthContext();

    const handleCheckOut = async (shippingData, paymentMethod) => {
        if (!shippingData.name || !shippingData.address || !paymentMethod) {
            alert('Please complete all fields');
            return;
        }

        try {
            const result = await simulatePayment(paymentMethod);

            const order = {
                id: `ORDER-${Date.now()}`,
                user: shippingData,
                items: cart.items,
                total: cart.total,
                paymentId: result.paymentId,
                method: paymentMethod,
                date: new Date().toISOString(),
            };

            console.log(order, 'log del hook checkout')

            localStorage.setItem('lastOrder', JSON.stringify(order));
            setCart({ items: [] });
            localStorage.removeItem('cart')

            if (token) {
                await clearCart(token);
                console.log('empty cart')
            }

            navigate('/Success');
        } catch (error) {
            console.error('error during checkout', error);
        }
    };

    return { handleCheckOut };
};