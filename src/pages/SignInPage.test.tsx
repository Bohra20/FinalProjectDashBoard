import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store'; // Import the configured store
import SignIn from './SignInPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../services/useAuth';

// Mock the authService and useAuth hook
jest.mock('../services/authServices', () => ({
  authService: {
    signIn: jest.fn(),
  },
}));

jest.mock('../services/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

const renderSignIn = () => {
  return render(
    <Provider store={store}>
      <Router>
        <SignIn />
      </Router>
    </Provider>
  );
};

test('renders Sign In heading', () => {
  renderSignIn();
  const heading = screen.getByRole('heading', { name: /Sign In/i });
  expect(heading).toBeInTheDocument();
});

test('allows the user to sign in', async () => {
  const { authService } = require('../services/authServices');
  const { useAuth } = require('../services/useAuth');
  const loginMock = useAuth().login;

  // Mock successful sign in response
  authService.signIn.mockResolvedValueOnce({ data: { user: { name: 'Test User' } } });

  renderSignIn();

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

  // Check if login was called and redirected to dashboard
  expect(loginMock).toHaveBeenCalled();
  expect(await screen.findByText(/User authenticated:/i)).toBeInTheDocument();
});

test('displays an error message on sign in failure', async () => {
  const { authService } = require('../services/authServices');

  // Mock sign in to throw an error
  authService.signIn.mockRejectedValueOnce(new Error('Invalid credentials'));

  renderSignIn();

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'wrong@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

  // Check if the error message is displayed
  expect(await screen.findByText(/Error authenticating user:/i)).toBeInTheDocument();
});
