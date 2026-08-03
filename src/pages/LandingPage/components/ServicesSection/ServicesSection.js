import { Icon } from "@iconify/react";
import { Container } from "@mui/material";
import React from "react";
import { SERVICES as services } from "../../../../shared/constants/landingPage";

const ServicesSection = () => {
  return (
    <section className="py-6 md:py-10 bg-white">
      <Container maxWidth="lg">
        {/* Services Header */}
        <div className="mb-12 max-w-[800px]">
          <span className="section-kicker">
            EVERYTHING YOU NEED FOR BETTER HEALTHCARE
          </span>
          <h2 className="text-gray-900 font-semibold text-2xl md:text-[1.85rem] leading-snug">
            Access care, diagnostics, medicines, records,
            <br />
            insurance, and AI-powered health services from a<br />
            <span className="text-primary">single platform.</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="h-[320px] w-full max-w-[190px] mx-auto flex flex-col rounded border border-[#D0D0D0] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-white"
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="icon-wrapper mb-6">{service.icon}</div>
                <h3 className="mb-3 font-semibold text-gray-900 whitespace-pre-line leading-tight text-[15px]">
                  {service.title}
                </h3>
                <p className="text-gray-500 mb-6 flex-grow text-xs leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
                <div className="flex justify-end">
                  <button className="bg-[#F4F4F4] w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors outline-none border-none cursor-pointer">
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      width={24}
                      height={24}
                      className="text-[#343434]"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServicesSection;
