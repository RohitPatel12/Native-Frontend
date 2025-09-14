// config/api.js
import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

// ✅ Extract values from Expo extra
const { API_URL_ANDROID, API_URL_IOS, API_URL_WEB } =
  Constants.expoConfig.extra;

const baseURL =
  Platform.OS === "android"
    ? API_URL_ANDROID
    : Platform.OS === "ios"
    ? API_URL_IOS
    : API_URL_WEB;

console.log(`🌍 Using API baseURL: ${baseURL} (Platform: ${Platform.OS})`);

// Create axios instance
const API = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// --- Interceptors ---
API.interceptors.request.use(
  async (req) => {
    // 🔹 if you add auth later
    // const token = await SecureStore.getItemAsync("token");
    // if (token) req.headers.Authorization = `Bearer ${token}`;
    console.log("➡️ API Request:", req.method?.toUpperCase(), req.url, req.data || req.params);
    return req;
  },
  (err) => Promise.reject(err)
);

API.interceptors.response.use(
  (res) => {
    console.log("✅ API Response:", res.status, res.data);
    return res;
  },
  (err) => {
    console.error("❌ API Error:", err.response?.status, err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default API;
