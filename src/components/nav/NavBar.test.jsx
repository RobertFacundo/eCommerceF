import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar component', () => {
    it('Correctly render the component', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        const homeLink = screen.getByRole('link', { name: /home/i });
        const profileLink = screen.getByRole('link', {name: /profile/i});

        expect(homeLink).toBeInTheDocument();
        expect(profileLink).toBeInTheDocument();

        expect(homeLink).toHaveAttribute('href', '/Home');
        expect(profileLink).toHaveAttribute('href', '/Profile')
    })
})