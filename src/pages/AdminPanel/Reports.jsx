import React, { useState } from "react";
 
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
            <h1 className="text-2xl font-semibold text-gray-800">
              Reports
            </h1>
 
            <p className="text-gray-500 mt-1">
              View sales, order and customer reports
            </p>
          </div>
 
          {/* Report Tabs */}
          <div className="flex gap-3 mb-6">
 
            <button
              onClick={() => setActiveReport("sales")}
              className={`px-5 py-2 rounded-lg ${
                activeReport === "sales"
                  ? "bg-purple-700 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              Sales Report
            </button>
 
            <button
              onClick={() => setActiveReport("orders")}
              className={`px-5 py-2 rounded-lg ${
                activeReport === "orders"
                  ? "bg-purple-700 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              Order Report
            </button>
 
            <button
              onClick={() => setActiveReport("customers")}
              className={`px-5 py-2 rounded-lg ${
                activeReport === "customers"
                  ? "bg-purple-700 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              Customer Report
            </button>
 
          </div>
 
          {/* Report Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
 
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              {currentReport.title}
            </h2>
 
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
 
          </div>
 
        </div>
      </main>
 
    </div>
  );
};
 
export default Reports;