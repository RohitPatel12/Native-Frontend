// src/components/FeaturedProduct.js
import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "../context/UserContext";

export default function FeaturedProduct({ product }) {
  const { addToCart } = useContext(UserContext);
  if (!product) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
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
  container: {
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  image: { width: "95%", height: 220, borderRadius: 10 },
  title: { color: "white", fontSize: 18, fontWeight: "600", marginTop: 8 },
  price: { color: "gray", fontSize: 16, marginVertical: 4 },
  button: {
    backgroundColor: "#6a0dad",
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
    width: "95%",
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
