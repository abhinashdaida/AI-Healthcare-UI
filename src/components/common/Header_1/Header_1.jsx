import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Logo from "../Logo/Logo";

/**
 * Reusable Header_1 Navigation Component.
 * Located in: src/components/common/Header_1/Header_1.jsx
 * 
 * Matches design with:
 * - Left: Brand Logo / FASCO
 * - Right: Navigation links (Home, Deals, New Arrivals, Packages, Sign in) and prominent Sign Up button.
 * 
 * Props:
 * @param {string} brandName - Optional brand text override (Default: 'FASCO')
 * @param {function} onSignInClick - Callback for 'Sign in' link click
 * @param {function} onSignUpClick - Callback for 'Sign Up' button click
 * @param {string} className - Custom Tailwind CSS classes
 */
const Header_1 = ({
  brandName = "FASCO",
  onSignInClick,
  onSignUpClick,
  className = ""
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Read user from localStorage on mount and sync with other tabs
  React.useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser"); // Sync with SignIn.jsx
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Standardize to use 'name' for the header display
          if (!parsedUser.name && parsedUser.firstName) {
            parsedUser.name = parsedUser.firstName + (parsedUser.lastName ? " " + parsedUser.lastName : "");
          }
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error reading user from localStorage", err);
        setUser(null);
      }
    };

    // Check immediately on mount
    checkUser();

    // Listen for changes from other tabs or back/forward cache restoration
    window.addEventListener("storage", checkUser);
    window.addEventListener("pageshow", checkUser); // Fix for bfcache (Back button)

    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("pageshow", checkUser);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Deals", href: "#deals" },
    { name: "New Arrivals", href: "#new-arrivals" },
    { name: "Packages", href: "#packages" }
  ];

  return (
    <header className={`w-full bg-white transition-all duration-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo / Title */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl sm:text-3xl font-serif font-bold tracking-wider text-neutral-900 hover:opacity-90 transition-opacity"
            >
              {brandName}
            </a>
          </div>

          {/* Desktop Right: Nav Links + Sign In + Sign Up Button */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-normal text-neutral-700 hover:text-black transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Conditional Auth UI: User Profile Dropdown or Login/Signup */}
            {user ? (
              <div
                className="relative flex items-center ml-4 group"
              >
                <button
                  type="button"
                  className="flex items-center gap-2.5 focus:outline-none"
                >
                  {/* User Avatar (First Letter or Image) */}
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-[15px] font-bold group-hover:bg-neutral-800 transition-colors shadow-sm">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.name ? user.name.charAt(0).toUpperCase() : "U"
                    )}
                  </div>
                  {/* User Name & Chevron */}
                  <div className="flex items-center gap-1">
                    <span className="text-[15px] font-medium text-neutral-800 group-hover:text-black transition-colors">
                      {user.name || "User"}
                    </span>
                    <Icon icon="mdi:chevron-down" className="w-4 h-4 text-neutral-500 group-hover:text-black transition-colors" />
                  </div>
                </button>

                {/* Dropdown Menu (Shows on Hover) */}
                <div className="absolute right-0 top-full pt-3 w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white border border-neutral-200 rounded-lg shadow-xl py-2 flex flex-col">
                    <a href="/profile" className="px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black flex items-center gap-2">
                      <Icon icon="mdi:account-outline" className="w-4 h-4" /> My Profile
                    </a>
                    <hr className="my-1 border-neutral-100" />
                    <button 
                      onClick={() => {
                        localStorage.removeItem("loggedInUser");
                        setUser(null);
                        window.location.replace("/"); // Go to home and replace history so back button doesn't go to logged-in state
                      }} 
                      className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 text-left w-full"
                    >
                      <Icon icon="mdi:logout" className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Sign in text link */}
                <button
                  type="button"
                  onClick={onSignInClick || (() => (window.location.href = "/signin"))}
                  className="text-[15px] font-normal text-neutral-600 hover:text-black transition-colors focus:outline-none ml-2"
                >
                  Sign in
                </button>

                {/* Sign Up prominent black button with shadow */}
                <button
                  type="button"
                  onClick={onSignUpClick || (() => (window.location.href = "/signup"))}
                  className="bg-black text-white text-[15px] font-medium px-8 py-2.5 rounded shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] hover:bg-neutral-800 active:scale-95 transition-all duration-200 focus:outline-none ml-2 lg:ml-4"
                >
                  Sign Up
                </button>
              </>
            )}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              <Icon
                icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"}
                className="w-6 h-6"
              />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Responsive Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-6 py-5 space-y-4 shadow-lg animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-3.5 text-left">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-700 hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}

            {user ? (
              <div className="pt-2 pb-1 space-y-4">
                <a
                  href="/profile"
                  className="flex items-center gap-3 focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-base font-bold shadow-sm">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.name ? user.name.charAt(0).toUpperCase() : "U"
                    )}
                  </div>
                  <span className="text-base font-medium text-neutral-900">
                    {user.name || "User"}
                  </span>
                </a>
                
                <div className="flex flex-col pl-2 space-y-3 pt-2">
                  <button 
                    onClick={() => {
                      localStorage.removeItem("loggedInUser");
                      setUser(null);
                      window.location.replace("/");
                    }} 
                    className="text-sm font-medium text-red-600 flex items-center gap-2 text-left w-full mt-1"
                  >
                    <Icon icon="mdi:logout" className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onSignInClick) onSignInClick();
                  else window.location.href = "/signin";
                }}
                className="text-left text-[15px] font-medium text-neutral-700 hover:text-black py-1 focus:outline-none"
              >
                Sign in
              </button>
            )}
          </nav>

          {!user && (
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onSignUpClick) onSignUpClick();
                  else window.location.href = "/signup";
                }}
                className="w-full bg-black text-white text-[15px] font-medium py-3 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.18)] hover:bg-neutral-800 active:scale-95 transition-all"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header_1;