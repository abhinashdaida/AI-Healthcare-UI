import React from "react";
import { Paper, Typography } from "@mui/material";
import AnimatedCounter from "./AnimatedCounter";

const OrderReport = ({ customers = [] }) => {
  const totalOrders = customers.reduce((sum, c) => sum + (c.totalOrders || 0), 0);
  
  const allOrders = customers.flatMap(c => c.orders || []);
  const ordersThisWeek = allOrders.filter(o => o.date && o.date.includes("Aug 2026")).length;

  return (
    <Paper className="bg-white rounded-xl border border-gray-200 p-6 shadow-none" style={{ borderRadius: "12px" }}>
      <Typography variant="h6" component="h2" className="!text-lg !font-semibold !text-gray-800 !mb-6">
        Order Report
      </Typography>

      <div className="grid grid-cols-3 gap-5">
        {/* Total */}
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-gray-500">Total Orders</p>
          <h3 className="text-3xl font-semibold mt-2">
            <AnimatedCounter value={totalOrders} />
          </h3>
        </div>

        {/* Weekly Summary */}
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-gray-500">Weekly Summary</p>
          <h3 className="text-xl font-semibold mt-2">
            <AnimatedCounter value={ordersThisWeek} /> Orders This Week
          </h3>
        </div>

        {/* Status */}
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-gray-500">Report Status</p>
          <h3 className="text-xl font-semibold text-green-600 mt-2">Updated</h3>
        </div>
      </div>
    </Paper>
  );
};

export default OrderReport;
