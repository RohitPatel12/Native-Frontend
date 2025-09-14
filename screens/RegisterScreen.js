// screens/RegisterScreen.js
import React, { useState } from "react";
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

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    console.log("➡️ handleRegister called with form:", form);

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      Alert.alert("⚠️ Missing Fields", "Please fill in all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("⚠️ Password Mismatch", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      console.log("➡️ Calling signup API...");
      const res = await signup(form);

      console.log("✅ Signup success:", res);
      Alert.alert("🎉 Success", res.message || "Registration successful");

      navigation.navigate("Login");
    } catch (err) {
      console.error("❌ Registration failed:", err.message);
      Alert.alert("❌ Registration Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(v) => handleChange("name", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(v) => handleChange("password", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={(v) => handleChange("confirmPassword", v)}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "blue",
    textAlign: "center",
  },
});
