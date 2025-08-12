import React, { useRef, useState, useEffect } from "react";
import { View, Keyboard } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import SearchSuggestions from "./SearchSuggestions";
import SearchBarWithFilter from "./SearchFilter";

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
  const [filteredCriteria, setFilteredCriteria] = useState<Criteria[]>(criteria);

  const mapRef = useRef<MapView>(null);

  // Filtering function that considers both search and selected criteria
  const filterSpots = (query: string, selectedCriteria: Criteria[]) => {
    let filtered = spots;

    // Filter by name search
    if (query.trim() !== "") {
      filtered = filtered.filter((spot) =>
        spot.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by criteria
    if (selectedCriteria.length > 0) {
      const selectedIds = selectedCriteria.map((c) => c.id);
      filtered = filtered.filter((spot) =>
        selectedIds.every(id => spot.criteria.some(c => c.id === id))
      );
    }

    return filtered;
  };

  // Call filterSpots when searchQuery or filteredCriteria changes
  useEffect(() => {
    const filtered = filterSpots(searchQuery, filteredCriteria);
    setFilteredSpots(filtered);
  }, [searchQuery, filteredCriteria]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const toggleTag = (id: number) => {
    setFilteredCriteria((prev) =>
      prev.some((t) => t.id === id)
        ? prev.filter((t) => t.id !== id)
        : [...prev, criteria.find((c) => c.id === id)!]
    );
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
      <SearchBarWithFilter
        value={searchQuery}
        onChangeText={handleSearchChange}
        criteria={criteria}
        selectedCriteria={filteredCriteria.map((c) => c.id)}
        onToggleCriteria={toggleTag}
      />
      <SearchSuggestions
        suggestions={
          searchQuery.trim() === "" || filteredSpots.length === 0
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
