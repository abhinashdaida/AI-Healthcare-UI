import React from "react";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";

const ecosystem = [
  {
    title: "Patients",
    desc: "Manage your health and access care",
    icon: "hugeicons:patient",
  },
  {
    title: "Doctors",
    desc: "Doctor care and consultations",
    icon: "hugeicons:doctor-01",
  },
  {
    title: "Hospitals",
    desc: "Streamline operations and patient care",
    icon: "hugeicons:doctor-01",
  },
  {
    title: "Laboratories",
    desc: "Accurate tests and timely reports",
    icon: "hugeicons:doctor-01",
  },
  {
    title: "Pharmacies",
    desc: "Dispense and deliver medicine with ease",
    icon: "hugeicons:doctor-01",
  },
  {
    title: "Insurance",
    desc: "Simplify policies and claims",
    icon: "hugeicons:doctor-01",
  },
];
 
const ParticipantSection = () => {
  return (
    <section className="w-full bg-white py-10 md:py-12 lg:py-[30px]">
      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-0 flex flex-col items-center">

        {/* Heading */}
        <div className="text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.4px] text-[#0D8B72]">
            ONE CONNECTED HEALTHCARE NETWORK
          </p>

          <h2 className="mt-3 text-[28px] md:text-[32px] lg:text-[35px] leading-[40px] md:leading-[46px] lg:leading-[52px] font-medium text-[#141414]">
            Built to connect every participant in the
            <br className="hidden lg:block" />
            healthcare journey
          </h2>

          <p className="mt-4 text-[14px] md:text-[15px] leading-[24px] md:leading-[26px] text-[#666666] max-w-[640px] mx-auto">
            From booking to recovery, we make healthcare simple,
            accessible and personalized for you.
          </p>
        </div>

        {/* Participants */}
        <div className="w-full mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6 lg:flex lg:justify-between lg:items-start relative">

          {ecosystem.map((item) => (
            <div
              key={item.title}
              className="relative w-full lg:w-[150px] flex flex-col items-center text-center"
            >

              {/* Connector - Desktop Only */}
              {item.title !== ecosystem[ecosystem.length - 1].title && (
                <div className="hidden lg:flex absolute top-[30px] left-[calc(50%+30px)] items-center w-[calc(100%-60px+46px)] z-0">
                  <div className="flex-1 border-t border-dashed border-[#D9D9D9]" />

                  <Icon
                    icon="line-md:arrow-small-right"
                    width={12}
                    color="#D9D9D9"
                    className="-ml-1"
                  />
                </div>
              )}

              {/* Icon */}
              <div className="relative z-10 w-[60px] h-[60px] rounded-full border border-[#E5E7EB] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center">
                <Icon
                  icon={item.icon}
                  width={28}
                  color="#0D8B72"
                />
              </div>

              {/* Title */}
              <h3 className="mt-5 text-[16px] font-semibold leading-[24px] text-[#141414]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-[12px] leading-[18px] text-[#666666] px-2 max-w-[150px]">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

        {/* Button */}
        <div className="flex justify-center mt-[56px]">
          <Button
            variant="contained"
            sx={{
              width: "170px",
              height: "48px",
              backgroundColor: "#0D8B72",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#096B58",
                boxShadow: "none",
              },
            }}
          >
            Explore Ecosystem
          </Button>
        </div>

      </div>
    </section>
  );
};

export default ParticipantSection;