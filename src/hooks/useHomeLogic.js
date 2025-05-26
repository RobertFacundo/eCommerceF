import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useProducts } from "./useProducts";
import { useAddToCart } from "./useAddToCart";

export const useHomeLogic = () => {
    const { user, isInitializing } = useAuthContext();
    const { products, loading, error } = useProducts();
    const { add } = useAddToCart();

    const [recentlyAddedId, setRecentlyAddedId] = useState(null);
    const timeoutRef = useRef(null)

    const handleAdd = async (productId) => {
        try {
            await add(productId)
            setRecentlyAddedId(productId);

            timeoutRef.current = setTimeout(() => {
                setRecentlyAddedId(null);
            }, 2500);
        } catch (error) {
            console.error('error during process', error)
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [])

    return {
        user,
        isInitializing,
        products,
        loading,
        error,
        recentlyAddedId,
        handleAdd
    };
};