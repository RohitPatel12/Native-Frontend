import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const ProfileSetupScreen = ({ navigation }) => {
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  const handleSave = () => {
    // TODO: Save details to backend
    console.log("Saved:", birthDate, gender);
    navigation.replace("Home"); // Go to main app
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Birth Date (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* 🔹 Skip option */}
      <TouchableOpacity onPress={() => navigation.replace("Home")}>
        <Text style={styles.link}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSetupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: { textAlign: "center", color: "#007AFF", marginTop: 20 },
});
