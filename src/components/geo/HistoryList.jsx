import { useState } from "react";
import useAppStore from "../../store/useAppStore";

const HistoryList = ({ onSelectHistory }) => {
  const { historyList, clearHistory, removeFromHistory } = useAppStore();
  const [selectedItems, setSelectedItems] = useState([]);

  if (historyList.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Search History
        </h3>
        <p className="text-gray-500 text-xs">No search history yet</p>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleToggleSelect = (ip) => {
    setSelectedItems((prev) =>
      prev.includes(ip) ? prev.filter((item) => item !== ip) : [...prev, ip]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === historyList.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(historyList.map((item) => item.ip));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      removeFromHistory(selectedItems);
      setSelectedItems([]);
    }
  };

  const handleClearAll = () => {
    clearHistory();
    setSelectedItems([]);
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={
              selectedItems.length > 0 &&
              selectedItems.length === historyList.length
            }
            onChange={handleSelectAll}
            className="w-4 h-4 text-[#313244] border-gray-300 rounded focus:ring-[#313244] cursor-pointer"
            title="Select all"
          />
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Search History
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {selectedItems.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Delete ({selectedItems.length})
            </button>
          )}
          <button
            onClick={handleClearAll}
            className="text-xs text-red-600 hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {historyList.map((item, index) => (
          <div
            key={`${item.ip}-${index}`}
            className={`p-3 bg-white border rounded-md transition-all ${
              selectedItems.includes(item.ip)
                ? "border-[#313244] shadow-sm"
                : "border-gray-200 hover:border-[#313244] hover:shadow-sm"
            }`}
          >
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.ip)}
                onChange={() => handleToggleSelect(item.ip)}
                className="w-4 h-4 mt-0.5 text-[#313244] border-gray-300 rounded focus:ring-[#313244] cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              />
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => onSelectHistory(item)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#313244] truncate">
                      {item.ip}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5 truncate">
                      {item.city && item.country
                        ? `${item.city}, ${item.country}`
                        : item.country || "Unknown location"}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {formatDate(item.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
