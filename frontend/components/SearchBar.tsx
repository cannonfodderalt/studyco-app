import React from "react";
import { TextInput, StyleSheet, Platform } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search spots by name..."
      value={value}
      onChangeText={onChangeText}
      returnKeyType="search"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
