import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

/**
 * Get auth headers with token
 * @returns {Object}
 */
const getAuthHeaders = () => {
  const storage = localStorage.getItem("geo-app-storage");
  if (!storage) return {};

  const { state } = JSON.parse(storage);
  const token = state?.token;

  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Fetch user's search history
 * @param {number} limit - Number of history items to return
 * @returns {Promise<Array>}
 */
export const fetchHistory = async (limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history`, {
      headers: getAuthHeaders(),
      params: { limit },
    });

    return response.data.history || [];
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please login again.");
    }
    throw new Error(error.response?.data?.message || "Failed to fetch history");
  }
};

/**
 * Add new search to history
 * @param {Object} geoData - Geolocation data to save
 * @returns {Promise<Object>}
 */
export const addToHistory = async (geoData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/history`,
      {
        ip: geoData.ip,
        city: geoData.city || null,
        region: geoData.region || null,
        country: geoData.country || null,
        loc: geoData.loc || null,
        hostname: geoData.hostname || null,
        org: geoData.org || null,
        postal: geoData.postal || null,
        timezone: geoData.timezone || null,
      },
      {
        headers: getAuthHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please login again.");
    }
    throw new Error(
      error.response?.data?.message || "Failed to add to history"
    );
  }
};

/**
 * Delete selected history items by IP addresses
 * @param {Array<string>} ips - Array of IP addresses to delete
 * @returns {Promise<void>}
 */
export const deleteHistory = async (ips) => {
  try {
    await axios.delete(`${API_BASE_URL}/history`, {
      headers: getAuthHeaders(),
      data: { ips },
    });
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please login again.");
    }
    throw new Error(
      error.response?.data?.message || "Failed to delete history"
    );
  }
};

/**
 * Clear all history for user
 * @returns {Promise<void>}
 */
export const clearAllHistory = async () => {
  try {
    await axios.delete(`${API_BASE_URL}/history/all`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please login again.");
    }
    throw new Error(error.response?.data?.message || "Failed to clear history");
  }
};

export default {
  fetchHistory,
  addToHistory,
  deleteHistory,
  clearAllHistory,
};
