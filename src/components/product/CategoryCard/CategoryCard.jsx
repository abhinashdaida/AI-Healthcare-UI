import React from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable CategoryCard Component for BuyCommerce Application.
 * Located in: src/components/product/CategoryCard/CategoryCard.jsx
 * 
 * Props:
 * @param {Object} category - Category data object { id, name, image, icon, productCount, description, href }
 * @param {string} name - Fallback direct category name prop
 * @param {string} image - Fallback direct image URL prop
 * @param {string} icon - Fallback direct Iconify icon name (e.g. 'mdi:cellphone')
 * @param {number} productCount - Fallback direct product count prop
 * @param {string} description - Fallback direct description prop
 * @param {function} onClick - Click event callback (passes category object)
 * @param {string} className - Additional wrapper Tailwind CSS classes
 */
const CategoryCard = ({
  category = {},
  name,
  image,
  icon,
  productCount,
  description,
  onClick,
  className = "",
  ...rest
}) => {
  // Extract fields safely from category object or direct props
  const displayName = category.name || category.title || name || "Category";
  const displayImage = category.image || category.imageUrl || image;
  const displayIcon = category.icon || category.iconName || icon;
  const displayCount =
    category.productCount !== undefined
      ? category.productCount
      : category.count !== undefined
      ? category.count
      : productCount;
  const displayDesc = category.description || description;

  const handleClick = (e) => {
    if (onClick) {
      onClick(category.id ? category : { ...category, name: displayName });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex flex-col w-full bg-white border border-neutral-200 rounded-lg overflow-hidden cursor-pointer select-none transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${className}`}
      {...rest}
    >
      {/* 1. Category Image Container */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
        {displayImage ? (
          <img
            src={displayImage}
            alt={displayName}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          /* Fallback visual when image is not provided */
          <div className="h-full w-full flex items-center justify-center bg-neutral-100 text-neutral-400">
            {displayIcon ? (
              <Icon
                icon={displayIcon}
                className="w-12 h-12 text-neutral-400 group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <Icon icon="mdi:tag-outline" className="w-10 h-10 text-neutral-300" />
            )}
          </div>
        )}

        {/* Floating Category Icon (if both image and icon exist) */}
        {displayIcon && displayImage && (
          <div className="absolute top-3 left-3 z-10">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-xs text-neutral-800 shadow-xs group-hover:bg-black group-hover:text-white transition-colors duration-200">
              <Icon icon={displayIcon} className="w-4 h-4" />
            </span>
          </div>
        )}
      </div>

      {/* 2. Category Details Content */}
      <div className="p-4 flex flex-col flex-1 text-left justify-between">
        <div>
          {/* Category Title */}
          <h3 className="text-base font-bold text-neutral-900 group-hover:text-black transition-colors line-clamp-1">
            {displayName}
          </h3>

          {/* Optional Short Description */}
          {displayDesc && (
            <p className="mt-1 text-xs text-neutral-500 line-clamp-2">
              {displayDesc}
            </p>
          )}
        </div>

        {/* Bottom Metadata: Product Count & Arrow */}
        <div className="mt-3 pt-2 flex items-center justify-between border-t border-neutral-100 text-xs">
          {displayCount !== undefined ? (
            <span className="text-neutral-500 font-medium">
              {Number(displayCount).toLocaleString()} Products
            </span>
          ) : (
            <span className="text-neutral-400 font-medium text-[11px] uppercase tracking-wider">
              Explore
            </span>
          )}

          {/* Subtle Hover Action Arrow */}
          <span className="flex items-center text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-200 font-semibold text-xs">
            Shop <Icon icon="mdi:arrow-right" className="w-3.5 h-3.5 ml-1" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
