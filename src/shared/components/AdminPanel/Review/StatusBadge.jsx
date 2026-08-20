import React from "react";
import { Chip } from "@mui/material";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Approved: {
      bg: "#DCFCE7", // bg-green-100
      text: "#15803D", // text-green-700
    },
    Pending: {
      bg: "#FEF9C3", // bg-yellow-100
      text: "#A16207", // text-yellow-700
    },
    Rejected: {
      bg: "#FEE2E2", // bg-red-100
      text: "#B91C1C", // text-red-700
    },
  };

  const style = statusStyles[status] || { bg: "#F3F4F6", text: "#374151" };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: `${style.bg} !important`,
        color: `${style.text} !important`,
        fontWeight: 500,
        fontSize: "0.75rem",
        borderRadius: "9999px",
        height: "24px",
        border: "none",
        "& .MuiChip-label": {
          px: 1.5,
        },
      }}
    />
  );
};

export default StatusBadge;