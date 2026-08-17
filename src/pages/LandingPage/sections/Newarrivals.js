import React from "react";
import ProductCard from "../../../shared/components/Landingpage/productCard";

const products = [
  {
    name: "Shiny Dress",
    category: "Women Fashion",
    price: "$95.50",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=90",
  },
  {
    name: "Long Dress",
    category: "Women Fashion",
    price: "$95.50",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=90",
  },
  {
    name: "Full Sweater",
    category: "Women Fashion",
    price: "$95.50",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=90",
  },
  {
    name: "White Dress",
    category: "Women Fashion",
    price: "$95.50",
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=600&q=90",
  },
  {
    name: "Colorful Dress",
    category: "Women Fashion",
    price: "$95.50",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=90",
  },
  {
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

          <p className="mt-2 text-[8px] leading-[1.8] text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eleifend euismod nunc, nec faucibus augue ultrices.
          </p>

        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap justify-center gap-1.5">

          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`rounded-[2px] px-5 py-2 text-[7px] ${
                index === 1
                  ? "bg-black text-white"
                  : "bg-[#fafafa] text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}

        </div>

        {/* Products */}
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">

          {products.map((product) => (
            <ProductCard
              key={product.name}
              {...product}
            />
          ))}

        </div>

        {/* View More */}
        <div className="mt-8 flex justify-center">

          <button className="rounded-[2px] bg-black px-9 py-2.5 text-[8px] text-white shadow">
            View More
          </button>

        </div>

      </div>

    </section>
  );
};

export default NewArrivalsSection;