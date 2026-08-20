import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";

import SalesReport from "@/shared/components/AdminPanel/Reports/SalesReport";
import OrderReport from "@/shared/components/AdminPanel/Reports/OrderReport";
import CustomerReport from "@/shared/components/AdminPanel/Reports/CustomerReport";

const Reports = () => {
  const [activeReport, setActiveReport] = useState("sales");

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
          {activeReport === "sales" && <SalesReport />}
          {activeReport === "orders" && <OrderReport />}
          {activeReport === "customers" && <CustomerReport />}

        </div>
      </main>

    </div>
  );
};

export default Reports;