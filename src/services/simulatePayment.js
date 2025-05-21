export const simulatePayment = (method) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const paymentId = method === 'cash'
                ? `CASH-${Date.now()}`
                : `CARD-${Date.now()}`;
            
            resolve({
                status: "success",
                paymentId,
            });
        }, 1000);
    });
};