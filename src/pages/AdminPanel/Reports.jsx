import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";

import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";

const Reports = () => {
  const [activeReport, setActiveReport] = useState("sales");

  const reportData = {
    sales: {
      title: "Sales Report",
      value: "₹1,25,000",
      label: "Total Sales",
      secondary: "₹32,890 This Week",
    },

    orders: {
      title: "Order Report",
      value: "245",
      label: "Total Orders",
      secondary: "47 Orders This Week",
    },

    customers: {
      title: "Customer Report",
      value: "1,250",
      label: "Total Customers",
      secondary: "85 New Customers",
    },
  };

  const currentReport = reportData[activeReport];

  const getTabButtonStyle = (tabName) => {
    const isActive = activeReport === tabName;
    return {
      px: 3,
      py: 1,
      borderRadius: "8px",
      textTransform: "none",
      fontWeight: 500,
      fontSize: "0.875rem",
      backgroundColor: isActive ? "#7B0FB5" : "white",
      color: isActive ? "white" : "#374151",
      border: isActive ? "none" : "1px solid #E5E7EB",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: isActive ? "#6B0DA0" : "#F9FAFB",
        border: isActive ? "none" : "1px solid #D1D5DB",
        boxShadow: "none",
      },
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="ml-[250px] pt-[60px]">
        <div className="p-6">

          {/* Page Header */}
          <div className="mb-6">
            <Typography variant="h5" component="h1" className="!text-2xl !font-semibold !text-gray-800">
              Reports
            </Typography>

            <p className="text-gray-500 mt-1">
              View sales, order and customer reports
            </p>
          </div>

          {/* Report Tabs */}
          <div className="mb-6 flex gap-2 rounded-xl border border-gray-200 bg-white p-2 w-max">
            <Button
              onClick={() => setActiveReport("sales")}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem",
                backgroundColor: activeReport === "sales" ? "#F3E1F8" : "white",
                color: activeReport === "sales" ? "#7B0FB5" : "#4B5563",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: activeReport === "sales" ? "#EAD0F5" : "#F9FAFB",
                  color: activeReport === "sales" ? "#6B0DA0" : "#7B0FB5",
                  boxShadow: "none",
                },
              }}
            >
              Sales Report
            </Button>

            <Button
              onClick={() => setActiveReport("orders")}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem",
                backgroundColor: activeReport === "orders" ? "#F3E1F8" : "white",
                color: activeReport === "orders" ? "#7B0FB5" : "#4B5563",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: activeReport === "orders" ? "#EAD0F5" : "#F9FAFB",
                  color: activeReport === "orders" ? "#6B0DA0" : "#7B0FB5",
                  boxShadow: "none",
                },
              }}
            >
              Order Report
            </Button>

            <Button
              onClick={() => setActiveReport("customers")}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem",
                backgroundColor: activeReport === "customers" ? "#F3E1F8" : "white",
                color: activeReport === "customers" ? "#7B0FB5" : "#4B5563",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: activeReport === "customers" ? "#EAD0F5" : "#F9FAFB",
                  color: activeReport === "customers" ? "#6B0DA0" : "#7B0FB5",
                  boxShadow: "none",
                },
              }}
            >
              Customer Report
            </Button>
          </div>

          {/* Report Card */}
          <Paper className="bg-white rounded-xl border border-gray-200 p-6 shadow-none" style={{ borderRadius: "12px" }}>
            <Typography variant="h6" component="h2" className="!text-lg !font-semibold !text-gray-800 !mb-6">
              {currentReport.title}
            </Typography>

            <div className="grid grid-cols-3 gap-5">
              {/* Total */}
              <div className="border border-gray-200 rounded-lg p-5">
                <p className="text-gray-500">
                  {currentReport.label}
                </p>
                <h3 className="text-3xl font-semibold mt-2">
                  {currentReport.value}
                </h3>
              </div>

              {/* Weekly Summary */}
              <div className="border border-gray-200 rounded-lg p-5">
                <p className="text-gray-500">
                  Weekly Summary
                </p>
                <h3 className="text-xl font-semibold mt-2">
                  {currentReport.secondary}
                </h3>
              </div>

              {/* Status */}
              <div className="border border-gray-200 rounded-lg p-5">
                <p className="text-gray-500">
                  Report Status
                </p>
                <h3 className="text-xl font-semibold text-green-600 mt-2">
                  Updated
                </h3>
              </div>
            </div>
          </Paper>

        </div>
      </main>

    </div>
  );
};

export default Reports;