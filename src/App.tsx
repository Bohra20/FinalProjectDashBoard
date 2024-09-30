// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './services/authProvider';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />}  />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

// interface PrivateRouteProps {
//   path: string;
//   element: React.ReactNode;
//   isAuthenticated: boolean;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAuthenticated }) => {
//   return isAuthenticated ? (
//     <React.Fragment>{element}</React.Fragment>
//   ) : (
//     <Navigate to="/signin" replace={true} />
//   );
// };

export default App;
