import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";

import RatingStars from "@/shared/components/AdminPanel/Review/RatingStars";
import StatusBadge from "@/shared/components/AdminPanel/Review/StatusBadge";

const ReviewDetailsModal = ({
  review,
  onClose,
  onStatusChange,
}) => {
  const isOpen = Boolean(review);

  if (!review) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        className: "rounded-xl p-1 bg-white shadow-xl",
        style: { borderRadius: "12px" }
      }}
    >
      {/* Modal Header */}
      <DialogTitle className="m-0 p-4 flex items-center justify-between border-b border-gray-200">
        <Typography variant="h6" component="span" className="text-xl font-semibold text-gray-800">
          Review Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800"
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <Icon icon="mdi:close" width="20" height="20" />
        </IconButton>
      </DialogTitle>

      {/* Modal Content */}
      <DialogContent className="p-6 space-y-4">
        {/* Customer */}
        <div className="mt-2">
          <p className="text-sm text-gray-500">Customer</p>
          <p className="mt-1 font-medium text-gray-800">{review.customer}</p>
        </div>

        {/* Product */}
        <div>
          <p className="text-sm text-gray-500">Product</p>
          <p className="mt-1 font-medium text-gray-800">{review.product}</p>
        </div>

        {/* Rating */}
        <div>
          <p className="mb-1 text-sm text-gray-500">Rating</p>
          <RatingStars rating={review.rating} />
        </div>

        {/* Review */}
        <div>
          <p className="text-sm text-gray-500">Review</p>
          <p className="mt-1 text-gray-700 leading-relaxed">{review.review}</p>
        </div>

        {/* Status */}
        <div>
          <p className="mb-1 text-sm text-gray-500">Status</p>
          <StatusBadge status={review.status} />
        </div>
      </DialogContent>

      {/* Modal Footer */}
      <DialogActions className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
        {review.status === "Pending" && (
          <>
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
              Approve
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
              Reject
            </Button>
          </>
        )}

        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            px: 3,
            py: 1,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.875rem",
            backgroundColor: "#F3F4F6",
            color: "#374151",
            border: "1px solid #E5E7EB",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#E5E7EB",
              boxShadow: "none",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDetailsModal;