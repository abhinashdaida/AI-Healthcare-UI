import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/shared/components/Landingpage/productCard";
import { ALL_PRODUCTS } from "@/data/productsData";

const NewArrivals = () => {
  const [activeTab, setActiveTab] = useState("Women");
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const tabs = [
    "Men",
    "Women",
    "Accessories",
    "Shoes",
  ];

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

  // Filter products based on selected tab
  const newProducts = ALL_PRODUCTS.filter(
    (product) =>
      product.collection === "New arrivals" &&
      product.category === activeTab
  );

  return (
    <section id="new-arrivals" className="bg-white px-5 py-16" >
      <div className="mx-auto max-w-[1080px]">
        {/* Heading */}
        <div className="mx-auto max-w-[500px] text-center">
          <h2 className="font-serif text-[32px]">
            New Arrivals
          </h2>
          <p className="mt-2 text-[14px] leading-5 text-gray-400">
            Discover our newest styles and latest collections.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-[12px] transition ${activeTab === tab
                ? "bg-black text-white"
                : "bg-[#fafafa] text-gray-500"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {newProducts.slice(0, 6).map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            return (

              <ProductCard
                key={product.id}
                {...product}
                badge="NEW"
                isWishlisted={isWishlisted}
                onWishlist={handleWishlistToggle}
              />
            );
          })}

        </div>

        {/* No products */}
        {newProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400">
              No new arrivals available in {activeTab}.
            </p>
          </div>
        )}

        {/* View More */}
        {newProducts.length > 0 && (
          <div className="mt-8 text-center">
            <button onClick={() => {
              navigate("/productlisting");
              window.scrollTo({
                top: 0,
                behavior: "instant",
              });
            }} className="bg-black px-9 py-3 text-[12px] text-white">
              VIEW MORE
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;