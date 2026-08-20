import React from "react";
import {
  EditOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

export default function AddressCard({
  address,
  selected = false,
  onSelect,
  onEdit,
  onDelete,
}) {
  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-lg border p-5 transition ${
        selected
          ? "border-black bg-gray-50"
          : "border-gray-200 bg-white hover:border-gray-400"
      }`}
    >
      {/* Selected Indicator */}
      <div className="absolute right-4 top-4">
        <span
          className={`block h-4 w-4 rounded-full border-2 ${
            selected
              ? "border-black bg-black"
              : "border-gray-300 bg-white"
          }`}
        />
      </div>

      {/* Address Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <LocationOnOutlined fontSize="small" />
        </div>

        <div>
          <h3 className="text-sm font-semibold">
            {address.name}
          </h3>

          {address.type && (
            <span className="text-xs text-gray-500">
              {address.type}
            </span>
          )}
        </div>
      </div>

      {/* Address Details */}
      <div className="space-y-1 text-sm text-gray-600">
        <p>{address.phone}</p>

        <p>{address.addressLine1}</p>

        {address.addressLine2 && (
          <p>{address.addressLine2}</p>
        )}

        <p>
          {address.city}, {address.state} -{" "}
          {address.pincode}
        </p>

        {address.country && (
          <p>{address.country}</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-end gap-1 border-t pt-3">
        {/* Edit */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(address);
          }}
        >
          <EditOutlined fontSize="small" />
        </IconButton>

        {/* Delete */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(address.id);
          }}
        >
          <Icon
            icon="mdi:delete-outline"
            width="20"
            height="20"
          />
        </IconButton>
      </div>
    </div>
  );
}