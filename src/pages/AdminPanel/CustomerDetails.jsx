import React from "react";

import { Button, Typography } from "@mui/material";

import { Icon } from "@iconify/react";

import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";

import BlockCustomerDialog from "@/shared/components/AdminPanel/CustomerManagement/BlockCustomerDialog";
import CustomerInfo from "@/shared/components/AdminPanel/CustomerManagement/CustomerInfo";
import CustomerOrderHistory from "@/shared/components/AdminPanel/CustomerManagement/CustomerOrderHistory";
import CustomerSummaryCard from "@/shared/components/AdminPanel/CustomerManagement/CustomerSummaryCard";

const StatusChip = ({ status }) => {
  const styles = {
    Active: {
      background: "#E8F7EE",
      color: "#15803D",
    },
    Blocked: {
      background: "#FEECEC",
      color: "#DC2626",
    },
    Pending: {
      background: "#FFF4E5",
      color: "#D97706",
    },
    Processing: {
      background: "#EAF2FF",
      color: "#2563EB",
    },
    Shipped: {
      background: "#E0F2FE",
      color: "#0284C7",
    },
    Delivered: {
      background: "#E8F7EE",
      color: "#15803D",
    },
    Cancelled: {
      background: "#FEECEC",
      color: "#DC2626",
    },
  };

  const config = styles[status] || {
    background: "#F3F4F6",
    color: "#374151",
  };

  return (
    <span
      className="inline-flex h-[28px] items-center rounded-[6px] px-3 text-xs font-semibold"
      style={{
        backgroundColor: config.background,
        color: config.color,
      }}
    >
      {status}
    </span>
  );
};

const CustomerDetails = ({
  customer,
  onBack,
  blockDialogOpen,
  customerToChange,
  onOpenBlockDialog,
  onCloseBlockDialog,
  onConfirmBlock,
}) => {
  if (!customer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Sidebar />
      <Header />

      <main className="ml-[248px] min-h-screen bg-[#F8F9FB] pt-[75px]">
        <div className="p-6">
          {/* Back */}

          <Button
            onClick={onBack}
            startIcon={<Icon icon="lucide:arrow-left" width={18} />}
            sx={{
              color: "#7B0FB5",
              textTransform: "none",
              fontSize: "13px",
              marginBottom: "20px",
            }}
          >
            Back to Customers
          </Button>

          {/* Page Header */}

          <div className="mb-6 flex items-center justify-between">
            <div>
              <Typography
                sx={{
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Customer Details
              </Typography>

              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginTop: "4px",
                }}
              >
                View customer information and order history
              </Typography>
            </div>

            <Button
              variant="outlined"
              onClick={() => onOpenBlockDialog(customer)}
              startIcon={
                <Icon
                  icon={
                    customer.status === "Blocked"
                      ? "lucide:user-check"
                      : "lucide:user-x"
                  }
                  width={18}
                />
              }
              sx={{
                textTransform: "none",
                borderRadius: "7px",

                borderColor: customer.status === "Blocked" ? "#16A34A" : "#DC2626",

                color: customer.status === "Blocked" ? "#16A34A" : "#DC2626",
              }}
            >
              {customer.status === "Blocked"
                ? "Unblock Customer"
                : "Block Customer"}
            </Button>
          </div>

          {/* Summary */}

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <CustomerSummaryCard
              icon="lucide:shopping-bag"
              title="Total Orders"
              value={customer.totalOrders}
            />

            <CustomerSummaryCard
              icon="lucide:indian-rupee"
              title="Total Spent"
              value={`₹${Number(customer.totalSpent).toLocaleString("en-IN")}`}
            />

            <CustomerSummaryCard
              icon="lucide:calendar-days"
              title="Customer Since"
              value={customer.joinedDate}
            />
          </div>

          {/* Customer Information */}

          <CustomerInfo customer={customer} StatusChip={StatusChip} />

          {/* Order History */}

          <CustomerOrderHistory
            orders={customer.orders}
            StatusChip={StatusChip}
          />
        </div>
      </main>

      {/* Block Dialog */}

      <BlockCustomerDialog
        open={blockDialogOpen}
        customer={customerToChange}
        onClose={onCloseBlockDialog}
        onConfirm={onConfirmBlock}
      />
    </div>
  );
};

export default CustomerDetails;
