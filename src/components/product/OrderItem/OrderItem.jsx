import React from "react";
import {
  Add,
  Remove,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

export default function OrderItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 border-b py-5">
      {/* Product Image */}
      <div className="h-28 w-24 flex-shrink-0 overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold">
                {item.name}
              </h3>

              {item.brand && (
                <p className="mt-1 text-xs text-gray-500">
                  {item.brand}
                </p>
              )}
            </div>

            {/* Delete */}
            <button
              type="button"
              onClick={() => onRemove?.(item.id)}
              className="text-gray-400 transition hover:text-red-500"
            >
              <Icon
                icon="mdi:delete-outline"
                width="20"
                height="20"
              />
            </button>
          </div>

          {/* Variants */}
          <div className="mt-2 flex gap-4 text-xs text-gray-500">
            {item.selectedSize && (
              <span>
                Size:{" "}
                <strong className="text-gray-800">
                  {item.selectedSize}
                </strong>
              </span>
            )}

            {item.color && (
              <span>
                Color:{" "}
                <strong className="text-gray-800">
                  {item.color}
                </strong>
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center border">
            <IconButton
              size="small"
              onClick={() => onDecrease?.(item.id)}
            >
              <Remove fontSize="small" />
            </IconButton>

            <span className="w-8 text-center text-sm">
              {item.quantity}
            </span>

            <IconButton
              size="small"
              onClick={() => onIncrease?.(item.id)}
            >
              <Add fontSize="small" />
            </IconButton>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-semibold">
              ${itemTotal.toFixed(2)}
            </p>

            {item.quantity > 1 && (
              <p className="text-xs text-gray-400">
                ${item.price.toFixed(2)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}