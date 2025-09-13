// src/cards/ProductCard.js
import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "../context/UserContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(UserContext);

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart(product)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    padding: 10,
    backgroundColor: "#111",
    borderRadius: 10,
    alignItems: "center",
  },
  image: { width: "100%", height: 180, borderRadius: 8 },
  name: { color: "#fff", fontSize: 16, marginTop: 6 },
  price: { color: "gray", fontSize: 14, marginVertical: 4 },
  button: {
    backgroundColor: "#6a0dad",
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
    width: "100%",
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
