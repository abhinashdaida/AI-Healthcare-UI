import { Icon } from "@iconify/react";
import { Typography } from "@mui/material";
import React from "react";

const CustomerStats = ({
  totalCustomers,
  totalActiveCustomers,
  totalBlockedCustomers,
}) => {
  return (
    <div className="flex items-center gap-3">
      {/* Total Customers */}
      <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2">
        <Icon icon="lucide:users" width={18} className="text-[#7B0FB5]" />

        <div className="text-center">
          <Typography
            sx={{
              fontSize: "11px",
              color: "#6B7280",
            }}
          >
            Total Customers
          </Typography>

          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {totalCustomers}
          </Typography>
        </div>
      </div>

      {/* Active Customers */}
      <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2">
        <Icon icon="lucide:user-check" width={18} className="text-green-600" />

        <div className="text-center">
          <Typography
            sx={{
              fontSize: "11px",
              color: "#6B7280",
            }}
          >
            Active Customers
          </Typography>

          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#15803D",
            }}
          >
            {totalActiveCustomers}
          </Typography>
        </div>
      </div>

      {/* Blocked Customers */}
      <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2">
        <Icon icon="lucide:user-x" width={18} className="text-red-500" />

        <div className="text-center">
          <Typography
            sx={{
              fontSize: "11px",
              color: "#6B7280",
            }}
          >
            Blocked Customers
          </Typography>

          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#DC2626",
            }}
          >
            {totalBlockedCustomers}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CustomerStats;
