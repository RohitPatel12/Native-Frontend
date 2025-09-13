// src/components/CategoryChip.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CategoryChip({ label, onPress, selected }) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selected]}
      onPress={onPress}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#222",
    marginHorizontal: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  selected: {
    backgroundColor: "#ff8c00",
  },
  text: { color: "white", fontSize: 14 },
});
