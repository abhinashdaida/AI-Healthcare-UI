import React from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable WishlistButton Component for BuyCommerce Application.
 * Located in: src/components/product/WishlistButton/WishlistButton.jsx
 * 
 * Props:
 * @param {string|number} productId - Identifier of the product to add/remove
 * @param {boolean} isWishlisted - Controlled active wishlist state (true = filled heart, false = outline heart)
 * @param {boolean} isLiked - Alternative alias for isWishlisted
 * @param {function} onToggle - Callback triggered on click: (productId, newWishlistState) => void
 * @param {function} onClick - Optional fallback click callback
 * @param {boolean} disabled - Disables interaction and applies disabled styling
 * @param {boolean} loading - Displays loading spinner and prevents interaction
 * @param {string} size - 'small' | 'medium' | 'large' (Default: 'medium')
 * @param {string} ariaLabel - Custom accessibility label override
 * @param {string} className - Additional wrapper Tailwind CSS classes
 */
const WishlistButton = ({
  productId,
  isWishlisted = false,
  isLiked,
  onToggle,
  onClick,
  disabled = false,
  loading = false,
  size = "medium",
  ariaLabel,
  className = "",
  ...rest
}) => {
  // Normalize wishlisted boolean state safely
  const active = isLiked !== undefined ? isLiked : Boolean(isWishlisted);

  // Click handler with propagation stopping
  const handleClick = (e) => {
    e.stopPropagation(); // Prevents triggering parent card navigation
    e.preventDefault();

    if (disabled || loading) return;

    const nextState = !active;

    if (onToggle) {
      onToggle(productId, nextState);
    }
    if (onClick) {
      onClick(e, productId, nextState);
    }
  };

  // Size styling maps (Tailwind CSS)
  const sizeStyles = {
    small: {
      button: "h-8 w-8 p-1.5",
      icon: "w-4 h-4"
    },
    medium: {
      button: "h-9 w-9 sm:h-10 sm:w-10 p-2",
      icon: "w-5 h-5"
    },
    large: {
      button: "h-11 w-11 sm:h-12 sm:w-12 p-2.5",
      icon: "w-6 h-6"
    }
  };

  const selectedSize = sizeStyles[size] || sizeStyles.medium;

  // Accessibility label
  const accessibleLabel =
    ariaLabel || (active ? "Remove from wishlist" : "Add to wishlist");

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={accessibleLabel}
      aria-pressed={active}
      className={`relative inline-flex items-center justify-center rounded-full border border-neutral-200/80 bg-white/95 backdrop-blur-xs shadow-xs transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 ${
        disabled
          ? "opacity-50 cursor-not-allowed bg-neutral-100 border-neutral-200"
          : loading
          ? "cursor-wait opacity-80"
          : "hover:scale-110 active:scale-95 hover:bg-white hover:border-neutral-300 hover:shadow-md"
      } ${selectedSize.button} ${className}`}
      {...rest}
    >
      {loading ? (
        /* Loading Spinner */
        <Icon
          icon="mdi:loading"
          className={`animate-spin text-neutral-400 ${selectedSize.icon}`}
        />
      ) : active ? (
        /* Wishlisted (Filled Red Heart) */
        <Icon
          icon="mdi:heart"
          className={`text-red-500 transition-transform duration-200 scale-100 ${selectedSize.icon}`}
        />
      ) : (
        /* Not Wishlisted (Heart Outline) */
        <Icon
          icon="mdi:heart-outline"
          className={`text-neutral-500 hover:text-red-500 transition-colors duration-200 ${selectedSize.icon}`}
        />
      )}
    </button>
  );
};

export default WishlistButton;
