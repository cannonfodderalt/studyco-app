import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
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
      style={styles.modal}
    >
      <View style={styles.container}>
        {spot ? (
          <>
            <Text style={styles.title}>{spot.name}</Text>
            {spot.image_url ? (
              <Image
                source={{ uri: spot.image_url }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <Text>No image available</Text>
            )}
            <Text style={styles.subtitle}>Criteria:</Text>
            <FlatList
              data={spot.criteria}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Text style={styles.criteria}>{item.attribute}</Text>
              )}
            />
          </>
        ) : (
          <Text>No spot selected</Text>
        )}

        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "60%",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, fontWeight: "600", marginTop: 12 },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 8 },
  criteria: { fontSize: 14, marginVertical: 2 },
  close: {
    textAlign: "center",
    padding: 10,
    color: "blue",
    marginTop: 10,
  },
  
});

export default SpotBottomSheet;
