// src/test/LoginPage.test.tsx
import React from 'react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

// Mock useAuth
export const mockLogin = vi.fn();
vi.mock('../contexts/AuthContext', () => ({
    useAuth: () => ({
        login: mockLogin,
        isLoading: false,
    }),
}));

// Mock useNavigate and useLocation
const mockNavigate = vi.fn();
const mockLocation = { state: undefined };
vi.mock('react-router-dom', async (importOriginal: () => Promise<any>) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => mockLocation,
        Link: actual.Link,
    };
});

describe('LoginPage', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it('renders patient login form by default', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign in to your patient account/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    });

    it('switches to admin mode when Admin button is clicked', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        const adminButtons = screen.getAllByRole('button', { name: /Admin/i });
        fireEvent.click(adminButtons[adminButtons.length - 1]);
        fireEvent.click(adminButtons[adminButtons.length - 1]);
        expect(screen.getByText(/Sign in to your admin account/i)).toBeInTheDocument();
        expect(screen.getByText(/admin@medicare.com/i)).toBeInTheDocument();
    });
    it('shows error on invalid patient login', async () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        const emailInputs = screen.getAllByPlaceholderText(/Enter your email/i);
        fireEvent.input(emailInputs[0], { target: { value: 'wrong@email.com' } });
        const passwordInputs = screen.getAllByPlaceholderText(/Enter your password/i);
        fireEvent.input(passwordInputs[0], { target: { value: 'wrongpass' } });
        const signInButtons = screen.getAllByRole('button', { name: /Sign In/i });
        fireEvent.click(signInButtons[0]);
        await waitFor(() => {
            expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
        });
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('navigates on valid patient login', async () => {
        mockLogin.mockResolvedValueOnce({}); // Simulate successful login with a user object
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        const emailInputs = screen.getAllByPlaceholderText(/Enter your email/i);
        fireEvent.input(emailInputs[0], { target: { value: 'john.doe@email.com' } });
        const passwordInputs = screen.getAllByPlaceholderText(/Enter your password/i);
        fireEvent.input(passwordInputs[0], { target: { value: 'password123' } });
        const signInButtons = screen.getAllByRole('button', { name: /Sign In/i });
        fireEvent.click(signInButtons[0]);
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalled();
        });
    });
});
