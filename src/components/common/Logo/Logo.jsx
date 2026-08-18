import React from "react";
import logoSvg from "../../../assets/images/logo.svg";

/**
 * Reusable Logo component rendering the BuyCommerce vector logo.
 * Located in: src/components/common/Logo/Logo.jsx
 */
const Logo = ({ className = "h-8 w-auto", href = "/" }) => {
  return (
    <a href={href} className="inline-flex items-center gap-2 group focus:outline-none">
      <img
        src={logoSvg}
        alt="BuyCommerce Logo"
        className={`object-contain transition-transform duration-200 group-hover:scale-105 ${className}`}
      />
    </a>
  );
};

export default Logo;
