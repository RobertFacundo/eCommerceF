import React from 'react';

const Success = () => {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));

    if (!lastOrder) return <p>No recent order found</p>

    const isCash = lastOrder.method === 'cash';

    return (
        <div>
            <h1>{isCash ? "🛒 Order Confirmed!" : "✅ Payment Successful!"}</h1>

            <p><strong>Order ID:</strong> {lastOrder.id}</p>
            <p><strong>Name:</strong> {lastOrder.user.name}</p>
            <p><strong>Address:</strong>{lastOrder.user.address}</p>
            <p><strong>Payment Method:</strong> {isCash ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>

            {isCash ? (
                <p>Please prepare the total amount upon delivery</p>
            ) : (
                <p><strong>Payment Id:</strong>{lastOrder.paymentId}</p>
            )}
            <p><strong>Total:</strong> ${lastOrder.total}</p>
        </div>
    );
};

export default Success;