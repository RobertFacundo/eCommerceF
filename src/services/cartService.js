import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const addProductToCart = async (token, productId, quantity = 1) => {
    const config = {
        headers: {
            Authorization: `Token ${token}`,
            'Content-type': 'application/json',
        }
    };

    const body = {
        product_id: productId,
        quantity: quantity,
    };

    const response = await axios.post(`${API_URL}api/cart/add_product/`, body, config);

    console.log('repsonse del service', response)
    console.log('Token usado en cartService:', token);

    return response.data
}

export const clearCart = async (token) => {
    try {
        const response = await axios.post(`${API_URL}api/cart/clear/`,
            {},
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        );
        return {
            items: [],
            total: 0
        };
    } catch (error) {
        console.error('Error during process', error.response?.data || error.message);
        throw error;
    }
};

export const removeProductFromCart = async (token, productId) => {
    try {
        const response = await axios.post(`${API_URL}api/cart/remove_product/`,
            {
                product_id: productId
            },
            {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        console.log(response, 'log del serviceremove')

        return response.data;
    } catch (error) {
        console.error('error removing product from cart', error.response?.data || error.message);
        throw error;
    }
};