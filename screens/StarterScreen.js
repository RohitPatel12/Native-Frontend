// src/screens/StarterScreen.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { login } from "../services/authService"; // ✅ import API

const { width } = Dimensions.get("window");
const isDesktop = width > 800;

const zodiacSigns = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];
  
export default function StarterScreen() {
  const navigation = useNavigation();
  const { setUser, setToken } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert("Error", "Enter email & password");
    if (!selectedZodiac) return Alert.alert("Error", "Select zodiac sign");

    try {
      setLoading(true);
      const data = await login(email, password);

      // backend should return { token, user }
      if (!data?.token) throw new Error("Invalid response from server");

      // save in context
      setUser({ ...data.user, zodiac: selectedZodiac });
      setToken(data.token);

      setLoading(false);
      navigation.replace("Home");
    } catch (err) {
      console.error("Login failed:", err);
      setLoading(false);
      Alert.alert("Login Failed", err.response?.data?.message || err.message || "Try again");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to AstroLux</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />


      <Text style={styles.sectionTitle}>Select your Zodiac</Text>
      <View style={styles.zodiacWrapper}>
        {zodiacSigns.map(sign => (
          <TouchableOpacity
            key={sign}
            onPress={() => setSelectedZodiac(sign)}
            style={[styles.zodiacChip, selectedZodiac === sign && styles.selectedZodiac]}
          >
            <Text style={[styles.zodiacText, selectedZodiac === sign && styles.selectedZodiacText]}>{sign}</Text>
          </TouchableOpacity>
        
        ))}
        
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginText}>Login</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>New here? Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center", padding: 20 },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 30 },
  input: { width: isDesktop ? 400 : "100%", padding: 12, backgroundColor: "#111", borderRadius: 8, color: "#fff", marginBottom: 15 },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "600", marginTop: 20 },
  zodiacWrapper: { flexDirection: "row", flexWrap: "wrap", marginVertical: 10, justifyContent: "center" },
  zodiacChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: "#888", margin: 4 },
  selectedZodiac: { backgroundColor: "#6a0dad", borderColor: "#6a0dad" },
  zodiacText: { color: "#fff" },
  selectedZodiacText: { color: "#fff", fontWeight: "bold" },
  loginBtn: { backgroundColor: "#ff8c00", padding: 15, borderRadius: 10, width: isDesktop ? 400 : "100%", alignItems: "center", marginTop: 20 },
  loginText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  link: {
  color: "#ff8c00",   // orange so it’s visible on black bg
  marginTop: 15,
  fontSize: 16,
  fontWeight: "600",
  textAlign: "center",
},

});
