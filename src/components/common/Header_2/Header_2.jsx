import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Logo from "../Logo/Logo";

/**
 * Src/components/common/Header_2/Header_2.jsx
 */
const Header_2 = ({
  cartCount = 0,
  wishlistCount = 0,
  onProfileClick,
  onWishlistClick,
  onCartClick,
  onSearchSubmit,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const categories = [
    { name: "Home & Kitchen", icon: "mdi:home-outline", href: "/category/home-kitchen" },
    { name: "Electronics", icon: "mdi:laptop", href: "/category/electronics" },
    { name: "Mobiles", icon: "mdi:cellphone", href: "/category/mobiles" },
    { name: "Fashion", icon: "mdi:tshirt-crew-outline", href: "/category/fashion" },
    { name: "Sports", icon: "mdi:trophy-outline", href: "/category/sports" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-sm font-medium text-neutral-800 hover:text-black transition-colors"
            >
              Home
            </a>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center text-sm font-medium text-neutral-800 hover:text-black transition-colors py-2 focus:outline-none"
              >
                <span>Products</span>
                <Icon
                  icon="mdi:chevron-down"
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${isProductsDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProductsDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 w-56 z-50">
                  <div className="bg-white border border-neutral-200 rounded-lg shadow-lg py-2">
                    {categories.map((cat) => (
                      <a
                        key={cat.name}
                        href={cat.href}
                        className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                      >
                        <Icon icon={cat.icon} className="w-4 h-4 mr-3 text-neutral-400" />
                        <span>{cat.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href="/new-arrivals"
              className="text-sm font-medium text-neutral-800 hover:text-black transition-colors"
            >
              New Arrivals
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    autoFocus
                    className="w-48 sm:w-64 px-3 py-1.5 text-sm bg-neutral-100 border border-neutral-300 rounded-md focus:outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 p-1 text-neutral-500 hover:text-black focus:outline-none"
                    aria-label="Close search"
                  >
                    <Icon icon="mdi:close" className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-neutral-600 hover:text-black rounded-full hover:bg-neutral-100 transition-colors focus:outline-none"
                  aria-label="Search"
                >
                  <Icon icon="mdi:magnify" className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Profile Icon */}
            <button
              type="button"
              onClick={onProfileClick}
              className="p-2 text-neutral-600 hover:text-black rounded-full hover:bg-neutral-100 transition-colors focus:outline-none"
              aria-label="Account Profile"
            >
              <Icon icon="mdi:account-outline" className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              type="button"
              onClick={onWishlistClick}
              className="relative p-2 text-neutral-600 hover:text-black rounded-full hover:bg-neutral-100 transition-colors focus:outline-none"
              aria-label="Wishlist"
            >
              <Icon icon="mdi:star-outline" className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white transition-all scale-100">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              type="button"
              onClick={onCartClick}
              className="relative p-2 text-neutral-600 hover:text-black rounded-full hover:bg-neutral-100 transition-colors focus:outline-none"
              aria-label="Shopping Cart"
            >
              <Icon icon="mdi:shopping-outline" className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white transition-all scale-100">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header_2;