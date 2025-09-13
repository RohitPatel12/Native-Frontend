// src/components/Header.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Header({ title, rightIcons = [] }) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>{title}</Text>
      <View style={styles.headerIcons}>
        {rightIcons.map((icon, index) => (
          <TouchableOpacity key={index} onPress={icon.onPress}>
            <Ionicons name={icon.name} size={24} color="white" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#111",
  },
  logo: { color: "white", fontSize: 20, fontWeight: "bold" },
  headerIcons: { flexDirection: "row" },
});
