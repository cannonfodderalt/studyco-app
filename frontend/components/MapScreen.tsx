import React, { useRef, useState } from "react";
import { View, Keyboard } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import SearchBar from "./SearchBar";
import SearchSuggestions from "./SearchSuggestions";

interface Spot {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  criteria: Criteria[];
}

interface Criteria {
    id: number;
    attribute: string;
}

interface MapScreenProps {
  spots: Spot[];
  criteria: Criteria[];
}

export default function MapScreen({ spots, criteria }: MapScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSpots, setFilteredSpots] = useState<Spot[]>(spots);
  const [criteriaList, setCriteria] = useState<Criteria[]>(criteria);

  const mapRef = useRef<MapView>(null);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);

    if (text.trim() === "") {
      setFilteredSpots(spots);
      return;
    }

    const filtered = spots.filter((spot) =>
      spot.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSpots(filtered);
  };

  const handleSelectSuggestion = (spot: Spot) => {
    setSearchQuery(spot.name);
    setFilteredSpots([spot]);

    const region: Region = {
      latitude: spot.latitude,
      longitude: spot.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current?.animateToRegion(region, 1000);
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar value={searchQuery} onChangeText={handleSearchChange} />
      <SearchSuggestions
        suggestions={
          searchQuery.trim() === "" || filteredSpots.length === 1
            ? []
            : filteredSpots
        }
        onSelect={handleSelectSuggestion}
      />
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
        {filteredSpots.map((spot) => (
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
