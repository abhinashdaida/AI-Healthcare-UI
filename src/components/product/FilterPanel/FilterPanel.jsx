import React from "react";
import {
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";

const sizes = ["S", "M", "L", "XL"];

const colors = [
  { name: "Red", hex: "#ef4444" },
  { name: "Orange", hex: "#f97316" },
  { name: "Yellow", hex: "#facc15" },
  { name: "Green", hex: "#22c55e" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Purple", hex: "#8b5cf6" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Brown", hex: "#78350f" },
  { name: "Black", hex: "#111827" },
  { name: "White", hex: "#ffffff" },
];

const brands = [
  "FASCO",
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
                className={`h-9 w-10 border text-xs font-semibold rounded-md transition ${
                  active
                    ? "border-black bg-black text-white shadow-sm"
                    : "border-gray-200 bg-white text-neutral-800 hover:border-black"
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
          {colors.map((c) => {
            const active = safeFilters.color === c.hex || safeFilters.color === c.name;

            return (
              <button
                type="button"
                key={c.hex}
                onClick={() =>
                  updateFilter(
                    "color",
                    active ? "" : c.hex
                  )
                }
                title={c.name}
                aria-label={`Select ${c.name}`}
                className={`h-6 w-6 rounded-full border border-gray-300 transition-all transform hover:scale-110 relative flex items-center justify-center ${
                  active
                    ? "ring-2 ring-black ring-offset-2 scale-110 shadow-md"
                    : ""
                }`}
                style={{
                  backgroundColor: c.hex,
                }}
              >
                {active && (
                  <span
                    className={`block w-2 h-2 rounded-full ${
                      c.hex === "#ffffff" ? "bg-black" : "bg-white"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
        {safeFilters.color && (
          <div className="mt-2 text-[11px] text-neutral-500 flex items-center justify-between">
            <span>
              Filtered:{" "}
              <strong>
                {colors.find((c) => c.hex === safeFilters.color)?.name || safeFilters.color}
              </strong>
            </span>
            <button
              onClick={() => updateFilter("color", "")}
              className="text-neutral-400 hover:text-black underline"
            >
              Reset
            </button>
          </div>
        )}
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

        <div className="flex justify-between text-xs text-gray-500 font-medium">
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
        <div className="flex flex-col space-y-0.5">
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
                <span className="text-sm text-neutral-700">
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
                  safeFilters.collection === collection ? "" : collection
                )
              }
              className={`block text-left text-xs transition ${
                safeFilters.collection === collection
                  ? "font-bold text-black"
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
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-600 hover:border-black"
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