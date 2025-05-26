import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from 'react-confetti';

export const useSuccessLogic = () => {
    const navigate = useNavigate();
    const [width, height] = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 50000)
        return () => clearTimeout(timer);
    }, []);

    const lastOrder = useMemo(() => {
        return JSON.parse(localStorage.getItem('lastOrder'))
    }, []);

    const isCash = lastOrder?.method === 'cash';

    return{
        navigate,
        width,
        height,
        showConfetti,
        lastOrder,
        isCash
    };
};