import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Favorite,
  FavoriteBorder,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import WishlistButton from "@/components/product/WishlistButton/WishlistButton";
import { IconButton, Rating } from "@mui/material";

const ProductCard = ({
  id,
  name,
  category,
  price,
  image,
  badge,
  isWishlisted,
  onWishlist=false,
}) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  // Handle wishlist click
  const handleWishlistClick = (e) => {
    // Prevent card click from navigating to product details
    e.stopPropagation();

    // Send product information to parent component
    if (onWishlist) {
      onWishlist(id, !isWishlisted, {
        id,
        name,
        category,
        price,
        image,
        badge,
      });
    }
  };

  return (
    <article
      onClick={handleProductClick}
      className="group cursor-pointer overflow-hidden bg-white shadow-[0_5px_25px_rgba(0,0,0,0.07)]"
    >

      {/* Image */}
      <div className="relative h-[220px] overflow-hidden bg-[#f2f2f2]">

        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Product badge */}
        {badge && (
          <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[7px] text-white">
            {badge}
          </span>
        )}

        {/* Wishlist button */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <WishlistButton
  productId={id}
  isWishlisted={isWishlisted}
  onToggle={(id, newLikedStatus) =>
    onWishlist &&
    onWishlist(id, newLikedStatus, {
      id,
      name,
      category,
      price,
      image,
      badge,
    })
  }
/>
        </div>
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

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">

          <span className="text-[15px] font-medium">
            ${Number(price).toFixed(2)}
          </span>

          {/* Shopping Bag */}
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ShoppingBagOutlined sx={{ fontSize: 18 }} />
          </IconButton>

        </div>

      </div>

    </article>
  );
};

export default ProductCard;