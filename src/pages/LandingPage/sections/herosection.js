import React from "react";
import {
  ShoppingBagOutlined,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white pt-20 px-10 pb-10 md:px-8">

      <div className="mx-auto max-w-[1180px]">

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

          {/* LEFT */}
          <div className="group relative h-[430px] overflow-hidden bg-[#e5e5e5] md:h-[500px]">

            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=90"
              alt="Fashion model"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

          </div>

          {/* CENTER */}
          <div className="flex h-[430px] flex-col overflow-hidden bg-[#f3f3f3] md:h-[500px]">

            {/* Top image */}
            <div className="h-[95px] shrink-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=90"
                alt="Fashion"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex flex-1 flex-col items-center justify-center">

              <h1 className="text-[35px] font-medium leading-none tracking-tight md:text-[43px]">
                ULTIMATE
              </h1>

              <h2 className="text-[56px] font-extralight leading-[0.9] tracking-tight text-transparent [-webkit-text-stroke:1px_#999] md:text-[67px]">
                SALE
              </h2>

              <p className="mt-3 text-[7px] tracking-[3px]">
                NEW COLLECTION
              </p>

              <button   onClick={() => navigate("/productlisting")} className="mt-3 rounded-[2px] bg-black px-8 py-2.5 text-[8px] text-white shadow">
                SHOP NOW
              </button>

            </div>

            {/* Bottom image */}
            <div className="h-[70px] shrink-0 overflow-hidden px-2 pb-2 md:h-[80px]">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=90"
                alt="Fashion collection"
                className="h-full w-full object-cover"
              />
            </div>

          </div>

          {/* RIGHT */}
          <div className="group relative h-[430px] overflow-hidden bg-[#e5e5e5] md:h-[500px]">

            <img
              src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=90"
              alt="Fashion model"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

          </div>

        </div>

        {/* Floating icons */}
        <div className="mt-3 flex justify-end gap-2">

          <IconButton
            size="small"
            className="!rounded-[3px] !bg-black !text-white"
          >
            <ShoppingBagOutlined sx={{ fontSize: 15 }} />
          </IconButton>

          <IconButton
            size="small"
            className="!h-8 !w-8 !border !border-gray-300"
          >
            <KeyboardArrowUp sx={{ fontSize: 15 }} />
          </IconButton>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;