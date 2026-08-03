import React from "react";

/**
 * FormTextArea — reusable multi-line text field, styled to match FormInput.
 * Not yet wired into a step (Medical History / Insurance Details / Health
 * Records are still placeholder steps) but ready for when those steps are
 * built out — e.g. "describe your condition" type fields.
 *
 * Props:
 *   name        {string}   — textarea name attribute
 *   value       {string}   — controlled value
 *   onChange    {fn}       — (e) => void
 *   onBlur      {fn}       — (e) => void
 *   placeholder {string}
 *   rows        {number}   — visible row count (default: 4)
 *   error       {string}   — error message (empty = no error)
 *   showError   {boolean}  — whether to display the error
 *   disabled    {boolean}
 *   className   {string}   — extra classes appended to the <textarea>
 */
const FormTextArea = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder = "",
  rows = 4,
  error = "",
  showError = false,
  disabled = false,
  className = "",
}) => {
  const baseClass =
    "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-xs font-normal text-[#141414] outline-none placeholder:text-[#666666] focus:border-[#096B58] transition-colors duration-150 resize-none";

  const errorClass = showError && error ? "border-[#EF4444]" : "";
  const disabledClass = disabled ? "bg-[#F5F5F5] text-[#666666] cursor-not-allowed" : "";

  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`${baseClass} ${errorClass} ${disabledClass} ${className}`}
      />

      {showError && error && (
        <p className="absolute left-0 top-[calc(100%+2px)] text-xs text-[#EF4444] leading-none">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormTextArea;
