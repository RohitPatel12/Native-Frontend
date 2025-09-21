// src/cards/ProductCard.js
import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

export default function ProductCard({ product }) {
  const navigation = useNavigation();
  const { addToCart } = useContext(UserContext);

  const imageSource = product.imageUrl
    ? { uri: product.imageUrl }
    : require("../assets/placeholder.jpg");

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductScreen", { product })}
    >
      {/* Product Image */}
      <Image source={imageSource} style={styles.image} resizeMode="cover" />

      {/* Info */}
      <View style={styles.infoWrapper}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>₹{product.price}</Text>
      </View>

      {/* Add to Cart button */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => addToCart(product)}
      >
        <Text style={styles.cartButtonText}>+ Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#111",
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3, // for Android shadow
  },
  image: {
    width: "100%",
    height: 120,
  },
  infoWrapper: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  price: {
    fontSize: 13,
    color: "limegreen",
    marginTop: 4,
  },
  cartButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 6,
    alignItems: "center",
    margin: 8,
    borderRadius: 8,
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
