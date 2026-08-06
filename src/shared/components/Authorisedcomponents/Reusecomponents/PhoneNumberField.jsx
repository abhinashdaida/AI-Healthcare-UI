import React from "react";
import CountryCode from "./Countrycode";

const PhoneNumberField = ({
  value,
  onChange,
  error,
  setError,
  selectedCountry,
  onCountryChange
}) => {

  const handleInputChange = (e) => {
    // Only allow numeric values
    const numericValue = e.target.value.replace(/\D/g, "");
    
    // Maximum length: 10 digits
    if (numericValue.length <= 10) {
      onChange(numericValue);

      // Automatic validation: when valid 10-digit number is entered, error disappears
      if (numericValue.length === 10) {
        setError("");
      } else if (numericValue.length > 0 && error) {
        setError("Enter the phone number 10 digit");
      } else if (numericValue.length === 0 && error) {
        setError("Enter the phone number");
      }
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-slate-700 mb-1">Phone Number</label>
      <div className="flex gap-2.5 w-full items-center">
        {/* Country Code Selector */}
        <div className="border border-slate-200 rounded-xl px-3 bg-white h-[48px] flex items-center shrink-0">
          <CountryCode value={selectedCountry} onChange={onCountryChange} />
        </div>

        {/* Phone Input Box */}
        <div className={`flex-1 flex items-center border rounded-xl px-3 bg-white h-[48px] transition-all ${
          error
            ? "border-red-500 focus-within:border-red-500"
            : "border-slate-200 focus-within:border-[#086952] focus-within:ring-2 focus-within:ring-[#086952]/10"
        }`}>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={value}
            onChange={handleInputChange}
            className="w-full h-full border-0 focus:outline-none focus:ring-0 text-sm text-slate-700 font-medium placeholder-slate-400 bg-transparent"
          />
        </div>
      </div>

      {/* Red Error Message display below input field */}
      {error && (
        <p className="text-red-500 text-xs font-semibold mt-1.5 transition-opacity duration-150">
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberField;
