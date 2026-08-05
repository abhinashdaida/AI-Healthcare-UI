import React from "react";
import { Card } from "@mui/material";
import { Icon } from "@iconify/react";
import { IMPACT_NUMBERS } from "../../../shared/constants/landingPage";

const ImpactNumbers = () => {
  return (
    <section className="max-w-[1140px] mx-auto pt-[56px] pb-[56px]">

      {/* Heading */}

      <div className="mb-[40px]">

        <p className="text-[#096B58] text-[14px] font-medium leading-none">
          Our Impact in Numbers
        </p>

        <h2 className="mt-4 text-[40px] font-medium leading-none text-[#0D1412]">
          Healthcare you can trust,
          <br />
          backed by <span className="text-[#096B58]">real results</span>
        </h2>

      </div>

      {/* Cards */}

      <div className="flex justify-between gap-6">

        {IMPACT_NUMBERS.map((item) => (

          <Card
            key={item.id}
            elevation={0}
            className="w-[267px] h-[233px] rounded-[10px] border border-[#D0D0D0] p-8 flex flex-col justify-between"
          >

            {/* Icon */}

            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: item.bg }}
            >
              <Icon
                icon={item.icon}
                width="32"
                style={{ color: item.color }}
              />
            </div>

            {/* Number */}

            <h3 className="text-[32px] font-medium leading-none text-[#0D1412]">
              {item.value}
            </h3>

            {/* Label */}

            <p className="text-[14px] font-medium leading-none text-[#4D4D4D]">
              {item.label}
            </p>

          </Card>

        ))}

      </div>

    </section>
  );
};

export default ImpactNumbers;