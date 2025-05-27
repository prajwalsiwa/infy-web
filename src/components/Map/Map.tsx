import { LatLngExpression, LatLng } from "leaflet";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { Button } from "../ui/button";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  mapPosition: LatLngExpression;
  setAttractions: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
        distance: number | string;
        latitude: number;
        longitude: number;
      }[]
    >
  >;
}

const Map = ({ mapPosition, setAttractions }: MapProps) => {
  const [popupPosition, setPopupPosition] = useState<LatLngExpression | null>(
    null
  );
  const [popupContent, setPopupContent] = useState<React.ReactNode>(null);

  // Function to fetch nearby places using Nominatim API
  const fetchPlace = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
      );
      const data = await response.json();
      return data.display_name || "Unknown Place";
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      return "Error fetching data.";
    }
  };

  // Function to calculate distance in kilometers
  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number => {
    const pointA = new LatLng(lat1, lng1);
    const pointB = new LatLng(lat2, lng2);
    return pointA.distanceTo(pointB) / 1000; // Distance in kilometers
  };

  // Component to handle map click events
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPopupPosition([lat, lng]);

        // Fetch nearby place
        const nearbyPlace = await fetchPlace(lat, lng);

        // Calculate the distance from the marker's position to the clicked position
        const distance = calculateDistance(
          (mapPosition as [number, number])[0],
          (mapPosition as [number, number])[1],
          lat,
          lng
        );

        // Update the popup content with the place name and distance
        setPopupContent(
          <div>
            <span className="text-[1rem] font-medium text-primary-dark">
              {nearbyPlace.split(",")[0]}
            </span>
            <p className="text-sm text-gray-500">
              {distance.toFixed(2)} km distance from your place
            </p>
            <Button
              className="bg-grey-200 w-full text-gray-dark"
              onClick={() => {
                // Add to the attractions list
                setAttractions((prevAttractions) => [
                  ...prevAttractions,
                  {
                    id: prevAttractions.length + 1, // Generate a unique ID
                    name: nearbyPlace.split(",")[0],
                    distance: parseFloat(distance.toFixed(2)),
                    latitude: parseFloat(lat.toFixed(3)),
                    longitude: parseFloat(lng.toFixed(3)),
                  },
                ]);
              }}
            >
              Add to the List
            </Button>
          </div>
        );
      },
    });

    return null;
  };

  return (
    <section className="section bg-background">
      <MapContainer
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
        zoomControl={true}
        doubleClickZoom={true}
        style={{
          height: 400,
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Add the click handler to the map */}
        <MapClickHandler />

        {/* Marker at the initial map position */}
        <Marker position={mapPosition}>
          <Popup>Your current position</Popup>
        </Marker>

        {/* Show the popup on click */}
        {popupPosition && (
          <>
            <Popup position={popupPosition}>{popupContent}</Popup>
            <Circle
              center={popupPosition}
              radius={800} // 800 meters
              pathOptions={{ color: "blue", fillOpacity: 0.2 }}
            />
          </>
        )}
      </MapContainer>
    </section>
  );
};

export default Map;
