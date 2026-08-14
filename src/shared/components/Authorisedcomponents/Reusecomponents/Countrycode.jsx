// Countrycode.jsx
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const countries = [
  { name: "India", code: "+91", flag: "twemoji:flag-india" },
  { name: "United States", code: "+1", flag: "twemoji:flag-united-states" },
  { name: "United Kingdom", code: "+44", flag: "twemoji:flag-united-kingdom" },
  { name: "Australia", code: "+61", flag: "twemoji:flag-australia" },
  { name: "Canada", code: "+1", flag: "twemoji:flag-canada" },
  { name: "Germany", code: "+49", flag: "twemoji:flag-germany" },
  { name: "France", code: "+33", flag: "twemoji:flag-france" },
  { name: "Italy", code: "+39", flag: "twemoji:flag-italy" },
  { name: "Spain", code: "+34", flag: "twemoji:flag-spain" },
  { name: "Japan", code: "+81", flag: "twemoji:flag-japan" },
  { name: "China", code: "+86", flag: "twemoji:flag-china" },
  { name: "South Korea", code: "+82", flag: "twemoji:flag-south-korea" },
  { name: "Singapore", code: "+65", flag: "twemoji:flag-singapore" },
  { name: "Malaysia", code: "+60", flag: "twemoji:flag-malaysia" },
  { name: "Thailand", code: "+66", flag: "twemoji:flag-thailand" },
  { name: "Sri Lanka", code: "+94", flag: "twemoji:flag-sri-lanka" },
  { name: "Nepal", code: "+977", flag: "twemoji:flag-nepal" },
  { name: "Bangladesh", code: "+880", flag: "twemoji:flag-bangladesh" },
  { name: "Pakistan", code: "+92", flag: "twemoji:flag-pakistan" },
  { name: "United Arab Emirates", code: "+971", flag: "twemoji:flag-united-arab-emirates" },
  { name: "Saudi Arabia", code: "+966", flag: "twemoji:flag-saudi-arabia" },
  { name: "Qatar", code: "+974", flag: "twemoji:flag-qatar" },
  { name: "Kuwait", code: "+965", flag: "twemoji:flag-kuwait" },
  { name: "Oman", code: "+968", flag: "twemoji:flag-oman" },
  { name: "Brazil", code: "+55", flag: "twemoji:flag-brazil" },
  { name: "Mexico", code: "+52", flag: "twemoji:flag-mexico" },
  { name: "Russia", code: "+7", flag: "twemoji:flag-russia" },
  { name: "South Africa", code: "+27", flag: "twemoji:flag-south-africa" },
  { name: "New Zealand", code: "+64", flag: "twemoji:flag-new-zealand" },
  { name: "Ireland", code: "+353", flag: "twemoji:flag-ireland" },
  { name: "Denmark", code: "+45", flag: "twemoji:flag-denmark" },
  { name: "Norway", code: "+47", flag: "twemoji:flag-norway" },
  { name: "Finland", code: "+358", flag: "twemoji:flag-finland" },
  { name: "Greece", code: "+30", flag: "twemoji:flag-greece" },
  { name: "Turkey", code: "+90", flag: "twemoji:flag-turkey" },
  { name: "Egypt", code: "+20", flag: "twemoji:flag-egypt" },
  { name: "Nigeria", code: "+234", flag: "twemoji:flag-nigeria" },
  { name: "Kenya", code: "+254", flag: "twemoji:flag-kenya" },
  { name: "Argentina", code: "+54", flag: "twemoji:flag-argentina" },
  { name: "Chile", code: "+56", flag: "twemoji:flag-chile" },
  { name: "Colombia", code: "+57", flag: "twemoji:flag-colombia" },
  { name: "Peru", code: "+51", flag: "twemoji:flag-peru" },
  { name: "Venezuela", code: "+58", flag: "twemoji:flag-venezuela" },
  { name: "Poland", code: "+48", flag: "twemoji:flag-poland" },
  { name: "Ukraine", code: "+380", flag: "twemoji:flag-ukraine" },
  { name: "Romania", code: "+40", flag: "twemoji:flag-romania" },
  { name: "Netherlands", code: "+31", flag: "twemoji:flag-netherlands" },
  { name: "Belgium", code: "+32", flag: "twemoji:flag-belgium" },
  { name: "Portugal", code: "+351", flag: "twemoji:flag-portugal" },
  { name: "Sweden", code: "+46", flag: "twemoji:flag-sweden" },
  { name: "Switzerland", code: "+41", flag: "twemoji:flag-switzerland" },
  { name: "Austria", code: "+43", flag: "twemoji:flag-austria" },
  { name: "Hungary", code: "+36", flag: "twemoji:flag-hungary" },
  { name: "Czech Republic", code: "+420", flag: "twemoji:flag-czech-republic" },
];

const CountryCode = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      {/* Selected Country Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-3 border-r border-slate-200 bg-white hover:bg-slate-50 transition min-w-[95px]"
      >
        <Icon icon={value.flag} className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium text-slate-700">{value.code}</span>
        <Icon
          icon={`lucide:chevron-${open ? "up" : "down"}`}
          className="w-4 h-4 text-slate-500"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl z-[99999] max-h-72 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={`${country.name}-${country.code}`}
              type="button"
              onClick={() => {
                onChange(country);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-100 ${
                value.name === country.name ? "bg-[#086952]/10" : ""
              }`}
            >
              <Icon icon={country.flag} className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-medium text-slate-700">
                  {country.name}
                </span>
                <span className="text-xs text-slate-400">{country.code}</span>
              </div>
              {value.name === country.name && (
                <Icon icon="lucide:check" className="w-4 h-4 text-[#086952]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryCode;