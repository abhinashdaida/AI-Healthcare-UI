import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/shared/components/Landingpage/productCard";
import { products } from "@/shared/constants/LandingPage/Productdata"; 

const FeaturedProducts = () => {
  const navigate=useNavigate();
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <section className="bg-[#fafafa] px-5 py-16">

      <div className="mx-auto max-w-[1080px]">

        <div className="mx-auto max-w-[500px] text-center">

          <h2 className="font-serif text-[32px]">
            Featured Products
          </h2>

          <p className="mt-2 text-[14px] text-gray-400">
            Discover our most popular fashion products
          </p>

        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">

          {featuredProducts.slice(0, 6).map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}

        </div>

        <div className="mt-8 text-center">

          <button onClick={()=>navigate("/productlisting")} className="bg-black px-9 py-3 text-[12px] text-white">
            VIEW ALL PRODUCTS
          </button>

        </div>

      </div>

    </section>
  );
};

export default FeaturedProducts;