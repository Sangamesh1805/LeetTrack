import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-xl font-bold text-white hover:text-purple-400 transition"
        >
          LeetTrack
        </button>

        {/* Navigation */}
        {isAuthenticated && (
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-white transition"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="text-gray-400 hover:text-white transition"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
