import React from "react";
import { Rating } from "@mui/material";

const ProductCard = ({
  name,
  category,
  price,
  image,
}) => {
  return (
    <article className="overflow-hidden rounded-[3px] bg-white shadow-[0_5px_25px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]">

      {/* Image */}
      <div className="h-[210px] overflow-hidden bg-[#f1f1f1] md:h-[230px]">

        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

      </div>

      {/* Details */}
      <div className="p-3">

        <div className="flex items-start justify-between gap-2">

          <h3 className="text-[10px] font-medium">
            {name}
          </h3>

          <Rating
            value={5}
            readOnly
            size="small"
            sx={{
              fontSize: "9px",
              "& .MuiRating-icon": {
                marginRight: "-2px",
              },
            }}
          />

        </div>

        <p className="mt-2 text-[7px] text-gray-400">
          {category}
        </p>

        <div className="mt-3 flex items-center justify-between">

          <span className="text-[10px] font-medium">
            {price}
          </span>

          <button className="text-[7px] text-red-400">
            Add To Cart
          </button>

        </div>

      </div>

    </article>
  );
};

export default ProductCard;