import React from "react";

/**
 * Reusable ProductPrice component to handle standard pricing format.
 * Located in: src/components/product/ProductPrice/ProductPrice.jsx
 * 
 * Props:
 * @param {number} price - Current sale price
 * @param {number} originalPrice - Regular price before discount
 * @param {number} discount - Optional discount percentage override
 * @param {string} currency - Currency prefix symbol (default '₹')
 */
const ProductPrice = ({
  price = 0,
  originalPrice,
  discount,
  currency = "$",
  className = ""
}) => {
  const numPrice = Number(price) || 0;
  const numOriginal = originalPrice ? Number(originalPrice) : null;
  const hasDiscount = numOriginal && numOriginal > numPrice;
  
  // Calculate discount or use provided discount
  const discountPercentage = discount !== undefined 
    ? discount 
    : (hasDiscount ? Math.round(((numOriginal - numPrice) / numOriginal) * 100) : 0);

  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      {/* Current Sale Price */}
      <span className="text-base font-bold text-neutral-900">
        {currency}{numPrice.toLocaleString()}
      </span>

      {/* Slashed Original Price */}
      {hasDiscount && (
        <span className="text-xs sm:text-sm text-neutral-400 line-through">
          {currency}{numOriginal.toLocaleString()}
        </span>
      )}

      {/* Discount Percentage Badge */}
      {discountPercentage > 0 && (
        <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
          {discountPercentage}% OFF
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
