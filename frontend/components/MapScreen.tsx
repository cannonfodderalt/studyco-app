import React, { useEffect, useState, useRef } from "react";
import { View, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Spot {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

interface MapScreenProps {
  spots: Spot[];
}

export default function MapScreen({ spots }: MapScreenProps) {
  const mapRef = useRef<MapView>(null);
  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 49.2642,
          longitude: -123.2484,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{
              latitude: spot.latitude,
              longitude: spot.longitude,
            }}
            title={spot.name}
          />
        ))}
      </MapView>
    </View>
  );
}
