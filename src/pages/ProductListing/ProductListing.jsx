import React, { useState } from "react";

// Reusable Components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

// MUI
import { Box, Grid, Typography } from "@mui/material";

const ProductListing = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("best-selling");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  const products = [
    {
      id: 1,
      name: "Rounded Red Hat",
      price: 50,
      image: "/assets/products/product1.jpg",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Linen-blend Shirt",
      price: 17,
      image: "/assets/products/product2.jpg",
      rating: 4,
    },
    {
      id: 3,
      name: "Long Sleeve Coat",
      price: 56,
      image: "/assets/products/product3.jpg",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Boxy Denim Hat",
      price: 25,
      image: "/assets/products/product4.jpg",
      rating: 4,
    },
    {
      id: 5,
      name: "Linen Plain Top",
      price: 25,
      image: "/assets/products/product5.jpg",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Oversized T-Shirt",
      price: 11,
      image: "/assets/products/product6.jpg",
      rating: 4,
    },
     {
      id: 7,
      name: "Oversized T-Shirt",
      price: 31,
      image: "/assets/product7.jpg",
      rating: 4,
    },
     {
      id: 8,
      name: "Oversized T-Shirt",
      price: 21,
      image: "/assets/product8.jpg",
      rating: 4,
    },
     {
      id: 9,
      name: "Oversized T-Shirt",
      price: 15,
      image: "/assets/product9.jpg",
      rating: 4,
    },
  ];
  

  // Search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  if (sort === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Handlers
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value) => {
    setFilters(value);
    setCurrentPage(1);
  };

  const handleSort = (value) => {
    setSort(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box className="w-full bg-white">

      {/* Header */}
      <Header />

      {/* Main Container */}
      <Box className="mx-auto max-w-[1140px] px-5 py-8">

        {/* Breadcrumb */}
        <Box className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", path: "/" },
              { label: "Fashion", path: "/shop" },
            ]}
          />
        </Box>

        {/* Page Title */}
        <Box className="mb-8 text-center">
          <Typography
            variant="h4"
            className="!font-medium"
          >
            Fashion
          </Typography>

          <Typography
            variant="body2"
            className="mt-2 !text-gray-500"
          >
            Discover our latest fashion collection
          </Typography>
        </Box>

        {/* Search */}
        <Box className="mb-8 flex justify-center">
          <Box className="w-full max-w-[400px]">
            <SearchBar
              value={search}
              onChange={handleSearch}
              placeholder="Search products"
            />
          </Box>
        </Box>

        {/* Product Listing Layout */}
        <Grid container spacing={4}>

          {/* Filter */}
          <Grid item xs={12} md={3}>
            <Box className="rounded-md border border-gray-200 p-4">
              <FilterPanel
                filters={filters}
                onChange={handleFilter}
              />
            </Box>
          </Grid>

          {/* Products */}
          <Grid item xs={12} md={9}>

            {/* Toolbar */}
            <Box className="mb-6 flex items-center justify-between">

              <Typography
                variant="body2"
                className="!text-gray-500"
              >
                {filteredProducts.length} Products
              </Typography>

              <Box className="w-[180px]">
                <SortDropdown
                  value={sort}
                  onChange={handleSort}
                  options={[
                    {
                      label: "Best Selling",
                      value: "best-selling",
                    },
                    {
                      label: "Price: Low to High",
                      value: "price-low",
                    },
                    {
                      label: "Price: High to Low",
                      value: "price-high",
                    },
                  ]}
                />
              </Box>

            </Box>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <Grid container spacing={2}>

                {filteredProducts.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={product.id}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))}

              </Grid>
            ) : (
              <Box className="flex min-h-[300px] items-center justify-center">
                <Typography className="!text-gray-500">
                  No products found
                </Typography>
              </Box>
            )}

            {/* Pagination */}
            <Box className="mt-10 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={handlePageChange}
              />
            </Box>

          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />  

    </Box>
  );
};

export default ProductListing;