import { Paper, Typography } from "@mui/material";
import React from "react";

const InfoRow = ({ label, value }) => {
  return (
    <div  className="flex min-h-[44px] items-center justify-between gap-4 border-b border-[#F1F1F1] py-2">
      <Typography
        sx={{
          fontSize: "12px",
          color: "#6B7280",
        }}
      >
        {label}
      </Typography>

      <div className="text-right">
        {typeof value === "string" ? (
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            {value}
          </Typography>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

const CustomerInfo = ({ customer, StatusChip }) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* Customer Information */}
      <Paper
        elevation={0}
        className="rounded-[10px] border border-[#E5E7EB] bg-white p-5">    
         <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: "18px",
            color: "#111827",
          }}
        >
          Customer Information
        </Typography>

        <InfoRow label="Customer ID" value={`#${customer.id}`} />

        <InfoRow label="Full Name" value={customer.name} />

        <InfoRow label="Email" value={customer.email} />

        <InfoRow label="Phone" value={customer.phone} />

        <InfoRow
          label="Status"
          value={<StatusChip status={customer.status} />}
        />

        <InfoRow label="Joined Date" value={customer.joinedDate} />
      </Paper>

      {/* Address */}
      <Paper
        elevation={0}
        className="rounded-[10px] border border-[#E5E7EB] bg-white p-5">
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: "18px",
            color: "#111827",
          }}
        >
          Address
        </Typography>

        <InfoRow label="Street" value={customer.address?.street || "-"} />

        <InfoRow label="City" value={customer.address?.city || "-"} />

        <InfoRow label="State" value={customer.address?.state || "-"} />

        <InfoRow label="Pincode" value={customer.address?.pincode || "-"} />

        <InfoRow label="Country" value={customer.address?.country || "-"} />
      </Paper>
    </div>
  );
};

export default CustomerInfo;
