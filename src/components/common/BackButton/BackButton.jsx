import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

/**
 * Reusable Universal BackButton Component.
 * Supports going back in browser history (navigate(-1)) or to the exact saved listing page/state.
 * 
 * Located in: src/components/common/BackButton/BackButton.jsx
 */
const BackButton = ({
  to,
  label = "Back",
  fallbackPath = "/shop",
  variant = "default",
  className = "",
  onClick,
  state,
  icon = "mdi:arrow-left"
}) => {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    if (onClick) onClick();

    if (to) {
      navigate(to, { state });
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath, { state });
    }
  };

  // Base styles per variant
  const variantStyles = {
    default:
      "inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-black py-2 px-3 rounded-lg hover:bg-neutral-100 transition-all duration-150 active:scale-95 group",
    outline:
      "inline-flex items-center gap-2 text-xs font-semibold text-neutral-800 border border-neutral-300 hover:border-black hover:bg-neutral-50 py-2 px-4 rounded-full transition-all duration-150 active:scale-95 group shadow-2xs",
    ghost:
      "inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-black transition-colors group",
    circle:
      "inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:border-black hover:text-black hover:bg-neutral-50 shadow-xs transition-all duration-150 active:scale-95 group",
    pill:
      "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 py-2.5 px-5 rounded-full shadow-md transition-all duration-150 active:scale-95 group"
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`${variantStyles[variant] || variantStyles.default} ${className} cursor-pointer focus:outline-none select-none`}
      aria-label={label || "Go Back"}
      title={label || "Go Back"}
    >
      <Icon
        icon={icon}
        className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 shrink-0"
      />
      {label && <span>{label}</span>}
    </button>
  );
};

export default BackButton;
