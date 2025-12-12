import { useState } from "react";
import geoService from "../../services/geoService";

const GeoSearch = ({ onSearch, onClear }) => {
  const [ipAddress, setIpAddress] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");

    if (!ipAddress.trim()) {
      setError("Please enter an IP address");
      return;
    }

    if (!geoService.validateIp(ipAddress.trim())) {
      setError("Invalid IP address format");
      return;
    }

    onSearch(ipAddress.trim());
    setIpAddress("");
  };

  const handleClear = () => {
    setIpAddress("");
    setError("");
    onClear();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label
            htmlFor="ip-search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Search IP Address
          </label>
          <div className="flex gap-3">
            <input
              id="ip-search"
              type="text"
              value={ipAddress}
              onChange={(e) => {
                setIpAddress(e.target.value);
                setError("");
              }}
              placeholder="e.g., 8.8.8.8 or 2001:4860:4860::8888"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-md"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-2.5 bg-primary-light hover:bg-primary text-white font-medium rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default GeoSearch;
