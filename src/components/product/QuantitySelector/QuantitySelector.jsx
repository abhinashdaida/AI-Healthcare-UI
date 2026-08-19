import React from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable QuantitySelector Component for BuyCommerce Application.
 * Located in: src/components/product/QuantitySelector/QuantitySelector.jsx
 * 
 * Props:
 * @param {number} value - Controlled current quantity value (Default: 1)
 * @param {number} quantity - Alternative alias prop for value
 * @param {function} onChange - Callback triggered with updated quantity: (newQty) => void
 * @param {function} onIncrement - Optional callback triggered when incremented
 * @param {function} onDecrement - Optional callback triggered when decremented
 * @param {number} min - Minimum allowable quantity (Default: 1)
 * @param {number} max - Optional maximum allowable quantity (e.g. stock limit)
 * @param {boolean} disabled - Whether the entire selector is disabled
 * @param {string} size - 'small' | 'medium' | 'large' (Default: 'medium')
 * @param {string} className - Additional wrapper Tailwind CSS classes
 */
const QuantitySelector = ({
  value,
  quantity,
  onChange,
  onIncrement,
  onDecrement,
  min = 1,
  max,
  disabled = false,
  size = "medium",
  className = "",
  ...rest
}) => {
  // Normalize current value safely
  const currentQuantity = value !== undefined ? value : (quantity !== undefined ? quantity : min);

  // Boundary checks
  const isMinReached = currentQuantity <= min;
  const isMaxReached = max !== undefined && currentQuantity >= max;

  // Handle decrease click
  const handleDecrease = (e) => {
    e.preventDefault();
    if (disabled || isMinReached) return;

    const newQty = currentQuantity - 1;
    if (onChange) {
      onChange(newQty);
    }
    if (onDecrement) {
      onDecrement();
    }
  };

  // Handle increase click
  const handleIncrease = (e) => {
    e.preventDefault();
    if (disabled || isMaxReached) return;

    const newQty = currentQuantity + 1;
    if (onChange) {
      onChange(newQty);
    }
    if (onIncrement) {
      onIncrement();
    }
  };

  // Size styling maps (Tailwind CSS)
  const sizeStyles = {
    small: {
      container: "h-8 text-xs",
      button: "w-7 h-full",
      value: "w-8 text-xs",
      icon: "w-3 h-3"
    },
    medium: {
      container: "h-9 sm:h-10 text-sm",
      button: "w-8 sm:w-9 h-full",
      value: "w-10 sm:w-12 text-sm",
      icon: "w-3.5 h-3.5"
    },
    large: {
      container: "h-11 sm:h-12 text-base",
      button: "w-10 sm:w-11 h-full",
      value: "w-12 sm:w-14 text-base",
      icon: "w-4 h-4"
    }
  };

  const selectedSize = sizeStyles[size] || sizeStyles.medium;

  return (
    <div
      role="spinbutton"
      aria-valuenow={currentQuantity}
      aria-valuemin={min}
      aria-valuemax={max}
      className={`inline-flex items-center bg-white border border-neutral-300 rounded-md select-none transition-all duration-150 ${
        disabled
          ? "bg-neutral-100 border-neutral-200 cursor-not-allowed opacity-70"
          : "focus-within:border-black focus-within:ring-1 focus-within:ring-black"
      } ${selectedSize.container} ${className}`}
      {...rest}
    >
      {/* 1. Decrease Button (−) */}
      <button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || isMinReached}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center text-neutral-600 transition-colors focus:outline-none ${
          selectedSize.button
        } ${
          disabled || isMinReached
            ? "text-neutral-300 cursor-not-allowed"
            : "hover:bg-neutral-100 hover:text-black active:bg-neutral-200"
        }`}
      >
        <Icon icon="mdi:minus" className={selectedSize.icon} />
      </button>

      {/* 2. Quantity Display Number */}
      <span
        className={`flex items-center justify-center font-semibold text-neutral-900 border-x border-neutral-200 h-full ${selectedSize.value}`}
      >
        {currentQuantity}
      </span>

      {/* 3. Increase Button (+) */}
      <button
        type="button"
        onClick={handleIncrease}
        disabled={disabled || isMaxReached}
        aria-label="Increase quantity"
        className={`flex items-center justify-center text-neutral-600 transition-colors focus:outline-none ${
          selectedSize.button
        } ${
          disabled || isMaxReached
            ? "text-neutral-300 cursor-not-allowed"
            : "hover:bg-neutral-100 hover:text-black active:bg-neutral-200"
        }`}
      >
        <Icon icon="mdi:plus" className={selectedSize.icon} />
      </button>
    </div>
  );
};

export default QuantitySelector;
