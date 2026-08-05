import React from "react";
import { Card } from "@mui/material";
import { Icon } from "@iconify/react";
import { WHY_CHOOSE_US } from "../../../shared/constants/landingPage";

const WhyChooseUs = () => {
  return (
    <section className="max-w-[1140px] mx-auto py-20">

      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-[#0B8B74] text-[14px] font-semibold uppercase tracking-wide">
          WHY CHOOSE US?
        </p>

        <h2 className="mt-4 text-[40px] leading-[48px] font-semibold text-[#141414]">
          Healthcare Powered by Intelligence
        </h2>
      </div>

      {/* Cards */}
      <div className="flex justify-between gap-6">

        {WHY_CHOOSE_US.map((item) => (
          <Card
            key={item.id}
            elevation={0}
            className="w-[267px] h-[436px] rounded-[10px] border border-[#E5E7EB] p-4 shadow-sm"
          >

            {/* Image */}
            <div className="w-full h-[195px] flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-[237px] h-[210px] object-contain"
              />
            </div>

            {/* Content */}
            <div className="mt-3">

              {/* Icon + Title */}
              <div className="flex items-start gap-3 h-[56px]">

                <div className="w-10 h-10 rounded-full bg-[#F3F8F7] flex items-center justify-center flex-shrink-0">
                  <Icon
                    icon={item.icon}
                    width={22}
                    className="text-[#0B8B74]"
                  />
                </div>

                <h3 className="flex-1 text-[18px] leading-[28px] font-semibold text-[#141414]">
                  {item.title}
                </h3>

              </div>

              {/* Description */}
              <p className="mt-3 h-[32px] text-[12px] font-medium leading-4 text-[#0B8B74]">
                {item.description}
              </p>

              {/* Bullet List */}
<ul className="mt-5 flex flex-col gap-2">

  {item.bullets.map((bullet, index) => (

    <li
      key={index}
      className="flex items-center h-4 gap-2"
    >

      <Icon
        icon="mdi:check-circle"
        width={16}
        height={16}
        className="text-[#0B8B74] flex-shrink-0"
      />

      <span className="text-[12px] font-normal leading-4 text-[#6B7280]">
        {bullet}
      </span>

    </li>

  ))}

</ul>

            </div>

          </Card>
        ))}

      </div>
    </section>
  );
};

export default WhyChooseUs;