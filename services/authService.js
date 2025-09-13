import { API } from "../config/api";

export const signup = async (data) => {
  try {
    const response = await API.post("/register", data);
    return response.data;
  } catch (err) {
    // Extra debug info
    console.error("🔥 Signup failed:", err.response?.data || err.message);
    throw err; // rethrow so your component can catch it
  }
};

export const login = async (email, password) => {
  try {
    const response = await API.post("/login", { email, password });
    return response.data;
  } catch (err) {
    console.error("🔥 Login failed:", err.response?.data || err.message);
    throw err;
  }
};
