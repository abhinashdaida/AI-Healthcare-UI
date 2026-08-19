import React from "react";
import { Icon } from "@iconify/react";

const EmptyState = ({
  icon = "mdi:package-variant-closed",
  title = "No items found",
  description = "There are no items available at the moment.",
  buttonText = "",
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center ${className}`}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <Icon
          icon={icon}
          className="h-8 w-8 text-gray-500"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

      {buttonText && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;