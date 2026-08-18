import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Logo from "../Logo/Logo";

/**
 * Reusable Footer Component.
 * Located in: src/components/common/Footer/Footer.jsx
 */
const Footer = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const productCategories = [
    { name: "Home & Kitchen", href: "/category/home-kitchen" },
    { name: "Electronics", href: "/category/electronics" },
    { name: "Mobiles", href: "/category/mobiles" },
    { name: "Fashion", href: "/category/fashion" },
    { name: "Sports", href: "/category/sports" }
  ];

  return (
    <footer className="w-full bg-white border-t border-neutral-200 mt-auto text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Col 1: Logo and Tagline */}
          <div className="flex flex-col items-start space-y-4">
            <Logo />
            <p className="text-sm text-neutral-500 max-w-sm">
              BuyCommerce is your premier destination for modern lifestyle, fashion, electronics, and home essentials. Quality guaranteed.
            </p>
            <p className="text-xs text-neutral-400">
              © {new Date().getFullYear()} BuyCommerce Inc. All rights reserved.
            </p>
          </div>

          {/* Col 2: Navigation Links & Expandable Products */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-1">
              Quick Links
            </h4>
            <a href="/" className="text-sm text-neutral-600 hover:text-black transition-colors">
              Home
            </a>
            <a href="/shopping" className="text-sm text-neutral-600 hover:text-black transition-colors">
              Shopping
            </a>

            {/* Products Dropdown */}
            <div className="w-full max-w-xs">
              <button
                type="button"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center justify-between w-full text-sm text-neutral-600 hover:text-black transition-colors py-1 focus:outline-none"
              >
                <span>Products</span>
                <Icon
                  icon="mdi:chevron-down"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expandable Menu (Light Gray bg, Gray on hover) */}
              {isProductsOpen && (
                <div className="mt-2 bg-neutral-100 border border-neutral-200 rounded-md p-2 space-y-1">
                  {productCategories.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-300 rounded transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/new-arrivals" className="text-sm text-neutral-600 hover:text-black transition-colors">
              New Arrivals
            </a>
          </div>

          {/* Col 3: Social Media with Name & Icon */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-1">
              Connect With Us
            </h4>
            
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-neutral-600 hover:text-pink-600 transition-colors"
            >
              <Icon icon="mdi:instagram" className="w-5 h-5" />
              <span>Instagram</span>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-neutral-600 hover:text-sky-500 transition-colors"
            >
              <Icon icon="mdi:twitter" className="w-5 h-5" />
              <span>Twitter</span>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-neutral-600 hover:text-blue-600 transition-colors"
            >
              <Icon icon="mdi:facebook" className="w-5 h-5" />
              <span>Facebook</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
