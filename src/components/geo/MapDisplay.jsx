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

// MapUpdater component to handle re-centering when location changes
const MapUpdater = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom(), {
        animate: true,
        duration: 1,
      });
    }
  }, [center, map]);

  return null;
};

const MapDisplay = ({ location, ipAddress }) => {
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

  const position = parseLocation(location);

  // Loading/Empty state
  if (!position) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 overflow-hidden">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No location data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="h-80">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {ipAddress && (
                <div className="text-center">
                  <p className="font-semibold text-primary">{ipAddress}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {position[0].toFixed(4)}, {position[1].toFixed(4)}
                  </p>
                </div>
              )}
            </Popup>
          </Marker>
          <MapUpdater center={position} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapDisplay;
