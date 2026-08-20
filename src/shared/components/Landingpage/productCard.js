import React from "react";

import {
  FavoriteBorder,
  ShoppingBagOutlined,
} from "@mui/icons-material";

import { IconButton, Rating } from "@mui/material";

const ProductCard = ({
  name,
  category,
  price,
  image,
  badge,
}) => {

  return (
    <article className="group overflow-hidden bg-white shadow-[0_5px_25px_rgba(0,0,0,0.07)]">

      {/* Image */}
      <div className="relative h-[220px] overflow-hidden bg-[#f2f2f2]">

        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {badge && (
          <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[7px] text-white">
            {badge}
          </span>
        )}

        <IconButton
          size="small"
          className="!absolute !right-2 !top-2 !bg-white"
        >
          <FavoriteBorder sx={{ fontSize: 15 }} />
        </IconButton>

      </div>

      {/* Details */}
      <div className="p-3">

        <div className="flex items-start justify-between">

          <div>

            <h3 className="text-[12px] font-medium">
              {name}
            </h3>

            <p className="mt-1 text-[14px] text-gray-400">
              {category}
            </p>

          </div>

          <Rating
            value={5}
            readOnly
            size="small"
            sx={{
              fontSize: "10px",
            }}
          />

        </div>

        <div className="mt-3 flex items-center justify-between">

          <span className="text-[15px] font-medium">
            ${price}
          </span>

          
        </div>

      </div>

    </article>
  );
};

export default ProductCard;