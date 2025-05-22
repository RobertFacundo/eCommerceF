import React, { useEffect, useState, useMemo } from 'react';
import { useWindowSize } from '@react-hook/window-size'
import styled from 'styled-components';
import { FaReceipt, FaUser, FaMapMarkerAlt, FaMoneyBillWave, FaCreditCard, FaDollarSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti'

const Background = styled.div`
  min-height: 100vh;
  background-image: url('/success.jpg');
  background-size: cover;
  background-position: center;
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
`;

const MotionContentCard = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  font-weight: 700;
  border-bottom: 2px solid #ccc;
`;

const InfoText = styled.p`
  font-size: 1.1rem;
  margin: 0.7rem 0;

  strong{
    text-transform: uppercase;
    font-weight: 600;
    color: #3f5145;
    margin-right: 0.5rem;
  }
`;

const Note = styled.p`
  margin-top: 1.5rem;
  font-style: italic;
  color: #555;
  font-size: 1rem;
`;

const BackButton = styled.button`
  margin-top: 2.5rem;
  background-color: transparent;
  border: none;
  color: #3f5145;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover{
    color: #1e2a20;
  }
`;


const Success = () => {
  const navigate = useNavigate();
  const [width, height] = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 50000)
    return () => clearTimeout(timer);
  }, []);

  const lastOrder = useMemo(()=>{
      return  JSON.parse(localStorage.getItem('lastOrder'));
  }, [])
  

  if (!lastOrder || !lastOrder.user) return <p>No recent order found</p>

  const isCash = lastOrder.method === 'cash';

  return (
    <Background>
      {showConfetti && <Confetti width={width} height={height} />}
      <MotionContentCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Title>{isCash ? "🛒 Order Confirmed!" : "✅ Payment Successful!"}</Title>

        <InfoText><strong><FaReceipt color="#9b59b6" /></strong> {lastOrder.id}</InfoText>
        <InfoText><strong><FaUser color="#2980b9" /></strong> {lastOrder.user.name}</InfoText>
        <InfoText><strong><FaMapMarkerAlt color="#e74c3c" /></strong>{lastOrder.user.address}</InfoText>
        <InfoText><strong>{isCash ? <FaMoneyBillWave color="#27ae60" /> : <FaCreditCard color="#8e44ad" />}</strong> {isCash ? 'Cash on Delivery' : 'Credit/Debit Card'}</InfoText>
        <InfoText><strong><FaDollarSign color="#27ae60" /></strong> ${lastOrder.total}</InfoText>

        {isCash ? (
          <Note>(Please prepare the total amount upon delivery)</Note>
        ) : (
          <InfoText>Thanks for choosing us!</InfoText>
        )}
        <BackButton onClick={() => navigate('/Home')}>
          Back To Home
        </BackButton>
      </MotionContentCard>
    </Background>
  );
};

export default Success;