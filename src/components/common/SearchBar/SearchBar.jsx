import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Button from "../Button/Button";

/**
 * Reusable SearchBar Component for BuyCommerce Application.
 * Located in: src/components/common/SearchBar/SearchBar.jsx
 * 
 * Props:
 * @param {string} value - Controlled search input value
 * @param {function} onChange - Input change callback (e or string)
 * @param {function} onSearch - Callback triggered on Submit / Enter key / Button click
 * @param {string} placeholder - Dynamic placeholder text (Default: 'Search products...')
 * @param {boolean} disabled - Disables input and interactions
 * @param {boolean} loading - Displays loading spinner and disables interactions
 * @param {boolean} showSearchButton - Whether to display a dedicated Search button (Default: false)
 * @param {string} searchButtonText - Text for search button (Default: 'Search')
 * @param {Array<string|Object>} suggestions - Optional array of search suggestion strings or items
 * @param {function} onSelectSuggestion - Callback when a suggestion item is clicked
 * @param {string} className - Additional wrapper Tailwind CSS classes
 * @param {string} inputClassName - Additional direct input Tailwind CSS classes
 */
const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search products...",
  disabled = false,
  loading = false,
  showSearchButton = false,
  searchButtonText = "Search",
  suggestions = [],
  onSelectSuggestion,
  className = "",
  inputClassName = "",
  ...rest
}) => {
  // Support both controlled and uncontrolled usage gracefully
  const [internalValue, setInternalValue] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const searchContainerRef = useRef(null);

  const isControlled = value !== undefined;
  const query = isControlled ? value : internalValue;

  // Handle outside click to close suggestions popover
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Input change handler
  const handleInputChange = (e) => {
    const val = e.target.value;
    if (!isControlled) {
      setInternalValue(val);
    }
    if (onChange) {
      onChange(e);
    }
    if (suggestions.length > 0) {
      setIsSuggestionsOpen(true);
    }
  };

  // Submit search query
  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled || loading) return;
    setIsSuggestionsOpen(false);
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  // Clear search input
  const handleClear = () => {
    if (disabled || loading) return;
    if (!isControlled) {
      setInternalValue("");
    }
    if (onChange) {
      onChange({ target: { value: "", name: "search" } });
    }
    if (onSearch) {
      onSearch("");
    }
    setIsSuggestionsOpen(false);
  };

  // Handle suggestion click
  const handleSuggestionClick = (item) => {
    const suggestionText = typeof item === "string" ? item : (item.label || item.name || "");
    if (!isControlled) {
      setInternalValue(suggestionText);
    }
    if (onSelectSuggestion) {
      onSelectSuggestion(item);
    } else if (onSearch) {
      onSearch(suggestionText);
    }
    setIsSuggestionsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={searchContainerRef}>
      <form
        onSubmit={handleSubmit}
        className={`flex items-center w-full bg-white border rounded-md transition-all duration-200 ${
          disabled
            ? "bg-neutral-100 border-neutral-200 cursor-not-allowed select-none"
            : "border-neutral-300 focus-within:border-black focus-within:ring-2 focus-within:ring-neutral-100"
        }`}
      >
        {/* 1. Leading Search Icon or Loading Spinner */}
        <div className="pl-3.5 pr-2 flex items-center justify-center text-neutral-400 shrink-0 pointer-events-none">
          {loading ? (
            <Icon icon="mdi:loading" className="w-4 h-4 animate-spin text-neutral-600" />
          ) : (
            <Icon icon="mdi:magnify" className="w-4 h-4 text-neutral-400" />
          )}
        </div>

        {/* 2. Core Search Input */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setIsSuggestionsOpen(true)}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`w-full py-2 text-sm text-neutral-900 placeholder-neutral-400 bg-transparent outline-none ${
            disabled ? "cursor-not-allowed text-neutral-400" : ""
          } ${inputClassName}`}
          {...rest}
        />

        {/* 3. Clear Button (Visible only when text is typed and not loading/disabled) */}
        {!disabled && !loading && Boolean(query) && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 mr-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors shrink-0 focus:outline-none"
            aria-label="Clear search input"
          >
            <Icon icon="mdi:close" className="w-3.5 h-3.5" />
          </button>
        )}

        {/* 4. Optional Reusable Search Button */}
        {showSearchButton && (
          <div className="p-1 shrink-0">
            <Button
              type="submit"
              variant="primary"
              size="small"
              disabled={disabled || loading}
              className="!px-3.5 !py-1.5 !text-xs font-semibold"
            >
              {searchButtonText}
            </Button>
          </div>
        )}
      </form>

      {/* 5. Optional Search Suggestions Dropdown */}
      {isSuggestionsOpen && suggestions.length > 0 && (
        <div className="absolute left-0 top-full mt-1.5 w-full bg-white border border-neutral-200 rounded-md shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100">
            Suggestions
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {suggestions.map((item, index) => {
              const text = typeof item === "string" ? item : (item.label || item.name);
              return (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(item)}
                    className="w-full text-left px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-black flex items-center space-x-2 transition-colors"
                  >
                    <Icon icon="mdi:magnify" className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">{text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
