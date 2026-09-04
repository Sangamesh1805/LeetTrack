import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const linkClass = (path) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 ${
      location.pathname === path
        ? "bg-purple-500/10 text-purple-200"
        : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-100"
    }`;

  return (
    <nav className="border-b border-white/8 bg-[#0b0b12]/90 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6">
        {/* Logo */}
        <button
          onClick={() => handleNavigation("/")}
          className="shrink-0 rounded-md text-xl font-extrabold leading-none tracking-tight text-white transition-colors hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 sm:text-2xl lg:text-3xl"
        >
          LeetTrack
        </button>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-white/20 hover:bg-white/4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 sm:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        {/* Navigation */}
        {isAuthenticated && (
          <div
            id="primary-navigation"
            className={`${
              menuOpen ? "flex" : "hidden"
            } absolute left-5 right-5 top-[calc(100%+0.5rem)] z-10 flex-col gap-1 rounded-xl border border-white/10 bg-[#11111a] p-2 shadow-2xl shadow-black/30 sm:static sm:flex sm:flex-row sm:items-center sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}
          >
            <button
              onClick={() => handleNavigation("/")}
              className={linkClass("/")}
            >
              Dashboard
            </button>

            <button
              onClick={() => handleNavigation("/profile")}
              className={linkClass("/profile")}
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="mt-1 rounded-lg border border-white/10 bg-white/3 px-3 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 sm:mt-0 sm:px-3"
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
