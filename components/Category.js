import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const categories = ["All", "Music", "Gaming", "News", "Sports", "Tanmay Bhat"];

export default function CategoryTabs() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ paddingVertical: 10, backgroundColor: "#111" }}
    >
      {categories.map((cat, index) => (
        <TouchableOpacity
          key={index}
          style={{
            backgroundColor: index === 0 ? "white" : "#333",
            marginHorizontal: 8,
            paddingHorizontal: 15,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: index === 0 ? "black" : "white",
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
