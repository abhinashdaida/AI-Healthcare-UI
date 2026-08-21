import React from "react";
import { Paper, Typography } from "@mui/material";
import AnimatedCounter from "./AnimatedCounter";

const CustomerReport = ({ customers = [] }) => {
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "Active").length;
  const blockedCustomers = customers.filter(c => c.status === "Blocked").length;

  return (
    <Paper className="bg-white rounded-xl border border-gray-200 p-6 shadow-none" style={{ borderRadius: "12px" }}>
      <Typography variant="h6" component="h2" className="!text-lg !font-semibold !text-gray-800 !mb-6">
        Customer Report
      </Typography>

      <div className="grid grid-cols-3 gap-5">
        {/* Total */}
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-gray-500">Total Customers</p>
          <h3 className="text-3xl font-semibold mt-2">
            <AnimatedCounter value={totalCustomers} />
          </h3>
        </div>

        {/* Weekly Summary */}
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-gray-500">Active Customers</p>
          <h3 className="text-xl font-semibold mt-2 text-blue-600">
            <AnimatedCounter value={activeCustomers} /> Active
          </h3>
        </div>

        {/* Status */}
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-gray-500">Blocked Customers</p>
          <h3 className="text-xl font-semibold text-red-600 mt-2">
            <AnimatedCounter value={blockedCustomers} /> Blocked
          </h3>
        </div>
      </div>
    </Paper>
  );
};

export default CustomerReport;
