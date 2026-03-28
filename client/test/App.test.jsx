import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../src/App';

// Mock the environment variables and canvas to prevent errors in test env
vi.stubEnv('VITE_API_URL', 'http://localhost:3001');

describe('App Component', () => {
    it('renders the branding header correctly', () => {
        render(<App />);
        expect(screen.getAllByText(/We/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Verify/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Don’t build blindly/i)).toBeInTheDocument();
    });

    it('renders the social footer layout', () => {
        render(<App />);
        expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
        expect(screen.getByText(/shinesuryaindia@gmail.com/i)).toBeInTheDocument();
    });
});
