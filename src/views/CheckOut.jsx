import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useCheckOutHandler } from "../hooks/useCheckOutHandler";
import NavBar from "../components/nav/NavBar";
import styled, { keyframes } from "styled-components";

import { motion } from "framer-motion";
import { Loader, CenteredContainer, Message, spin } from "./Home";


const CheckOutWrapper = styled.div`
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
  background-image: url('/checkOut.jpg');
  background-size: cover;
  background-position: center;
  box-shadow: inset 35px 0 40px -20px rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
  padding: 1rem;
`;

const MotionCardSection = styled(motion.div)`
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2rem auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const RadioGroup = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const RadioTitle = styled.h3`
  font-size: 1.3rem;
  color: #2c3e50;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;

  label{
    flex: 1;
    display: flex;
    align-items: center;
    background-color: #af8f9fa;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1rem;
    color: #2c3e50;

    &:hover{
      background-color: #e2e6ea;
    }

    input{
      margin-right: 0.6rem;
      accent-color: #3f5145;
    }
  }
`;

const TotalAmount = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 1.5rem 0;
  color: #2c3e50;
  text-align: center;

  padding: 1rem;
  border-radius: 8px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  background-color: #3f5145;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover{
    background-color: #35443a;
  }
`;

const CheckOut = () => {
  const { cart, setCart } = useAuthContext();
  const { handleCheckOut } = useCheckOutHandler(cart, setCart);
  const [shippingData, setShippingData] = useState({
    name: '',
    address: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('');


  useEffect(() => {
    const updatedCart = localStorage.getItem('cart');
    setCart(JSON.parse(updatedCart))
  }, []);


  const handleChange = (e) => {
    setShippingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCheckOut(shippingData, paymentMethod);
  }

  if (!cart) {
    return (
      <CenteredContainer>
        <Loader />
        <Message>Loading CheckOut View</Message>
      </CenteredContainer>
    );
  }
  const totalAmount = cart.total;
  return (
    <CheckOutWrapper>
      <ContentSection>
        <NavBar />
        <Content>
          <MotionCardSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Title>CheckOut</Title>
            <form onSubmit={handleSubmit}>
              <StyledInput
                type="text"
                name='name'
                placeholder='Your name'
                value={shippingData.name}
                onChange={handleChange}
                required
              />
              <br />
              <StyledInput
                type="text"
                name='address'
                placeholder='Shipping address'
                value={shippingData.address}
                onChange={handleChange}
                required
              />
              <RadioGroup>
                <RadioTitle>Payment Method</RadioTitle>
                <OptionsWrapper>
                  <label>
                    <input
                      type="radio"
                      name='paymentMethod'
                      value='card'
                      onChange={() => setPaymentMethod('card')}
                      checked={paymentMethod === 'card'}
                    />
                    Credit/Debit Card
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name='paymentMethod'
                      value='cash'
                      onChange={() => setPaymentMethod('cash')}
                      checked={paymentMethod === 'cash'}
                    />
                    Cash on Delivery
                  </label>
                </OptionsWrapper>
              </RadioGroup>
              <TotalAmount>Amount: ${totalAmount}</TotalAmount>
              <SubmitButton type="submit">Confirm Order</SubmitButton>
            </form>
          </MotionCardSection>
        </Content>
      </ContentSection>
      <ImageSection />
    </CheckOutWrapper>
  );
};

export default CheckOut;