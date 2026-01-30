const STORAGE_KEY = "geo-app-history";
const MAX_HISTORY_ITEMS = 10;

/**
 * Get history from localStorage
 * @returns {Array}
 */
const getHistoryFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

/**
 * Save history to localStorage
 * @param {Array} history
 */
const saveHistoryToStorage = (history) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

/**
 * Fetch user's search history
 * @param {number} limit - Number of history items to return
 * @returns {Promise<Array>}
 */
export const fetchHistory = async (limit = 10) => {
  const history = getHistoryFromStorage();
  return history.slice(0, limit);
};

/**
 * Add new search to history
 * @param {Object} geoData - Geolocation data to save
 * @returns {Promise<Object>}
 */
export const addToHistory = async (geoData) => {
  const history = getHistoryFromStorage();

  const newItem = {
    id: crypto.randomUUID(),
    ip: geoData.ip,
    city: geoData.city || null,
    region: geoData.region || null,
    country: geoData.country || null,
    loc: geoData.loc || null,
    hostname: geoData.hostname || null,
    org: geoData.org || null,
    postal: geoData.postal || null,
    timezone: geoData.timezone || null,
    created_at: new Date().toISOString(),
  };

  // Remove existing entry with same IP if exists
  const filteredHistory = history.filter((item) => item.ip !== geoData.ip);

  // Add new item at the beginning and limit to MAX_HISTORY_ITEMS
  const updatedHistory = [newItem, ...filteredHistory].slice(
    0,
    MAX_HISTORY_ITEMS,
  );

  saveHistoryToStorage(updatedHistory);

  return newItem;
};

/**
 * Delete selected history items by IP addresses
 * @param {Array<string>} ips - Array of IP addresses to delete
 * @returns {Promise<void>}
 */
export const deleteHistory = async (ips) => {
  const history = getHistoryFromStorage();
  const updatedHistory = history.filter((item) => !ips.includes(item.ip));
  saveHistoryToStorage(updatedHistory);
};

/**
 * Clear all history
 * @returns {Promise<void>}
 */
export const clearAllHistory = async () => {
  saveHistoryToStorage([]);
};

export default {
  fetchHistory,
  addToHistory,
  deleteHistory,
  clearAllHistory,
};
