import React, { useState } from "react";
import img11 from "../../../assets/image (11).png";
import img12 from "../../../assets/image (12).png";

/**
 * Dual-Model Newsletter Subscription Section matching the FASCO reference design exactly.
 * Uses local transparent model cutout assets: image (11).png and image (12).png
 * Located in: src/pages/ProductDetails/sections/NewsletterSection.jsx
 */
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <section className="w-full bg-white pt-12 pb-16 sm:py-20 overflow-hidden relative border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* ========================================================
              LEFT: Male Model in Mustard Trench Coat (image (11).png)
          ======================================================== */}
          <div className="hidden lg:flex w-1/4 justify-start items-end select-none pointer-events-none">
            <img
              src={img11}
              alt="Male Fashion Model"
              className="h-[460px] xl:h-[520px] object-contain object-bottom drop-shadow-2xl hover:scale-101 transition-transform duration-500"
            />
          </div>

          {/* ========================================================
              CENTER: Newsletter Content & Floating Form
          ======================================================== */}
          <div className="w-full lg:w-1/2 text-center space-y-5 max-w-xl mx-auto z-10 py-4">
            
            {/* Heading matching reference font & style */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-neutral-900 tracking-tight leading-tight">
              Subscribe To Our Newsletter
            </h2>

            {/* Description text matching reference */}
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-lg mx-auto font-normal px-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
            </p>

            {isSubscribed ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 text-xs font-semibold animate-in fade-in shadow-xs">
                🎉 Thank you for subscribing! Check your inbox for updates and exclusive offers.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-6 pt-3">
                
                {/* Floating White Input Box with Soft Ambient Shadow */}
                <div className="w-full max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="michael@ymail.com"
                    className="w-full px-6 py-4 text-sm text-neutral-800 bg-white border border-neutral-100 rounded-sm shadow-[0_10px_35px_rgba(0,0,0,0.06)] placeholder-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-1 focus:ring-neutral-200 transition-all text-left"
                  />
                </div>

                {/* Solid Black Button with Soft Shadow */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-black text-white px-9 py-3.5 rounded-lg text-xs font-semibold tracking-wide shadow-[0_12px_24px_rgba(0,0,0,0.28)] hover:bg-neutral-800 active:scale-95 transition-all duration-200 focus:outline-none cursor-pointer"
                  >
                    Subscribe Now
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* ========================================================
              RIGHT: Female Model in Grey Blazer (image (12).png)
          ======================================================== */}
          <div className="hidden lg:flex w-1/4 justify-end items-end select-none pointer-events-none">
            <img
              src={img12}
              alt="Female Fashion Model"
              className="h-[460px] xl:h-[520px] object-contain object-bottom drop-shadow-2xl hover:scale-101 transition-transform duration-500"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
