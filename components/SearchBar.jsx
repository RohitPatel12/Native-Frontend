import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";

export default function SearchBar({
  query,
  setQuery,
  suggestions = [],
  onSelectSuggestion,
  placeholder = "Search products...",
}) {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Debounce search to improve performance
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query) {
        setFilteredSuggestions([]);
        return;
      }
      const filtered = suggestions.filter(
        (item) => item?.name?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }, 200); // 200ms debounce

    return () => clearTimeout(handler);
  }, [query, suggestions]);

  const handleSelect = (item) => {
    if (onSelectSuggestion) onSelectSuggestion(item);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          setShowSuggestions(true);
        }}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        autoFocus
      />

      {showSuggestions && (
        <FlatList
          style={styles.suggestions}
          data={filteredSuggestions}
          keyExtractor={(item, index) => (item._id || item.id || index).toString()}
          ListEmptyComponent={() =>
            query ? <Text style={styles.noResults}>No results found</Text> : null
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>{item?.name || "Unnamed Product"}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#111", borderRadius: 8, padding: 5 },
  input: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
  },
  suggestions: { marginTop: 5, maxHeight: 250 },
  suggestionItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#333" },
  suggestionText: { color: "#fff" },
  noResults: { padding: 10, color: "#aaa", fontStyle: "italic" },
});
