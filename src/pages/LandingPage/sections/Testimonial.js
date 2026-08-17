import React from "react";
import { Rating, IconButton } from "@mui/material";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";

const testimonials = [
  {
    name: "James K.",
    role: "Fashion Customer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I've never regret it. I would like to personally thank you for your outstanding product.",
  },
  {
    name: "Sarah W.",
    role: "Fashion Customer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The quality is amazing and the shopping experience was excellent.",
  },
  {
    name: "John W.",
    role: "Fashion Customer",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    text: "Everything arrived quickly and the products looked exactly like the pictures.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-[#fafafa] px-5 py-16 md:py-20">

      <div className="mx-auto max-w-[550px] text-center">

        <h2 className="font-serif text-[26px]">
          This Is What Our Customers Say
        </h2>

        <p className="mt-2 text-[8px] text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

      </div>

      <div className="mx-auto mt-10 flex max-w-[900px] items-center justify-center">

        {testimonials.map((item, index) => (
          <div
            key={item.name}
            className={`
              ${index !== 1 ? "hidden md:block" : ""}
              ${index === 1 ? "z-20 scale-105" : "z-10 opacity-80"}
              w-[300px]
              bg-white
              p-4
              shadow-[0_5px_25px_rgba(0,0,0,0.08)]
            `}
          >

            <div className="flex gap-4">

              <img
                src={item.image}
                alt={item.name}
                className="h-[65px] w-[60px] object-cover"
              />

              <div className="flex-1">

                <p className="text-[7px] leading-[1.7] text-gray-500">
                  "{item.text}"
                </p>

                <Rating
                  value={5}
                  readOnly
                  size="small"
                  sx={{
                    fontSize: "9px",
                    mt: 0.5,
                  }}
                />

                <h3 className="mt-1 text-[10px] font-medium">
                  {item.name}
                </h3>

                <p className="text-[7px] text-gray-400">
                  {item.role}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

      <div className="mt-7 flex justify-center gap-2">

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

      </div>

    </section>
  );
};

export default TestimonialsSection;