import React from "react";
import { useAuthContext } from "../contexts/AuthContext";


const Home = () => {
    const { user, cart, token } = useAuthContext();

    if (!user) {
        return <p>No estás logueado.</p>;
    }

    return (
        <div>
            <h1>Bienvenido, {user.username}</h1>
            <p>Tu Token es: {token}</p>
        </div>
    )
};

export default Home;