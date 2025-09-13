import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { UserContext } from "../context/UserContext";

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useContext(UserContext);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>{item.title}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item._id)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <TouchableOpacity style={styles.checkoutBtn} onPress={clearCart}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#000" },
  emptyText: { color: "#fff", textAlign: "center", marginTop: 50 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    padding: 12,
    backgroundColor: "#111",
    borderRadius: 8,
  },
  itemText: { color: "#fff" },
  remove: { color: "red" },
  checkoutBtn: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#6a0dad",
    borderRadius: 8,
  },
  checkoutText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
