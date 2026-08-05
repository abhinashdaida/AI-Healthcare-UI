import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { SERVICES } from "../../shared/constants/landingPage";

const ServicesSection = () => {
  return (
    <section className="w-full max-w-[1140px] mx-auto flex flex-col gap-8 py-6 px-4 sm:px-0 box-border">
      {/* Headings Container (1140px fill * ~146px Hug) */}
      <Box className="w-full flex flex-col gap-3">
        <Typography
          component="span"
          className="text-[12px] sm:text-[13px] font-bold tracking-wider text-[#0F9D8A] uppercase"
        >
          EVERYTHING YOU NEED FOR BETTER HEALTHCARE
        </Typography>

        <Typography
          variant="h2"
          className="text-[24px] sm:text-[32px] font-bold text-[#111827] leading-[1.3] max-w-[900px]"
        >
          Access care, diagnostics, medicines, records, insurance, and
          AI-powered health services from a{" "}
          <span className="text-[#0F9D8A]">single platform.</span>
        </Typography>
      </Box>

      {/* Service Cards Container (1140px * 264px Hug) */}
      <Box className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-[264px]">
        {SERVICES.map((service, index) => (
          <Box
            key={index}
            className="
              group
              w-full
              h-full
              min-h-[264px]
              p-5
              bg-[#F8FAFC]
              hover:bg-white
              border
              border-transparent
              hover:border-[#E5E7EB]
              rounded-2xl
              flex
              flex-col
              justify-between
              transition-all
              duration-300
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]
              cursor-pointer
            "
          >
            {/* Top Content (Icon + Titles) */}
            <Box className="flex flex-col gap-4 items-start">
              {/* Circular Icon Container */}
              <Box
                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
                style={{ backgroundColor: service.bgColor || "#EDF8F7" }}
              >
                <Icon
                  icon={service.icon}
                  width={24}
                  height={24}
                  color="#0F9D8A"
                />
              </Box>

              {/* Title and Description */}
              <Box className="flex flex-col gap-1.5">
                <Typography
                  variant="h6"
                  className="text-[15px] font-bold text-[#111827] leading-tight whitespace-pre-line"
                >
                  {service.title}
                </Typography>
                
                <Typography className="text-[11px] text-[#6B7280] leading-[1.4] line-clamp-3">
                  {service.description}
                </Typography>
              </Box>
            </Box>

            {/* Bottom Arrow Action Button */}
            <Box className="flex justify-end pt-2">
              <IconButton
                size="small"
                className="w-7 h-7 rounded-full bg-white border border-[#E5E7EB] group-hover:bg-[#0F9D8A] group-hover:border-[#0F9D8A] transition-colors"
                sx={{
                  p: 0,
                  "&:hover": {
                    backgroundColor: "#0F9D8A",
                  },
                }}
              >
                <Icon
                  icon="lucide:chevron-right"
                  width={14}
                  className="text-[#6B7280] group-hover:text-white transition-colors"
                />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </section>
  );
};

export default ServicesSection;