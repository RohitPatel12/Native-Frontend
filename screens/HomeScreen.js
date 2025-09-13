// src/screens/HomeScreen.js
import React, { useState, useContext, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContext } from "../context/UserContext";

import Header from "../components/Header";
import CategoryChip from "../components/CategoryChip";
import ProductCard from "../cards/ProductCard";
import FeaturedProduct from "../components/FeaturedProduct";

const { width } = Dimensions.get("window");
const isDesktop = width > 800;

export default function HomeScreen() {
  const { addToCart } = useContext(UserContext);
  const insets = useSafeAreaInsets();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const scrollY = useRef(new Animated.Value(0)).current;

  // Placeholder product data
  const products = Array.from({ length: 12 }, (_, i) => ({
    _id: `prod-${i}`,
    name: `Product ${i + 1}`,
    price: (i + 1) * 100,
    zodiacTags: ["Aries", "Leo", "Sagittarius"],
    imageUrl: "https://via.placeholder.com/150",
  }));

  const categories = [
    "All","Aries","Taurus","Gemini","Cancer","Leo","Virgo",
    "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.zodiacTags.includes(selectedCategory));

  // Animate category visibility
  const categoryOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const categoryTranslate = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -30],
    extrapolate: "clamp",
  });

  const renderCategory = ({ item }) => (
    <CategoryChip
      label={item}
      selected={item === selectedCategory}
      onPress={() => setSelectedCategory(item)}
    />
  );

  const featured = filteredProducts[0];
  const remainingProducts = filteredProducts.slice(1);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Header
        title="AstroLux"
        rightIcons={[
          { name: "search-outline", onPress: () => {} },
          { name: "person-outline", onPress: () => {} },
          { name: "cart-outline", onPress: () => {} },
        ]}
      />

      {/* Animated Sticky Categories */}
      <Animated.View
        style={[
          styles.categoriesWrapper,
          {
            opacity: categoryOpacity,
            transform: [{ translateY: categoryTranslate }],
          },
        ]}
      >
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item}
          renderItem={renderCategory}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>

      <Animated.FlatList
        data={remainingProducts}
        keyExtractor={(item) => item._id}
        numColumns={isDesktop ? 4 : 2}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <>
            {/* Featured Banner */}
            {featured && <FeaturedProduct product={featured} />}

            {/* Offer Tab */}
            <View style={styles.offerWrapper}>
              <Text style={styles.offerText}>🔥 Today's Offers 🔥</Text>
              <FlatList
                data={remainingProducts.slice(0, 4)}
                horizontal
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <ProductCard product={item} onAddToCart={addToCart} />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <ProductCard product={item} onAddToCart={addToCart} />
        )}
        contentContainerStyle={{ paddingBottom: insets.bottom + 60, paddingTop: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },
  categoriesWrapper: {
    paddingVertical: 10,
    backgroundColor: "#000",
    zIndex: 10,
    position: "absolute",
    top: 60, // Below header
    width: "100%",
  },
  offerWrapper: { marginVertical: 10 },
  offerText: { color: "#ff8c00", fontSize: 18, fontWeight: "bold", marginLeft: 10, marginBottom: 6 },
});
