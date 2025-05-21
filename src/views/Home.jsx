import {useState} from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useProducts } from "../hooks/useProducts";
import { useAddToCart } from "../hooks/useAddToCart";


const Home = () => {
    const { user, isInitializing} = useAuthContext();
    const { products, loading, error } = useProducts();
    const {add } = useAddToCart();

    const [recentlyAddedId, setRecentlyAddedId] = useState(null);

    const handleAdd = async (productId) => {
        try {
            await add(productId);
            setRecentlyAddedId(productId);

            setTimeout(() => {
                setRecentlyAddedId(null)
            }, 2500)
        } catch (err) {
            console.error('error during process', err)
        }
    }

    if(isInitializing){
        return <p>Loading user session...</p>
    }

    if (!user) {
        return <p>You are not log in.</p>;
    }

    return (
        <div>
            <h1>Welcome, {user.username}</h1>

            {loading && <p>Loading products...</p>}
            {error && <p>Oops, products can't be display</p>}

            {!loading && !error && (
                <div>
                    <h2>Available products</h2>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <img src={product.image} alt={product.name} style={{ width: "100px", height: "auto", borderRadius: "8px" }} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p><strong>Price:</strong> ${product.price}</p>
                                <button
                                    onClick={() => handleAdd(product.id)}
                                    disabled={recentlyAddedId === product.id}
                                >
                                    {recentlyAddedId === product.id ? "Added!" : "Add to Cart"}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div >
    )
};

export default Home;