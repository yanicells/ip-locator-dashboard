const Header = ({ isCollapsed, onToggleCollapse }) => {
  return (
    <header className="bg-[#313244] border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4">
        {isCollapsed ? (
          <div className="flex justify-center">
            <button
              onClick={onToggleCollapse}
              className="p-2 hover:bg-[#181825] rounded-md transition-colors"
              title="Expand sidebar"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                IP Geolocation
              </h1>
              <p className="text-xs text-gray-300 mt-0.5">
                Search and track IP addresses
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onToggleCollapse}
                className="p-2 hover:bg-[#181825] rounded-md transition-colors"
                title="Collapse sidebar"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
