import React, { useEffect } from "react";
import { Icon } from "@iconify/react";

const Toast = ({
  open = false,
  message = "",
  type = "success",
  duration = 3000,
  onClose,
  position = "top-right",
}) => {
  useEffect(() => {
    if (!open || !duration) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const typeConfig = {
    success: {
      icon: "mdi:check-circle",
      iconClass: "text-green-600",
      bgClass: "bg-white",
      borderClass: "border-green-100",
    },

    error: {
      icon: "mdi:alert-circle",
      iconClass: "text-red-600",
      bgClass: "bg-white",
      borderClass: "border-red-100",
    },

    warning: {
      icon: "mdi:alert",
      iconClass: "text-yellow-600",
      bgClass: "bg-white",
      borderClass: "border-yellow-100",
    },

    info: {
      icon: "mdi:information",
      iconClass: "text-blue-600",
      bgClass: "bg-white",
      borderClass: "border-blue-100",
    },
  };

  const config =
    typeConfig[type] || typeConfig.success;

  const positionClasses = {
    "top-right": "right-5 top-5",
    "top-left": "left-5 top-5",
    "top-center":
      "left-1/2 top-5 -translate-x-1/2",
    "bottom-right":
      "right-5 bottom-5",
    "bottom-left":
      "left-5 bottom-5",
    "bottom-center":
      "left-1/2 bottom-5 -translate-x-1/2",
  };

  return (
    <div
      className={`fixed z-[10000] ${positionClasses[position] || positionClasses["top-right"]}`}
    >
      <div
        className={`flex min-w-[280px] max-w-sm items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${config.bgClass} ${config.borderClass}`}
      >
        <Icon
          icon={config.icon}
          className={`h-5 w-5 shrink-0 ${config.iconClass}`}
        />

        <p className="flex-1 text-sm text-gray-800">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 transition hover:text-black"
          aria-label="Close notification"
        >
          <Icon
            icon="mdi:close"
            className="h-5 w-5"
          />
        </button>
      </div>
    </div>
  );
};

export default Toast;