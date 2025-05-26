import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
    it('it should render component correctly', () => {
        render(<Footer />)

        const footerText = screen.getByText(/Designed and developed by/i);
        const gitHubLink = screen.getByRole('link', {name: /robert/i})

        expect(footerText).toBeInTheDocument();
        expect(gitHubLink).toBeInTheDocument();

        expect(gitHubLink).toHaveAttribute('href','https://github.com/RobertFacundo');
        expect(gitHubLink).toHaveAttribute('target', '_blank');
        expect(gitHubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
})