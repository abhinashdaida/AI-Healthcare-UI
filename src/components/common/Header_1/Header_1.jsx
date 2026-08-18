import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";

/**
 * Reusable Header_1 Navigation Component.
 * Located in: src/components/common/Header_1/Header_1.jsx
 */
const Header_1 = ({ onSignInClick, onSignUpClick, onSearchSubmit }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shopping", href: "/shopping" },
    { name: "Deals", href: "/deals" },
    { name: "New Arrivals", href: "/new-arrivals" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

          {/* Center: SearchBar and Nav Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center max-w-2xl px-6 gap-6">
            <div className="w-full max-w-xs">
              <SearchBar placeholder="Search products..." onSearch={onSearchSubmit} />
            </div>

            <nav className="flex items-center space-x-6 shrink-0">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Sign In and Sign Up Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button variant="outline" size="small" onClick={onSignInClick}>
              Sign In
            </Button>
            <Button variant="primary" size="small" onClick={onSignUpClick}>
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-neutral-600 hover:text-black focus:outline-none"
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

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-2 pb-6 space-y-4">
          <div className="pt-2">
            <SearchBar placeholder="Search products..." onSearch={onSearchSubmit} />
          </div>

          <nav className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-700 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-4 flex flex-col gap-2">
            <Button variant="outline" className="w-full justify-center" onClick={onSignInClick}>
              Sign In
            </Button>
            <Button variant="primary" className="w-full justify-center" onClick={onSignUpClick}>
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header_1;
