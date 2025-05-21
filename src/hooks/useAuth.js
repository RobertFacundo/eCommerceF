import { useState, useEffect } from "react";
import { postData } from "../services/authServices";

export function useAuth(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [token, setToken] = useState(null)
    const [isInitializing, setIsInitializing] = useState(true)

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        const storedCart = localStorage.getItem('cart');
        const storedToken = localStorage.getItem('token');

        if(storedUser) setUser(JSON.parse(storedUser));
        if(storedCart) setCart(JSON.parse(storedCart));
        if(storedToken) setToken(storedToken);

        setIsInitializing(false)
    }, [])

    useEffect(()=>{
        if(cart !== null){
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart])

    const authenticate = async (type, data) =>{
        setLoading(true);
        setError(null);
        try{
            const response = await postData(type, data);
            setLoading(false);

            setUser(response.user)
            localStorage.setItem("user", JSON.stringify(response.user));

            setCart(response.cart)
            localStorage.setItem('cart', JSON.stringify(response.cart))

            localStorage.setItem('token', response.token)

            console.log(response, 'log del hook')

            return response;
        }catch(error){
            setLoading(false);
            setError(error.message);
            throw error;
        }
    };

    const logOut = ()=>{
        setUser(null)
        setCart(null);
        setToken(null)

        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        localStorage.removeItem('token');
    };

    return {
        login: (data)=> authenticate('login', data),
        register: (data)=> authenticate('register', data),
        logOut,
        loading,
        error,
        user,
        cart,
        token, 
        setCart,
        isInitializing
    };
}