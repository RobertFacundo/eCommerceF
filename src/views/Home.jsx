import React from "react";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
    const { user } = useAuth();

    if (!user) {
        return <p>No estás logueado.</p>;
    }

    return (
        <div>
            <h1>Bienvenido, {user.username}</h1>
            <p>Tu Token es: {user.token}</p>
        </div>
    )
};

export default Home;