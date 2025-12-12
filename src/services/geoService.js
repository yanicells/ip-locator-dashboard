import axios from "axios";

// IPinfo.io API configuration
const IPINFO_BASE_URL = "https://ipinfo.io";
const IPINFO_TOKEN = import.meta.env.VITE_IPINFO_TOKEN || "";

/**
 * Validate IP address format (IPv4 or IPv6)
 * @param {string} ip
 * @returns {boolean}
 */
export const validateIp = (ip) => {
  if (!ip || typeof ip !== "string") return false;

  // IPv4 pattern
  const ipv4Pattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // IPv6 pattern (simplified)
  const ipv6Pattern =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|::)$/;

  return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
};

/**
 * Fetch geolocation data for a specific IP or current user
 * @param {string|null} ip - IP address to lookup, or null for current user
 * @returns {Promise<Object>}
 */
export const fetchGeoData = async (ip = null) => {
  try {
    let url;

    if (ip) {
      // Validate IP format
      if (!validateIp(ip)) {
        throw new Error("Invalid IP address format");
      }
      url = `${IPINFO_BASE_URL}/${ip}/json`;
    } else {
      // Fetch current user's IP
      url = `${IPINFO_BASE_URL}/json`;
    }

    // Add token if available
    const params = IPINFO_TOKEN ? { token: IPINFO_TOKEN } : {};

    const response = await axios.get(url, { params });

    // Parse location string (e.g., "37.7749,-122.4194")
    if (response.data.loc) {
      const [lat, lon] = response.data.loc.split(",");
      response.data.latitude = parseFloat(lat);
      response.data.longitude = parseFloat(lon);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("IP address not found");
      }
      if (error.response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error(
        error.response.data.message || "Failed to fetch geolocation data"
      );
    }

    if (error.message === "Invalid IP address format") {
      throw error;
    }

    throw new Error("Network error. Please check your connection.");
  }
};

const geoService = {
  fetchGeoData,
  validateIp,
};

export default geoService;
