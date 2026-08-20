import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Button from "../../../components/common/Button/Button";

/**
 * 'People Also Loved' section with live Countdown & Promo Product cards matching FASCO design.
 * Located in: src/pages/ProductDetails/sections/RelatedProductsCarousel.jsx
 */
const RelatedProductsCarousel = ({ onProductSelect, onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Countdown timer state
  const [countdown, setCountdown] = useState({
    days: "02",
    hours: "06",
    mins: "05",
    secs: "30"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let sec = parseInt(prev.secs, 10) - 1;
        let min = parseInt(prev.mins, 10);
        let hr = parseInt(prev.hours, 10);

        if (sec < 0) {
          sec = 59;
          min -= 1;
        }
        if (min < 0) {
          min = 59;
          hr -= 1;
        }
        return {
          days: "02",
          hours: String(hr).padStart(2, "0"),
          mins: String(min).padStart(2, "0"),
          secs: String(sec).padStart(2, "0")
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const promoProducts = [
    {
      id: "related-1",
      name: "Off-Shoulder Velvet Dress",
      price: 85.0,
      originalPrice: 120.0,
      discount: 30,
      badgeText: "Spring Sale 30% OFF",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80"
    },
    {
      id: "related-2",
      name: "Summer Straw Hat & Blue Set",
      price: 65.0,
      originalPrice: 95.0,
      discount: 30,
      badgeText: "Spring Sale 30% OFF",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80"
    },
    {
      id: "related-3",
      name: "Urban Autumn Coat",
      price: 110.0,
      originalPrice: 160.0,
      discount: 30,
      badgeText: "Spring Sale 30% OFF",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? promoProducts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === promoProducts.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* ========================================================
            LEFT COLUMN: Heading, Description, Countdown & Controls
        ======================================================== */}
        <div className="lg:col-span-4 text-left space-y-6">
          
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            People Also Loved
          </h2>

          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-sm">
            Handpicked matching accessories and trending outfits frequently bought with the Denim Jacket.
          </p>

          <Button
            variant="primary"
            className="!px-9 !py-3 !rounded-lg text-sm font-semibold shadow-[0_10px_20px_rgba(0,0,0,0.18)]"
            onClick={() => onAddToCart && onAddToCart(promoProducts[0])}
          >
            Buy Now
          </Button>

          {/* Flash Countdown Timer */}
          <div className="pt-4 space-y-3">
            <h4 className="text-xs font-bold text-neutral-800 tracking-wide">
              Hurry, Before It's Too Late!
            </h4>

            {/* 4 Countdown Boxes */}
            <div className="grid grid-cols-4 gap-2.5 max-w-xs">
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-center shadow-2xs">
                <span className="text-lg sm:text-xl font-bold font-mono text-neutral-900 block">
                  {countdown.days}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Days
                </span>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-center shadow-2xs">
                <span className="text-lg sm:text-xl font-bold font-mono text-neutral-900 block">
                  {countdown.hours}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Hr
                </span>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-center shadow-2xs">
                <span className="text-lg sm:text-xl font-bold font-mono text-neutral-900 block">
                  {countdown.mins}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Mins
                </span>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-center shadow-2xs">
                <span className="text-lg sm:text-xl font-bold font-mono text-neutral-900 block">
                  {countdown.secs}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Sec
                </span>
              </div>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrev}
              className="h-10 w-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-black hover:border-black transition-colors focus:outline-none shadow-xs"
              aria-label="Previous product"
            >
              <Icon icon="mdi:chevron-left" className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="h-10 w-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-black hover:border-black transition-colors focus:outline-none shadow-xs"
              aria-label="Next product"
            >
              <Icon icon="mdi:chevron-right" className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* ========================================================
            RIGHT COLUMN: Promo Product Cards with Badges
        ======================================================== */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {promoProducts.map((product, idx) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Floating Discount Tag Badge */}
                  {idx === 0 && (
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-2.5 rounded-md shadow-md border border-neutral-200 text-left">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        Spring Sale
                      </span>
                      <span className="text-xs font-extrabold text-neutral-900">
                        30% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-800 line-clamp-1 group-hover:text-black">
                      {product.name}
                    </h4>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-bold text-neutral-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-neutral-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onAddToCart && onAddToCart(product)}
                      className="text-xs font-bold text-neutral-900 hover:underline focus:outline-none"
                    >
                      + Quick Add
                    </button>
                    <span className="text-[10px] font-semibold text-emerald-600">
                      In Stock
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="h-2 w-2 rounded-full bg-black" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default RelatedProductsCarousel;
