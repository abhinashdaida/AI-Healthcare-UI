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

            {/* Sign in text link */}
            <button
              type="button"
              onClick={onSignInClick || (() => (window.location.href = "/signin"))}
              className="text-sm font-normal text-neutral-700 hover:text-black transition-colors focus:outline-none"
            >
              Sign in
            </button>

            {/* Sign Up prominent black button with shadow */}
            <button
              type="button"
              onClick={onSignUpClick || (() => (window.location.href = "/signup"))}
              className="bg-black text-white text-sm font-medium px-7 py-3 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.18)] hover:bg-neutral-800 active:scale-95 transition-all duration-200 focus:outline-none"
            >
              Sign Up
            </button>
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

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onSignInClick) onSignInClick();
                else window.location.href = "/signin";
              }}
              className="text-left text-sm font-medium text-neutral-700 hover:text-black py-1 focus:outline-none"
            >
              Sign in
            </button>
          </nav>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onSignUpClick) onSignUpClick();
                else window.location.href = "/signup";
              }}
              className="w-full bg-black text-white text-sm font-medium py-3 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.18)] hover:bg-neutral-800 active:scale-95 transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header_1;