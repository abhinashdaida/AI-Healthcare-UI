import React from "react";
import { Icon } from "@iconify/react";
import ProductPrice from "../ProductPrice/ProductPrice";
import Rating from "../Rating/Rating";
import WishlistButton from "../WishlistButton/WishlistButton";
import Button from "../../common/Button/Button";

/**
 * Universal Adaptive Reusable ProductCard Component for BuyCommerce Application.
 * Located in: src/components/product/ProductCard/ProductCard.jsx
 * 
 * Works flexibly across Home Page, Landing Page, New Arrivals, Product Listing, Search Results, Cart, and Wishlist.
 * 
 * Props:
 * @param {Object} product - Product data object (Optional if direct props are passed)
 * @param {string|number} id - Product ID
 * @param {string} image - Image URL (or imageUrl / img)
 * @param {string} imageUrl - Alternative image URL prop
 * @param {string} name - Product Name (or title)
 * @param {string} title - Alternative title prop
 * @param {string} category - Category / Brand name
 * @param {string} brand - Brand name
 * @param {number|string} price - Sale price (number 2499 or string "$95.50" / "₹2,499")
 * @param {number|string} originalPrice - Regular price before discount
 * @param {number} discount - Discount percentage
 * @param {number} rating - Star rating (0-5)
 * @param {number} reviewCount - Review count
 * @param {string} badge - Badge text ('Best Seller', 'Sale', 'New', 'Trending', 'Limited')
 * @param {boolean} inStock - Stock availability (Default: true)
 * @param {string} variant - 'standard' | 'minimal' | 'horizontal' (Default: 'standard')
 * @param {boolean} isWishlisted - Wishlist active state
 * @param {function} onAddToCart - Add to Cart click callback: (product) => void
 * @param {function} onWishlist - Wishlist toggle callback: (productId, isLiked, product) => void
 * @param {function} onBuyNow - Optional Buy Now callback: (product) => void
 * @param {string} className - Custom Tailwind CSS classes
 */
const ProductCard = ({
  product = {},
  id,
  image,
  imageUrl,
  img,
  name,
  title,
  category,
  brand,
  price,
  originalPrice,
  discount,
  rating,
  reviewCount,
  badge,
  inStock = true,
  variant = "standard",
  isWishlisted = false,
  onAddToCart,
  onWishlist,
  onBuyNow,
  className = "",
  ...rest
}) => {
  // Merge object data and direct props for maximum adaptability
  const productData = {
    id: id || product.id,
    image: image || imageUrl || img || product.image || product.imageUrl || product.img || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    name: name || title || product.name || product.title || "Product Item",
    category: category || brand || product.category || product.brand || "",
    price: price !== undefined ? price : (product.price !== undefined ? product.price : 0),
    originalPrice: originalPrice !== undefined ? originalPrice : product.originalPrice,
    discount: discount !== undefined ? discount : product.discount,
    rating: rating !== undefined ? rating : (product.rating !== undefined ? product.rating : 4.5),
    reviewCount: reviewCount !== undefined ? reviewCount : product.reviewCount,
    badge: badge || product.badge,
    inStock: inStock !== undefined ? inStock : (product.inStock !== undefined ? product.inStock : true)
  };

  // Badge color mapping
  const badgeStyles = {
    "Sale": "bg-red-500 text-white",
    "New": "bg-emerald-500 text-white",
    "Best Seller": "bg-amber-500 text-white",
    "Trending": "bg-indigo-600 text-white",
    "Limited": "bg-purple-600 text-white"
  };

  const badgeClass = productData.badge ? (badgeStyles[productData.badge] || "bg-neutral-900 text-white") : "";

  // Helper for numeric or string price rendering
  const renderPrice = () => {
    if (typeof productData.price === "string" && isNaN(Number(productData.price))) {
      return (
        <span className="text-sm sm:text-base font-bold text-neutral-900">
          {productData.price}
        </span>
      );
    }
    return (
      <ProductPrice
        price={Number(productData.price) || 0}
        originalPrice={productData.originalPrice ? Number(productData.originalPrice) : undefined}
        discount={productData.discount}
      />
    );
  };

  // 1. HORIZONTAL VARIANT (e.g. For Cart / Search List Views)
  if (variant === "horizontal") {
    return (
      <div
        className={`group relative flex items-center w-full bg-white border border-neutral-200 rounded-lg p-3 sm:p-4 gap-4 transition-all duration-200 hover:shadow-md ${className}`}
        {...rest}
      >
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-md bg-neutral-100">
          <img
            src={productData.image}
            alt={productData.name}
            loading="lazy"
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between text-left">
          {productData.category && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              {productData.category}
            </span>
          )}
          <h4 className="text-sm font-semibold text-neutral-900 line-clamp-1 group-hover:text-black">
            {productData.name}
          </h4>
          <div className="mt-1">
            <Rating value={productData.rating} size="w-3 h-3" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            {renderPrice()}
            <Button
              size="small"
              variant="primary"
              onClick={() => onAddToCart && onAddToCart(productData)}
              disabled={!productData.inStock}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 2. STANDARD / MINIMAL GRID CARD (Default for Landing Page, Home & Product Listing)
  return (
    <div
      className={`group relative flex flex-col w-full bg-white border border-neutral-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${className}`}
      {...rest}
    >
      {/* Product Image Section */}
      <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
        <img
          src={productData.image}
          alt={productData.name}
          loading="lazy"
          className={`h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 ${
            !productData.inStock ? "grayscale opacity-75" : ""
          }`}
        />

        {/* Floating Product Badge (Top-Left) */}
        {productData.badge && productData.inStock && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs ${badgeClass}`}
            >
              {productData.badge}
            </span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!productData.inStock && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              Out of Stock
            </span>
          </div>
        )}

        {/* Floating Wishlist Button (Top-Right) */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <WishlistButton
            productId={productData.id}
            isWishlisted={isWishlisted}
            onToggle={(id, newLikedStatus) => onWishlist && onWishlist(id, newLikedStatus, productData)}
          />
        </div>
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4 text-left justify-between">
        <div>
          {/* Category / Brand Name */}
          {productData.category && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5 block truncate">
              {productData.category}
            </span>
          )}

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-neutral-800 group-hover:text-black line-clamp-2 transition-colors min-h-[2.5rem]">
            <a href={`/product/${productData.id || ""}`} className="hover:underline">
              {productData.name}
            </a>
          </h3>

          {/* Rating */}
          <div className="mt-1.5 flex items-center">
            <Rating value={productData.rating} reviewCount={productData.reviewCount} size="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Price & Action Button Footer */}
        <div className="mt-3 pt-3 border-t border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            {renderPrice()}
            
            {/* Stock indicator */}
            <span className={`text-[10px] font-semibold ${productData.inStock ? "text-emerald-600" : "text-red-500"}`}>
              {productData.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="primary"
              size="small"
              disabled={!productData.inStock}
              onClick={() => onAddToCart && onAddToCart(productData)}
              icon={<Icon icon="mdi:cart-outline" className="w-4 h-4" />}
              iconPosition="left"
              className="flex-1 justify-center !py-2 text-xs font-semibold"
            >
              {productData.inStock ? "Add to Cart" : "Unavailable"}
            </Button>

            {onBuyNow && productData.inStock && (
              <Button
                variant="outline"
                size="small"
                onClick={() => onBuyNow(productData)}
                className="flex-1 justify-center !py-2 text-xs font-semibold"
              >
                Buy Now
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
