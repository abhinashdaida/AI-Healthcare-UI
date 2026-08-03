import { Icon } from "@iconify/react";
import { Container } from "@mui/material";
import React from "react";
import { FEATURES as features } from "../../../../shared/constants/landingPage";

const FeaturesSection = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <Container maxWidth="lg">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 px-4">
          <span className="section-kicker">
            WHY CHOOSE US?
          </span>
          <h2 className="text-[#141414] font-bold text-2xl sm:text-3xl md:text-4xl">
            Healthcare Powered by Intelligence
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full max-w-[285px] h-full mx-auto flex flex-col rounded-[20px] border border-gray-200 overflow-hidden bg-white"
              style={{ boxShadow: '0 8px 30px -10px rgba(0,0,0,0.06)' }}
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] xl:aspect-[4/3] flex items-center justify-center p-6 overflow-hidden">
                
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="relative z-10 w-full h-full object-contain mix-blend-multiply"
                />
                 
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                {/* Title & Icon Flow */}
                <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-[15px] bg-[#EEF4F3] flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                  <h3 className="text-[#141414] font-bold text-[17px] leading-tight whitespace-pre-line mt-1">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[#096B58] font-semibold text-[14px] leading-relaxed mb-6">
                  {feature.desc}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-2">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-[#EAF5F2] flex items-center justify-center shrink-0">
                        <Icon
                          icon="charm:tick"
                          width="24"
                          height="24"
                          color="#096B58"
                        />
                      </div>
                      <span className="text-[#4D4D4D] text-[13px] font-medium leading-tight">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul> 
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;