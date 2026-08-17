import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-[310px] z-50 h-[100px] bg-white border-b border-gray-200">
      <div className="h-full flex items-center justify-end px-6">

        {/* Profile Wrapper */}
        <div className="relative">

          {/* Profile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 focus:outline-none"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center text-sm font-medium">
              KK
            </div>

            {/* Name */}
            <span className="text-base text-gray-700">
                Karthick
            </span>

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
            <div className="absolute right-0 top-12 w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">

              {/* Profile */}
              <button
                className="w-full text-left px-5 py-4 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  console.log("Profile clicked");
                  setIsOpen(false);
                }}
              >
                Profile
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Logout */}
              <button
                className="w-full text-left px-5 py-4 text-sm text-red-500 hover:bg-gray-50"
                onClick={() => {
                  console.log("Logout clicked");
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