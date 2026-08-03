import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import downArrow from "@assets/patientRegistration/downarrow.svg";

/**
 * FormSelect — searchable custom dropdown, shared across all registration steps.
 *
 * Props:
 *   name              {string}   — field name (passed back to onSelect / onBlur)
 *   value             {string}   — currently selected value
 *   options           {string[]} — list of option strings
 *   placeholder       {string}   — shown when nothing is selected
 *   searchPlaceholder {string}   — placeholder inside search input
 *   icon              {string}   — SVG src for the left icon (optional)
 *   iconAlt           {string}   — alt text for icon
 *   onSelect          {fn}       — (name, value) => void
 *   onBlur            {fn}       — (name) => void — called when dropdown closes without a pick
 *   error             {string}   — error message
 *   showError         {boolean}  — whether to display the error
 *   className         {string}   — extra classes on the trigger button
 */
const FormSelect = ({
  name,
  value,
  options = [],
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  icon,
  iconAlt = "",
  onSelect,
  onBlur,
  error = "",
  showError = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openUpward, setOpenUpward] = useState(false);
  const selectRef = useRef(null);
  const triggerRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  // Close on outside click — also fires onBlur so validation runs
  useEffect(() => {
    const handleOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        if (isOpen) onBlur?.(name);
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, name, onBlur]);

  // Check and decide whether to open upward or downward based on viewport space
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // If space below is less than 280px, and there's more space above than below, open upward
      if (spaceBelow < 280 && spaceAbove > spaceBelow) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (isOpen) onBlur?.(name);
    setIsOpen((cur) => !cur);
    setSearchTerm("");
  };

  const handleSelect = (option) => {
    onSelect(name, option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const triggerBase =
    "h-10 w-full rounded-lg border border-[#E5E7EB] bg-white pr-10 text-xs font-normal outline-none text-left transition-colors duration-150 focus:border-[#096B58]";

  return (
    <div className="relative" ref={selectRef}>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className={`${triggerBase} relative flex items-center ${icon ? "pl-12" : "px-4"} ${
          value ? "text-[#141414]" : "text-[#666666]"
        } ${showError && error ? "border-[#EF4444]" : ""} ${className}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {icon && (
          <img
            src={icon}
            alt={iconAlt}
            className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 pointer-events-none"
          />
        )}
        <span className="block truncate">{value || placeholder}</span>
        <img
          src={downArrow}
          alt=""
          className={`absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Inline error */}
      {showError && error && (
        <p className="absolute left-0 top-[calc(100%+2px)] text-xs text-[#EF4444] leading-none">
          {error}
        </p>
      )}

      {/* Dropdown panel */}
      {isOpen && (
        <div className={`absolute left-0 right-0 z-30 overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-[0_10px_28px_rgba(20,20,20,0.14)] ${
          openUpward ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"
        }`}>
          {/* Search input */}
          <div className="p-3">
            <div className="relative">
              <Search
                size={16}
                strokeWidth={1.75}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-10 w-full rounded-md border border-[#E5E7EB] pl-12 pr-4 text-sm font-normal text-[#141414] outline-none placeholder:text-[#777777] focus:border-[#D0D0D0]"
                autoFocus
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-52 overflow-y-auto px-3 pb-2" role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = option === value;
                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    className={`relative flex h-12 w-full items-center border-b border-[#E5E7EB] text-left text-sm font-normal last:border-b-0 cursor-pointer px-3 transition-colors duration-150 ${
                      isSelected
                        ? "text-[#096B58] font-semibold"
                        : "text-[#141414] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })
            ) : (
              <p className="py-4 text-center text-sm text-[#999999]">
                No results found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSelect;
