// src/app/middleware.ts
import { Middleware } from 'redux';
import { RootState } from './store';
import { clearUser } from './authSlice';
import { Navigate, NavigateProps } from 'react-router-dom';

const authMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: any) => {
  // You might want to provide a more specific type for 'action' based on your action creators

  if (action.type === 'auth/clearUser') {
    // Add logic to clear user data from localStorage or cookies if needed
    // Redirect to the sign-in page using Navigate
    const navigateProps: NavigateProps = { to: '/signin' };
    return Navigate(navigateProps);
  }

  return next(action);
};

export default authMiddleware;
