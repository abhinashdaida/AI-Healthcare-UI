import { Icon } from "@iconify/react";
import React from "react";

import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";

import {
  summaryCards,
} from "@/shared/constants/AdminPanel/DashboardContent";

const Dashboard = () => {
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
                    className="text-[#7B0FB5]"
                  />
                </div>

                <p className="mt-4 text-[30px] font-medium text-[#172033]">
                  {card.value}
                </p>

                <p className="mt-2 text-[14px] text-[#7A8497]">
                  {card.subtitle}
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;