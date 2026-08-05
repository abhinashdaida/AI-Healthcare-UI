import React from "react";
import { Card, Avatar } from "@mui/material";
import { Icon } from "@iconify/react";
import { TESTIMONIALS } from "../../../shared/constants/landingPage";

const Testimonials = () => {
  return (
    <section className="max-w-[1140px] mx-auto py-[56px]">

      <div className="flex justify-between gap-6">

        {/* Left Content */}

        <div className="w-[256px] h-[139px] flex flex-col gap-3">

          <p className="text-[#096B58] text-[14px] font-medium leading-none uppercase">
            WHAT OUR PATIENTS SAY
          </p>

          <h2 className="text-[28px] font-medium leading-[38px] text-[#141414]">
            Trusted by Millions
          </h2>

          <p className="text-[14px] font-normal leading-6 text-[#666666]">
            From booking to recovery, we make healthcare simple, accessible and
            personalized for you.
          </p>

        </div>

        {/* Cards */}

        <div className="flex gap-4">

          {TESTIMONIALS.map((item) => (

            <Card
              key={item.id}
              elevation={0}
              className="w-[206px] h-[168px] rounded-[12px] border border-[#D0D0D0] bg-[#FBFBFB] p-4 flex flex-col justify-between"
              sx={{
                boxShadow:
                  "0px 1px 1px rgba(64,64,64,0.05), 0px 2px 2px rgba(64,64,64,0.04)",
              }}
            >

              {/* Rating */}

              <div className="flex items-center gap-2">

                <div className="flex gap-1 text-[#FFC955]">

                  {[...Array(5)].map((_, index) => (

                    <Icon
                      key={index}
                      icon="mdi:star"
                      width="13"
                    />

                  ))}

                </div>

                <span className="text-[14px] text-[#343434] font-medium">
                  {item.rating}
                </span>

              </div>

              {/* Title */}

              <h3 className="text-[14px] font-medium leading-none text-[#343434]">
                {item.title}
              </h3>

              {/* Review */}

              <p className="text-[12px] leading-5 text-[#343434]">
                "{item.review}"
              </p>

              {/* User */}

              <div className="flex items-center gap-2">

                <Avatar
                  src={item.avatar}
                  sx={{
                    width: 34,
                    height: 34,
                  }}
                />

                <div>

                  <p className="text-[14px] font-medium text-[#141414]">
                    {item.name}
                  </p>

                  <p className="text-[12px] text-[#666666]">
                    {item.role}
                  </p>

                </div>

              </div>

            </Card>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;