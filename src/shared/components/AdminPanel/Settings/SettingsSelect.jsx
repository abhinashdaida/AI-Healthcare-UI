import React from "react";

const SettingsSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-800">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SettingsSelect;