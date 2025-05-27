/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./tooltipMarker.css";
import { useEffect } from "react";
import MapViewHotelCard from "@/routes/MapViewHotelCard";

// Custom tooltip marker icon
const createTooltipIcon = (label: string) =>
  L.divIcon({
    html: `
      <div class="tooltip-marker">
       Rs ${label}
        <div class="tooltip-arrow"></div>
      </div>
    `,
    className: "",
    iconSize: [60, 46],
    iconAnchor: [30, 46],
    popupAnchor: [0, -46],
  });

// FitBounds component
const FitBounds = ({ locations }: { locations: any[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!locations || locations.length === 0) return;

    const validCoords = locations.filter(
      (loc) => loc.latitude != null && loc.longitude != null
    );

    if (validCoords.length === 0) return;

    const bounds = L.latLngBounds(
      validCoords.map((loc) => [loc.latitude, loc.longitude])
    );

    map.fitBounds(bounds, {
      paddingTopLeft: [300, 50], // adjust for sidebar
      paddingBottomRight: [50, 50],
    });
  }, [locations, map]);

  return null;
};

const MultiMarkerMap = ({ staysCardList }: { staysCardList: any[] }) => {
  if (!staysCardList || staysCardList.length === 0) {
    return <div>Loading map...</div>;
  }

  const validLocations = staysCardList.filter(
    (loc) => loc.latitude != null && loc.longitude != null
  );

  if (validLocations.length === 0) {
    return <div>No valid locations to display.</div>;
  }

  return (
    <MapContainer
      style={{ height: "100%", width: "100%" }} // Let parent handle the height
      zoom={7}
      center={[27.7172, 85.324]} // Kathmandu fallback
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap contributors'
      />

      <FitBounds locations={validLocations} />

      {validLocations.map((loc, index) => (
        <Marker
          key={index}
          position={[loc.latitude, loc.longitude]}
          icon={createTooltipIcon(loc.originalPrice)}
        >
          <Popup>
            <div style={{ height: "fit-content" }}>
              <MapViewHotelCard
                image={loc.hotelImage}
                title={loc.title}
                location={loc.location}
                rating={loc.rating}
                originalPrice={loc.originalPrice}
                discountedPrice={0}
              />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MultiMarkerMap;
