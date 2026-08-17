import React from "react";

const CollectionBanner = () => {
  return (
    <section
      id="packages"
      className="bg-[#eeeeee]"
    >

      <div className="mx-auto grid max-w-[1350px] grid-cols-1 md:grid-cols-2">

        {/* Image */}
        <div className="relative h-[350px] overflow-hidden md:h-[370px]">

          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=90"
            alt="Peaky Blinders"
            className="h-full w-full object-cover grayscale"
          />

          {/* Labels */}
          <span className="absolute left-[15%] top-[30%] bg-white px-4 py-2 text-[7px] shadow">
            Leather
          </span>

          <span className="absolute left-[45%] top-[22%] bg-white px-4 py-2 text-[7px] shadow">
            New Look
          </span>

          <span className="absolute left-[55%] top-[55%] bg-white px-4 py-2 text-[7px] shadow">
            Hugo Boss
          </span>

        </div>

        {/* Content */}
        <div className="flex items-center px-8 py-12 md:px-14">

          <div className="max-w-[410px]">

            <p className="text-[7px] uppercase tracking-[2px] text-gray-500">
              Men's Collection
            </p>

            <h2 className="mt-2 font-serif text-[27px]">
              Peaky Blinders
            </h2>

            <div className="my-3 h-px w-10 bg-black" />

            <p className="text-[8px] leading-[1.8] text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed eleifend euismod nunc, nec faucibus augue ultrices.
              Discover our latest men's collection.
            </p>

            <p className="mt-5 text-[7px] text-gray-400">
              SHOP NOW
            </p>

            <p className="mt-1 text-[15px] font-medium">
              $100.00
            </p>

            <button className="mt-3 rounded-[2px] bg-black px-8 py-2.5 text-[8px] text-white">
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CollectionBanner;