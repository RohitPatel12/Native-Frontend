import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { signup } from "../services/authService";
import { UserContext } from "../context/UserContext";

const RegisterScreen = ({ navigation }) => {
  const { setUser, setToken } = useContext(UserContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleRegister = async () => {
    console.log("➡️ handleRegister called with form:", form);

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      console.log("➡️ Calling signup API...");
      const data = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      console.log("✅ Signup API returned:", data);

      if (!data?.token) {
        throw new Error("Invalid response from server");
      }

      // Save user & token in context
      setUser(data.user);
      setToken(data.token);

      setLoading(false);

      // Navigate to ProfileSetup
      navigation.replace("ProfileSetup");
    } catch (err) {
      setLoading(false);

      console.error("❌ Registration failed:", err);

      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Check your connection or API.";

      Alert.alert("Registration Failed", message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8, alignItems: "center", marginVertical: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: { textAlign: "center", color: "#007AFF", marginTop: 10 },
});
