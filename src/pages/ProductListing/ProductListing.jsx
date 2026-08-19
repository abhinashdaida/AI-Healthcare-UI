import React, { useMemo, useState } from "react";
import Header_2 from "../../components/common/Header_2/Header_2";
import Footer from "../../components/common/Footer/Footer";
import FilterPanel from "../../components/product/FilterPanel/FilterPanel";
import SortDropdown from "../../components/product/SortDropdown/SortDropdown";
import Pagination from "../../components/product/Pagination/Pagination";
import ProductCard from "../../components/product/ProductCard/ProductCard";
import { Box, Grid, Typography, Drawer, IconButton, Button as MuiButton } from "@mui/material";
import { FiAward, FiShield, FiTruck, FiHeadphones, FiInstagram, FiMail, FiX, FiTrash2, FiShoppingBag, FiPlus, FiMinus } from "react-icons/fi";

// Images Import
import p1 from "../../assets/product1.png";
import p2 from "../../assets/product2.png";
import p3 from "../../assets/product3.png";
import p4 from "../../assets/product4.png";
import p5 from "../../assets/product5.png";
import p6 from "../../assets/product6.png";
import p7 from "../../assets/product7.png";
import p8 from "../../assets/product8.png";
import p9 from "../../assets/product9.png";

// Prices $ format representation
const PRODUCTS = [
  { id: 1, name: "Rounded Red Hat", price: 50, image: p1, rating: 4.5, category: "Accessories", brand: "Minimo", size: "M", color: "#ef4444", collection: "New arrivals", tags: ["Fashion"] },
  { id: 2, name: "Linen-blend Shirt", price: 17, image: p2, rating: 4, category: "Men", brand: "Retablo", size: "L", color: "#facc15", collection: "Best sellers", tags: ["Fashion"] },
  { id: 3, name: "Long Sleeve Coat", price: 56, image: p3, rating: 4.5, category: "Women", brand: "Brook", size: "M", color: "#111827", collection: "New arrivals", tags: ["Fashion"] },
  { id: 4, name: "Boxy Denim Hat", price: 25, image: p4, rating: 4, category: "Accessories", brand: "Mimosa", size: "S", color: "#3b82f6", collection: "Accessories", tags: ["Fashion"] },
  { id: 5, name: "Linen Plain Top", price: 25, image: p5, rating: 4.5, category: "Women", brand: "Minimo", size: "M", color: "#ec4899", collection: "Best sellers", tags: ["Fashion"] },
  { id: 6, name: "Oversized T-Shirt", price: 11, image: p6, rating: 4, category: "Men", brand: "Retablo", size: "XL", color: "#22c55e", collection: "All products", tags: ["Fashion"] },
  { id: 7, name: "Classic Oversized T-Shirt", price: 31, image: p7, rating: 4, category: "Women", brand: "Brook", size: "S", color: "#8b5cf6", collection: "New arrivals", tags: ["Fashion"] },
  { id: 8, name: "Kids Casual T-Shirt", price: 21, image: p8, rating: 4, category: "Kids", brand: "Mimosa", size: "S", color: "#06b6d4", collection: "All products", tags: ["Fashion"] },
  { id: 9, name: "Casual Shoes", price: 15, image: p9, rating: 4, category: "Shoes", brand: "Minimo", size: "L", color: "#f97316", collection: "Best sellers", tags: ["Fashion"] },
];

const CATEGORIES = ["All", "Men", "Women", "Kids", "Shoes", "Bags", "Accessories"];
const INSTA_IMAGES = [p1, p2, p3, p4, p5, p6];
const INITIAL_FILTERS = { size: "", color: "", price: [0, 500], brands: [], collection: "", tags: [] };

const ProductListing = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("best-selling");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");
  
  // Wishlist & Cart States
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [email, setEmail] = useState("");
  
  // Drawer visibility states
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return PRODUCTS.filter((p) => {
      const matchSearch = !query || p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
      const matchCat = category === "All" || p.category === category;
      const matchSize = !filters.size || p.size === filters.size;
      const matchColor = !filters.color || p.color === filters.color;
      const matchPrice = p.price >= filters.price[0] && p.price <= filters.price[1];
      const matchBrand = !filters.brands.length || filters.brands.includes(p.brand);

      return matchSearch && matchCat && matchSize && matchColor && matchPrice && matchBrand;
    }).sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.id - a.id;
    });
  }, [search, category, filters, sort]);

  // Pagination Logic
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedProducts = filteredProducts.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

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

  // Add to Cart Handler
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartDrawerOpen(true);
  };

  // Quantity change in cart
  const handleUpdateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove from cart
  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Total Calculations
  const totalCartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearch("");
    setCategory("All");
    setSort("best-selling");
    setCurrentPage(1);
  };

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed successfully with ${email}!`);
      setEmail("");
    }
  };

  return (
    <Box className="min-h-screen bg-white text-gray-900">
      <Header_2
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        onWishlistClick={() => setIsWishlistDrawerOpen(true)}
        onCartClick={() => setIsCartDrawerOpen(true)}
        onSearchSubmit={(query) => {
          setSearch(query);
          setCurrentPage(1);
        }}
      />

      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Categories Bar */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setCurrentPage(1); }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${category === cat ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters and Product Grid */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <div className="rounded-xl border p-4 shadow-sm md:sticky md:top-20">
              <FilterPanel filters={filters} setFilters={setFilters} onChange={() => setCurrentPage(1)} onClear={handleClearFilters} />
            </div>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            {/* Top Toolbar */}
            <div className="mb-6 flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
              <Typography variant="body2" className="!text-gray-500">
                Showing <strong>{paginatedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> Products
                {search && <span> for "<strong>{search}</strong>"</span>}
              </Typography>
              <div className="w-48">
                <SortDropdown value={sort} onChange={(val) => { setSort(val); setCurrentPage(1); }} />
              </div>
            </div>

            {/* Product Cards Grid */}
            {paginatedProducts.length > 0 ? (
              <Grid container spacing={3}>
                {paginatedProducts.map((product) => {
                  const isWishlisted = wishlist.some((item) => item.id === product.id);
                  return (
                    <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                      <ProductCard
                        product={{
                          ...product,
                          price: `$${product.price}` // Explicit dollar format for ProductCard compatibility
                        }}
                        isWishlisted={isWishlisted}
                        onWishlist={handleWishlistToggle}
                        onAddToCart={() => handleAddToCart(product)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
                <Typography variant="h6">No products found</Typography>
                <button onClick={handleClearFilters} className="mt-4 rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white">
                  Reset Filters & Search
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={(p) => setCurrentPage(Number(p))} />
              </div>
            )}
          </Grid>
        </Grid>

        {/* Features Info */}
        <div className="my-12 grid grid-cols-2 gap-4 border-y bg-gray-50 py-8 text-center md:grid-cols-4">
          <div><FiAward className="mx-auto mb-1 text-2xl" /><Typography className="!text-sm !font-semibold">High Quality</Typography></div>
          <div><FiShield className="mx-auto mb-1 text-2xl" /><Typography className="!text-sm !font-semibold">Warranty</Typography></div>
          <div><FiTruck className="mx-auto mb-1 text-2xl" /><Typography className="!text-sm !font-semibold">Free Shipping</Typography></div>
          <div><FiHeadphones className="mx-auto mb-1 text-2xl" /><Typography className="!text-sm !font-semibold">24/7 Support</Typography></div>
        </div>

        {/* Subscribe to Newsletter */}
        <div className="my-12 rounded-2xl bg-neutral-900 p-8 text-center text-white sm:p-12">
          <FiMail className="mx-auto mb-3 text-4xl text-gray-300" />
          <Typography variant="h5" className="!font-bold">Subscribe to our Newsletter</Typography>
          <Typography variant="body2" className="mt-1 text-gray-400">
            Get the latest updates on new arrivals and exclusive offers directly in your inbox.
          </Typography>
          <form onSubmit={handleNewsletterSubscribe} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-400 border border-neutral-700 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Instagram Grid */}
        <div className="my-12 text-center">
          <Typography variant="h5" className="!mb-4 !font-semibold">Follow Us On Instagram</Typography>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
            {INSTA_IMAGES.map((img, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg">
                <img src={img} alt="Insta" className="h-full w-full object-cover group-hover:scale-105 transition" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                  <FiInstagram className="text-xl text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* WISHLIST DRAWER */}
      <Drawer
        anchor="right"
        open={isWishlistDrawerOpen}
        onClose={() => setIsWishlistDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 380 }, p: 3 } }}
      >
        <div className="flex items-center justify-between border-b pb-3">
          <Typography variant="h6" className="!font-bold">Wishlist ({wishlist.length})</Typography>
          <IconButton onClick={() => setIsWishlistDrawerOpen(false)} size="small">
            <FiX className="text-xl" />
          </IconButton>
        </div>

        {wishlist.length > 0 ? (
          <div className="mt-4 flex flex-col gap-4 overflow-y-auto">
            {wishlist.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border-b pb-3">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover border" />
                <div className="flex-1">
                  <Typography variant="subtitle2" className="!font-semibold">{item.name}</Typography>
                  <Typography variant="body2" className="text-gray-500">${item.price}</Typography>
                  <button
                    onClick={() => {
                      handleAddToCart(item);
                      handleWishlistToggle(item.id, false, item);
                    }}
                    className="mt-1 flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline"
                  >
                    <FiShoppingBag /> Move to Cart
                  </button>
                </div>
                <IconButton onClick={() => handleWishlistToggle(item.id, false, item)} color="error" size="small">
                  <FiTrash2 />
                </IconButton>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-auto text-center py-12">
            <Typography variant="body1" className="text-gray-500">Your Wishlist is Empty</Typography>
          </div>
        )}
      </Drawer>

      {/* CART DRAWER */}
      <Drawer
        anchor="right"
        open={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 400 }, p: 3, display: "flex", flexDirection: "column" } }}
      >
        <div className="flex items-center justify-between border-b pb-3">
          <Typography variant="h6" className="!font-bold">Shopping Cart ({totalCartCount})</Typography>
          <IconButton onClick={() => setIsCartDrawerOpen(false)} size="small">
            <FiX className="text-xl" />
          </IconButton>
        </div>

        {cart.length > 0 ? (
          <>
            <div className="mt-4 flex-1 flex flex-col gap-4 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b pb-3">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover border shrink-0" />
                  <div className="flex-1">
                    <Typography variant="subtitle2" className="!font-semibold">{item.name}</Typography>
                    <Typography variant="body2" className="text-gray-500">${item.price}</Typography>
                    
                    <div className="mt-2 flex items-center gap-2 border w-fit rounded-md px-2 py-0.5">
                      <button onClick={() => handleUpdateQuantity(item.id, -1)} className="text-gray-600 hover:text-black">
                        <FiMinus className="text-xs" />
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, 1)} className="text-gray-600 hover:text-black">
                        <FiPlus className="text-xs" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Typography variant="subtitle2" className="!font-bold">${item.price * item.quantity}</Typography>
                    <IconButton onClick={() => handleRemoveFromCart(item.id)} color="error" size="small" className="!mt-1">
                      <FiTrash2 />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-auto">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="subtitle1" className="!font-bold">Total Amount:</Typography>
                <Typography variant="h6" className="!font-bold text-emerald-600">${cartSubtotal}</Typography>
              </div>
              <MuiButton
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333" }, py: 1.5, borderRadius: 2 }}
                onClick={() => alert(`Proceeding to checkout with total $${cartSubtotal}`)}
              >
                Checkout Now
              </MuiButton>
            </div>
          </>
        ) : (
          <div className="my-auto text-center py-12">
            <Typography variant="body1" className="text-gray-500">Your Shopping Cart is Empty</Typography>
          </div>
        )}
      </Drawer>

      <Footer />
    </Box>
  );
};

export default ProductListing;