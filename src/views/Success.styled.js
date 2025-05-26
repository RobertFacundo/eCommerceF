import styled from "styled-components";
import { motion } from "framer-motion";

export const Background = styled.div`
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

export const MotionContentCard = styled(motion.div)`
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

export const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  font-weight: 700;
  border-bottom: 2px solid #ccc;
`;

export const InfoText = styled.p`
  font-size: 1.1rem;
  margin: 0.7rem 0;

  strong{
    text-transform: uppercase;
    font-weight: 600;
    color: #3f5145;
    margin-right: 0.5rem;
  }
`;

export const Note = styled.p`
  margin-top: 1.5rem;
  font-style: italic;
  color: #555;
  font-size: 1rem;
`;

export const BackButton = styled.button`
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