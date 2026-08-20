import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";

import { IconButton } from "@mui/material";

const Offers = () => {
  const navigate =useNavigate();

  const deals = [
    {
      image:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=90",
      discount: "30% OFF",
    },
    {
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=90",
      discount: "40% OFF",
    },
    {
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=90",
      discount: "25% OFF",
    },
  ];

  return (
    <section id="deals" className="bg-white">

      {/* Deals */}
      <div className="bg-[#fafafa] px-5 py-16">

        <div className="mx-auto grid max-w-[1100px] items-center gap-10 md:grid-cols-[260px_1fr]">

          {/* Content */}
          <div>

            <h2 className="font-serif text-[32px]">
              Deals Of The Month
            </h2>

            <p className="mt-3 text-[14px] leading-5 text-gray-400">
              Don't miss our exclusive offers and limited-time
              fashion deals.
            </p>

            <button onClick={()=>navigate("/productlisting")} className="mt-5 bg-black px-7 py-3 text-[12px] text-white">
              SHOP NOW
            </button>

            <h3 className="mt-7 text-[12px]">
              Hurry, Before It's Too Late!
            </h3>

            {/* Countdown */}
            <div className="mt-3 flex gap-2">

              {[
                ["02", "Days"],
                ["06", "Hr"],
                ["05", "Mins"],
                ["30", "Sec"],
              ].map(([value, label]) => (

                <div
                  key={label}
                  className="text-center"
                >

                  <div className="flex h-8 w-8 items-center justify-center border bg-white text-[12px]">
                    {value}
                  </div>

                  <span className="mt-1 block text-[10px] text-gray-400">
                    {label}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Deal Images */}
          <div className="flex gap-3 overflow-hidden">

            {deals.map((deal) => (

              <div
                key={deal.discount}
                className="relative min-w-[190px] flex-1"
              >

                <img
                  src={deal.image}
                  alt="Offer"
                  className="h-[300px] w-full object-cover"
                />

                <div className="absolute bottom-4 left-3 bg-white px-4 py-3">

                  <p className="text-[12px] text-gray-400">
                    Limited Sale
                  </p>

                  <p className="mt-1 text-[10px] font-medium">
                    {deal.discount}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Large Offer Banner */}
      <div className="grid bg-[#ddd] md:grid-cols-2">

        <div className="h-[330px] overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=90"
            alt="Men's collection"
            className="h-full w-full object-cover"
          />

        </div>

        <div className="flex items-center px-8 py-12 md:px-16">

          <div>

            <p className="text-[10px] uppercase tracking-[2px] text-gray-500">
              Men's Collection
            </p>

            <h2 className="mt-2 font-serif text-[26px]">
              Peaky Blinders
            </h2>

            <p className="mt-4 max-w-[400px] text-[12px] leading-5 text-gray-500">
              Discover our exclusive men's collection inspired
              by classic British style and modern fashion.
            </p>

            <p className="mt-4 text-[15px] font-medium">
              $100.00
            </p>

            <button onClick={()=>navigate("/productlisting")} className="mt-4 bg-black px-8 py-3 text-[10px] text-white">
              BUY NOW
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Offers;