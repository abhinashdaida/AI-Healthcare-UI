import React from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable Rating component that displays stars and optional review count.
 * Located in: src/components/product/Rating/Rating.jsx
 * 
 * Props:
 * @param {number} value - Score value between 0 and 5 (alias: rating)
 * @param {number} rating - Alternative score prop
 * @param {number} reviewCount - Optional number of reviews (e.g. 120)
 * @param {number} maxStars - Limit stars count (default 5)
 * @param {string} size - Size class (default "w-3.5 h-3.5")
 */
const Rating = ({
  value,
  rating,
  reviewCount,
  maxStars = 5,
  size = "w-3.5 h-3.5",
  className = ""
}) => {
  const score = value !== undefined ? value : (rating !== undefined ? rating : 0);

  return (
    <div className={`flex items-center space-x-1 ${className}`} aria-label={`Rating: ${score} out of ${maxStars}`}>
      <div className="flex items-center space-x-0.5">
        {[...Array(maxStars)].map((_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= score;

          return (
            <Icon
              key={index}
              icon={isFilled ? "mdi:star" : "mdi:star-outline"}
              className={`${size} shrink-0 ${
                isFilled ? "text-amber-400" : "text-neutral-300"
              }`}
            />
          );
        })}
      </div>

      {score > 0 && (
        <span className="text-xs font-semibold text-neutral-700 ml-1">
          {Number(score).toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-[11px] text-neutral-400">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default Rating;
