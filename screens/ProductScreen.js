// src/screens/ProductScreen.js
import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { UserContext } from "../context/UserContext";

export default function ProductScreen({ route }) {
  const { product } = route.params;
  const { addToCart } = useContext(UserContext);

  // Placeholder if no image is provided
  const imageSource = product.imageUrl
    ? { uri: product.imageUrl }
    : { uri: "https://via.placeholder.com/400x300?text=No+Image" };

  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <Image source={imageSource} style={styles.image} resizeMode="cover" />

      {/* Product Info */}
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
        <Text style={styles.zodiac}>
          Zodiac: {product.zodiacTags?.join(", ") || "General"}
        </Text>

        {/* Add to Cart */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(product)}
        >
          <Text style={styles.addButtonText}>🛒 Add to Cart</Text>
        </TouchableOpacity>

        {/* Description (optional) */}
        {product.description && (
          <Text style={styles.description}>{product.description}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // match HomeScreen theme
  },
  image: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  infoWrapper: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "limegreen",
    marginBottom: 8,
  },
  zodiac: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#ff8c00",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    fontSize: 15,
    color: "#ddd",
    lineHeight: 22,
  },
});
