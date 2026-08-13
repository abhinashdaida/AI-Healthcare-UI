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
      <label className="text-sm font-normal text-[#343434] mb-1">Phone Number</label>
      <div className="flex gap-1.5 w-full items-center">
        {/* Country Code Selector */}
        <div 
          className="border !border-[#D0D0D0] focus-within:!border-[#4D4D4D] rounded-lg bg-white h-[48px] flex items-center shrink-0 transition-all [&_button]:!rounded-lg [&_button]:!border-r-0"
          style={{ borderWidth: '0.3px' }}
        >
          <CountryCode value={selectedCountry} onChange={onCountryChange} />
        </div>

        {/* Phone Input Box */}
        <div 
          className={`flex-1 flex items-center border rounded-lg px-3 bg-white h-[48px] transition-all ${
            error
              ? ""
              : "!border-[#D0D0D0] focus-within:!border-[#4D4D4D]"
          }`}
          style={{ 
            borderWidth: '0.3px',
            borderColor: error ? '#EF4444' : undefined
          }}
        >
          <input
            type="tel"
            placeholder="Enter phone number"
            value={value}
            onChange={handleInputChange}
            className="w-full h-full border-0 focus:outline-none focus:ring-0 text-sm text-slate-700 font-normal placeholder-slate-400 bg-transparent"
          />
        </div>
      </div>

      {/* Red Error Message display below input field */}
      {error && (
        <p className="text-xs font-medium mt-1.5 transition-opacity duration-150" style={{ color: '#EF4444' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberField;
