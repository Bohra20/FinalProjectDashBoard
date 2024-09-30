// useAuth.ts
import { useContext } from 'react';
import { AuthContext } from './authContext'; // Adjust the path accordingly

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
