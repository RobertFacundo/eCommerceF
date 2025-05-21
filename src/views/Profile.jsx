import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { clearCart, removeProductFromCart } from "../services/cartService";

const Profile = () => {
    const { user, cart, token, setCart } = useAuthContext();
    const navigate = useNavigate();

    console.log(user, 'log de profile')
    console.log(cart, 'log del profile')
    console.log(token, 'log del profile T')

    if (!user) return <p>You are not log in</p>

    const handleClearCart = async () => {
        try {
            const updatedCart = await clearCart(token);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        } catch (error) {
            console.error('Failed to clear Cart', error)
        }
    };

    const handleRemoveProduct = async (productId) => {
        try {
            const updatedCart = await removeProductFromCart(token, productId);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        } catch (error) {
            console.error('Failed to remove product:', error)
        }
    }

    return (
        <div>
            <h1>{user.username} profile</h1>
            <p>{user.email}</p>

            <h2>Your cart</h2>
            {cart && cart.items.length > 0 ? (
                <>
                    <ul>
                        {cart.items.map((item, index) => (
                            <li key={index}>
                                <h3>{item.product.name}</h3>
                                <p>{item.product.description}</p>
                                <p>Price: ${item.product.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => handleRemoveProduct(item.product.id)}>
                                    Remove this product
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${cart.total}</h3>
                    <button onClick={() => navigate('/CheckOut')}>
                        CheckOut
                    </button>
                    <button onClick={handleClearCart}>
                        Clear Cart
                    </button>
                </>
            ) : (
                <p>You don't have products on your cart yet.</p>
            )}
        </div>
    )
};

export default Profile;