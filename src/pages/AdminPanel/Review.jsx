import React, { useState } from "react";

import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";

import RatingStars from "@/shared/components/AdminPanel/Review/RatingStars";
import StatusBadge from "@/shared/components/AdminPanel/Review/StatusBadge";
import ReviewDetailsModal from "@/shared/components/AdminPanel/Review/ReviewDetailsModal";

import reviewData from "../../shared/constants/AdminPanel/ReviewData";

function Review() {

  // ================= REVIEWS =================

  const [reviews, setReviews] = useState(() => {
    const savedReviews = sessionStorage.getItem("reviews");

    return savedReviews
      ? JSON.parse(savedReviews)
      : reviewData;
  });

  // ================= SEARCH =================

  const [searchTerm, setSearchTerm] = useState("");

  // ================= STATUS FILTER =================

  const [statusFilter, setStatusFilter] = useState("All Status");

  // ================= SELECTED REVIEW =================

  const [selectedReview, setSelectedReview] = useState(null);

  // ================= UPDATE STATUS =================

  const updateStatus = (id, status) => {

    setReviews((prevReviews) => {

      const updatedReviews = prevReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              status,
            }
          : review
      );

      // Save updated reviews in sessionStorage
      sessionStorage.setItem(
        "reviews",
        JSON.stringify(updatedReviews)
      );

      return updatedReviews;
    });

    // Update modal data also
    setSelectedReview((prevReview) =>
      prevReview?.id === id
        ? {
            ...prevReview,
            status,
          }
        : prevReview
    );
  };

  // ================= SEARCH + FILTER =================

  const filteredReviews = reviews.filter((review) => {

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      review.customer
        .toLowerCase()
        .includes(search) ||
      review.product
        .toLowerCase()
        .includes(search);

    const matchesStatus =
      statusFilter === "All Status" ||
      review.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="ml-[250px] pt-[60px]">

        <div className="p-6">

          {/* ================= PAGE HEADER ================= */}

          <div className="mb-6">

            <h1 className="text-2xl font-semibold text-gray-800">
              Reviews & Ratings
            </h1>

            <p className="mt-1 text-gray-500">
              Manage customer reviews and ratings
            </p>

          </div>

          {/* ================= SEARCH & FILTER ================= */}

          <div className="mb-5 flex items-center justify-between">

            {/* Search */}

            <input
              type="text"
              placeholder="Search customer or product..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-80 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Status Filter */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-lg border border-gray-300 px-4 py-2"
            >

              <option value="All Status">
                All Status
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>

          {/* ================= REVIEWS TABLE ================= */}

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

            <table className="w-full">

              {/* Table Header */}

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-5 py-4 text-left">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left">
                    Product
                  </th>

                  <th className="px-5 py-4 text-left">
                    Rating
                  </th>

                  <th className="px-5 py-4 text-left">
                    Review
                  </th>

                  <th className="px-5 py-4 text-left">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left">
                    Action
                  </th>

                </tr>

              </thead>

              {/* Table Body */}

              <tbody>

                {filteredReviews.length > 0 ? (

                  filteredReviews.map((review) => (

                    <tr
                      key={review.id}
                      className="border-t border-gray-200"
                    >

                      {/* Customer */}

                      <td className="px-5 py-4">
                        {review.customer}
                      </td>

                      {/* Product */}

                      <td className="px-5 py-4">
                        {review.product}
                      </td>

                      {/* Rating */}

                      <td className="px-5 py-4">

                        <RatingStars
                          rating={review.rating}
                        />

                      </td>

                      {/* Review */}

                      <td className="px-5 py-4 text-gray-600">
                        {review.review}
                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          status={review.status}
                        />

                      </td>

                      {/* Action */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          {/* View */}

                          <button
                            onClick={() =>
                              setSelectedReview(review)
                            }
                            className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700"
                          >
                            View
                          </button>

                          {/* Approve / Reject */}

                          {review.status === "Pending" && (
                            <>

                              {/* Approve */}

                              <button
                                onClick={() =>
                                  updateStatus(
                                    review.id,
                                    "Approved"
                                  )
                                }
                                className="rounded-md bg-green-100 px-3 py-1 text-sm text-green-700"
                              >
                                Approve
                              </button>

                              {/* Reject */}

                              <button
                                onClick={() =>
                                  updateStatus(
                                    review.id,
                                    "Rejected"
                                  )
                                }
                                className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-700"
                              >
                                Reject
                              </button>

                            </>
                          )}

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="py-10 text-center text-gray-500"
                    >
                      No reviews found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

      {/* ================= REVIEW DETAILS MODAL ================= */}

      <ReviewDetailsModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
        onStatusChange={updateStatus}
      />

    </div>
  );
}

export default Review;