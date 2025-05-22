import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { clearCart, removeProductFromCart } from "../services/cartService";
import styled from "styled-components";
import NavBar from "../components/nav/NavBar";
import { FaTrashAlt, FaBroom } from "react-icons/fa";

import { motion } from "framer-motion";

const ProfileWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ContentSection = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  overflow-y: auto;
`;

const ImageSection = styled.div`
  flex: 1;
  background-image: url('/hom2.jpg');
  background-size: cover;
  background-position: center;
  box-shadow: inset 35px 0 40px -20px rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
  padding: 1rem;        
`;

const MotionUserInfo = styled(motion.div)`
  margin-bottom: 1rem;

  h1{
    font-size: 2rem;
    color: #2c3e50;
  }

  p{
    font-size: 1rem;
    color: #555;
  }
`;

const CartSection = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #ccc;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;

  &:hover{
    color: #c0392b;
  }
`;

const CartTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  padding-bottom: 0.5rem;
`;

const MotionCartItem = styled(motion.li)`
  list-style:none;
  display: flex;   
  align-items: center; 
  margin-bottom: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;

  .image-container{
    flex: 1;
    margin-right: 1.5rem;

    img{
      width: 130px;
      height: 100px;
      object-fit: coverM
      border-radius: 8px;
    }
  }

  .info-container{
    flex: 1;
    display: flex;
    justify-content: space-between;

    .text{
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      color: #2c3e50;

      h3{
        font-size: 1.3rem;
        margin: 0.5rem 0;
        padding-bottom: 0.2rem;
        font-weight: 700;
        border-bottom: 1.8px solid #ccc
      }

      p{
        font-size: 0.95rem;
        padding: 0.3rem;
        margin-bottom: 0.5rem;
        color:#2c3e50;
        font-weight: 400;
      }
      .price{
        font-size: 1.2rem;
        font-weight: 600;
      }
    }

    .remove-btn{
      background: transparent;
      border: none;
      color: #e74c3c;
      color: pointer;
      transition: color 0.3s;

      &:hover{
        color: #c0392b;
      }
    }
  }

  button{
    margin-top: 0.5rem;
    background-color: #e74c3c;
    color: white;   
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;

    &:hover{
      background-color: #c0392b;
    }
  }
`;

const Total = styled.h3`
  margin-top: 2rem;
  font-size: 1.3rem;
  color: #2c3e50;
`;

const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;

  button{
    margin-right: 1rem;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    color: white;
    background-color: #3f5145;
    font-weight: bold;

    &:hover{
      background-color: #35443a;
    }

  }
`;

const Profile = () => {
  const { user, cart, token, setCart } = useAuthContext();
  const navigate = useNavigate();

  console.log(user, 'log de profile')
  console.log(cart, 'log del profile')
  console.log(token, 'log del profile T')

  if (!user) return <p>You are not log in</p>

  const handleClearCart = async () => {
    try {
      const updatedCart = await clearCart(token);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } catch (error) {
      console.error('Failed to clear Cart', error)
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const updatedCart = await removeProductFromCart(token, productId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } catch (error) {
      console.error('Failed to remove product:', error)
    }
  }

  return (
    <ProfileWrapper>
      <ContentSection>
        <NavBar />
        <Content>
          <MotionUserInfo
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>{user.username}</h1>
            <p>{user.email}</p>
          </MotionUserInfo>

          <CartSection>
            <TitleSection>
              <CartTitle>Your cart</CartTitle>
              {cart.items.length > 0 &&
                <ClearButton className="clear-btn" onClick={handleClearCart} aria-label='Clear cart'>
                  <FaBroom size={25} />
                </ClearButton>
              }
            </TitleSection>
            {cart && cart.items.length > 0 ? (
              <>
                <ul>
                  {cart.items.map((item, index) => (
                    <MotionCartItem
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="image-container">
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <div className="info-container">
                        <div className="text">
                          <h3>{item.product.name}</h3>
                          <p>{item.product.description}</p>
                          <p className='price'><strong>Price:</strong> ${item.product.price}</p>
                        </div>
                        <button className="remove-btn" onClick={() => handleRemoveProduct(item.product.id)} aria-label="Remove product">
                          <FaTrashAlt size={18} />
                        </button>
                      </div>
                    </MotionCartItem>
                  ))}
                </ul>
                <Total>Total: ${cart.total}</Total>
                <ButtonGroup>
                  <button onClick={() => navigate('/CheckOut')}>
                    CheckOut
                  </button>
                </ButtonGroup>
              </>
            ) : (
              <p>You don't have products on your cart yet.</p>
            )}
          </CartSection>
        </Content>
      </ContentSection>
      <ImageSection />
    </ProfileWrapper>
  )
};

export default Profile;