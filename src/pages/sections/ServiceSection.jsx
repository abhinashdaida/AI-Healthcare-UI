import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { SERVICES } from "../../shared/constants/landingPage";

const ServicesSection = () => {
  return (
    <section className="w-full bg-white py-10 md:py-12 lg:py-14">
      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-0">

        {/* Heading */}

        <p className="text-[12px] font-medium uppercase tracking-wide text-[#0D8B72] mb-3">
          EVERYTHING YOU NEED FOR BETTER HEALTHCARE
        </p>

        <Typography
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "720px",
            },
            fontSize: {
              xs: "22px",
              sm: "24px",
              md: "26px",
              lg: "28px",
            },
            fontWeight: 500,
            lineHeight: {
              xs: "34px",
              sm: "36px",
              md: "40px",
              lg: "42px",
            },
            color: "#141414",
            mb: {
              xs: "32px",
              md: "40px",
              lg: "48px",
            },
          }}
        >
          Access care, diagnostics, medicines, records, insurance, and
          AI-powered health services from a{" "}
          <span style={{ color: "#0D8B72" }}>
            single platform.
          </span>
        </Typography>

        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

          {SERVICES.map((service, index) => (

            <Box
              key={index}
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "100%",
                  lg: "173px",
                },
                height: {
                  xs: "260px",
                  lg: "300px",
                },
                border: "1px solid #E6E6E6",
                borderRadius: "12px",
                background: "#FFFFFF",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: ".3s",
                cursor: "pointer",

                "&:hover": {
                  boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
                },
              }}
            >
              <div>

                {/* Icon */}

                <Box
                  sx={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#EDF8F7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "24px",
                  }}
                >
                  <Icon
                    icon={service.icon}
                    width={24}
                    color="#0D8B72"
                  />
                </Box>

                {/* Title */}

                <Typography
                  sx={{
                    fontSize: {
                      xs: "17px",
                      lg: "18px",
                    },
                    fontWeight: 600,
                    color: "#141414",
                    lineHeight: "30px",
                    whiteSpace: "pre-line",
                    mb: "12px",
                  }}
                >
                  {service.title}
                </Typography>

                {/* Description */}

                <Typography
                  sx={{
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#666666",
                  }}
                >
                  {service.description}
                </Typography>

              </div>

              {/* Arrow */}

              <div className="flex justify-end">

                <IconButton
                  sx={{
                    width: "32px",
                    height: "32px",
                    border: "1px solid #E5E7EB",
                    background: "#F8F8F8",

                    "&:hover": {
                      background: "#0D8B72",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  <Icon
                    icon="lucide:chevron-right"
                    width={16}
                  />
                </IconButton>

              </div>

            </Box>

          ))}

        </div>

      </div>
    </section>
  );
};

export default ServicesSection;