import axios from 'axios';
const API_BASE = 'https://your-api-gateway.com/personalized';

export const getPersonalizedFeed = async (userId, token) => {
  const response = await axios.get(`${API_BASE}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
