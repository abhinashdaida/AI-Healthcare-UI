import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/shared/components/Landingpage/productCard";
import { ALL_PRODUCTS } from "@/data/productsData";

const BestSellers = () => {
  // Used to navigate to the product listing page
  const navigate = useNavigate();

  // Filter only the products that belong to the "Best sellers" collection
  const bestProducts = ALL_PRODUCTS.filter(
    (product) => product.collection === "Best sellers"
  );

  return (
    // Main Best Sellers section
    <section className="bg-[#fafafa] px-5 py-16">

      {/* Container to control the maximum width of the section */}
      <div className="mx-auto max-w-[1080px]">

        {/* Section heading and description */}
        <div className="mx-auto max-w-[500px] text-center">

          {/* Section title */}
          <h2 className="font-serif text-[32px]">
            Best Sellers
          </h2>

          {/* Section description */}
          <p className="mt-2 text-[14px] text-gray-400">
            Shop the products our customers love the most.
          </p>
        </div>

        {/* Product grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">

          {/* Display the first 6 best-selling products */}
          {bestProducts.slice(0, 6).map((product) => (

            <ProductCard
              key={product.id}
              {...product}
              // Display "BEST SELLER" badge on each product card
              badge="BEST SELLER"
            />
          ))}

        </div>

        {/* View All button */}
        <div className="mt-8 text-center">

          <button
            // Navigate to the product listing page when clicked
            onClick={() => navigate("/productlisting")}
            className="bg-black px-9 py-3 text-[12px] text-white"
          >
            VIEW ALL
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;