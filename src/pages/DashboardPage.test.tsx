import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store'; // Import the configured store
import DashboardPage from './DashboardPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../services/useAuth';

// Mock the useAuth hook
jest.mock('../services/useAuth', () => ({
  useAuth: () => ({
    logout: jest.fn(),
  }),
}));

const renderDashboardPage = () => {
  return render(
    <Provider store={store}>
      <Router>
        <DashboardPage />
      </Router>
    </Provider>
  );
};

test('renders welcome message', () => {
  // Set up initial state
  store.dispatch({
    type: 'auth/setUser', // Adjust the action to match your setup
    payload: {
      name: 'Test User',
      email: 'test@example.com',
      role: 'Admin',
    },
  });

  renderDashboardPage();
  const welcomeMessage = screen.getByText(/Welcome, Test User!/i);
  expect(welcomeMessage).toBeInTheDocument();
});

test('renders recent activity', () => {
  renderDashboardPage();
  const activityMessage = screen.getByText(/User Test User logged in./i);
  expect(activityMessage).toBeInTheDocument();
});
