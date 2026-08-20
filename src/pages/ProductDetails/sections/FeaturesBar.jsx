import React from "react";
import { Icon } from "@iconify/react";

/**
 * Value Propositions Features Bar matching the FASCO reference design.
 * Located in: src/pages/ProductDetails/sections/FeaturesBar.jsx
 */
const FeaturesBar = () => {
  const features = [
    {
      icon: "mdi:star-four-points-outline",
      title: "High Quality",
      subtitle: "Crafted from top materials"
    },
    {
      icon: "mdi:shield-check-outline",
      title: "Warranty Protection",
      subtitle: "Over 2 years"
    },
    {
      icon: "mdi:truck-fast-outline",
      title: "Free Shipping",
      subtitle: "Order over 150 $"
    },
    {
      icon: "mdi:headphones",
      title: "24 / 7 Support",
      subtitle: "Dedicated support"
    }
  ];

  return (
    <section className="w-full bg-white border-y border-neutral-100 py-10 my-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-4 text-left p-2 group hover:translate-x-1 transition-transform"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-neutral-900 border border-neutral-200/60 group-hover:bg-black group-hover:text-white transition-colors duration-200">
                <Icon icon={item.icon} className="w-6 h-6" />
              </div>

              {/* Title & Subtitle */}
              <div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-black">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;
