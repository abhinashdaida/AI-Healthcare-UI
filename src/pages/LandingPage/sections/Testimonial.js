import React, { useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(1);

  // RIGHT ARROW
  // Cards move to the left
  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      return (prevIndex + 1) % testimonials.length;
    });
  };

  // LEFT ARROW
  // Cards move to the right
  const handlePrevious = () => {
    setActiveIndex((prevIndex) => {
      return (
        (prevIndex - 1 + testimonials.length) %
        testimonials.length
      );
    });
  };

  // Get card position
  const getPosition = (index) => {
    const total = testimonials.length;

    if (index === activeIndex) {
      return "center";
    }

    if (
      index ===
      (activeIndex - 1 + total) % total
    ) {
      return "left";
    }

    return "right";
  };

  return (
    <section className="overflow-hidden bg-[#fafafa] px-5 py-16 md:py-20">

      {/* Heading */}
      <div className="mx-auto max-w-[550px] text-center">

        <h2 className="font-serif text-[32px]">
          This Is What Our Customers Say
        </h2>

        <p className="mt-2 text-[14px] text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

      </div>

      {/* Testimonials */}
      <div className="relative mx-auto mt-10 flex h-[170px] max-w-[1000px] items-center justify-center">

        {testimonials.map((item, index) => {

          const position = getPosition(index);

          return (
            <div
              key={item.name}
              className={`
                absolute
                w-[300px]
                bg-white
                p-4
                shadow-[0_5px_25px_rgba(0,0,0,0.08)]
                transition-all
                duration-500
                ease-in-out

                ${
                  position === "center"
                    ? "z-30 scale-105 opacity-100"
                    : ""
                }

                ${
                  position === "left"
                    ? "z-10 -translate-x-[320px] scale-95 opacity-70"
                    : ""
                }

                ${
                  position === "right"
                    ? "z-10 translate-x-[320px] scale-95 opacity-70"
                    : ""
                }

                max-md:translate-x-0
                max-md:scale-100
                max-md:opacity-100

                ${
                  position !== "center"
                    ? "max-md:hidden"
                    : ""
                }
              `}
            >

              <div className="flex gap-4">

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[65px] w-[60px] object-cover"
                />

                {/* Content */}
                <div className="flex-1">

                  <p className="text-[10px] leading-[1.7] text-gray-500">
                    "{item.text}"
                  </p>

                  <Rating
                    value={5}
                    readOnly
                    size="small"
                    sx={{
                      fontSize: "10px",
                      mt: 0.5,
                    }}
                  />

                  <h3 className="mt-1 text-[12px] font-medium">
                    {item.name}
                  </h3>

                  <p className="text-[10px] text-gray-400">
                    {item.role}
                  </p>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Arrows */}
      <div className="mt-7 flex justify-center gap-2">

        {/* LEFT */}
        <IconButton
          size="small"
          onClick={handlePrevious}
          className="!h-7 !w-7 !border !border-gray-200 !bg-white transition hover:!bg-gray-100"
        >
          <ArrowBackIosNew sx={{ fontSize: 9 }} />
        </IconButton>

        {/* RIGHT */}
        <IconButton
          size="small"
          onClick={handleNext}
          className="!h-7 !w-7 !border !border-gray-200 !bg-white transition hover:!bg-gray-100"
        >
          <ArrowForwardIos sx={{ fontSize: 9 }} />
        </IconButton>

      </div>

    </section>
  );
};

export default TestimonialsSection;