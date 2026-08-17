import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;