import React, { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Header_2 from "../../components/common/Header_2/Header_2";
import Footer from "../../components/common/Footer/Footer";
import FilterPanel from "../../components/product/FilterPanel/FilterPanel";
import SortDropdown from "../../components/product/SortDropdown/SortDropdown";
import ProductCard from "../../components/product/ProductCard/ProductCard";
import FeaturedPromoBanner from "../ProductDetails/sections/FeaturedPromoBanner";
import FeaturesBar from "../ProductDetails/sections/FeaturesBar";
import NewsletterSection from "../ProductDetails/sections/NewsletterSection";
import CartDrawer from "../ProductDetails/components/CartDrawer";
import { ALL_PRODUCTS } from "../../data/productsData";
import {
  getStoredCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem
} from "../../utils/cartManager";
import { Icon } from "@iconify/react";

// 7 Curated Instagram Model Photos for the Instagram Strip
const INSTAGRAM_GALLERY = [
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", // Man in camel coat
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80", // Woman in tailored blazer
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80", // Woman in trendy sunglasses
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80", // Man in plaid shirt & red pants
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80", // Woman in chic dress
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80", // Man in jacket & sunglasses
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", // Woman in beige dress
];

const INITIAL_FILTERS = {
  size: "",
  color: "",
  price: [0, 500],
  brands: [],
  collection: "",
  tags: []
};

/**
 * FASCO Fashion Product Listing Page matching the reference design exactly.
 * Located in: src/pages/ProductListing/ProductListing.jsx
 */
const ProductListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Restore navigation state if returning back from Product Details
  const returnState = location.state?.returnState || location.state || {};

  // Read initial page from URL query -> location.state -> sessionStorage -> 1
  const getInitialPage = () => {
    const urlPage = parseInt(searchParams.get("page"), 10);
    if (urlPage && !isNaN(urlPage) && urlPage > 0) return urlPage;
    if (returnState.page) return Number(returnState.page);
    const saved = parseInt(sessionStorage.getItem("fasco_active_page"), 10);
    if (saved && !isNaN(saved) && saved > 0) return saved;
    return 1;
  };

  const getInitialCategory = () => {
    const urlCat = searchParams.get("category");
    if (urlCat) return urlCat;
    if (returnState.category) return returnState.category;
    return sessionStorage.getItem("fasco_active_category") || "All";
  };

  const [search, setSearch] = useState(() => returnState.search || "");
  const [sort, setSort] = useState(() => returnState.sort || "all");
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [category, setCategory] = useState(getInitialCategory);
  const [filters, setFilters] = useState(() => returnState.filters || INITIAL_FILTERS);
  const [gridCols, setGridCols] = useState(() => returnState.gridCols || 3);

  // Wishlist & Cart States
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState(getStoredCart);

  // Drawer visibility state
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Flag to avoid resetting page on initial mount when restoring state
  const isInitialMount = useRef(true);

  // Sync cart with localStorage events
  React.useEffect(() => {
    const handleSync = () => setCart(getStoredCart());
    window.addEventListener("cart_updated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("cart_updated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return ALL_PRODUCTS.filter((p) => {
      // 1. Search Query
      const matchSearch =
        !query ||
        p.name?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query);

      // 2. Category Tab Filter
      const matchCat =
        category === "All" ||
        p.category?.toLowerCase() === category.toLowerCase() ||
        (category.toLowerCase() === "accessories" &&
          (p.category?.toLowerCase() === "accessories" ||
            p.tags?.some((t) => t.toLowerCase() === "accessories")));

      // 3. Size Filter
      const matchSize =
        !filters.size ||
        p.size === filters.size ||
        (Array.isArray(p.sizes) && p.sizes.includes(filters.size));

      // 4. Color Filter (Semantic family match)
      const isColorMatch = (prod, selectedColor) => {
        if (!selectedColor) return true;
        const target = selectedColor.toLowerCase();

        const colorFamilies = {
          "#ef4444": ["red", "crimson", "scarlet", "#ef4444", "#dc2626"],
          "#f97316": ["orange", "amber", "#f97316", "#ea580c"],
          "#facc15": ["yellow", "gold", "mustard", "#facc15", "#ca8a04", "#eab308"],
          "#22c55e": ["green", "lime", "olive", "emerald", "#22c55e", "#16a34a"],
          "#3b82f6": ["blue", "cyan", "navy", "denim", "mirrored", "#3b82f6", "#2563eb", "#06b6d4", "#38bdf8"],
          "#8b5cf6": ["purple", "violet", "lavender", "#8b5cf6", "#7c3aed"],
          "#ec4899": ["pink", "rose", "#ec4899"],
          "#78350f": ["brown", "tan", "camel", "cognac", "khaki", "tweed", "#78350f", "#451a03", "#854d0e", "#92400e"],
          "#111827": ["black", "charcoal", "dark", "grey", "gray", "polka", "#111827", "#111111", "#000000", "#4b5563", "#374151"],
          "#ffffff": ["white", "beige", "cream", "#ffffff", "#f8fafc"]
        };

        const matchingKeywords = colorFamilies[target] || [target];

        // Helper to check if a single color string matches any of the keywords
        const checkMatch = (colorStr) => {
          if (!colorStr) return false;
          const lower = colorStr.toLowerCase();
          return matchingKeywords.some((kw) => lower.includes(kw) || kw.includes(lower));
        };

        if (checkMatch(prod.color)) return true;

        if (Array.isArray(prod.colors)) {
          return prod.colors.some((c) => checkMatch(c.hex) || checkMatch(c.name));
        }

        return false;
      };

      const matchColor = isColorMatch(p, filters.color);

      // 5. Price Range Filter
      const minPrice = filters.price?.[0] ?? 0;
      const maxPrice = filters.price?.[1] ?? 500;
      const matchPrice = p.price >= minPrice && p.price <= maxPrice;

      // 6. Brands Multi-Select
      const matchBrand =
        !filters.brands?.length ||
        filters.brands.some((b) => b.toLowerCase() === p.brand?.toLowerCase());

      // 7. Collection Filter
      const matchCollection =
        !filters.collection ||
        filters.collection === "All products" ||
        p.collection?.toLowerCase() === filters.collection.toLowerCase() ||
        (filters.collection.toLowerCase() === "accessories" &&
          (p.category?.toLowerCase() === "accessories" ||
            p.collection?.toLowerCase() === "accessories"));

      // 8. Tags Filter
      const matchTags =
        !filters.tags?.length ||
        filters.tags.some(
          (tag) =>
            p.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()) ||
            p.category?.toLowerCase() === tag.toLowerCase()
        );

      return (
        matchSearch &&
        matchCat &&
        matchSize &&
        matchColor &&
        matchPrice &&
        matchBrand &&
        matchCollection &&
        matchTags
      );
    }).sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "best-selling") return (b.reviewCount || 0) - (a.reviewCount || 0);
      if (sort === "newest") return b.id.localeCompare(a.id);
      return 0; // Default natural order for "all"
    });
  }, [search, category, filters, sort]);

  // Sync URL with currentPage explicitly on mount and on changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // On initial mount, ensure the URL reflects the active page (e.g. ?page=1)
      setSearchParams(
        (prev) => {
          const u = new URLSearchParams(prev);
          u.set("page", String(currentPage));
          return u;
        },
        { replace: true }
      );
      return;
    }
    setCurrentPage(1);
    setSearchParams(
      (prev) => {
        const u = new URLSearchParams(prev);
        u.set("page", "1");
        return u;
      },
      { replace: true }
    );
  }, [search, category, filters, sort, setSearchParams]);

  // Responsive cards per page depending on active grid layout
  const ITEMS_PER_PAGE = gridCols === 4 ? 12 : 9;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  // Wishlist Handler
  const handleWishlistToggle = (id, newLikedStatus, productData) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === productData.id);
      if (exists) {
        return prev.filter((item) => item.id !== productData.id);
      }
      return [...prev, productData];
    });
  };

  const [justAddedItem, setJustAddedItem] = useState(null);

  // Add to Cart Handler
  const handleAddToCart = (product) => {
    const updated = addItemToCart(product);
    setCart(updated);
    
    // Find the exactly added item from the updated cart
    const added = updated.find(item => String(item.id) === String(product.id));
    if (added) {
      setJustAddedItem(added);
      setIsCartDrawerOpen(true);
    }
  };

  // Page change handler with URL sync and sessionStorage persistence
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    sessionStorage.setItem("fasco_active_page", String(pageNum));
    setSearchParams(
      (prev) => {
        const u = new URLSearchParams(prev);
        u.set("page", String(pageNum)); // Always show page number in URL, even if it's 1
        return u;
      },
      { replace: true }
    );
    window.scrollTo({ top: 250, behavior: "smooth" });
  };

  const handleCategoryClick = (catName) => {
    setCategory(catName);
    sessionStorage.setItem("fasco_active_category", catName);
    handlePageChange(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearch("");
    setCategory("All");
    setSort("all");
    sessionStorage.removeItem("fasco_active_page");
    sessionStorage.removeItem("fasco_active_category");
    handlePageChange(1);
  };

  // Total quantity in cart
  const totalCartCount = useMemo(
    () => cart.reduce((total, item) => total + (item.quantity || 1), 0),
    [cart]
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-black selection:text-white flex flex-col justify-between">
      
      {/* 1. Header_2 Navbar */}
      <Header_2
        brandName="FASCO"
        activeLink="Shop"
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onCartClick={() => navigate("/cart")}
        initialSearchQuery={search}
        onSearchSubmit={(query) => {
          setSearch(query);
          setCurrentPage(1);
        }}
      />

      <main className="flex-1">
        
        {/* 2. Hero Title & Breadcrumb (Fashion Heading matching reference design) */}
        <div className="py-8 sm:py-12 text-center bg-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 tracking-tight">
            Fashion
          </h1>
          <div className="text-xs text-neutral-500 font-medium mt-2 flex items-center justify-center gap-1.5">
            <a href="/" className="hover:text-black transition-colors">
              Home
            </a>
            <span>&gt;</span>
            <span className="text-neutral-900 font-semibold">
              Fashion
            </span>
          </div>
        </div>

        {/* 3. Main Filter & Product Cards Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left Sidebar Filter Panel */}
            <div className="w-full lg:w-60 shrink-0">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onClear={handleClearFilters}
              />
            </div>

            {/* Right Product Grid Area */}
            <div className="flex-1 w-full">
              
              {/* Top Toolbar (Sort Dropdown & Grid View Switcher) */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-100">
                <div className="w-44 sm:w-48">
                  <SortDropdown
                    value={sort}
                    onChange={(val) => {
                      setSort(val);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                {/* Grid Layout Switcher Icons matching media_1787193243447.png */}
                <div className="flex items-center gap-2.5">
                  {/* 3-Column Grid Switcher (Solid 4-Box) */}
                  <button
                    type="button"
                    onClick={() => {
                      setGridCols(3);
                      setCurrentPage(1);
                    }}
                    className={`p-1.5 rounded transition-all focus:outline-none cursor-pointer ${
                      gridCols === 3
                        ? "text-black scale-105"
                        : "text-neutral-300 hover:text-neutral-600"
                    }`}
                    title="3 Columns Grid View"
                    aria-label="3 Columns View"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <rect x="2" y="2" width="7" height="7" rx="1" />
                      <rect x="11" y="2" width="7" height="7" rx="1" />
                      <rect x="2" y="11" width="7" height="7" rx="1" />
                      <rect x="11" y="11" width="7" height="7" rx="1" />
                    </svg>
                  </button>

                  {/* 4-Column Grid Switcher (Outlined 4-Box) */}
                  <button
                    type="button"
                    onClick={() => {
                      setGridCols(4);
                      setCurrentPage(1);
                    }}
                    className={`p-1.5 rounded transition-all focus:outline-none cursor-pointer ${
                      gridCols === 4
                        ? "text-black scale-105"
                        : "text-neutral-300 hover:text-neutral-600"
                    }`}
                    title="4 Columns Grid View"
                    aria-label="4 Columns View"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1" />
                      <rect x="11" y="2.5" width="6.5" height="6.5" rx="1" />
                      <rect x="2.5" y="11" width="6.5" height="6.5" rx="1" />
                      <rect x="11" y="11" width="6.5" height="6.5" rx="1" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Dynamic Product Cards Grid */}
              {paginatedProducts.length > 0 ? (
                <div
                  className={`grid gap-6 transition-all duration-300 ${
                    gridCols === 4
                      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
                      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
                  }`}
                >
                  {paginatedProducts.map((product) => {
                    const isWishlisted = wishlist.some((item) => item.id === product.id);
                    return (
                      <ProductCard
                        key={product.id}
                        product={{
                          ...product,
                          price: `$${Number(product.price).toFixed(2)}`
                        }}
                        isWishlisted={isWishlisted}
                        onClick={(prod) => {
                          const queryPath = `/shop?page=${safePage}${category !== "All" ? `&category=${encodeURIComponent(category)}` : ""}`;
                          sessionStorage.setItem("fasco_active_page", String(safePage));
                          sessionStorage.setItem("fasco_active_category", category);
                          sessionStorage.setItem("fasco_return_path", queryPath);

                          navigate(`/product/${prod.id}`, {
                            state: {
                              product: prod,
                              returnState: {
                                page: safePage,
                                category,
                                filters,
                                sort,
                                gridCols,
                                search
                              }
                            }
                          });
                        }}
                        onWishlist={handleWishlistToggle}
                        onAddToCart={() => handleAddToCart(product)}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 py-16 text-center space-y-3">
                  <Icon icon="mdi:tag-off-outline" className="w-12 h-12 text-neutral-400" />
                  <h3 className="text-base font-bold text-neutral-900">No products found</h3>
                  <p className="text-xs text-neutral-500 max-w-xs">
                    Try adjusting your filters or search keywords to find what you're looking for.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-2 rounded-lg bg-black px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-neutral-800 transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Pagination (Matching Reference Design) */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
                    const isActive = pageNum === safePage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`h-9 w-9 rounded-full text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                          isActive
                            ? "bg-black text-white shadow-md scale-105"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {safePage < totalPages && (
                    <button
                      onClick={() => handlePageChange(safePage + 1)}
                      className="h-9 w-9 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 text-xs font-bold transition flex items-center justify-center cursor-pointer"
                      aria-label="Next Page"
                    >
                      &gt;
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* 4. Featured Collection Promo Banner (Peaky Blinders) */}
        <FeaturedPromoBanner
          onBuyNowClick={() =>
            handleAddToCart({
              id: "fash-1",
              name: "Peaky Blinders Collection Set",
              price: 100.0,
              image: ALL_PRODUCTS.find((p) => p.id === "fash-1")?.image,
              selectedSize: "M",
              selectedColor: "Black",
              quantity: 1
            })
          }
        />

        {/* 5. Value Propositions Features Bar (Quality, Warranty, Shipping, Support) */}
        <FeaturesBar />

        {/* 6. 'Follow Us On Instagram' Section (7-Image Gallery Grid) */}
        <section className="py-16 bg-white text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight">
              Follow Us On Instagram
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto font-normal">
              Explore our trending community styles, street looks, and latest runway fashion drops on Instagram.
            </p>

            {/* 7-Photo Horizontal Gallery Strip */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
              {INSTAGRAM_GALLERY.map((imgUrl, i) => (
                <div
                  key={i}
                  className="group relative aspect-3/4 overflow-hidden rounded-lg bg-neutral-100 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={imgUrl}
                    alt={`Instagram Look ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon icon="mdi:instagram" className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Dual-Model Newsletter Subscription Section */}
        <NewsletterSection />

      </main>

      {/* 8. Footer */}
      <Footer />

      {/* 9. Interactive Slide-Over Cart Drawer matching Reference Design */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => {
          setIsCartDrawerOpen(false);
          setJustAddedItem(null);
        }}
        cartItems={justAddedItem ? [justAddedItem] : []}
        onUpdateQuantity={(item, newQty) => {
          const updated = updateCartItemQuantity(item.id, newQty);
          setCart(updated);
          setJustAddedItem({ ...item, quantity: newQty });
        }}
        onRemoveItem={(item) => {
          const updated = removeCartItem(item.id);
          setCart(updated);
          setJustAddedItem(null);
          setIsCartDrawerOpen(false);
        }}
        onCheckout={() => navigate("/checkout")}
      />

    </div>
  );
};

export default ProductListing;