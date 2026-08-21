import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/shared/components/Landingpage/productCard";
import { ALL_PRODUCTS } from "@/data/productsData";

const FeaturedProducts = () => {
  // Used to navigate to the product listing page
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Filter products that belong to the "All products" collection
  const featuredProducts = ALL_PRODUCTS.filter(
    (product) => product.collection === "All products"
  );

  const handleWishlistToggle = (id, newLikedStatus, productData) => {
    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item.id === productData.id
      );

      let updatedWishlist;

      if (exists) {
        // Remove from wishlist
        updatedWishlist = prev.filter(
          (item) => item.id !== productData.id
        );
      } else {
        // Add to wishlist
        updatedWishlist = [...prev, productData];
      }

      // Save wishlist
      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );

      // Tell Header_2 that wishlist changed
      window.dispatchEvent(new Event("wishlistUpdated"));

      return updatedWishlist;
    });
  };

  return (
    // Main Featured Products section
    <section className="bg-[#fafafa] px-5 py-16">

      {/* Container to control the maximum width of the section */}
      <div className="mx-auto max-w-[1080px]">

        {/* Section heading and description */}
        <div className="mx-auto max-w-[500px] text-center">

          {/* Section title */}
          <h2 className="font-serif text-[32px]">
            Featured Products
          </h2>

          {/* Section description */}
          <p className="mt-2 text-[14px] text-gray-400">
            Discover our most popular fashion products
          </p>

        </div>

        {/* Responsive product grid
            1 column on mobile,
            2 columns on small screens,
            3 columns on medium screens */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">

          {/* Display the first 6 featured products */}
          {featuredProducts.slice(0, 6).map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            return (

              <ProductCard
                key={product.id}
                {...product}
                isWishlisted={isWishlisted}
                onWishlist={handleWishlistToggle}
              />
            );
          })}

        </div>

        {/* View all products button */}
        <div className="mt-8 text-center">
          <button
            // Navigate to the product listing page when clicked
            onClick={() => {
              navigate("/productlisting");
              window.scrollTo({
                top: 0,
                behavior: "instant",
              });
            }}
            className="bg-black px-9 py-3 text-[12px] text-white"
          >
            VIEW ALL PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;