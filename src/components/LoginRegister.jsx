import React from "react";
import styled from "styled-components";
import { useAuthForm } from "../hooks/useAuthForm";

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #2c3e50;
  text-align: center;
  font-weight: 700;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #3f5145;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:disabled {
    background-color: #95a5a6;
  }

  &:hover:not(:disabled){
    background-color: #1f2923;
  }
`;

const Toggle = styled.button`
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;

const ErrorText = styled.p`
  color: red;
`;


const LoginRegister = () => {
    const{isRegister, setIsRegister, formData, handleChange, handleSubmit, loading, error} = useAuthForm();

    return (
        <Card style={{ maxWidth: "400px", margin: "0 auto" }}>
            <Title>{isRegister ? "Register" : "Login"}</Title>

            <Form onSubmit={handleSubmit} data-testid='login-register-form'>
                <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <br />

                {isRegister && (
                    <>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <br />
                    </>
                )}

                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />

                <Button type="submit" disabled={loading}>
                    {loading ? "Processing..." : isRegister ? "Register" : "Login"}
                </Button>
            </Form>

            {error && <ErrorText style={{ color: "red" }}>{error}</ErrorText>}

            <p>
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{""}
                <Toggle type="button" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'Login' : 'Register'}
                </Toggle>
            </p>
        </Card>
    )
}

export default LoginRegister;