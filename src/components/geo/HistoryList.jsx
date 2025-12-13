import { useState } from "react";
import useAppStore from "../../store/useAppStore";

const HistoryList = ({ onSelectHistory }) => {
  const { historyList, clearHistory, removeFromHistory } = useAppStore();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // Default closed

  if (historyList.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Search History
        </h3>
        <p className="text-gray-500 text-xs mt-3">No search history yet</p>
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

  const handleDeleteSelected = async () => {
    if (selectedItems.length > 0) {
      try {
        await removeFromHistory(selectedItems);
        setSelectedItems([]);
      } catch (error) {
        console.error("Failed to delete history items:", error);
      }
    }
  };

  const handleClearAll = async () => {
    try {
      await clearHistory();
      setSelectedItems([]);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          {isExpanded && (
            <label
              className="relative flex items-center cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={
                  selectedItems.length > 0 &&
                  selectedItems.length === historyList.length
                }
                onChange={handleSelectAll}
                className="peer sr-only"
                title="Select all"
              />
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:bg-[#313244] peer-checked:border-[#313244] peer-hover:border-[#313244] transition-all flex items-center justify-center">
                {selectedItems.length > 0 &&
                  selectedItems.length === historyList.length && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
              </div>
            </label>
          )}
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Search History
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded && selectedItems.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteSelected();
              }}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Delete ({selectedItems.length})
            </button>
          )}
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClearAll();
              }}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          )}
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-300 space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
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
                <label className="relative flex items-center cursor-pointer mt-0.5">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.ip)}
                    onChange={() => handleToggleSelect(item.ip)}
                    className="peer sr-only"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:bg-[#313244] peer-checked:border-[#313244] peer-hover:border-[#313244] transition-all flex items-center justify-center">
                    {selectedItems.includes(item.ip) && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </label>
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
                      {formatDate(item.timestamp || item.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
