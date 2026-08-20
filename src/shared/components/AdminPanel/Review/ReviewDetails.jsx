import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";
import Header from "@/shared/components/AdminPanel/Header";
import RatingStars from "@/shared/components/AdminPanel/Review/RatingStars";
import StatusBadge from "@/shared/components/AdminPanel/Review/StatusBadge";

const ReviewDetails = ({ review, onBack, onStatusChange }) => {
  if (!review) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-[250px] pt-[60px]">
        <div className="p-6">
          {/* Back button & Page Title */}
          <div className="mb-6 flex items-center gap-3">
            <Button
              onClick={onBack}
              variant="outlined"
              sx={{
                px: 2,
                py: 1,
                minWidth: "unset",
                borderRadius: "8px",
                borderColor: "#D1D5DB",
                color: "#4B5563",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem",
                "&:hover": {
                  backgroundColor: "#F9FAFB",
                  borderColor: "#9CA3AF",
                },
              }}
              startIcon={<Icon icon="mdi:arrow-left" width="18" height="18" />}
            >
              Back to List
            </Button>
            <Typography variant="h5" component="h1" className="!text-2xl !font-semibold !text-gray-800">
              Review Details
            </Typography>
          </div>

          {/* Details Card */}
          <Paper className="p-6 rounded-xl border border-gray-200 bg-white shadow-none space-y-6 max-w-2xl">
            {/* Customer & Product */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Customer</p>
                <p className="mt-1 text-base font-semibold text-gray-800">{review.customer}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Product</p>
                <p className="mt-1 text-base font-semibold text-gray-800">{review.product}</p>
              </div>
            </div>

            {/* Rating */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Rating</p>
              <RatingStars rating={review.rating} />
            </div>

            {/* Review Content */}
            <div>
              <p className="text-sm font-medium text-gray-500">Review</p>
              <p className="mt-1 text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
                {review.review}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1.5">Status</p>
              <StatusBadge status={review.status} />
            </div>

            {/* Actions for Pending */}
            {review.status === "Pending" && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => onStatusChange(review.id, "Approved")}
                  variant="contained"
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    backgroundColor: "#DCFCE7",
                    color: "#15803D",
                    border: "1px solid #BBF7D0",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#15803D",
                      color: "white",
                      borderColor: "#15803D",
                      boxShadow: "none",
                    },
                  }}
                >
                  Approve Review
                </Button>

                <Button
                  onClick={() => onStatusChange(review.id, "Rejected")}
                  variant="contained"
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    backgroundColor: "#FEE2E2",
                    color: "#B91C1C",
                    border: "1px solid #FCA5A5",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#B91C1C",
                      color: "white",
                      borderColor: "#B91C1C",
                      boxShadow: "none",
                    },
                  }}
                >
                  Reject Review
                </Button>
              </div>
            )}
          </Paper>
        </div>
      </main>
    </div>
  );
};

export default ReviewDetails;
