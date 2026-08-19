import React from "react";

const SettingsCard = ({
  title,
  children,
  onSave,
  onCancel,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

      {/* Card Header */}
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>
      </div>

      {/* Card Content */}
      <div className="px-6 py-6">
        {children}
      </div>

      {/* Card Actions */}
      <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          onClick={onSave}
          className="rounded-lg bg-purple-700 px-5 py-2 text-sm font-medium text-white hover:bg-purple-800"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
};

export default SettingsCard;