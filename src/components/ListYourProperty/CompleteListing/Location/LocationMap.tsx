/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { Location } from "./Location";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Set default marker icon
const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  locationDetails: Location;
  setLocationDetails: React.Dispatch<React.SetStateAction<Location>>;
  mapPosition: [number, number];
}

// Map click event to update marker and fetch details
const LocationMarker = ({
  onMapClick,
}: {
  onMapClick: (lat: number, lon: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Search Input Component
import { useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface SearchInputProps {
  onSearchLocation: (lat: number, lon: number) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchLocation }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced function to fetch suggestions
  const fetchSuggestions = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: searchTerm,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
          }
        );

        setSuggestions(response.data);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setError("Failed to fetch suggestions.");
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Effect to fetch suggestions when query changes
  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    const lat = parseFloat(suggestion.lat);
    const lon = parseFloat(suggestion.lon);
    onSearchLocation(lat, lon);
    setQuery(suggestion.display_name);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <input
        type="text"
        placeholder="Search location (e.g. Kathmandu)"
        className="border p-2 rounded"
        value={query}
        onChange={handleInputChange}
      />
      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border mt-1 rounded-md max-h-60 overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const MapComponent: React.FC<MapComponentProps> = ({
  locationDetails,
  setLocationDetails,
  mapPosition,
}) => {
  const [center, setCenter] = useState<[number, number]>(mapPosition);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    mapPosition
  );
  const markerRef = useRef<L.Marker | null>(null);

  const fetchLocationDetails = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat,
            lon,
            format: "json",
            addressdetails: 1,
          },
        }
      );
      const address = response.data.address;
      setLocationDetails({
        city: address.city || address.town || address.village || "",
        streetName: address.road || "",
        streetNo: parseInt(address.house_number) || 0,
        country: address.country || "",
        postalCode: address.postcode || "",
        chowk: address.suburb || address.neighbourhood || "",
        latitude: parseFloat(lat.toFixed(4)),
        longitude: parseFloat(lon.toFixed(4)),
      });
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  const handleSearchLocation = (lat: number, lon: number) => {
    setCenter([lat, lon]);
    setMarkerPosition([lat, lon]);
    fetchLocationDetails(lat, lon);
  };

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [markerPosition]);

  return (
    <div className="map-container relative w-full">
      <div className="absolute top-2 right-2 z-10 border-red-900 min-w-[300px]">
        <SearchInput onSearchLocation={handleSearchLocation} />
      </div>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "15rem", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onMapClick={handleSearchLocation} />

        {markerPosition && (
          <Marker
            position={markerPosition}
            ref={(ref) => (markerRef.current = ref)}
          >
            <Popup autoPan={true}>
              <div className="flex flex-col gap-1 text-sm">
                <h3 className="font-bold">Location Details</h3>
                <div>City: {locationDetails.city}</div>
                <div>Street Name: {locationDetails.streetName}</div>
                <div>Street No: {locationDetails.streetNo}</div>
                <div>Country: {locationDetails.country}</div>
                <div>Postal Code: {locationDetails.postalCode}</div>
                <div>Chowk: {locationDetails.chowk}</div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
