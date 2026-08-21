import React, { useState ,useEffect} from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable Header_2 Navigation Component.
 * Located in: src/components/common/Header_2/Header_2.jsx
 * 
 * Matches design with:
 * - Left: FASCO Brand Logo
 * - Center: Home, Shop (with active underline), Products, Pages (with dropdown chevron)
 * - Right: Search, Profile, Star (Wishlist), and Shopping Bag icons.
 * 
 * Props:
 * @param {string} brandName - Brand title (Default: 'FASCO')
 * @param {string} activeLink - Current active link (Default: 'Shop')
 * @param {number} cartCount - Cart items badge count
 * @param {number} wishlistCount - Wishlist items badge count
 * @param {function} onSearchClick - Callback for Search icon click
 * @param {function} onProfileClick - Callback for Profile icon click
 * @param {function} onWishlistClick - Callback for Wishlist star icon click
 * @param {function} onCartClick - Callback for Cart shopping bag icon click
 * @param {string} className - Custom Tailwind CSS classes
 */
const Header_2 = ({
  brandName = "FASCO",
  activeLink = "Shop",
  cartCount = 0,
  wishlistCount = 0,
  onSearchClick,
  onProfileClick,
  onWishlistClick,
  onCartClick,
  onSearchSubmit,
  initialSearchQuery = "",
  className = ""
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistTotal, setWishlistTotal] = useState(() => {
  const savedWishlist = localStorage.getItem("wishlist");
  return savedWishlist
    ? JSON.parse(savedWishlist).length
    : 0;
});

  // Sync with external initialSearchQuery if it changes
  React.useEffect(() => {
    setSearchQuery(initialSearchQuery);
    if (initialSearchQuery) {
      setIsSearchOpen(true);
    }
  }, [initialSearchQuery]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Products", href: "/product" }
  ];

  const pageLinks = [
    { name: "Cart", href: "/cart" },
    { name: "Checkout", href: "/checkout" },
    { name: "Order Tracking", href: "/orders" }
  ];

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  useEffect(() => {
  const updateWishlistCount = () => {
    const savedWishlist = localStorage.getItem("wishlist");

    const wishlist = savedWishlist
      ? JSON.parse(savedWishlist)
      : [];

    setWishlistTotal(wishlist.length);
  };

  window.addEventListener(
    "wishlistUpdated",
    updateWishlistCount
  );

  return () => {
    window.removeEventListener(
      "wishlistUpdated",
      updateWishlistCount
    );
  };
}, []);

  return (
    <header className={`w-full bg-white border-b border-neutral-100 transition-all duration-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Left: Brand Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl sm:text-3xl font-serif font-bold tracking-wider text-neutral-900 hover:opacity-90 transition-opacity"
            >
              {brandName}
            </a>
          </div>

          {/* 2. Center: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = link.name === activeLink;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-normal transition-colors relative py-1 ${
                    isActive
                      ? "text-neutral-900 border-b-2 border-neutral-900 font-medium"
                      : "text-neutral-600 hover:text-black"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            {/* Pages Dropdown with Chevron */}
            <div
              className="relative"
              onMouseEnter={() => setIsPagesDropdownOpen(true)}
              onMouseLeave={() => setIsPagesDropdownOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center text-sm font-normal text-neutral-600 hover:text-black transition-colors py-1 focus:outline-none"
              >
                <span>Pages</span>
                <Icon
                  icon="mdi:chevron-down"
                  className={`ml-1 w-4 h-4 transition-transform duration-200 text-neutral-500 ${
                    isPagesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Pages Popover Menu */}
              {isPagesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-48 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white border border-neutral-200 rounded-lg shadow-lg py-2">
                    {pageLinks.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* 3. Right: 4 Action Icons (Search, Profile, Star/Wishlist, Bag/Cart) */}
          <div className="flex items-center space-x-5 sm:space-x-6 text-neutral-800">
            
            {/* Search Icon / Expandable Bar */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <form onSubmit={handleSearchFormSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (onSearchSubmit) {
                        onSearchSubmit(e.target.value);
                      }
                    }}
                    placeholder="Search store..."
                    autoFocus
                    className="w-40 sm:w-56 px-3 py-1 text-[13px] bg-neutral-50 border border-neutral-300 rounded-md focus:outline-none focus:border-black transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                      if (onSearchSubmit) {
                        onSearchSubmit("");
                      }
                    }}
                    className="ml-1.5 p-1 text-neutral-400 hover:text-black focus:outline-none"
                    aria-label="Close search"
                  >
                    <Icon icon="mdi:close" className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(true);
                    if (onSearchClick) onSearchClick();
                  }}
                  className="p-1 text-neutral-700 hover:text-black transition-colors focus:outline-none hover:scale-105 active:scale-95"
                  aria-label="Search"
                >
                  <Icon icon="mdi:magnify" className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Profile Icon */}
            <button
              type="button"
              onClick={onProfileClick || (() => (window.location.href = "/profile"))}
              className="p-1 text-neutral-700 hover:text-black transition-colors focus:outline-none hover:scale-105 active:scale-95"
              aria-label="User Account"
            >
              <Icon icon="mdi:account-outline" className="w-5 h-5" />
            </button>

            {/* Star / Wishlist Icon */}
            <button
              type="button"
              onClick={onWishlistClick || (() => (window.location.href = "/wishlist"))}
              className="relative p-1 text-neutral-700 hover:text-black transition-colors focus:outline-none hover:scale-105 active:scale-95"
              aria-label="Wishlist"
            >
              <Icon icon="mdi:star-outline" className="w-5 h-5" />
              {(wishlistCount > 0 || wishlistTotal>0) && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                  {wishlistCount || wishlistTotal}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart Icon */}
            <button
              type="button"
              onClick={onCartClick || (() => (window.location.href = "/cart"))}
              className="relative p-1 text-neutral-700 hover:text-black transition-colors focus:outline-none hover:scale-105 active:scale-95"
              aria-label="Shopping Bag"
            >
              <Icon icon="mdi:shopping-outline" className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 text-neutral-700 hover:text-black focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <Icon icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"} className="w-6 h-6" />
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-6 py-4 space-y-3 shadow-md animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-2.5 text-left">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-700 hover:text-black py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                Pages
              </span>
              {pageLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-sm text-neutral-600 hover:text-black py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header_2;