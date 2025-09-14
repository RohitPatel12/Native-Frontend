import axios from "axios";

const API_BASE_URL = "http://localhost:8081"; // Gateway URL

// ✅ Signup / Register
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data; // contains { message: "✅ Registration successful" }
  } catch (error) {
    console.error("Signup error:", error.response || error);
    throw error.response?.data || { message: "Signup failed" };
  }
};

// ✅ Login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data; // contains { message, token, refreshToken }
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw error.response?.data || { message: "Login failed" };
  }
};

// ✅ Refresh token
export const refreshToken = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/refresh`, { refreshToken: token });
    return response.data;
  } catch (error) {
    console.error("Refresh token error:", error.response || error);
    throw error.response?.data || { message: "Token refresh failed" };
  }
};