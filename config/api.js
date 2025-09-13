import axios from "axios";
import { Platform } from "react-native";

// Your environment/config
const LAN_IP = "192.168.1.3";
const PORT = "8080";
const API_BASE = "http://localhost:8080/api"; // fallback

const baseURL =
  API_BASE || (Platform.OS === "web" ? `http://localhost:${PORT}/api` : `http://${LAN_IP}:${PORT}/api`);

export const API = axios.create({
  baseURL,
  timeout: 10000,
});

// Optional: add interceptors for better logging
API.interceptors.request.use((req) => {
  console.log("➡️ API Request:", req.method.toUpperCase(), req.url, req.data || req.params);
  return req;
});

API.interceptors.response.use(
  (res) => {
    console.log("✅ API Response:", res.status, res.data);
    return res;
  },
  (err) => {
    console.error(
      "❌ API Error:",
      err.response?.status,
      err.response?.data || err.message,
      err.config?.url
    );
    return Promise.reject(err);
  }
);
