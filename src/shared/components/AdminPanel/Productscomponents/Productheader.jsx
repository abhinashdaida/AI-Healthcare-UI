import React from "react";

const Productheader = ({ onAddProduct, onAddCategory }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-black">Products & Categories</h1>
        <p className="text-gray-600 mt-1">Manage your gift shop inventory</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onAddCategory}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          + Add Category
        </button>
        <button
          onClick={onAddProduct}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Product
        </button>
      </div>
    </div>
  );
};

export default Productheader;