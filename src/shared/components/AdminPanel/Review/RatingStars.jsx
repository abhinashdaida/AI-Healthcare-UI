import React from "react";
import { Icon } from "@iconify/react";

const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          icon={star <= rating ? "mdi:star" : "mdi:star-outline"}
          className={
            star <= rating
              ? "text-yellow-500"
              : "text-gray-300"
          }
          width="18"
          height="18"
        />
      ))}
    </div>
  );
};

export default RatingStars;