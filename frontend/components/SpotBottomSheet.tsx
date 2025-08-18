import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { Spot } from "@/types";

export interface SpotBottomSheetRef {
  open: (spot: Spot) => void;
  close: () => void;
}

const SpotBottomSheet = forwardRef<SpotBottomSheetRef>((_, ref) => {
  const [spot, setSpot] = useState<Spot | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: (spotData: Spot) => {
      setSpot(spotData);
      setIsVisible(true);
    },
    close: () => {
      setIsVisible(false);
      setSpot(null);
    },
  }));

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      swipeDirection="down"
      onSwipeComplete={() => setIsVisible(false)}
      style={styles.modal}
    >
      <View style={styles.sheet}>
        {/* Drag handle */}
        <View style={styles.dragHandle} />

        {spot ? (
          <>
            <Text style={styles.title}>{spot.name}</Text>

            {spot.image_url ? (
              <Image
                source={{ uri: spot.image_url[0] }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.noImage}>No image available</Text>
            )}

            <Text style={styles.subtitle}>Criteria:</Text>
            <FlatList
              data={spot.criteria}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Text style={styles.criteria}>{item.attribute}</Text>
              )}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          </>
        ) : (
          <Text style={styles.noSpot}>No spot selected</Text>
        )}
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
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
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, fontWeight: "600", marginTop: 12, marginBottom: 6 },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 8 },
  criteria: { fontSize: 14, marginVertical: 2 },
  noSpot: { textAlign: "center", color: "#666", marginVertical: 20 },
  noImage: { color: "#999", marginBottom: 8 },
});

export default SpotBottomSheet;
