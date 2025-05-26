import styled from "styled-components";
import { motion } from "framer-motion";

export const CheckOutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const ContentSection = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  overflow-y: auto;
`;

export const ImageSection = styled.div`
  flex: 1;
  background-image: url('/checkOut.jpg');
  background-size: cover;
  background-position: center;
  box-shadow: inset 35px 0 40px -20px rgba(0, 0, 0, 0.8);
`;

export const Content = styled.div`
  padding: 1rem;
`;

export const MotionCardSection = styled(motion.div)`
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2rem auto;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

export const RadioGroup = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

export const RadioTitle = styled.h3`
  font-size: 1.3rem;
  color: #2c3e50;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

export const OptionsWrapper = styled.div`
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

export const TotalAmount = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 1.5rem 0;
  color: #2c3e50;
  text-align: center;

  padding: 1rem;
  border-radius: 8px;
`;

export const SubmitButton = styled.button`
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