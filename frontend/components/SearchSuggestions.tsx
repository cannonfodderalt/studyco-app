import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { Spot } from "@/types";


interface SuggestionsListProps {
  suggestions: Spot[];
  onSelect: (spot: Spot) => void;
}

export default function SearchSuggestions({suggestions, onSelect,}: SuggestionsListProps) {
  if (suggestions.length === 0) return null;

  return (
    <FlatList
      data={suggestions}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => onSelect(item)}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    position: "absolute",
    top: Platform.OS === "ios" ? 100 : 80,
    left: 10,
    right: 10,
    maxHeight: 200,
    backgroundColor: "white",
    borderRadius: 8,
    zIndex: 3,
  },
  item: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
