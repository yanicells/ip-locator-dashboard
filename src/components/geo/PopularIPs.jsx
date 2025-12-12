import { useState } from "react";

const PopularIPs = ({ onSelectIP }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const popularIPs = [
    { ip: "8.8.8.8", label: "Google Public DNS" },
    { ip: "1.1.1.1", label: "Cloudflare DNS" },
    { ip: "9.9.9.9", label: "Quad9 Security" },
    { ip: "208.67.222.222", label: "OpenDNS" },
    { ip: "4.2.2.2", label: "Level3 DNS" },
    { ip: "142.250.190.46", label: "Google Search" },
    { ip: "157.240.221.35", label: "Facebook" },
  ];

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Popular IP Addresses
        </h3>
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
      </button>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-300 space-y-2 max-h-[300px] overflow-y-auto scrollbar-hide">
          {popularIPs.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelectIP(item.ip)}
              className="p-3 bg-white border border-gray-200 rounded-md hover:border-[#313244] hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#313244] truncate">
                    {item.ip}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5 truncate">
                    {item.label}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularIPs;
