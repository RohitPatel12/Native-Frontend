import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmptyState({ message = "No products found" }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
  },
});
