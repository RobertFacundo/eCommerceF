import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Success from './Success';
import { vi } from 'vitest';
import * as useSuccessLogicModule from '../hooks/useSuccessLogic';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-confetti', () => ({
    default: () => <div data-testid="confetti" />,
}));

vi.mock('../hooks/useSuccessLogic', () => ({
    useSuccessLogic: vi.fn(),
}));

describe('success component', () => {
    it('renders all order details for cash on delivery', () => {
        useSuccessLogicModule.useSuccessLogic.mockReturnValue({
            navigate: vi.fn(),
            width: 800,
            height: 600,
            showConfetti: true,
            isCash: true,
            lastOrder: {
                id: 'ORD123',
                user: {
                    name: 'Facundo Robert',
                    address: '123 Calle Falsa',
                },
                total: 99.99,
            },
        });

        render(<Success />)

        expect(screen.getByText('🛒 Order Confirmed!')).toBeInTheDocument()
        expect(screen.getByText('ORD123')).toBeInTheDocument()
        expect(screen.getByText('Facundo Robert')).toBeInTheDocument()
        expect(screen.getByText('123 Calle Falsa')).toBeInTheDocument()
        expect(screen.getByText('Cash on Delivery')).toBeInTheDocument()
        expect(screen.getByText('$99.99')).toBeInTheDocument()
        expect(screen.getByText('(Please prepare the total amount upon delivery)')).toBeInTheDocument()
        expect(screen.getByTestId('confetti')).toBeInTheDocument();
    });

    it('navigates to Home when clicking the Back Button', async () => {
        const navigateMock = vi.fn();

        useSuccessLogicModule.useSuccessLogic.mockReturnValue({
            navigate: navigateMock,
            width: 800,
            height: 600,
            showConfetti: false,
            isCash: false,
            lastOrder: {
                id: 'ORD456',
                user: {
                    name: 'Facundo Robert',
                    address: 'Calle Verdadera 456',
                },
                total: 123.45,
            },
        });

        render(
            <MemoryRouter>
                <Success />
            </MemoryRouter>
        );

        const button = screen.getByRole('button', {name: /Back to Home/i});
        await userEvent.click(button);
        expect(navigateMock).toHaveBeenCalledWith('/Home')
    })
})