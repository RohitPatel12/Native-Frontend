import React, { useState, useContext, useRef , useMemo } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";
import CategoryChip from "../components/CategoryChip";
import ProductCard from "../cards/ProductCard";
import FeaturedProduct from "../components/FeaturedProduct";
import SearchBar from "../components/SearchBar";
import { useProductSearch } from "../hooks/useProductSearch";

const { width } = Dimensions.get("window");
const isDesktop = width > 800;

export default function HomeScreen() {
  const { addToCart } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;

  // Fetch products from hook
  const { products, loading } = useProductSearch(query);

  const categories = [
    "All","Aries","Taurus","Gemini","Cancer","Leo","Virgo",
    "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
  ];

  // Filter products by category
 const filteredProducts = useMemo(() => {
  return selectedCategory === "All"
    ? products
    : products.filter((p) => p.category?.includes(selectedCategory));
}, [products, selectedCategory]);
  const featured = filteredProducts[0];
  const remainingProducts = filteredProducts.slice(1);

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

  const handleSelectSuggestion = (product) => {
    navigation.navigate("ProductScreen", { productId: product._id || product.id });
    setShowSearch(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Header
        title="AstroLux"
        rightIcons={[
          { name: "search-outline", onPress: () => setShowSearch((s) => !s) },
          { name: "person-outline", onPress: () => {} },
          { name: "cart-outline", onPress: () => {} },
        ]}
      />

      {/* 🔎 Search Overlay */}
      {showSearch && (
        <View style={styles.searchOverlay}>
          <SearchBar
            query={query}
            setQuery={setQuery}
            suggestions={products}
            onSelectSuggestion={handleSelectSuggestion}
          />
        </View>
      )}

      {/* Categories */}
      <Animated.View
        style={[
          styles.categoriesWrapper,
          { opacity: categoryOpacity, transform: [{ translateY: categoryTranslate }] },
        ]}
      >
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <CategoryChip
              label={item}
              selected={item === selectedCategory}
              onPress={() => setSelectedCategory(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>

      {/* Loading & fallback */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={{ color: "#fff", marginTop: 8 }}>Loading products...</Text>
        </View>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: "#aaa", fontSize: 18 }}>No products available</Text>
        </View>
      ) : (
        <Animated.FlatList
          data={remainingProducts}
          keyExtractor={(item, index) => (item._id || item.id || `product-${index}`).toString()}
          numColumns={isDesktop ? 4 : 2}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          ListHeaderComponent={
            <>
              {featured && (
                <FeaturedProduct
                  key={`featured-${featured._id || featured.id}`}
                  product={featured}
                />
              )}
            </>
          }
          renderItem={({ item }) => <ProductCard product={item} onAddToCart={addToCart} />}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 60,
            paddingTop: 10,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  categoriesWrapper: {
    paddingVertical: 10,
    backgroundColor: "#000",
    zIndex: 10,
    position: "absolute",
    top: 60,
    width: "100%",
  },
  searchOverlay: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#111",
    padding: 10,
    zIndex: 20,
  },
});
