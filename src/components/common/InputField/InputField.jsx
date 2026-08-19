import React, { useState } from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable InputField Component for BuyCommerce Application.
 * Located in: src/components/common/InputField/InputField.jsx
 * 
 * Props:
 * @param {string} label - Input label text (e.g. 'Email Address', 'Password')
 * @param {string} type - Input type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'date' (Default: 'text')
 * @param {string} name - Input field name
 * @param {string|number} value - Controlled input value
 * @param {string} placeholder - Dynamic placeholder text
 * @param {function} onChange - Input change callback
 * @param {function} onBlur - Input blur callback
 * @param {boolean} required - Indicates if the field is required (displays '*')
 * @param {boolean} disabled - Disables input editing and applies disabled styles
 * @param {boolean} readOnly - Makes input read-only
 * @param {boolean} error - Validation failure boolean (applies red border/text)
 * @param {string} helperText - Error message or helper description text
 * @param {React.ReactNode} icon - Optional leading icon (e.g. <Icon icon="mdi:magnify" />)
 * @param {string} className - Additional wrapper Tailwind CSS classes
 * @param {string} inputClassName - Additional direct input Tailwind CSS classes
 */
const InputField = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  readOnly = false,
  error = false,
  helperText = "",
  icon = null,
  className = "",
  inputClassName = "",
  id,
  ...rest
}) => {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Generate unique input ID for accessibility
  const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const isPasswordField = type === "password";
  const effectiveType = isPasswordField ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col w-full text-left space-y-1.5 ${className}`}>
      
      {/* 1. Label with Required Indicator */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-wider text-neutral-700 select-none flex items-center gap-1"
        >
          <span>{label}</span>
          {required && <span className="text-red-500 font-bold" aria-hidden="true">*</span>}
        </label>
      )}

      {/* 2. Input Container */}
      <div className="relative flex items-center w-full">
        
        {/* Optional Leading Icon */}
        {icon && (
          <div className="absolute left-3.5 flex items-center justify-center text-neutral-400 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Core Input Element */}
        <input
          id={inputId}
          name={name}
          type={effectiveType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={helperText ? `${inputId}-helper-text` : undefined}
          className={`w-full rounded-md bg-white text-sm text-neutral-900 placeholder-neutral-400 border transition-all duration-200 outline-none
            ${icon ? "pl-10" : "pl-4"}
            ${isPasswordField ? "pr-10" : "pr-4"}
            py-2.5
            ${
              error
                ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                : "border-neutral-300 focus:border-black focus:ring-2 focus:ring-neutral-100"
            }
            ${
              disabled
                ? "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed select-none"
                : ""
            }
            ${readOnly ? "bg-neutral-50 cursor-default" : ""}
            ${inputClassName}
          `}
          {...rest}
        />

        {/* Password Show / Hide Toggle Button (Iconify Only) */}
        {isPasswordField && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute right-3 p-1 text-neutral-400 hover:text-neutral-700 transition-colors focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon
              icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
              className="w-5 h-5"
            />
          </button>
        )}
      </div>

      {/* 3. Error Message or Helper Text */}
      {helperText && (
        <span
          id={`${inputId}-helper-text`}
          className={`text-xs font-medium transition-all duration-150 ${
            error ? "text-red-500" : "text-neutral-500"
          }`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default InputField;
