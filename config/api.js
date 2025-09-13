// config/api.js
import axios from "axios";
import { Platform } from "react-native";

// 👇 Replace this with your actual PC's IP
const LAN_IP = "192.168.1.3"; 
const PORT = "8080";

// Expo Web → localhost works fine
// Expo Go (Android/iOS) → use LAN IP
const baseURL =
  Platform.OS === "web"
    ? `http://localhost:${PORT}`
    : `http://${LAN_IP}:${PORT}`;

export const API = axios.create({
  baseURL,
  timeout: 10000,
});
