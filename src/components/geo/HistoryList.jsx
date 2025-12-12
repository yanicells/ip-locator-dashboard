import useAppStore from "../../store/useAppStore";

const HistoryList = ({ onSelectHistory }) => {
  const { historyList, clearHistory } = useAppStore();

  if (historyList.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl shadow-lg p-6 sticky top-6">
        <h2 className="text-xl font-semibold text-primary mb-4 pb-3 border-b-2 border-primary">
          Search History
        </h2>
        <p className="text-gray-500 text-sm">No search history yet</p>
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

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg p-6 sticky top-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-primary">
        <h2 className="text-xl font-semibold text-primary">Search History</h2>
        <button
          onClick={clearHistory}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
        {historyList.map((item, index) => (
          <div
            key={`${item.ip}-${index}`}
            onClick={() => onSelectHistory(item)}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-primary">{item.ip}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {item.city && item.country
                    ? `${item.city}, ${item.country}`
                    : item.country || "Unknown location"}
                </p>
              </div>
              <span className="text-xs text-gray-400 ml-2">
                {formatDate(item.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
