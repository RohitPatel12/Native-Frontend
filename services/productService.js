import axios from 'axios';
const API_BASE = 'https://your-api-gateway.com/products';

export const getProductsByZodiac = async (zodiac, token) => {
  const response = await axios.get(`${API_BASE}?zodiac=${zodiac}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
