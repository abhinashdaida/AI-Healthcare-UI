import React from "react";
import {
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";

const sizes = ["S", "M", "L", "XL"];

const colors = [
  "#ef4444",
  "#f97316",
  "#facc15",
  "#84cc16",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#111827",
];

const brands = [
  "Minimo",
  "Retablo",
  "Brook",
  "Mimosa",
];

const collections = [
  "All products",
  "Best sellers",
  "New arrivals",
  "Accessories",
];

const tags = [
  "Fashion",
  "Men",
  "Women",
  "Kids",
  "Shoes",
  "Bags",
  "Accessories",
];

export default function FilterPanel({
  filters = {},
  setFilters,
  onClear,
}) {
  // Safe default values
  const safeFilters = {
    size: filters.size ?? "",
    color: filters.color ?? "",
    price: filters.price ?? [0, 500],
    brands: filters.brands ?? [],
    collection: filters.collection ?? "",
    tags: filters.tags ?? [],
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];

      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return {
        ...prev,
        [key]: updated,
      };
    });
  };

  return (
    <aside className="w-full md:w-[220px]">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Filters
        </h2>

        <button
          type="button"
          onClick={onClear}
          className="text-xs text-gray-500 underline hover:text-black"
        >
          Clear All
        </button>
      </div>

      {/* Size */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const active = safeFilters.size === size;

            return (
              <button
                type="button"
                key={size}
                onClick={() =>
                  updateFilter(
                    "size",
                    active ? "" : size
                  )
                }
                className={`h-9 w-10 border text-xs transition ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-black hover:border-black"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const active = safeFilters.color === color;

            return (
              <button
                type="button"
                key={color}
                onClick={() =>
                  updateFilter(
                    "color",
                    active ? "" : color
                  )
                }
                aria-label={`Select ${color}`}
                className={`h-5 w-5 rounded-full border border-gray-300 ${
                  active
                    ? "ring-2 ring-black ring-offset-2"
                    : ""
                }`}
                style={{
                  backgroundColor: color,
                }}
              />
            );
          })}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Prices">
        <Slider
          value={safeFilters.price}
          onChange={(_, value) =>
            updateFilter("price", value)
          }
          valueLabelDisplay="auto"
          min={0}
          max={500}
          sx={{
            color: "#111",

            "& .MuiSlider-thumb": {
              width: 14,
              height: 14,
            },

            "& .MuiSlider-rail": {
              opacity: 1,
              backgroundColor: "#ddd",
            },
          }}
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>
            ${safeFilters.price?.[0] ?? 0}
          </span>

          <span>
            ${safeFilters.price?.[1] ?? 500}
          </span>
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands">
        <div className="flex flex-col">
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  size="small"
                  checked={safeFilters.brands.includes(
                    brand
                  )}
                  onChange={() =>
                    toggleArrayFilter(
                      "brands",
                      brand
                    )
                  }
                  sx={{
                    color: "#bbb",
                    "&.Mui-checked": {
                      color: "#111",
                    },
                  }}
                />
              }
              label={
                <span className="text-sm">
                  {brand}
                </span>
              }
            />
          ))}
        </div>
      </FilterSection>

      {/* Collections */}
      <FilterSection title="Collections">
        <div className="space-y-2">
          {collections.map((collection) => (
            <button
              type="button"
              key={collection}
              onClick={() =>
                updateFilter(
                  "collection",
                  collection
                )
              }
              className={`block text-left text-xs transition ${
                safeFilters.collection === collection
                  ? "font-semibold text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {collection}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Tags */}
      <FilterSection title="Tags">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const active =
              safeFilters.tags.includes(tag);

            return (
              <button
                type="button"
                key={tag}
                onClick={() =>
                  toggleArrayFilter("tags", tag)
                }
                className={`rounded-full border px-3 py-1 text-xs ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-500 hover:border-black"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </FilterSection>
    </aside>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="mb-7 border-b border-gray-100 pb-6">
      <h3 className="mb-4 text-sm font-semibold">
        {title}
      </h3>

      {children}
    </div>
  );
}