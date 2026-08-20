import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import QuantitySelector from "../../../components/product/QuantitySelector/QuantitySelector";
import Rating from "../../../components/product/Rating/Rating";

/**
 * Main Product Details Hero Section matching Amazon & FASCO multi-angle gallery specifications.
 * All side thumbnails strictly display multi-angle perspectives and details of the EXACT same product.
 * Located in: src/pages/ProductDetails/sections/ProductHeroSection.jsx
 */
const ProductHeroSection = ({
  product = {},
  onAddToCart,
  onBuyNow,
  onWishlistToggle,
  isWishlisted = false
}) => {
  const initialImage =
    product.image ||
    "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80";

  // Build Amazon-style multi-angle views for the current product
  const productViews = useMemo(() => {
    const mainImg = product.image || initialImage;

    // If explicit multi-angle images from photoshoot are provided
    if (Array.isArray(product.gallery) && product.gallery.length > 1) {
      const labels = [
        "Front View",
        "Side Angle",
        "Detail View",
        "Profile View",
        "Fit Look"
      ];
      return product.gallery.map((img, idx) => ({
        id: `custom-view-${idx}`,
        url: img,
        label: labels[idx] || `Angle ${idx + 1}`,
        scale: 1,
        origin: "center center"
      }));
    }

    // Default 4 Amazon-style multi-perspective views of the EXACT same product
    return [
      {
        id: "view-front",
        url: mainImg,
        label: "Front View",
        scale: 1,
        origin: "center center"
      },
      {
        id: "view-detail",
        url: mainImg,
        label: "Detail Zoom",
        scale: 1.55,
        origin: "center 25%"
      },
      {
        id: "view-angle",
        url: mainImg,
        label: "Upper Angle",
        scale: 1.35,
        origin: "center 45%"
      },
      {
        id: "view-profile",
        url: mainImg,
        label: "Profile View",
        scale: 1.45,
        origin: "center 75%"
      }
    ];
  }, [product, initialImage]);

  const [activeViewIndex, setActiveViewIndex] = useState(0);

  // Sync state if product changes
  useEffect(() => {
    setActiveViewIndex(0);
    if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0].name);
  }, [product]);

  const currentView = productViews[activeViewIndex] || productViews[0];

  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : "M"
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0
      ? product.colors[0].name
      : "Blue"
  );
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(isWishlisted);

  // Live Flash Sale Countdown Timer (Hours, Mins, Secs)
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "05",
    minutes: "59",
    seconds: "47"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let sec = parseInt(prev.seconds, 10) - 1;
        let min = parseInt(prev.minutes, 10);
        let hr = parseInt(prev.hours, 10);

        if (sec < 0) {
          sec = 59;
          min -= 1;
        }
        if (min < 0) {
          min = 59;
          hr -= 1;
        }
        if (hr < 0) {
          hr = 23;
        }

        return {
          days: "00",
          hours: String(hr).padStart(2, "0"),
          minutes: String(min).padStart(2, "0"),
          seconds: String(sec).padStart(2, "0")
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sizes = product.sizes || ["M", "L", "XL"];
  const colors = product.colors || [
    { name: "Black", hex: "#111111" },
    { name: "Pink", hex: "#f472b6" },
    { name: "Blue", hex: "#38bdf8" }
  ];

  const displayName = product.name || "Denim Jacket";
  const displayBrand = product.brand || "FASCO";
  const displayPrice = Number(product.price) || 39.0;
  const displayOriginal = Number(product.originalPrice) || 59.0;
  const discountPercent =
    product.discount ||
    (displayOriginal > displayPrice
      ? Math.round(((displayOriginal - displayPrice) / displayOriginal) * 100)
      : 33);
  const displayRating = product.rating || 5.0;
  const displayReviews = product.reviewCount || 3;

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart({
        id: product.id || "fasco-denim-01",
        name: displayName,
        brand: displayBrand,
        price: displayPrice,
        originalPrice: displayOriginal,
        image: currentView.url,
        selectedSize,
        selectedColor,
        quantity
      });
    }
  };

  const handleBuyNowClick = () => {
    const payload = {
      id: product.id || "fasco-denim-01",
      name: displayName,
      brand: displayBrand,
      price: displayPrice,
      originalPrice: displayOriginal,
      image: currentView.url,
      selectedSize,
      selectedColor,
      quantity
    };
    if (onBuyNow) {
      onBuyNow(payload);
    } else if (onAddToCart) {
      onAddToCart(payload);
    }
  };

  const handleWishlistClick = () => {
    const nextStatus = !isLiked;
    setIsLiked(nextStatus);
    if (onWishlistToggle) {
      onWishlistToggle(product.id || "fasco-denim-01", nextStatus);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* ========================================================
            LEFT COLUMN: Amazon-style Multi-Angle Gallery (7 Columns)
        ======================================================== */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 items-start">
          
          {/* Vertical Thumbnail Strip (Side Angle Previews of THAT exact product) */}
          <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[580px] py-1 shrink-0 scrollbar-thin">
            {productViews.map((view, index) => {
              const isActive = activeViewIndex === index;
              return (
                <button
                  key={view.id || index}
                  type="button"
                  onClick={() => setActiveViewIndex(index)}
                  onMouseEnter={() => setActiveViewIndex(index)}
                  className={`relative h-20 w-16 sm:h-22 sm:w-18 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 focus:outline-none cursor-pointer bg-neutral-50 ${
                    isActive
                      ? "border-black ring-2 ring-black/20 shadow-md scale-102 opacity-100"
                      : "border-neutral-200 hover:border-neutral-400 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={view.label}
                  title={view.label}
                >
                  <img
                    src={view.url}
                    alt={view.label}
                    className="h-full w-full object-cover transition-transform duration-300"
                    style={{
                      transform: `scale(${view.scale})`,
                      transformOrigin: view.origin
                    }}
                  />
                  {/* Angle Label Badge */}
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-2xs text-[9px] text-white font-medium text-center py-0.5 leading-tight truncate px-0.5">
                    {view.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main Large Product Image with Interactive Zoom Focus */}
          <div className="relative flex-1 w-full aspect-3/4 sm:aspect-4/5 max-h-[640px] bg-neutral-50 rounded-lg overflow-hidden border border-neutral-200 shadow-xs">
            <img
              src={currentView.url}
              alt={`${displayName} - ${currentView.label}`}
              className="h-full w-full object-cover transition-all duration-500 ease-out hover:scale-110 cursor-crosshair"
              style={{
                transform: `scale(${currentView.scale})`,
                transformOrigin: currentView.origin
              }}
            />

            {/* Active Angle Indicator Tag (Top Left) */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-neutral-800 px-2.5 py-1 rounded-md shadow-xs border border-neutral-200/80">
              {currentView.label}
            </div>

            {/* Quick Zoom Indicator (Bottom Right) */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs text-neutral-700 pointer-events-none flex items-center gap-1 text-[11px] font-medium border border-neutral-200/80">
              <Icon icon="mdi:magnify-plus-outline" className="w-4 h-4" />
              <span>Hover to zoom in</span>
            </div>
          </div>

        </div>

        {/* ========================================================
            RIGHT COLUMN: Product Meta, Pricing, Options (5 Columns)
        ======================================================== */}
        <div className="lg:col-span-5 space-y-4 text-left">
          
          {/* Brand & Wishlist Header */}
          <div className="flex items-center justify-between text-xs tracking-wider uppercase text-neutral-500 font-semibold">
            <span>{displayBrand}</span>
            <button
              type="button"
              onClick={handleWishlistClick}
              aria-label="Toggle wishlist"
              className="p-1 text-neutral-400 hover:text-red-500 transition-colors focus:outline-none"
            >
              <Icon
                icon={isLiked ? "mdi:heart" : "mdi:heart-outline"}
                className={`w-5 h-5 ${isLiked ? "text-red-500" : ""}`}
              />
            </button>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight">
            {displayName}
          </h1>

          {/* Rating & Review Count */}
          <div className="flex items-center gap-2">
            <Rating value={displayRating} max={5} />
            <span className="text-xs text-neutral-500">
              ({displayReviews} reviews)
            </span>
          </div>

          {/* Price & Discount Badge */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-2xl font-bold text-neutral-900">
              ${displayPrice.toFixed(2)}
            </span>
            {displayOriginal > displayPrice && (
              <>
                <span className="text-base text-neutral-400 line-through">
                  ${displayOriginal.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  SAVE {discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Live Viewers Indicator */}
          <div className="flex items-center gap-2 text-xs text-neutral-600 pt-1">
            <Icon icon="mdi:eye-outline" className="w-4 h-4 text-neutral-500 shrink-0" />
            <span>
              <strong>28 people</strong> are viewing this right now
            </span>
          </div>

          {/* Flash Sale Banner with Countdown */}
          <div className="p-3 bg-red-50/90 rounded-lg border border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-700">
              <Icon icon="mdi:fire" className="w-4 h-4 text-red-500" />
              <span>Hurry up! Sale ends in:</span>
            </div>

            {/* Countdown Numbers */}
            <div className="flex items-center gap-1 font-mono font-bold text-red-800 text-xs">
              <span className="bg-white px-1.5 py-0.5 rounded border border-red-200 shadow-2xs">
                {timeLeft.days}
              </span>
              <span>:</span>
              <span className="bg-white px-1.5 py-0.5 rounded border border-red-200 shadow-2xs">
                {timeLeft.hours}
              </span>
              <span>:</span>
              <span className="bg-white px-1.5 py-0.5 rounded border border-red-200 shadow-2xs">
                {timeLeft.minutes}
              </span>
              <span>:</span>
              <span className="bg-white px-1.5 py-0.5 rounded border border-red-200 shadow-2xs">
                {timeLeft.seconds}
              </span>
            </div>
          </div>

          {/* Low Stock Indicator & Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="text-xs font-semibold text-neutral-800">
              Only <span className="text-red-600 font-bold">9 item(s)</span> left in stock!
            </div>
            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full w-[25%]" />
            </div>
          </div>

          <hr className="border-neutral-100 my-2" />

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-800">
                Size: <span className="font-bold text-black">{selectedSize}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`h-9 w-9 sm:h-10 sm:w-10 rounded-md text-xs font-semibold uppercase transition-all duration-150 focus:outline-none ${
                    selectedSize === s
                      ? "bg-black text-white shadow-xs"
                      : "bg-white border border-neutral-300 text-neutral-800 hover:border-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold text-neutral-800 block">
              Color: <span className="font-bold text-black">{selectedColor}</span>
            </span>

            <div className="flex items-center gap-2.5">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  aria-label={`Select color ${c.name}`}
                  className={`h-7 w-7 rounded-full transition-all duration-150 focus:outline-none ${
                    selectedColor === c.name
                      ? "ring-2 ring-black ring-offset-2 scale-110"
                      : "hover:scale-105 border border-neutral-300"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Quantity & Action Buttons (Add to cart & Buy Now) */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-neutral-800 block">
              Quantity:
            </span>

            {/* Row 1: Quantity Selector + Add To Cart Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <QuantitySelector
                value={quantity}
                min={1}
                max={9}
                onChange={setQuantity}
                className="shrink-0"
              />

              <button
                type="button"
                onClick={handleAddToCartClick}
                className="flex-1 justify-center py-3.5 px-6 rounded-md bg-white border-2 border-black text-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 active:scale-98 transition-all duration-150 cursor-pointer focus:outline-none"
              >
                Add to cart
              </button>
            </div>

            {/* Row 2: Full Width Buy Now Button */}
            <button
              type="button"
              onClick={handleBuyNowClick}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-md bg-black text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-neutral-800 active:scale-98 transition-all duration-150 cursor-pointer focus:outline-none"
            >
              <Icon icon="mdi:lightning-bolt" className="w-4 h-4 text-yellow-400" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Utilities: Compare / Ask Question / Share */}
          <div className="flex items-center justify-between text-xs text-neutral-500 pt-3 border-t border-neutral-100">
            <button type="button" className="flex items-center gap-1 hover:text-black transition-colors focus:outline-none">
              <Icon icon="mdi:compare" className="w-4 h-4" />
              <span>Compare</span>
            </button>
            <button type="button" className="flex items-center gap-1 hover:text-black transition-colors focus:outline-none">
              <Icon icon="mdi:help-circle-outline" className="w-4 h-4" />
              <span>Ask a question</span>
            </button>
            <button type="button" className="flex items-center gap-1 hover:text-black transition-colors focus:outline-none">
              <Icon icon="mdi:share-variant-outline" className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Delivery & Returns Info */}
          <div className="space-y-2 pt-2 text-xs text-neutral-600 bg-neutral-50/80 p-3.5 rounded-lg border border-neutral-200/60">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:truck-fast-outline" className="w-4 h-4 text-neutral-800 shrink-0" />
              <span>
                <strong>Estimated Delivery:</strong> 12 - 15 August
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:package-variant-closed" className="w-4 h-4 text-neutral-800 shrink-0" />
              <span>
                <strong>Free Shipping & Returns:</strong> On all orders over $75
              </span>
            </div>
          </div>

          {/* Payment Badges Box */}
          <div className="p-3 bg-neutral-100/70 rounded-lg text-center space-y-2 border border-neutral-200/80">
            <div className="flex items-center justify-center gap-3 text-neutral-600">
              <Icon icon="logos:visa" className="h-4 w-auto" />
              <Icon icon="logos:mastercard" className="h-4 w-auto" />
              <Icon icon="logos:paypal" className="h-4 w-auto" />
              <Icon icon="logos:apple-pay" className="h-4 w-auto" />
            </div>
            <p className="text-[11px] text-neutral-500 flex items-center justify-center gap-1">
              <Icon icon="mdi:shield-lock-outline" className="w-3.5 h-3.5 text-neutral-700" />
              <span>Guarantee safe &amp; secure checkout</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductHeroSection;
