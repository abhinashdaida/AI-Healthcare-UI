import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";

import {
  lowStockItems,
  recentOrders,
  summaryCards,
  topSellingItems,
} from "@/shared/constants/AdminPanel/DashboardContent";

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Sidebar />
      <Header />

      <main className="ml-[248px] min-h-screen pt-[75px]">
        <div className="px-8 py-8">

          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-[24px] font-medium text-[#172033]">
              Dashboard
            </h1>

            <p className="mt-2 text-[16px] text-[#737E92]">
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[16px] border border-[#E3E6EA] bg-white px-5 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[15px] text-[#596579]">
                    {card.title}
                  </p>

                  <Icon
                    icon={card.icon}
                    width="24"
                    height="24"
                    className={card.color|| "text-[#7B0FB5]"}
                  />
                </div>

                <p className="mt-4 text-[30px] font-medium text-[#172033]">
                  {card.value}
                </p>

                <p
                  className={`mt-2 text-[14px] ${
                    card.color || "text-[#7A8497]"
                  }`}
                >
                  {card.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="mt-8 grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">

            {/* Recent Orders */}
            <section className="rounded-[16px] border border-[#E3E6EA] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

              <div>
                <h2 className="text-[21px] font-medium text-[#172033]">
                  Recent Orders
                </h2>

                <button
                  type="button"
                  onClick={() => navigate("/order")}
                  className="mt-3 rounded-[10px] bg-[#F7ECFB] px-5 py-2 text-[14px] font-medium text-[#7B0FB5] hover:bg-[#F0DDF7]"
                >
                  View All
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                      className="rounded-[12px] border border-[#E3E6EA] px-5 py-4 transition-colors duration-200 hover:border-[#7B0FB5]"
                      >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>
                        <div className="flex items-center gap-3">
                          <p className="text-[16px] font-medium text-[#263246]">
                            {order.id}
                          </p>

                          <span
                            className={`rounded-full px-3 py-1 text-[12px] font-medium ${
                              order.status === "Pending"
                                ? "bg-orange-100 text-orange-600"
                                : order.status === "Packed"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <p className="mt-2 text-[14px] text-[#596579]">
                          {order.customer}
                        </p>

                        <p className="mt-1 text-[13px] text-[#7A8497]">
                          {order.products}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                        <p className="text-[18px] font-medium text-[#172033]">
                          {order.amount}
                        </p>

                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </section>

            {/* Right Side */}
            <div className="space-y-7">

              {/* Low Stock Alerts */}
              <section className="rounded-[16px] border border-[#E3E6EA] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

                <div className="flex items-center gap-3">
                  <Icon
                    icon="lucide:triangle-alert"
                    width="23"
                    height="23"
                    className="text-orange-500"
                  />

                  <h2 className="text-[20px] font-medium text-[#172033]">
                    Low Stock Alerts
                  </h2>
                </div>

                <div className="mt-6 space-y-3">
                  {lowStockItems.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-[11px] border border-orange-200 bg-[#FFF9F1] px-4 py-4"
                    >
                      <p className="text-[14px] font-medium text-[#263246]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-[13px] text-red-500">
                        {item.stock}
                      </p>
                    </div>
                  ))}
                </div>

              </section>

              {/* Top Selling Items */}
              <section className="rounded-[16px] border border-[#E3E6EA] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

                <h2 className="text-[20px] font-medium text-[#172033]">
                  Top 3 Selling Items
                </h2>

                <div className="mt-6 space-y-5">
                  {topSellingItems.map((item) => (
                    <div
                      key={item.rank}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7B0FB5] text-[15px] font-medium text-white">
                          {item.rank}
                        </div>

                        <p className="text-[14px] text-[#263246]">
                          {item.name}
                        </p>

                      </div>

                      <p className="text-[13px] text-[#596579]">
                        {item.sold}
                      </p>
                    </div>
                  ))}
                </div>

              </section>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;