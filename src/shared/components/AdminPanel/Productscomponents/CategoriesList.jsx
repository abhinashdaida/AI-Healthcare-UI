
import React, { useState } from "react";

const CategoriesList = ({
  categories,
  onEditCategory,
  onDeleteCategory,
}) => {
  const [searchCategory, setSearchCategory] = useState("");

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchCategory.toLowerCase())
  );

  // Get category color based on product count
  const getCategoryColor = (productCount) => {
    if (productCount === 0) return "bg-gray-100 text-gray-600";
    if (productCount < 3) return "bg-blue-100 text-blue-600";
    if (productCount < 7) return "bg-green-100 text-green-600";
    return "bg-purple-100 text-purple-600";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">


      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="group bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-purple-300"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg truncate">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-500 truncate">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEditCategory(category)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit category"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDeleteCategory(category.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete category"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                      category.productCount || 0
                    )}`}
                  >
                    {category.productCount || 0} Products
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <p className="text-gray-500 text-lg">
            {searchCategory ? "No categories found" : "No categories available"}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {searchCategory
              ? "Try adjusting your search"
              : "Click 'Add Category' to create one"}
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;