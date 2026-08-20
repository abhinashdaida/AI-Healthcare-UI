import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const BlockCustomerDialog = ({ open, customer, onClose, onConfirm }) => {
  if (!customer) return null;

  // Active customer -> Block
  // Blocked customer -> Unblock
  const isBlocked = String(customer.status).toLowerCase() === "blocked";

  const action = isBlocked ? "unblock" : "block";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="customer-dialog-title"
      slotProps={{
        paper: {
          sx: {
            width: "440px",
            maxWidth: "calc(100% - 32px)",
            borderRadius: "10px",
            margin: "16px",
          },
        },
      }}
    >
      {/* Title */}
      <DialogTitle
        id="customer-dialog-title"
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#111827",
          padding: "20px 28px 8px",
        }}
      >
        {action === "block" ? "Block Customer" : "Unblock Customer"}
      </DialogTitle>

      {/* Content */}
      <DialogContent
        sx={{
          padding: "12px 28px 20px !important",
        }}
      >
        <Typography
          sx={{
            fontSize: "15px",
            color: "#6B7280",
            lineHeight: 1.6,
          }}
        >
          Are you sure you want to {action === "block" ? "block" : "unblock"}
          <strong className="text-[#374151]"> {customer.name}</strong>?
        </Typography>

        {action === "block" && (
          <Typography
            sx={{
              fontSize: "13px",
              color: "#DC2626",
              marginTop: "10px",
            }}
          >
            This customer will no longer be able to place new orders.
          </Typography>
        )}

        {action === "unblock" && (
          <Typography
            sx={{
              fontSize: "13px",
              color: "#6B7280",
              marginTop: "10px",
            }}
          >
            This customer will be able to place orders again.
          </Typography>
        )}
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          padding: "0 28px 20px",
          gap: "8px",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            minWidth: "75px",
            color: "#6B7280",
            textTransform: "none",
            fontSize: "14px",
            borderRadius: "7px",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            minWidth: "100px",
            backgroundColor: action === "block" ? "#DC2626" : "#16A34A",

            color: "#FFFFFF",
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "7px",
            boxShadow: "none",

            "&:hover": {
              backgroundColor: action === "block" ? "#B91C1C" : "#15803D",

              boxShadow: "none",
            },
          }}
        >
          {action === "block" ? "Block" : "Unblock"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockCustomerDialog;
