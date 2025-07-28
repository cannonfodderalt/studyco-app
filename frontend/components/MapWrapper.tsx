import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import MapScreen from "./MapScreen";

const API_URL = "http://192.168.68.161:8000/spots/";

export default function MapWrapper() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setSpots(data);
      } catch (err) {
        console.error("Failed to fetch spots:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <MapScreen spots={spots} />;
}
