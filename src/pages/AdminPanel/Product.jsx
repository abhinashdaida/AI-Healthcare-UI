import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";
import React from "react";
const Product = () => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <Header />

      <main className="ml-[336px] pt-[80px] p-6">
        <h1 className="text-3xl font-bold text-black">Product</h1>
      </main>
    </div>
  );
};

export default Product;