import { useState, useEffect, useRef } from "react";
import Header from "../components/common/Header";
import GeoSearch from "../components/geo/GeoSearch";
import GeoDisplay from "../components/geo/GeoDisplay";
import MapDisplay from "../components/geo/MapDisplay";
import HistoryList from "../components/geo/HistoryList";
import PopularIPs from "../components/geo/PopularIPs";
import useAppStore from "../store/useAppStore";
import geoService from "../services/geoService";

const HomePage = () => {
  const { setCurrentGeoData, addToHistory, currentGeoData } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [activeSearchResults, setActiveSearchResults] = useState([]);
  const [searchInputs, setSearchInputs] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const sidebarRef = useRef(null);

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
      setActiveSearchResults([]);
      setSearchInputs([data.ip]);
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
      const promises = ipAddresses.map((ip) =>
        geoService.fetchGeoData(ip).catch((err) => ({
          error: true,
          ip,
          message: err.message,
        }))
      );

      const results = await Promise.all(promises);

      const successfulResults = results.filter((result) => !result.error);
      const failedResults = results.filter((result) => result.error);

      setActiveSearchResults(successfulResults);

      successfulResults.forEach((data) => {
        addToHistory(data);
      });

      if (successfulResults.length > 0) {
        setCurrentGeoData(successfulResults[successfulResults.length - 1]);
      }

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
    setActiveSearchResults([]);
    setSearchInputs([]);
    fetchCurrentUserGeo();
  };

  const handleSelectHistory = (historyItem) => {
    const currentScrollPosition = sidebarRef.current?.scrollTop || 0;

    setSearchInputs([historyItem.ip]);
    handleBatchSearch([historyItem.ip]);

    setTimeout(() => {
      if (sidebarRef.current) {
        sidebarRef.current.scrollTop = currentScrollPosition;
      }
    }, 0);
  };

  const handleSelectPopularIP = (ip) => {
    const currentScrollPosition = sidebarRef.current?.scrollTop || 0;

    setSearchInputs([ip]);
    handleBatchSearch([ip]);

    setTimeout(() => {
      if (sidebarRef.current) {
        sidebarRef.current.scrollTop = currentScrollPosition;
      }
    }, 0);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 flex relative">
      {/* Left Sidebar */}
      <div
        ref={sidebarRef}
        className={`border-r border-gray-200 z-20 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed
            ? "w-16 bg-[#313244]"
            : "w-[540px] overflow-y-auto scrollbar-hide bg-white"
        }`}
      >
        <Header
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        {!isSidebarCollapsed && (
          <div className="p-6 space-y-4">
            <GeoSearch
              onSearch={handleBatchSearch}
              onClear={handleClear}
              externalInputs={searchInputs}
            />
            <GeoDisplay
              geoData={currentGeoData}
              loading={loading}
              error={error}
              activeSearchResults={activeSearchResults}
              onNavigate={(data) => setCurrentGeoData(data)}
            />
            <HistoryList onSelectHistory={handleSelectHistory} />
            <PopularIPs onSelectIP={handleSelectPopularIP} />
          </div>
        )}
      </div>

      {/* Right Map Area */}
      <div className="flex-1">
        <MapDisplay
          activeSearchResults={activeSearchResults}
          userLocation={userLocation}
          sidebarCollapsed={isSidebarCollapsed}
        />
      </div>
    </div>
  );
};

export default HomePage;
