import React, { useMemo, useState } from "react";

// ======================================================
// PRODUCT IMAGES
// src/assets/
// ======================================================

import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import product4 from "../../assets/product4.jpg";
import product5 from "../../assets/product5.jpg";
import product6 from "../../assets/product6.jpg";
import product7 from "../../assets/product7.jpg";
import product8 from "../../assets/product8.jpg";
import product9 from "../../assets/product9.jpg";

// ======================================================
// PRODUCT COMPONENTS
// ======================================================

import FilterPanel from "../../components/product/FilterPanel/FilterPanel";
import SortDropdown from "../../components/product/SortDropdown/SortDropdown";
import Pagination from "../../components/product/Pagination/Pagination";
import ProductCard from "../../components/product/ProductCard/ProductCard";
import Breadcrumb from "../../components/product/Breadcrumb/Breadcrumb";

// ======================================================
// COMMON COMPONENTS
// ======================================================

import Header from "../../components/common/Header_2/Header_2";
import Footer from "../../components/common/Footer/Footer";
import SearchBar from "../../components/common/SearchBar/SearchBar";

// ======================================================
// MUI
// ======================================================

import { Box, Grid, Typography } from "@mui/material";

// ======================================================
// PRODUCT LISTING
// ======================================================

const ProductListing = () => {
  // ====================================================
  // STATES
  // ====================================================

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("best-selling");

  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("All");

  const [filters, setFilters] = useState({
    size: "",
    color: "",
    price: [0, 500],
    brands: [],
    collection: "",
    tags: [],
  });

  // ====================================================
  // PRODUCTS
  // ====================================================

  const products = [
    {
      id: 1,
      name: "Rounded Red Hat",
      price: 50,
      image: product1,
      rating: 4.5,
      category: "Accessories",
      brand: "Minimo",
      size: "M",
      color: "#ef4444",
      collection: "New arrivals",
      tags: ["Fashion", "Accessories"],
    },

    {
      id: 2,
      name: "Linen-blend Shirt",
      price: 17,
      image: product2,
      rating: 4,
      category: "Men",
      brand: "Retablo",
      size: "L",
      color: "#facc15",
      collection: "Best sellers",
      tags: ["Fashion", "Men"],
    },

    {
      id: 3,
      name: "Long Sleeve Coat",
      price: 56,
      image: product3,
      rating: 4.5,
      category: "Women",
      brand: "Brook",
      size: "M",
      color: "#111827",
      collection: "New arrivals",
      tags: ["Fashion", "Women"],
    },

    {
      id: 4,
      name: "Boxy Denim Hat",
      price: 25,
      image: product4,
      rating: 4,
      category: "Accessories",
      brand: "Mimosa",
      size: "S",
      color: "#3b82f6",
      collection: "Accessories",
      tags: ["Fashion", "Accessories"],
    },

    {
      id: 5,
      name: "Linen Plain Top",
      price: 25,
      image: product5,
      rating: 4.5,
      category: "Women",
      brand: "Minimo",
      size: "M",
      color: "#ec4899",
      collection: "Best sellers",
      tags: ["Fashion", "Women"],
    },

    {
      id: 6,
      name: "Oversized T-Shirt",
      price: 11,
      image: product6,
      rating: 4,
      category: "Men",
      brand: "Retablo",
      size: "XL",
      color: "#22c55e",
      collection: "All products",
      tags: ["Fashion", "Men"],
    },

    {
      id: 7,
      name: "Oversized T-Shirt",
      price: 31,
      image: product7,
      rating: 4,
      category: "Women",
      brand: "Brook",
      size: "S",
      color: "#8b5cf6",
      collection: "New arrivals",
      tags: ["Fashion", "Women"],
    },

    {
      id: 8,
      name: "Oversized T-Shirt",
      price: 21,
      image: product8,
      rating: 4,
      category: "Kids",
      brand: "Mimosa",
      size: "S",
      color: "#06b6d4",
      collection: "All products",
      tags: ["Fashion", "Kids"],
    },

    {
      id: 9,
      name: "Oversized T-Shirt",
      price: 15,
      image: product9,
      rating: 4,
      category: "Shoes",
      brand: "Minimo",
      size: "L",
      color: "#f97316",
      collection: "Best sellers",
      tags: ["Fashion", "Shoes"],
    },
  ];

  // ====================================================
  // CATEGORIES
  // ====================================================

  const categories = [
    "All",
    "Men",
    "Women",
    "Kids",
    "Shoes",
    "Bags",
    "Accessories",
  ];

  // ====================================================
  // ITEMS PER PAGE
  // ====================================================

  const ITEMS_PER_PAGE = 6;

  // ====================================================
  // SEARCH + FILTER + CATEGORY
  // ====================================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const searchValue = search
        .toLowerCase()
        .trim();

      result = result.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchValue)
      );
    }

    // Category
    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    // Size
    if (filters.size) {
      result = result.filter(
        (product) =>
          product.size === filters.size
      );
    }

    // Color
    if (filters.color) {
      result = result.filter(
        (product) =>
          product.color === filters.color
      );
    }

    // Price
    if (
      filters.price &&
      filters.price.length === 2
    ) {
      const minPrice = filters.price[0];
      const maxPrice = filters.price[1];

      result = result.filter(
        (product) =>
          product.price >= minPrice &&
          product.price <= maxPrice
      );
    }

    // Brands
    if (
      filters.brands &&
      filters.brands.length > 0
    ) {
      result = result.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // Collection
    if (
      filters.collection &&
      filters.collection !== "All products"
    ) {
      result = result.filter(
        (product) =>
          product.collection ===
          filters.collection
      );
    }

    // Tags
    if (
      filters.tags &&
      filters.tags.length > 0
    ) {
      result = result.filter((product) =>
        filters.tags.some((tag) =>
          product.tags.includes(tag)
        )
      );
    }

    return result;
  }, [
    search,
    category,
    filters,
  ]);

  // ====================================================
  // SORT
  // ====================================================

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    switch (sort) {
      case "price-low":
        return result.sort(
          (a, b) => a.price - b.price
        );

      case "price-high":
        return result.sort(
          (a, b) => b.price - a.price
        );

      case "rating":
        return result.sort(
          (a, b) => b.rating - a.rating
        );

      case "newest":
        return result.reverse();

      case "best-selling":
      default:
        return result.sort(
          (a, b) => b.rating - a.rating
        );
    }
  }, [filteredProducts, sort]);

  // ====================================================
  // PAGINATION
  // ====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedProducts.length /
        ITEMS_PER_PAGE
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    ITEMS_PER_PAGE;

  const paginatedProducts =
    sortedProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  // ====================================================
  // HANDLERS
  // ====================================================

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value) => {
    setFilters((previous) => ({
      ...previous,
      ...value,
    }));

    setCurrentPage(1);
  };

  const handleSort = (value) => {
    setSort(value);
    setCurrentPage(1);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClearFilters = () => {
    setFilters({
      size: "",
      color: "",
      price: [0, 500],
      brands: [],
      collection: "",
      tags: [],
    });

    setCategory("All");
    setSearch("");
    setCurrentPage(1);
  };

  // ====================================================
  // RETURN
  // ====================================================

  return (
    <Box className="min-h-screen w-full bg-white">
      {/* =================================================
          HEADER 2
      ================================================= */}

      <Header />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <Box className="mx-auto w-full max-w-[1140px] px-5 py-8">
        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <Box className="mb-6">
          <Breadcrumb
            items={[
              {
                label: "Home",
                path: "/",
              },
              {
                label: "Product Listing",
                path: "/products",
              },
            ]}
          />
        </Box>

        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <Box className="mb-8 text-center">
          <Typography
            variant="h4"
            className="!font-medium"
          >
            Product Listing
          </Typography>

          <Typography
            variant="body2"
            className="mt-2 !text-gray-500"
          >
            Discover our latest fashion
            collection
          </Typography>
        </Box>

        {/* =================================================
            SEARCH
        ================================================= */}

        <Box className="mb-8 flex justify-center">
          <Box className="w-full max-w-[400px]">
            <SearchBar
              value={search}
              onChange={handleSearch}
              placeholder="Search products..."
            />
          </Box>
        </Box>

        {/* =================================================
            CATEGORY SELECTION
        ================================================= */}

        <Box className="mb-8">
          <Box className="flex flex-wrap justify-center gap-2 border-b border-gray-100 pb-6">
            {categories.map((item) => {
              const isActive =
                category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    handleCategory(item)
                  }
                  className={`rounded-full border px-5 py-2 text-sm transition ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-black hover:text-black"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </Box>
        </Box>

        {/* =================================================
            FILTER + PRODUCTS
        ================================================= */}

        <Grid container spacing={4}>
          {/* =================================================
              FILTER SIDEBAR
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Box className="rounded-md border border-gray-200 p-4 md:sticky md:top-4">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onChange={handleFilter}
                onClear={
                  handleClearFilters
                }
              />
            </Box>
          </Grid>

          {/* =================================================
              PRODUCT AREA
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 9,
            }}
          >
            {/* =================================================
                SORT TOOLBAR
            ================================================= */}

            <Box className="mb-6 flex items-center justify-between border-b border-gray-100 pb-5">
              <Typography
                variant="body2"
                className="!text-gray-500"
              >
                {sortedProducts.length}{" "}
                Products
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
                      label: "Newest",
                      value: "newest",
                    },
                    {
                      label:
                        "Price: Low to High",
                      value: "price-low",
                    },
                    {
                      label:
                        "Price: High to Low",
                      value: "price-high",
                    },
                    {
                      label: "Highest Rated",
                      value: "rating",
                    },
                  ]}
                />
              </Box>
            </Box>

            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            {paginatedProducts.length > 0 ? (
              <Grid container spacing={3}>
                {paginatedProducts.map(
                  (product) => (
                    <Grid
                      key={product.id}
                      size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                      }}
                    >
                      <ProductCard
                        product={product}
                      />
                    </Grid>
                  )
                )}
              </Grid>
            ) : (
              <Box className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-gray-200">
                <Box className="text-center">
                  <Typography
                    variant="h6"
                    className="!text-gray-700"
                  >
                    No products found
                  </Typography>

                  <Typography
                    variant="body2"
                    className="mt-2 !text-gray-500"
                  >
                    Try changing your search
                    or filters.
                  </Typography>

                  <button
                    type="button"
                    onClick={
                      handleClearFilters
                    }
                    className="mt-5 border border-black px-5 py-2 text-sm transition hover:bg-black hover:text-white"
                  >
                    Clear Filters
                  </button>
                </Box>
              </Box>
            )}

            {/* =================================================
                PAGINATION
            ================================================= */}

            {sortedProducts.length > 0 && (
              <Box className="mt-10 flex justify-center">
                <Pagination
                  currentPage={
                    safeCurrentPage
                  }
                  totalPages={totalPages}
                  onPageChange={
                    handlePageChange
                  }
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </Box>
  );
};

export default ProductListing;