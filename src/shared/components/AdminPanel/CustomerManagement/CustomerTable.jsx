import React from "react";

import {
  Avatar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Icon } from "@iconify/react";

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const StatusChip = ({ status }) => {
  const statusStyles = {
    Active: {
      background: "#E8F7EE",
      color: "#15803D",
    },
    Blocked: {
      background: "#FEECEC",
      color: "#DC2626",
    },
  };

  const config = statusStyles[status] || {
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

const CustomerTable = ({ customers, onView, onBlockUnblock }) => {
  return (
    <Paper
      elevation={0}
      className="
        flex
        h-full
        min-h-0
        flex-col
        overflow-hidden
        rounded-[10px]
        border
        border-[#E5E7EB]
        bg-white
      "
    >
      <TableContainer
        className="
          h-full
          min-h-0
          flex-1
          overflow-y-auto
          overflow-x-auto
        "
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="!text-xs !font-semibold !text-gray-500">
                CUSTOMER
              </TableCell>

              <TableCell className="!text-xs !font-semibold !text-gray-500">
                PHONE
              </TableCell>

              <TableCell className="!text-xs !font-semibold !text-gray-500">
                ORDERS
              </TableCell>

              <TableCell className="!text-xs !font-semibold !text-gray-500">
                TOTAL SPENT
              </TableCell>

              <TableCell className="!text-xs !font-semibold !text-gray-500">
                STATUS
              </TableCell>

              <TableCell
                align="right"
                className="!text-xs !font-semibold !text-gray-500"
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#F1E5F7",
                          color: "#7B0FB5",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>

                      <div>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {customer.name}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#6B7280",
                            marginTop: "2px",
                          }}
                        >
                          {customer.email}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#374151",
                      }}
                    >
                      {customer.phone}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#374151",
                      }}
                    >
                      {customer.totalOrders}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      ₹{Number(customer.totalSpent).toLocaleString("en-IN")}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <StatusChip status={customer.status} />
                  </TableCell>

                  <TableCell align="right">
                    <div className="flex justify-end gap-1">
                      <IconButton
                        size="small"
                        title="View Customer"
                        onClick={() => onView(customer)}
                      >
                        <Icon
                          icon="lucide:eye"
                          width={18}
                          className="text-gray-600"
                        />
                      </IconButton>

                      <IconButton
                        size="small"
                        title={
                          String(customer.status).trim().toLowerCase() ===
                          "blocked"
                            ? "Unblock Customer"
                            : "Block Customer"
                        }
                        onClick={() => onBlockUnblock(customer)}
                      >
                        <Icon
                          icon={
                            String(customer.status).trim().toLowerCase() ===
                            "blocked"
                              ? "lucide:user-check"
                              : "lucide:user-x"
                          }
                          width={18}
                          height={18}
                          className={
                            String(customer.status).trim().toLowerCase() ===
                            "blocked"
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" className="!py-16">
                  <Icon
                    icon="lucide:users-round"
                    width={42}
                    className="mx-auto mb-3 text-gray-300"
                  />

                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#6B7280",
                    }}
                  >
                    No customers found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomerTable;
