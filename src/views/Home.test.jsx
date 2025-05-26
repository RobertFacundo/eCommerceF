import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { vi } from 'vitest';

vi.mock('../hooks/useHomeLogic');

import { useHomeLogic } from '../hooks/useHomeLogic';

describe('Home component', () => {
    it('shows Loading user sessions when isInitializing is true', () => {
        useHomeLogic.mockReturnValue({
            user: null,
            isInitializing: true,
            products: [],
            loading: false,
            error: false,
            recentlyAddedId: null,
            handleAdd: vi.fn()
        });

        render(<Home />)
        expect(screen.getByText(/Loading user session.../i)).toBeInTheDocument();
    });

    it('shows "you are not logged in" when  user is null', () => {
        useHomeLogic.mockReturnValue({
            user: null,
            isInitializing: false,
            products: [],
            loading: false,
            error: false,
            recentlyAddedId: null,
            handleAdd: vi.fn()
        });

        render(<Home />);
        expect(screen.getByText(/you are not logged in/i)).toBeInTheDocument();
    });

    it('shows loader when loading is true', () => {
        useHomeLogic.mockReturnValue({
            user: { username: 'Facundo' },
            isInitializing: false,
            products: [],
            loading: false,
            error: true,
            recentlyAddedId: null,
            handleAdd: vi.fn()
        });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByText(/Oops, products can't be displayed/i)).toBeInTheDocument();
    });

    it('render products correctly', async () => {
        const mockProducts = [
            {
                "name": "Product A",
                "description": "Product Description I",
                "price": 29.99,
                "stock": 100,
                "image": "https://isto.pt/cdn/shop/files/Classic_T-shirt_White_1.webp?v=1742558269&width=990",
                "id": "1"
            },
            {
                "name": "Product B",
                "description": "Product Description II",
                "price": 29.99,
                "stock": 100,
                "image": "https://isto.pt/cdn/shop/files/Classic_T-shirt_White_1.webp?v=1742558269&width=990",
                "id": "2"
            }
        ];

        useHomeLogic.mockReturnValue({
            user: { username: 'Facundo' },
            isInitializing: false,
            products: mockProducts,
            loading: false,
            error: false,
            recentlyAddedId: null,
            handleAdd: vi.fn()
        });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText('Available products')).toBeInTheDocument();
        expect(screen.getByText('Product A')).toBeInTheDocument();
        expect(screen.getByText('Product B')).toBeInTheDocument();
        expect(screen.getAllByText('Add to Cart')).toHaveLength(2)
    });
})