import React from "react";

import {
    Divider,
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

const CustomerOrderHistory = ({ orders = [], StatusChip }) => {
  return (
    <Paper
      elevation={0}
      className="overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white" >
      {/* Header */}

      <div className="p-5">
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          Customer Order History
        </Typography>

        <Typography
          sx={{
            fontSize: "12px",
            color: "#6B7280",
            marginTop: "4px",
          }}
        >
          Complete order history of this customer
        </Typography>
      </div>

      <Divider />

      {/* Table */}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="!bg-[#FAFAFA]">
              <TableCell className="!text-xs !font-semibold !text-gray-500">
                ORDER ID
              </TableCell>

              <TableCell className="!text-xs !font-semibold !text-gray-500">
                PRODUCT
              </TableCell>

              <TableCell className="!text-xs !font-semibold !text-gray-500">
                AMOUNT
              </TableCell>

              <TableCell className="!text-xs !font-semibold !text-gray-500">
                DATE
              </TableCell>

              <TableCell className="!text-xs !font-semibold !text-gray-500">
                STATUS
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#7B0FB5",
                      }}
                    >
                      {order.id}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#374151",
                      }}
                    >
                      {order.product}
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
                      ₹{Number(order.amount).toLocaleString("en-IN")}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#6B7280",
                      }}
                    >
                      {order.date}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <StatusChip status={order.status} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" className="!py-12">
                  <Icon
                    icon="lucide:shopping-bag"
                    width={38}
                    className="mx-auto mb-3 text-gray-300"
                  />

                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#6B7280",
                    }}
                  >
                    No orders found
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

export default CustomerOrderHistory;
