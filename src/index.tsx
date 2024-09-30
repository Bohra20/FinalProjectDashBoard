import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import './index.css'; 
import { Provider } from 'react-redux';
import { AuthProvider } from './services/authProvider';

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider >,
  document.getElementById('root')
);
