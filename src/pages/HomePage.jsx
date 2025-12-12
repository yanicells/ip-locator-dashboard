import { useState, useEffect } from "react";
import Header from "../components/common/Header";
import GeoSearch from "../components/geo/GeoSearch";
import GeoDisplay from "../components/geo/GeoDisplay";
import MapDisplay from "../components/geo/MapDisplay";
import HistoryList from "../components/geo/HistoryList";
import useAppStore from "../store/useAppStore";
import geoService from "../services/geoService";

const HomePage = () => {
  const { setCurrentGeoData, addToHistory, currentGeoData } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    } catch (err) {
      setError(err.message || "Failed to fetch geolocation data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (ipAddress) => {
    setLoading(true);
    setError("");

    try {
      const data = await geoService.fetchGeoData(ipAddress);
      setCurrentGeoData(data);
      addToHistory(data);
    } catch (err) {
      setError(err.message || "Failed to fetch geolocation data");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    fetchCurrentUserGeo();
  };

  const handleSelectHistory = (historyItem) => {
    setCurrentGeoData(historyItem);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content - 70% */}
          <div className="flex-1 lg:w-[70%]">
            <GeoSearch onSearch={handleSearch} onClear={handleClear} />
            <GeoDisplay
              geoData={currentGeoData}
              loading={loading}
              error={error}
            />
            {currentGeoData && currentGeoData.loc && (
              <MapDisplay
                location={currentGeoData.loc}
                ipAddress={currentGeoData.ip}
              />
            )}
          </div>

          {/* Sidebar - 30% */}
          <div className="lg:w-[30%]">
            <HistoryList onSelectHistory={handleSelectHistory} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
