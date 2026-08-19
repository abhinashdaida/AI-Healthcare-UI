import React from "react";

import RatingStars from "@/shared/components/AdminPanel/Review/RatingStars";
import StatusBadge from "@/shared/components/AdminPanel/Review/StatusBadge";

const ReviewDetailsModal = ({
  review,
  onClose,
  onStatusChange,
}) => {
  if (!review) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">

      <div className="w-[450px] rounded-xl bg-white shadow-xl">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Review Details
          </h2>

          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-4 p-6">

          {/* Customer */}
          <div>
            <p className="text-sm text-gray-500">
              Customer
            </p>

            <p className="mt-1 font-medium text-gray-800">
              {review.customer}
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-sm text-gray-500">
              Product
            </p>

            <p className="mt-1 font-medium text-gray-800">
              {review.product}
            </p>
          </div>

          {/* Rating */}
          <div>
            <p className="mb-1 text-sm text-gray-500">
              Rating
            </p>

            <RatingStars rating={review.rating} />
          </div>

          {/* Review */}
          <div>
            <p className="text-sm text-gray-500">
              Review
            </p>

            <p className="mt-1 text-gray-700">
              {review.review}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="mb-1 text-sm text-gray-500">
              Status
            </p>

            <StatusBadge status={review.status} />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 border-t px-6 py-4">

          {review.status === "Pending" && (
            <>
              <button
                onClick={() =>
                  onStatusChange(review.id, "Approved")
                }
                className="rounded-lg bg-green-100 px-4 py-2 text-green-700 hover:bg-green-200"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  onStatusChange(review.id, "Rejected")
                }
                className="rounded-lg bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200"
              >
                Reject
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default ReviewDetailsModal;