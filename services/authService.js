import axios from 'axios';
const API_BASE = 'http://localhost:8080/auth/';

export const signup = async (data) => {
  const response = await axios.post(`${API_BASE}/register`, data);
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE}/login`, { email, password });
  return response.data; // returns JWT + user info
};

export const getUserProfile = async (userId, token) => {
  const response = await axios.get(`${API_BASE}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
