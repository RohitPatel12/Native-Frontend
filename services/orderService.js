import axios from 'axios';
const API_BASE = 'https://your-api-gateway.com/orders';

export const createOrder = async (orderData, token) => {
  const response = await axios.post(`${API_BASE}`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserOrders = async (userId, token) => {
  const response = await axios.get(`${API_BASE}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
