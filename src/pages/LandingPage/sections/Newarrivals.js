import React from "react";
import ProductCard from "../../../components/product/ProductCard/ProductCard";

const products = [
  {
    id: 1,
    name: "Shiny Dress",
    category: "Women Fashion",
    price: "$95.50",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 2,
    name: "Long Dress",
    category: "Women Fashion",
    price: "$95.50",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 3,
    name: "Full Sweater",
    category: "Women Fashion",
    price: "$95.50",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 4,
    name: "White Dress",
    category: "Women Fashion",
    price: "$95.50",
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 5,
    name: "Colorful Dress",
    category: "Women Fashion",
    price: "$95.50",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 6,
    name: "White Shirt",
    category: "Women Fashion",
    price: "$95.50",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=600&q=90",
  },
];

const tabs = [
  "Men's Fashion",
  "Women's Fashion",
  "Women Accessories",
  "Men Accessories",
  "Discount Deals",
];

const NewArrivalsSection = () => {
  return (
    <section
      id="new-arrivals"
      className="bg-white px-5 py-16 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-[1080px]">
        {/* Heading */}
        <div className="mx-auto max-w-[500px] text-center">
          <h2 className="font-serif text-[26px]">
            New Arrivals
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            Discover the latest trends in fashion and accessories curated just for you.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`rounded-md px-5 py-2 text-xs font-medium transition-colors ${
                index === 1
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-gray-600 hover:bg-neutral-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Reusable Products Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              {...product}
              onAddToCart={(p) => alert(`Added ${p.name} to cart!`)}
              onWishlist={(id, isLiked) => console.log("Wishlist:", id, isLiked)}
            />
          ))}
        </div>

        {/* View More */}
        <div className="mt-10 flex justify-center">
          <button className="rounded-md bg-black px-9 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-neutral-800 transition-colors">
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;