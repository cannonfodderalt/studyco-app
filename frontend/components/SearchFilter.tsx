import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { IconSymbol } from "@/components/ui/IconSymbol"; // adjust path

interface Criteria {
  id: number;
  attribute: string;
}

interface SearchBarWithFilterProps {
  value: string;
  onChangeText: (text: string) => void;
  criteria: Criteria[];
  selectedCriteria: number[];
  onToggleCriteria: (id: number) => void;
}

export default function SearchBarWithFilter({
  value,
  onChangeText,
  criteria,
  selectedCriteria,
  onToggleCriteria,
}: SearchBarWithFilterProps) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search spots..."
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterVisible(true)}
        >
          <IconSymbol name="line.horizontal.3.decrease" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isFilterVisible}
        onBackdropPress={() => setIsFilterVisible(false)}
        style={styles.modal}
        swipeDirection="down"
        onSwipeComplete={() => setIsFilterVisible(false)}
      >
        <View style={styles.sheet}>
            
          <View style={styles.dragHandle} />

          <FlatList
            data={criteria}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.criteriaList}
            renderItem={({ item }) => {
              const selected = selectedCriteria.includes(item.id);
              return (
                <TouchableOpacity
                  onPress={() => onToggleCriteria(item.id)}
                  style={[styles.tag, selected && styles.tagSelected]}
                >
                  <Text style={[styles.tagText, selected && styles.tagTextSelected]}>
                    {item.attribute}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setIsFilterVisible(false)}
          >
            <Text style={styles.applyText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 10,
    right: 10,
    zIndex: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  filterButton: {
    paddingLeft: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheet: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "60%",
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 12,
  },
  criteriaList: {
    justifyContent: "center",
  },
  tag: {
    backgroundColor: "#eee",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 6,
    flex: 1,
    alignItems: "center",
  },
  tagSelected: {
    backgroundColor: "#007AFF",
  },
  tagText: {
    color: "#333",
  },
  tagTextSelected: {
    color: "white",
  },
  applyButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  applyText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
