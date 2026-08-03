import React from "react";

const FormInput = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder = "",
  type = "text",
  icon,
  iconAlt = "",
  error = "",
  showError = false,
  disabled = false,
  className = "",
  suffix,
  prefix,
}) => {
  const baseClass =
    "h-10 w-full rounded-lg border-[0.5px] border-[#D0D0D0] text-xs font-normal outline-none transition-colors duration-150";

  const normalClass =
    "bg-white text-[#141414] placeholder:text-[#666666] focus:border-[#096B58]";

  const disabledClass =
    "bg-[#F4F4F4] border-[0.5px] border-[#D0D0D0] text-[#8A8A8A] placeholder:text-[#8A8A8A] cursor-not-allowed";

  const errorClass =
    showError && error ? "border-[#EF4444]" : "";

  return (
    <div className="relative">
      {/* Left icon */}
      {icon && (
        <img
          src={icon}
          alt={iconAlt}
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 z-10 pointer-events-none ${
            disabled ? "opacity-50" : ""
          }`}
        />
      )}

      {/* Left prefix */}
      {prefix && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#666666] z-10 pointer-events-none">
          {prefix}
        </div>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          ${baseClass}
          ${disabled ? disabledClass : normalClass}
          ${errorClass}
          ${icon || prefix ? "pl-12" : "px-4"}
          ${suffix ? "pr-20" : ""}
          ${className}
        `}
      />

      {/* Right suffix */}
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {suffix}
        </div>
      )}

      {/* Error */}
      {showError && error && (
        <p className="absolute left-0 top-[calc(100%+2px)] text-xs text-[#EF4444] leading-none">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
