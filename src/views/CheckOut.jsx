import React, {useState} from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useCheckOutHandler } from "../hooks/useCheckOutHandler";

const CheckOut = () => {
    const { cart, setCart } = useAuthContext();
    const { handleCheckOut } = useCheckOutHandler(cart, setCart);

    const [shippingData, setShippingData] = useState({
        name: '',
        address: '',
    })

    const [paymentMethod, setPaymentMethod] = useState('');

    const handleChange = (e) => {
        setShippingData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCheckOut(shippingData, paymentMethod);
    }
    return (
        <div>
            <h1>CheckOut</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name='name'
                    placeholder='Your name'
                    value={shippingData.name}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name='address'
                    placeholder='Shipping address'
                    value={shippingData.address}
                    onChange={handleChange}
                    required
                />
                <br />
                <h3>Payment Method</h3>
                <label>
                    <input
                        type="radio"
                        name='paymentMethod'
                        value='card'
                        onChange={() => setPaymentMethod('card')}
                        checked={paymentMethod === 'card'}
                    />
                    Credit/Debit Card
                </label>
                <br />
                <label>
                    <input 
                    type="radio" 
                    name='paymentMethod'
                    value='cash'
                    onChange={()=>setPaymentMethod('cash')}
                    checked={paymentMethod === 'cash'}
                    />
                    Cash on Delivery
                </label>
                <br /><br />

                <button type="submit">Confirm Order</button>
            </form>
        </div>
    );
};

export default CheckOut;