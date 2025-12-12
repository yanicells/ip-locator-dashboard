import { useState, useEffect } from "react";
import Header from "../components/common/Header";
import GeoSearch from "../components/geo/GeoSearch";
import GeoDisplay from "../components/geo/GeoDisplay";
import MapDisplay from "../components/geo/MapDisplay";
import HistoryList from "../components/geo/HistoryList";
import useAppStore from "../store/useAppStore";
import geoService from "../services/geoService";

const HomePage = () => {
  const { setCurrentGeoData, addToHistory, currentGeoData, historyList } =
    useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [activeSearchResults, setActiveSearchResults] = useState([]);

  // Fetch current user's IP on mount
  useEffect(() => {
    fetchCurrentUserGeo();
  }, []);

  const fetchCurrentUserGeo = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await geoService.fetchGeoData();
      setCurrentGeoData(data);
      setUserLocation(data);
      setActiveSearchResults([]); // Clear active search results
    } catch (err) {
      setError(err.message || "Failed to fetch geolocation data");
    } finally {
      setLoading(false);
    }
  };

  const handleBatchSearch = async (ipAddresses) => {
    setLoading(true);
    setError("");

    try {
      // Fetch all IPs in parallel
      const promises = ipAddresses.map((ip) =>
        geoService.fetchGeoData(ip).catch((err) => ({
          error: true,
          ip,
          message: err.message,
        }))
      );

      const results = await Promise.all(promises);

      // Filter out errors and add successful results to history
      const successfulResults = results.filter((result) => !result.error);
      const failedResults = results.filter((result) => result.error);

      // Set active search results (these will be shown on the map)
      setActiveSearchResults(successfulResults);

      // Add all successful results to history
      successfulResults.forEach((data) => {
        addToHistory(data);
      });

      // Set the last successful result as current
      if (successfulResults.length > 0) {
        setCurrentGeoData(successfulResults[successfulResults.length - 1]);
      }

      // Show error message if any failed
      if (failedResults.length > 0) {
        const errorMessages = failedResults
          .map((r) => `${r.ip}: ${r.message}`)
          .join("; ");
        setError(`Failed to fetch some IPs: ${errorMessages}`);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch geolocation data");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setActiveSearchResults([]); // Clear active search results
    fetchCurrentUserGeo();
  };

  const handleSelectHistory = (historyItem) => {
    setCurrentGeoData(historyItem);
    setError("");
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-[420px] overflow-y-auto bg-white border-r border-gray-200 z-20 flex flex-col">
        <Header />
        <div className="p-6 space-y-4">
          <GeoSearch onSearch={handleBatchSearch} onClear={handleClear} />
          <GeoDisplay
            geoData={currentGeoData}
            loading={loading}
            error={error}
          />
          <HistoryList onSelectHistory={handleSelectHistory} />
        </div>
      </div>

      {/* Right Map Area */}
      <div className="flex-1">
        <MapDisplay
          activeSearchResults={activeSearchResults}
          userLocation={userLocation}
        />
      </div>
    </div>
  );
};

export default HomePage;
