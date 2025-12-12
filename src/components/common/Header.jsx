import { useNavigate } from "react-router-dom";
import useAppStore from "../../store/useAppStore";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAppStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#313244] border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4">
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
            {user && (
              <div className="text-right">
                <p className="text-xs text-gray-300 font-medium">
                  {user.name || user.email}
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#1e1e2e] hover:bg-[#181825] rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
