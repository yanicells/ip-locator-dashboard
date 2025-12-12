import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in React-Leaflet
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Custom icons for different marker types
const userIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const historyIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -28],
  shadowSize: [33, 33],
});

// Component to auto-fit bounds when markers change
const AutoFitBounds = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers && markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((m) => m.position));
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15,
        animate: true,
      });
    }
  }, [markers, map]);

  return null;
};

const MapDisplay = ({ activeSearchResults, userLocation }) => {
  // Parse location string "lat,long" into array [lat, lng]
  const parseLocation = (loc) => {
    if (!loc || typeof loc !== "string") return null;

    const parts = loc.split(",");
    if (parts.length !== 2) return null;

    const lat = parseFloat(parts[0].trim());
    const lng = parseFloat(parts[1].trim());

    if (isNaN(lat) || isNaN(lng)) return null;

    return [lat, lng];
  };

  // Build markers array
  const buildMarkers = () => {
    const markers = [];

    // Add user location as primary marker (only if no active search results)
    if (
      userLocation &&
      userLocation.loc &&
      (!activeSearchResults || activeSearchResults.length === 0)
    ) {
      const position = parseLocation(userLocation.loc);
      if (position) {
        markers.push({
          position,
          type: "user",
          data: userLocation,
          icon: userIcon,
        });
      }
    }

    // Add active search results as markers
    if (activeSearchResults && Array.isArray(activeSearchResults)) {
      activeSearchResults.forEach((item) => {
        if (item.loc) {
          const position = parseLocation(item.loc);
          if (position) {
            // Avoid duplicate positions
            const isDuplicate = markers.some(
              (m) =>
                m.position[0] === position[0] && m.position[1] === position[1]
            );
            if (!isDuplicate) {
              markers.push({
                position,
                type: "search",
                data: item,
                icon: historyIcon,
              });
            }
          }
        }
      });
    }

    return markers;
  };

  const markers = buildMarkers();

  // Default center (fallback to San Francisco)
  const defaultCenter = [37.7749, -122.4194];
  const center = markers.length > 0 ? markers[0].position : defaultCenter;

  return (
    <div className="h-full w-full">
      {markers.length === 0 ? (
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500 text-lg">
            No location data available. Search for an IP to display on the map.
          </p>
        </div>
      ) : (
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render all markers */}
          {markers.map((marker, index) => (
            <Marker
              key={`${marker.type}-${index}`}
              position={marker.position}
              icon={marker.icon}
            >
              <Popup>
                <div className="text-center min-w-[150px]">
                  <p className="font-bold text-[#313244] text-base mb-1">
                    {marker.data.ip}
                  </p>
                  {marker.data.city && marker.data.country && (
                    <p className="text-sm text-gray-700 mb-1">
                      {marker.data.city}, {marker.data.country}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mb-2">
                    {marker.position[0].toFixed(4)},{" "}
                    {marker.position[1].toFixed(4)}
                  </p>
                  {marker.data.org && (
                    <p className="text-xs text-gray-600 italic border-t pt-1">
                      {marker.data.org}
                    </p>
                  )}
                  {marker.type === "user" && (
                    <span className="inline-block bg-[#313244] text-white text-xs px-2 py-1 rounded mt-1">
                      Your Location
                    </span>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Auto-fit bounds to show all markers */}
          <AutoFitBounds markers={markers} />
        </MapContainer>
      )}
    </div>
  );
};

export default MapDisplay;
