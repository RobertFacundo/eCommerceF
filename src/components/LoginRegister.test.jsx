import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginRegister from "./LoginRegister";
import { useAuthForm } from "../hooks/useAuthForm";
import { useNavigate } from "react-router-dom";
import { beforeEach, vi } from "vitest";

vi.mock('../hooks/useAuthForm')
vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn()
}));


describe('LoginRegister Component', () => {
    const mockLogin = vi.fn();
    const mockRegister = vi.fn();
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
        useAuthForm.mockReturnValue({
            isRegister: false,
            setIsRegister: vi.fn(),
            formData: { username: '', password: '', email: '' },
            handleChange: vi.fn(),
            handleSubmit: vi.fn((e) => e.preventDefault()),
            loading: false,
            error: null
        });
    });

    const setup = () => {
        render(<LoginRegister />);
    }

    test('renders Login form correctly', () => {
        setup();

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Login');
        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.queryByPlaceholderText(/email/i)).not.toBeInTheDocument();
    });

    test('Toggle Login and Register Form', () => {
        const setIsRegisterMock = vi.fn();

        useAuthForm.mockReturnValueOnce({
            isRegister: false,
            setIsRegister: setIsRegisterMock,
            formData: { username: '', password: '', email: '' },
            handleChange: vi.fn(),
            handleSubmit: vi.fn((e) => e.preventDefault()),
            loading: false,
            error: null
        });

        setup();

        const toggleButton = screen.getByRole('button', { name: /register/i });
        fireEvent.click(toggleButton);

        expect(setIsRegisterMock).toHaveBeenCalledWith(true);
    });

    test('calls handleSubmit on form submission', () => {
        const handleSubmitMock = vi.fn((e) => e.preventDefault());

        useAuthForm.mockReturnValueOnce({
            isRegister: false,
            setIsRegister: vi.fn(),
            formData: {userName: '', password: '', email:''},
            handleChange: vi.fn(),
            handleSubmit:handleSubmitMock,
            loading: false,
            error: null
        });

        setup();

        const form = screen.getByTestId('login-register-form');
        fireEvent.submit(form);

        expect(handleSubmitMock).toHaveBeenCalledWith(expect.anything());
    })
})