import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext'

export const useAuthForm = () => {
    const { login, register, loading, error } = useAuthContext();
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username: formData.username,
                password: formData.password,
            };

            if (isRegister) payload.email = formData.email;

            console.log("📦 Payload enviado:", payload)

            if (isRegister) {
                await register(payload);
                const loginRes = await login({
                    username: payload.username,
                    password: payload.password,
                });
                console.log("✅ Login después del registro", loginRes)
                navigate('/Home');
            } else {
                const loginRes = await login(payload);
                console.log("✅ Login directo", loginRes);
                navigate('/Home');
            }
        } catch (error) {
            console.error("❌ Auth error:", error)
        }
    };

    return {
        isRegister,
        setIsRegister,
        formData,
        handleChange,
        handleSubmit,
        loading,
        error,
    }
}