import React from "react";

const SettingsInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-800">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
      />
    </div>
  );
};

export default SettingsInput;