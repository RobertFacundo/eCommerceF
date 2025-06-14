import React from "react";
import styled from "styled-components";
import LoginRegister from "../components/LoginRegister";

const AuthWrapper = styled.div`
  height: 100vh;
  background-image: url('/home.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem; 
  
  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;

const Auth = () => {
    return (
       <AuthWrapper> 
             <LoginRegister /> 
       </AuthWrapper>
    )
};

export default Auth;