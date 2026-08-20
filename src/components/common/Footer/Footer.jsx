import React, { useState } from "react";
import { Icon } from "@iconify/react";

/**
 * FASCO Global Footer Component matching the reference design exactly.
 * Located in: src/components/common/Footer/Footer.jsx
 */
const Footer = () => {
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);

  return (
    <footer className="w-full bg-white border-t border-neutral-100 mt-auto overflow-visible relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        
        {/* ========================================================
            TOP ROW: Brand Logo (Left) and Navigation Links (Right)
        ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
          
          {/* FASCO Brand Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl sm:text-[28px] font-serif font-bold text-neutral-900 tracking-tight hover:opacity-90 transition-opacity"
            >
              FASCO
            </a>
          </div>

          {/* Navigation Links (Home, Shop, Products, Pages ⌵) */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-normal text-neutral-600">
            <a
              href="/"
              className="hover:text-black transition-colors"
            >
              Home
            </a>

            <a
              href="/shop"
              className="hover:text-black transition-colors"
            >
              Shop
            </a>

            <a
              href="/products"
              className="hover:text-black transition-colors"
            >
              Products
            </a>

            {/* Pages Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPagesDropdownOpen(!isPagesDropdownOpen)}
                className="flex items-center gap-1 hover:text-black transition-colors focus:outline-none cursor-pointer"
              >
                <span>Pages</span>
                <Icon
                  icon="mdi:chevron-down"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isPagesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Pages Dropdown Menu */}
              {isPagesDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 w-44 bg-white border border-neutral-200 rounded-lg shadow-xl py-2 z-50 text-left text-xs">
                  <a
                    href="/product/fasco-denim-01"
                    className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    Product Details
                  </a>
                  <a
                    href="/cart"
                    className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    Shopping Cart
                  </a>
                  <a
                    href="/shop"
                    className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    Fashion Catalog
                  </a>
                  <a
                    href="/landing"
                    className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    Landing Showcase
                  </a>
                </div>
              )}
            </div>
          </nav>

        </div>

        {/* ========================================================
            BOTTOM ROW: Centered Copyright Notice
        ======================================================== */}
        <div className="pt-8 sm:pt-12 text-center">
          <p className="text-xs text-neutral-400 font-normal tracking-wide">
            Copyright © 2022 FASCO . All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
