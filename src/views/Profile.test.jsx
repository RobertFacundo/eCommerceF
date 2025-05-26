import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProfileLogic } from "../hooks/useProfileLogic";
import Profile from "./Profile";
import { MemoryRouter } from "react-router-dom";

vi.mock('../hooks/useProfileLogic', () => ({
    useProfileLogic: vi.fn(),
}));


describe('Profile component', () => {
    const mockHandleClearCart = vi.fn();
    const mockHandleRemoveProduct = vi.fn();
    const mockGoToCheckOut = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows message when user is not logged in', () => {
        useProfileLogic.mockReturnValue({
            user: null,
            cart: { items: [], total: 0 },
            handleClearCart: mockHandleClearCart,
            handleRemoveProduct: mockHandleRemoveProduct,
            goToCheckOut: mockGoToCheckOut,
        });

        render(<Profile />)
        expect(screen.getByText(/You are not log in/i)).toBeInTheDocument();
    });

    it('renders user info and empty cart message', () => {
        useProfileLogic.mockReturnValue({
            user: { username: "test", email: "example@example.com" },
            cart: { items: [], total: 0 },
            handleClearCart: mockHandleClearCart,
            handleRemoveProduct: mockHandleRemoveProduct,
            goToCheckOut: mockGoToCheckOut,
        });

        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );
        expect(screen.getByText(/test/i)).toBeInTheDocument();
        expect(screen.getByText(/example@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/You don't have products on your cart yet./i)).toBeInTheDocument();
    });

    it('renders car items and total, buttons work', () => {
        const cartItems = [
            {
                product: {
                    id: "1",
                    name: "Product 1",
                    description: "Description 1",
                    price: 10,
                    image: "image1.jpg",
                },
            },
            {
                product: {
                    id: "2",
                    name: "Product 2",
                    description: "Description 2",
                    price: 20,
                    image: "image2.jpg",
                },
            },
        ];

        useProfileLogic.mockReturnValue({
            user: { username: "test", email: "example@example.com" },
            cart: { items: cartItems, total: 30 },
            handleClearCart: mockHandleClearCart,
            handleRemoveProduct: mockHandleRemoveProduct,
            goToCheckOut: mockGoToCheckOut,
        });

        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );

        expect(screen.getByText(/test/i)).toBeInTheDocument();
        expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();

        const clearBtn = screen.getByRole('button', { name: /clear cart/i });
        expect(clearBtn).toBeInTheDocument();

        cartItems.forEach((item) => {
            expect(screen.getByText(item.product.name)).toBeInTheDocument();
            expect(screen.getByText(item.product.description)).toBeInTheDocument();
            expect(screen.getByText(`$${item.product.price}`)).toBeInTheDocument();
            expect(screen.getByAltText(item.product.name)).toBeInTheDocument();
        });

        expect(screen.getByTestId('total')).toHaveTextContent('Total: $30');

        fireEvent.click(clearBtn);
        expect(mockHandleClearCart).toHaveBeenCalled();

        const removeButtons = screen.getAllByRole('button', { name: /remove product/i });
        expect(removeButtons.length).toBe(cartItems.length);

        fireEvent.click(removeButtons[0]);
        expect(mockHandleRemoveProduct).toHaveBeenCalledTimes(1);

        const checkOutBtn = screen.getByRole('button', { name: /CheckOut/i });
        fireEvent.click(checkOutBtn);
        expect(mockGoToCheckOut).toHaveBeenCalled();
    });
});