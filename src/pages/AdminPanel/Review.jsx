import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import { Icon } from "@iconify/react";

import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";

import RatingStars from "@/shared/components/AdminPanel/Review/RatingStars";
import StatusBadge from "@/shared/components/AdminPanel/Review/StatusBadge";
import ReviewDetails from "@/shared/components/AdminPanel/Review/ReviewDetails";

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

  // ================= PAGINATION =================

  const [page, setPage] = useState(0);
  const rowsPerPage = 8;

  // Reset to first page when search or filter changes
  useEffect(() => {
    setPage(0);
  }, [searchTerm, statusFilter]);

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

  const paginatedReviews = filteredReviews.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (selectedReview) {
    return (
      <ReviewDetails
        review={selectedReview}
        onBack={() => setSelectedReview(null)}
        onStatusChange={updateStatus}
      />
    );
  }

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

            <Typography variant="h5" component="h1" className="!text-2xl !font-semibold !text-gray-800">
              Reviews & Ratings
            </Typography>

            <p className="mt-1 text-gray-500">
              Manage customer reviews and ratings
            </p>

          </div>

          {/* ================= SEARCH & FILTER ================= */}

          <div className="mb-5 flex items-center justify-between gap-4">

            {/* Search */}
            <TextField
              size="small"
              placeholder="Search customer or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 bg-white"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="mdi:magnify" width="20" height="20" className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Status Filter */}
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              size="small"
              className="bg-white min-w-[150px]"
              style={{ borderRadius: "8px" }}
            >
              <MenuItem value="All Status">All Status</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>

          </div>

          {/* ================= REVIEWS TABLE ================= */}

          <TableContainer component={Paper} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-none">
            <Table className="w-full">
              {/* Table Header */}
              <TableHead className="bg-gray-50">
                <TableRow>
                  <TableCell className="!font-semibold !text-gray-800 !py-4 !px-5 !border-b-0">Customer</TableCell>
                  <TableCell className="!font-semibold !text-gray-800 !py-4 !px-5 !border-b-0">Product</TableCell>
                  <TableCell className="!font-semibold !text-gray-800 !py-4 !px-5 !border-b-0">Rating</TableCell>
                  <TableCell className="!font-semibold !text-gray-800 !py-4 !px-5 !border-b-0">Review</TableCell>
                  <TableCell className="!font-semibold !text-gray-800 !py-4 !px-5 !border-b-0">Status</TableCell>
                  <TableCell className="!font-semibold !text-gray-800 !py-4 !px-5 !border-b-0">Action</TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {paginatedReviews.length > 0 ? (
                  paginatedReviews.map((review) => (
                    <TableRow key={review.id} className="border-t border-gray-200">
                      {/* Customer */}
                      <TableCell className="!py-4 !px-5 !text-gray-800 !border-b-0">{review.customer}</TableCell>

                      {/* Product */}
                      <TableCell className="!py-4 !px-5 !text-gray-800 !border-b-0">{review.product}</TableCell>

                      {/* Rating */}
                      <TableCell className="!py-4 !px-5 !border-b-0">
                        <RatingStars rating={review.rating} />
                      </TableCell>

                      {/* Review */}
                      <TableCell className="!py-4 !px-5 !text-gray-600 !border-b-0">{review.review}</TableCell>

                      {/* Status */}
                      <TableCell className="!py-4 !px-5 !border-b-0">
                        <StatusBadge status={review.status} />
                      </TableCell>

                      {/* Action */}
                      <TableCell className="!py-4 !px-5 !border-b-0">
                        <div className="flex items-center gap-2">
                          {/* View */}
                          <Button
                            onClick={() => setSelectedReview(review)}
                            size="small"
                            variant="contained"
                            sx={{
                              px: 2,
                              py: 0.5,
                              borderRadius: "6px",
                              textTransform: "none",
                              fontWeight: 500,
                              fontSize: "0.8125rem",
                              backgroundColor: "#F3F4F6",
                              color: "#374151",
                              boxShadow: "none",
                              minWidth: "unset",
                              "&:hover": {
                                backgroundColor: "#7B0FB5",
                                color: "white",
                                boxShadow: "none",
                              },
                            }}
                          >
                            View
                          </Button>

                          {/* Approve / Reject */}
                          {review.status === "Pending" && (
                            <>
                              {/* Approve */}
                              <Button
                                onClick={() => updateStatus(review.id, "Approved")}
                                size="small"
                                variant="contained"
                                sx={{
                                  px: 2,
                                  py: 0.5,
                                  borderRadius: "6px",
                                  textTransform: "none",
                                  fontWeight: 500,
                                  fontSize: "0.8125rem",
                                  backgroundColor: "#DCFCE7",
                                  color: "#15803D",
                                  border: "1px solid #BBF7D0",
                                  boxShadow: "none",
                                  minWidth: "unset",
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

                              {/* Reject */}
                              <Button
                                onClick={() => updateStatus(review.id, "Rejected")}
                                size="small"
                                variant="contained"
                                sx={{
                                  px: 2,
                                  py: 0.5,
                                  borderRadius: "6px",
                                  textTransform: "none",
                                  fontWeight: 500,
                                  fontSize: "0.8125rem",
                                  backgroundColor: "#FEE2E2",
                                  color: "#B91C1C",
                                  border: "1px solid #FCA5A5",
                                  boxShadow: "none",
                                  minWidth: "unset",
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
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" className="!py-10 !text-gray-500 !border-b-0">
                      No reviews found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredReviews.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[8]}
              sx={{
                borderTop: "1px solid #E5E7EB",
                backgroundColor: "white",
                "& .MuiTablePagination-toolbar": {
                  px: 2,
                }
              }}
            />
          </TableContainer>

        </div>

      </main>

    </div>
  );
}

export default Review;