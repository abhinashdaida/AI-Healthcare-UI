import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Get User Data From Session Storage
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Listen to profile updates
  useEffect(() => {
    const handleProfileUpdate = () => {
      const savedUser = sessionStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener("user-profile-updated", handleProfileUpdate);
    return () => {
      window.removeEventListener("user-profile-updated", handleProfileUpdate);
    };
  }, []);

  // username
  const username = user?.username || "User";

  // Get Initials
  const initials = username
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    // remove the session stroage
    sessionStorage.removeItem("user");
    // GO TO LOGIN PAGE
    navigate("/");
  };

  return (
    <header className="fixed top-0 right-0 left-[250px] z-50 h-[75px] border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-end px-6">
        {/* Profile Wrapper */}
        <div className="relative">
          {/* Profile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 focus:outline-none"
          >
            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700 text-sm font-medium text-white">
              {initials}
            </div>

            {/* Name */}
            <span className="text-base text-gray-700">{username}</span>

            {/* Arrow */}
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-12 w-[180px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
              {/* Profile */}
              <button
                className="w-full px-5 py-4 text-left text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  navigate("/settings", { state: { activeTab: "settings" } });
                  setIsOpen(false);
                }}
              >
                Profile
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Logout */}
              <button
                className="w-full px-5 py-4 text-left text-sm text-red-500 hover:bg-gray-50"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
