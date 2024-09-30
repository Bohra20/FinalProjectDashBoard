// src/services/authService.ts
import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export const authService = {
  signIn: async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },
  signUp: async (userData: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },
};

// src/services/dataService.ts
// Implement data service methods similarly
