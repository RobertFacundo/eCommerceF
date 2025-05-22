import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useProducts } from "../hooks/useProducts";
import { useAddToCart } from "../hooks/useAddToCart";
import styled, { keyframes } from "styled-components";
import NavBar from "../components/nav/NavBar";

import { motion } from "framer-motion";


const HomeWrapper = styled.div`
  display:flex;
  min-height: 100vh;
  color: #333;
  overflow: hidden;
`;

const ImageSection = styled.div`
  flex:1;
  background-image: url('/hom2.jpg');
  background-size: cover;
  background-position: center;
  box-shadow: inset 35px 0 40px -20px rgba(0, 0, 0, 0.8);
`;

const ContentSection = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #f8f9fa;
`;

const MotionTitle = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  padding-bottom: 0.5rem;
  position: relative;
  text-align: left;
  padding-left: 1rem;
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;           /* línea que ocupa la mitad derecha */
    height: 2px;
    background-color: #ccc;
  }
`;

const MotionWelcomeMessage = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  font-style: oblique;
  color: #1f2937;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  padding-right: 1.3rem;
  text-align: right;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  list-style:none;
  padding: 3rem 2rem;
  margin: 0;
`;

const MotionProductItem = styled(motion.li)`
  display: flex;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .image-container{
    flex: 1;
    margin-right: 1.5rem;

    img{
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .info-container{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .text{
      margin-bottom: 1rem;

      h3{
        font-size: 1.3rem;
        margin: 0.5rem 0;
      }

      p{
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
        color:#555;
      }
    }
  }

  button{
    align-self: center;
    padding: 0.6rem 1rem;
    background-color: #3f5145;
    border: none;
    border-radius: 6px;

    color: white;
    cursor: pointer;
    font-weight: bold;

    &:hover{
      background-color: #35443a;
    }

    &:disabled{
      background-color: #95a5a6;
      cursor: not-allowed;
    }
  }
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  margin: 2rem auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3f5145;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation ${spin} 1s linear infinite;
`;

export const Message = styled.p`
  text-align: center;
  color: #3f5145;
  font-size: 1.1rem;
  margin-top: 1rem;
`;

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;


const Home = () => {
  const { user, isInitializing } = useAuthContext();
  const { products, loading, error } = useProducts();
  const { add } = useAddToCart();

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

  if (isInitializing) {
    return (
      <CenteredContainer>
        <Loader />
        <Message>Loading user session...</Message>
      </CenteredContainer>
    );
  };

  if (!user) {
    return (
      <CenteredContainer>
        <Message>You are not logged in.</Message>
      </CenteredContainer>
    );
  }

  return (
    <HomeWrapper>
      <ContentSection>
        <NavBar />
        <MotionWelcomeMessage
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome, {user.username}!
        </MotionWelcomeMessage>

        {loading && (
          <>
            <Loader />
            <Message>Loading products...</Message>
          </>
        )}
        {error && <Message>Oops, products can't be displayed</Message>}

        {!loading && !error && (
          <>
            <MotionTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >Available products</MotionTitle>
            <ProductList>
              {products.map((product, index) => (
                <MotionProductItem
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                >
                  <div className="image-container">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="info-container">
                    <div className="text">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p><strong>Price:</strong> ${product.price}</p>
                    </div>
                    <button
                      onClick={() => handleAdd(product.id)}
                      disabled={recentlyAddedId === product.id}
                    >
                      {recentlyAddedId === product.id ? "Added!" : "Add to Cart"}
                    </button>
                  </div >
                </MotionProductItem>
              ))}
            </ProductList>
          </>
        )}
      </ContentSection>
      <ImageSection />
    </HomeWrapper>
  )
};

export default Home;