// src/services/dataService.ts
import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export const dataService = {
  getUserList: async (page: number = 1) => {
    const response = await axios.get(`${API_URL}/users?page=${page}`);
    return response.data;
  },
  getUserDetails: async (userId: number) => {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  },
  // Add more methods for other data-related operations
};
