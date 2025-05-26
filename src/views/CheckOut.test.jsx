import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CheckOut from './CheckOut';
import { useCheckOutForm } from '../hooks/useCheckOutForm';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../hooks/useCheckOutForm', () => {
    return {
        useCheckOutForm: vi.fn(),
    };
});

describe('Check out component test', () => {
    const mockHandleChange = vi.fn();
    const mockHandleSubmit = vi.fn((e) => e.preventDefault());
    const mockSetPaymentMethod = vi.fn();

    const mockCart = {
        total: 100,
        items: [{ id: 1, name: 'Product A', price: 100 }],
    }

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows loader when cart is null', () => {
        useCheckOutForm.mockReturnValue({
            cart: null,
            shippingData: { name: '', address: '' },
            paymentMethod: '',
            handleChange: mockHandleChange,
            handleSubmit: mockHandleSubmit,
            setPaymentMethod: mockSetPaymentMethod,
        });

        render(<CheckOut />);
        expect(screen.getByText(/Loading Checkout View/i)).toBeInTheDocument();
    });

    it('renders the checkout form when cart is available', () => {
        useCheckOutForm.mockReturnValue({
            cart: mockCart,
            shippingData: { name: '', address: '' },
            paymentMethod: '',
            handleChange: mockHandleChange,
            handleSubmit: mockHandleSubmit,
            setPaymentMethod: mockSetPaymentMethod,
        });

        render(
            <MemoryRouter>
                <CheckOut />
            </MemoryRouter>
        );
        expect(screen.getByText(/CheckOut/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Shipping Address/i)).toBeInTheDocument();
        expect(screen.getByText(/Amount: \$100/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Confirm Order/i })).toBeInTheDocument();
    });

    it('calls handleSubmit on form Submit', () => {
        useCheckOutForm.mockReturnValue({
            cart: mockCart,
            shippingData: { name: '', address: '' },
            paymentMehotd: '',
            handleChange: mockHandleChange,
            handleSubmit: mockHandleSubmit,
            paymentMethod: mockSetPaymentMethod,
        });

        render(
            <MemoryRouter>
                <CheckOut />
            </MemoryRouter>
        );

        const form = screen.getByRole('form') || screen.getByRole('button', { name: /Confirm Order/i }).closest('form');
        fireEvent.submit(form);

        expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it('calls handleChange when tiping inputs', () => {
        useCheckOutForm.mockReturnValue({
            cart: mockCart,
            shippingData: { name: '', address: '' },
            paymentMethod: '',
            handleChange: mockHandleChange,
            handleSubmit: mockHandleSubmit,
            setPaymentMethod: mockSetPaymentMethod,
        });

        render(
            <MemoryRouter>
                <CheckOut />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Your name/i), {
            target: { value: 'Facundo', name: 'name' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Shipping address/i), {
            target: { value: '123 Empty Street', name: 'address' },
        });
        expect(mockHandleChange).toHaveBeenCalledTimes(2);
    });

    it('calls setPaymentMethod when selecting a payment option', () => {
        useCheckOutForm.mockReturnValue({
            cart: mockCart,
            shippingData: { name: '', address: '' },
            paymentMethod: '',
            handleChange: mockHandleChange,
            handleSubmit: mockHandleSubmit,
            setPaymentMethod: mockSetPaymentMethod,
        });

        render(
            <MemoryRouter>
                <CheckOut />
            </MemoryRouter>
        );

        const cardOption = screen.getByLabelText(/Credit\/Debit Card/i);
        fireEvent.click(cardOption);
        expect(mockSetPaymentMethod).toHaveBeenCalledWith('card')
    });
});