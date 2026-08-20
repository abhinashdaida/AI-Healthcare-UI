import React from "react";
import Button from "../../../components/common/Button/Button";
import img9 from "../../../assets/image (9).png";

/**
 * Featured Promo Banner matching 'Peaky Blinders' collection in reference design.
 * Located in: src/pages/ProductDetails/sections/FeaturedPromoBanner.jsx
 */
const FeaturedPromoBanner = ({ onBuyNowClick }) => {
  return (
    <section className="w-full bg-neutral-100/70 py-12 sm:py-16 my-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* ========================================================
              LEFT: Fashion Model with Feature Pointer Callouts
          ======================================================== */}
          <div className="relative w-full max-w-md lg:max-w-lg flex justify-center items-center">
            
            {/* Background Minimalist Cross/Graphic Element */}
            <div className="absolute h-64 w-64 bg-neutral-200/60 rounded-full blur-2xl -z-0" />

            {/* Model Image */}
            <div className="relative z-10">
              <img
                src={img9}
                alt="Peaky Blinders Collection Model"
                className="h-[360px] sm:h-[420px] object-contain drop-shadow-xl"
              />

              {/* Callout Badge 1: Flat Cap (Top Right) */}
              <div className="absolute top-6 right-2 sm:-right-4 bg-white/95 backdrop-blur-xs text-[10px] font-semibold text-neutral-800 px-3 py-1 rounded-md shadow-md border border-neutral-200">
                Flat Cap
              </div>

              {/* Callout Badge 2: Suspender (Mid Left) */}
              <div className="absolute top-28 -left-2 sm:-left-6 bg-white/95 backdrop-blur-xs text-[10px] font-semibold text-neutral-800 px-3 py-1 rounded-md shadow-md border border-neutral-200">
                Suspender
              </div>

              {/* Callout Badge 3: Hugo Boss (Mid Right) */}
              <div className="absolute top-36 right-0 sm:-right-6 bg-white/95 backdrop-blur-xs text-[10px] font-semibold text-neutral-800 px-3 py-1 rounded-md shadow-md border border-neutral-200">
                Hugo Boss
              </div>

              {/* Callout Badge 4: Susp. Sets (Lower Left) */}
              <div className="absolute bottom-20 -left-4 sm:-left-8 bg-white/95 backdrop-blur-xs text-[10px] font-semibold text-neutral-800 px-3 py-1 rounded-md shadow-md border border-neutral-200">
                Susp. Sets
              </div>

              {/* Callout Badge 5: Sandals (Bottom) */}
              <div className="absolute bottom-2 right-12 bg-white/95 backdrop-blur-xs text-[10px] font-semibold text-neutral-800 px-3 py-1 rounded-md shadow-md border border-neutral-200">
                Sandals
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT: Collection Details & Buy Now Action
          ======================================================== */}
          <div className="w-full lg:max-w-xl text-left space-y-4 lg:pl-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 block">
              Women Collection
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
              Peaky Blinders
            </h2>

            <div className="space-y-1 pt-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                DESCRIPTION
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-lg">
                Crafted from premium handwoven wool blends with authentic vintage tailoring.
                Designed for refined modern lifestyles with iconic retro silhouette details and comfortable stretch fit.
              </p>
            </div>

            {/* Size Preview */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-neutral-700">Size:</span>
              <span className="h-8 w-8 rounded-md bg-black text-white text-xs font-bold flex items-center justify-center shadow-xs">
                M
              </span>
            </div>

            {/* Pricing */}
            <div className="pt-2">
              <span className="text-2xl font-bold text-neutral-950 block">
                $100.00
              </span>
            </div>

            {/* Buy Now Button */}
            <div className="pt-3">
              <Button
                variant="primary"
                onClick={onBuyNowClick || (() => alert("Proceeding to buy Peaky Blinders..."))}
                className="!px-10 !py-3 !rounded-lg text-sm font-semibold shadow-[0_10px_20px_rgba(0,0,0,0.18)] hover:scale-102 transition-all"
              >
                Buy Now
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedPromoBanner;
