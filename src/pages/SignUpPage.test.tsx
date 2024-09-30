import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store'; // Import the configured store
import SignUp from './SignUpPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { authService } from '../services/authServices';
import { useAuth } from '../services/useAuth';

// Mock the authService and useAuth hook
jest.mock('../services/authServices', () => ({
  authService: {
    signUp: jest.fn(),
  },
}));

jest.mock('../services/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

const renderSignUp = () => {
  return render(
    <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
  );
};

test('renders Sign Up heading', () => {
  renderSignUp();
  const heading = screen.getByRole('heading', { name: /Create an Account/i });
  expect(heading).toBeInTheDocument();
});

test('displays note about registration', () => {
  renderSignUp();
  const note = screen.getByText(/Note: Only defined users succeed registration/i);
  expect(note).toBeInTheDocument();
});

test('allows only defined users to sign up', async () => {
  const { authService } = require('../services/authServices');

  // Mock successful sign up response for defined user
  authService.signUp.mockResolvedValueOnce({ data: { message: 'User registered successfully' } });

  renderSignUp();

  // Fill out the form with allowed user
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'eve.holt@reqres.in' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

  // Check if signUp was called
  expect(authService.signUp).toHaveBeenCalledWith({
    firstName: 'John',
    lastName: 'Doe',
    email: 'eve.holt@reqres.in',
    password: 'password123',
  });
});

test('shows error message for non-allowed users', async () => {
  renderSignUp();

  // Fill out the form with a non-allowed user
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'notallowed@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

  // Check if the error message is displayed
  expect(await screen.findByText(/This email is not allowed to register/i)).toBeInTheDocument();
});

test('handles sign-up error gracefully', async () => {
  const { authService } = require('../services/authServices');

  // Mock sign up to throw an error
  authService.signUp.mockRejectedValueOnce(new Error('Sign-up failed'));

  renderSignUp();

  // Fill out the form with allowed user
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'eve.holt@reqres.in' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

  // Check console error (you can also add an error message handling in the component)
  expect(await screen.findByText(/Sign-up error:/i)).toBeInTheDocument(); // Update this according to your error handling
});
