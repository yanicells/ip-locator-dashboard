import { useState } from "react";

const GeoDisplay = ({
  geoData,
  loading,
  error,
  activeSearchResults,
  onNavigate,
}) => {
  const [isExpanded, setIsExpanded] = useState(true); // Default open

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#313244]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-md text-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!geoData) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <p className="text-gray-500 text-center text-sm">No data available</p>
      </div>
    );
  }

  const dataFields = [
    { label: "IP Address", value: geoData.ip },
    { label: "City", value: geoData.city },
    { label: "Region", value: geoData.region },
    { label: "Country", value: geoData.country },
    { label: "Location", value: geoData.loc },
    { label: "Hostname", value: geoData.hostname },
    { label: "Organization", value: geoData.org },
    { label: "Postal Code", value: geoData.postal },
    { label: "Timezone", value: geoData.timezone },
  ];

  // Check if we have multiple results to navigate through
  const hasMultipleResults =
    activeSearchResults && activeSearchResults.length > 1;
  const currentIndex = hasMultipleResults
    ? activeSearchResults.findIndex((item) => item.ip === geoData.ip)
    : -1;
  const currentPosition = currentIndex >= 0 ? currentIndex + 1 : 1;
  const totalResults = hasMultipleResults ? activeSearchResults.length : 1;

  const handlePrevious = () => {
    if (hasMultipleResults && currentIndex > 0) {
      onNavigate(activeSearchResults[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasMultipleResults && currentIndex < activeSearchResults.length - 1) {
      onNavigate(activeSearchResults[currentIndex + 1]);
    }
  };

  return (
    <div
      className={`bg-gray-50 rounded-lg border border-gray-200 ${
        isExpanded ? "p-5" : "p-5"
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          IP Information
        </h3>
        <div className="flex items-center gap-2">
          {hasMultipleResults && isExpanded && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">
                {currentPosition} of {totalResults}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                disabled={currentIndex === 0}
                className={`p-1 rounded-md transition-colors ${
                  currentIndex === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-[#313244] hover:bg-gray-200"
                }`}
                title="Previous"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                disabled={currentIndex === activeSearchResults.length - 1}
                className={`p-1 rounded-md transition-colors ${
                  currentIndex === activeSearchResults.length - 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-[#313244] hover:bg-gray-200"
                }`}
                title="Next"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
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
        <div className="mt-3 pt-3 border-t border-gray-300 space-y-3">
          {dataFields.map(
            (field) =>
              field.value && (
                <div
                  key={field.label}
                  className="flex justify-between items-baseline gap-3"
                >
                  <dt className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex-shrink-0">
                    {field.label}
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium text-right break-all">
                    {field.value}
                  </dd>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default GeoDisplay;
