import React from "react";
import { Icon } from "@iconify/react";

/**
 * FASCO Clean SortDropdown Component matching reference design.
 * Default value shows "All products" on initial load.
 * Located in: src/components/product/SortDropdown/SortDropdown.jsx
 */
export default function SortDropdown({
  value = "all",
  onChange,
}) {
  // Normalize value so it defaults to "all" if empty
  const validValue = value || "all";

  return (
    <div className="flex items-center gap-2 text-sm text-neutral-600">
      <label htmlFor="sort-select" className="text-xs sm:text-sm text-neutral-500 font-medium whitespace-nowrap">
        Sort by:
      </label>

      <div className="relative inline-block w-full max-w-[160px]">
        <select
          id="sort-select"
          value={validValue}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full appearance-none bg-white border border-neutral-300 rounded-md py-1.5 pl-3 pr-8 text-xs sm:text-sm font-medium text-neutral-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer shadow-2xs hover:border-neutral-400 transition"
        >
          <option value="all">All products</option>
          <option value="best-selling">Best selling</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>

        {/* Custom Chevron Icon matching reference image */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-neutral-500">
          <Icon icon="mdi:menu-down" className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}