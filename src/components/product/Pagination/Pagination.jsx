import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // If there's only 1 page or none, don't show pagination controls
  if (totalPages <= 1) return null;

  // Generate array of page numbers [1, 2, ..., totalPages]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 my-8">
      {/* PREVIOUS ARROW BUTTON */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
          currentPage === 1
            ? "cursor-not-allowed border-gray-200 text-gray-300 bg-gray-50"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-black"
        }`}
        aria-label="Previous Page"
      >
        <FiChevronLeft className="h-5 w-5" />
      </button>

      {/* NUMERIC PAGE BUTTONS */}
      {pageNumbers.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
              isActive
                ? "bg-black text-white shadow-md scale-105"
                : "border border-gray-200 bg-gray-100/70 text-gray-700 hover:bg-gray-200 hover:text-black"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* NEXT ARROW BUTTON */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
          currentPage === totalPages
            ? "cursor-not-allowed border-gray-200 text-gray-300 bg-gray-50"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-black"
        }`}
        aria-label="Next Page"
      >
        <FiChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;