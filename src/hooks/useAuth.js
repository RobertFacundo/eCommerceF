import { useState, useEffect } from "react";
import { postData } from "../services/authServices";

export function useAuth(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    }, [])

    const authenticate = async (type, data) =>{
        setLoading(true);
        setError(null);
        try{
            const response = await postData(type, data);
            setLoading(false);

            setUser(response)
            localStorage.setItem("user", JSON.stringify(response));

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
        localStorage.removeItem('user');
    };

    return {
        login: (data)=> authenticate('login', data),
        register: (data)=> authenticate('register', data),
        logOut,
        loading,
        error,
        user
    };
}