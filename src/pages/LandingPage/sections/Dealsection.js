import React from "react";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

const deals = [
  {
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=90",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=90",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506629905607-d9c297d1d6ee?auto=format&fit=crop&w=600&q=90",
  },
];

const DealsSection = () => {
  return (
    <section
      id="deals"
      className="bg-[#fafafa] py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 md:grid-cols-[260px_1fr] md:px-8">

        {/* Left content */}
        <div>

          <h2 className="font-serif text-[25px]">
            Deals Of The Month
          </h2>

          <p className="mt-3 max-w-[230px] text-[8px] leading-[1.8] text-[#777]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eleifend euismod nunc, nec faucibus augue ultrices.
          </p>

          <button className="mt-5 rounded-[2px] bg-black px-7 py-2.5 text-[8px] text-white">
            Buy Now
          </button>

          <h3 className="mt-6 text-[10px] font-medium">
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
              <div key={label} className="text-center">

                <div className="flex h-[30px] w-[30px] items-center justify-center border border-[#e5e5e5] bg-white text-[11px] shadow-sm">
                  {value}
                </div>

                <span className="mt-1 block text-[7px] text-[#777]">
                  {label}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* Right carousel */}
        <div className="overflow-hidden">

          <div className="flex gap-3">

            {deals.map((deal, index) => (
              <div
                key={index}
                className="relative min-w-[190px] flex-1 overflow-hidden bg-[#eee] md:min-w-[220px]"
              >

                <img
                  src={deal.image}
                  alt="Deal"
                  className="h-[280px] w-full object-cover md:h-[325px]"
                />

                {index === 0 && (
                  <div className="absolute bottom-4 left-3 bg-white px-4 py-3 shadow-sm">
                    <p className="text-[7px] text-gray-400">
                      Limited Sale
                    </p>

                    <p className="mt-1 text-[10px] font-medium">
                      30% OFF
                    </p>
                  </div>
                )}

              </div>
            ))}

          </div>

          {/* Controls */}
          <div className="mt-3 flex items-center justify-center gap-2">

            <IconButton
              size="small"
              className="!h-7 !w-7 !border !border-gray-200 !bg-white"
            >
              <ArrowBackIosNew sx={{ fontSize: 9 }} />
            </IconButton>

            <IconButton
              size="small"
              className="!h-7 !w-7 !border !border-gray-200 !bg-white"
            >
              <ArrowForwardIos sx={{ fontSize: 9 }} />
            </IconButton>

            <div className="ml-4 flex gap-1">
              {[0, 1, 2, 3].map((dot) => (
                <span
                  key={dot}
                  className={`h-1.5 w-1.5 rounded-full ${
                    dot === 0
                      ? "bg-black"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DealsSection;