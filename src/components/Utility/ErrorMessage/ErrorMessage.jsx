import React from "react";
import { Icon } from "@iconify/react";

const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
  title = "Error",
  onRetry,
  retryText = "Try Again",
  className = "",
}) => {
  return (
    <div
      className={`rounded-xl border border-red-100 bg-red-50 p-5 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100">
          <Icon
            icon="mdi:alert-circle-outline"
            className="h-5 w-5 text-red-600"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-800">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-red-700">
            {message}
          </p>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
            >
              {retryText}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default ErrorMessage;